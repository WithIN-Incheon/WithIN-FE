import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../src/components/Header/Header";
import BottomBar from "../src/components/BottomBar/BottomBar";
import { HOSPITALS, type Hospital, type Hours, type Day } from "../src/pages/ListPage/hospitals";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import "./LocationPage.css";

type SortKey = "distance" | "name";
type SheetMode = "chips" | "list" | "dept" | "hours";
type Geo = { lat: number; lng: number };
type CoordLike = naver.maps.Coord | naver.maps.LatLng;
type MapClickEvt = { coord: naver.maps.Coord };
type LocationState = { fromSearch?: boolean; keyword?: string; focusId?: string; forceList?: boolean } | null | undefined;

declare global {
  interface Window {
    naver: typeof naver;
  }
}

// === util
function waitForNaverMaps(maxWaitMs = 5000): Promise<void> {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      if (window.naver?.maps) return resolve();
      if (Date.now() - start > maxWaitMs) return reject(new Error("Naver Maps SDK load timeout"));
      requestAnimationFrame(tick);
    };
    tick();
  });
}

async function geocode(address: string): Promise<{ lat: number; lng: number } | null> {
  return new Promise((resolve) => {
    naver.maps.Service.geocode({ query: address }, (status, response) => {
      if (status !== naver.maps.Service.Status.OK || response.v2.addresses.length === 0) {
        resolve(null);
        return;
      }
      const { y, x } = response.v2.addresses[0];
      resolve({ lat: parseFloat(y), lng: parseFloat(x) });
    });
  });
}

function getOpenStatusFromHours(hours: Hours, now = new Date()) {
  const day = now.getDay() as Day;
  const today = hours.byDay[day] ?? null;
  const closedDays: Day[] = (Object.keys(hours.byDay) as unknown as Day[]).filter((d) => hours.byDay[d] === null);
  const rightText =
    closedDays.length > 0 ? `매주 ${closedDays.map((d) => ["일", "월", "화", "수", "목", "금", "토"][d]).join(", ")} 휴무` : "";
  if (!today) return { left: "영업종료", right: rightText };

  const [oh, om] = today.open.split(":").map(Number);
  const [ch, cm] = today.close.split(":").map(Number);
  const openDate = new Date(now);
  openDate.setHours(oh, om, 0, 0);
  const closeDate = new Date(now);
  closeDate.setHours(ch, cm, 0, 0);
  const isOpen = now >= openDate && now <= closeDate;
  return { left: isOpen ? "영업중" : "영업종료", right: rightText };
}

// === component
export default function LocationPage() {
  
  // map refs
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const markersRef = useRef<Record<string, naver.maps.Marker>>({});
  const labelsRef = useRef<Record<string, naver.maps.CustomOverlay>>({});
  const coordsRef = useRef<Record<string, naver.maps.LatLng>>({});
  const cursorRef = useRef<naver.maps.Marker | null>(null);

  // sheet / filters
  const [mode, setMode] = useState<SheetMode>("chips");
  const [sortKey, setSortKey] = useState<SortKey>("distance");
  const [deptFilter, setDeptFilter] = useState<string | null>(null);
  const [hoursFilter, setHoursFilter] = useState<"open" | "closed" | null>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  const isDeptActive = mode === "dept" || !!deptFilter;
  const isHoursActive = mode === "hours" || !!hoursFilter;

  // selection & sheet sizing
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const CHIPS_HEIGHT = 140;
  const FULL_HEIGHT = 360;
  const [sheetPx, setSheetPx] = useState<number>(CHIPS_HEIGHT);


  // routing / search
  const location = useLocation();
  const navType = useNavigationType();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>("");
  const [selectedHospitalName, setSelectedHospitalName] = useState<string | null>(null);
  const routeState = useMemo<LocationState>(() => location.state as LocationState, [location.state]);
  const nameOverlayRef = useRef<naver.maps.CustomOverlay | null>(null);

  //지도 초기화
  
  useEffect(() => {
    if (routeState?.fromSearch === true && typeof routeState.keyword === "string") {
      setKeyword(routeState.keyword.trim());
    } else if (navType === "POP") {
      setKeyword("");
    }
  }, [location.key, navType, routeState]);

  useEffect(() => {
    document.documentElement.style.setProperty("--sheet-height", `${sheetPx}px`);
  }, [sheetPx]);
  useEffect(() => {
    setSheetPx(mode === "chips" ? CHIPS_HEIGHT : FULL_HEIGHT);
  }, [mode]);

  function setCursor(m: naver.maps.Map, pos: naver.maps.LatLng | naver.maps.Coord, center = false) {
    if (!cursorRef.current) {
      cursorRef.current = new window.naver.maps.Marker({
        position: pos as naver.maps.Coord,
        map: m,
        zIndex: 10,
        icon: {
          content: `<div class="loc-cursor"><div class="loc-cursor__dot"></div></div>`,
          size: new window.naver.maps.Size(24, 24),
          anchor: new window.naver.maps.Point(12, 12),
        },
        clickable: false,
      });
    } else {
      cursorRef.current.setPosition(pos as naver.maps.Coord);
      cursorRef.current.setMap(m);
    }
    if (center) m.setCenter(pos as naver.maps.Coord);
  }

  useEffect(() => {
    let canceled = false;

    (async () => {
      try {
        await waitForNaverMaps();
      } catch {
        return;
      }
      if (canceled || !mapRef.current) return;

      const m = new window.naver.maps.Map(mapRef.current!, {
        center: new window.naver.maps.LatLng(37.463, 126.65),
        zoom: 13,
        logoControl: true,
        logoControlOptions: { position: window.naver.maps.Position.BOTTOM_RIGHT }, // 저작권 하단 고정
        mapDataControl: false, // 중복 출처 제거
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
      });
      setMap(m);

      // 현재 위치 원
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            if (canceled) return;
            const current = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setGeo(current);
            new window.naver.maps.Circle({
              map: m,
              center: new window.naver.maps.LatLng(current.lat, current.lng),
              radius: 30,
              fillColor: "#3B82F6",
              fillOpacity: 0.3,
              strokeWeight: 0,
              zIndex: 1,
            });
          },
          () => void 0,
          { enableHighAccuracy: true, maximumAge: 10_000, timeout: 5_000 }
        );
      }

    const handleSelect = (id: string, pos: CoordLike) => {
      if (!map) return;

      setSelectedId(id);
      setMode("list");

      // ✅ pos를 LatLng으로 변환
      const latlng = pos instanceof naver.maps.LatLng ? pos : new naver.maps.LatLng(pos.y, pos.x);

      map.setCenter(latlng);
      setCursor(map, latlng, false);

      // 기존 이름 오버레이 제거
      if (nameOverlayRef.current) {
        nameOverlayRef.current.setMap(null);
        nameOverlayRef.current = null;
      }

      // 새 오버레이 생성
      const hospital = HOSPITALS.find((h) => h.id === id);
      if (hospital) {
        const nameEl = document.createElement("div");
        nameEl.textContent = hospital.name;
        nameEl.style.cssText = `
          background: #fff;
          border: 2px solid #0C8CFF;
          border-radius: 16px;
          padding: 4px 10px;
          font-size: 13px;
          font-weight: 600;
          color: #0C8CFF;
          white-space: nowrap;
          pointer-events: none;
        `;

        const overlay = new naver.maps.CustomOverlay({
          position: latlng, // ✅ LatLng 타입 사용
          content: nameEl,
          xAnchor: 0.5,
          yAnchor: 1.8,
          zIndex: 5,
          map,
        });
        nameOverlayRef.current = overlay;
      }

      // 라벨 강조
      Object.entries(labelsRef.current).forEach(([hid, overlay]) => {
        const node = overlay.getElement() as HTMLElement | null;
        if (!node) return;
        node.classList.toggle("nv-label--active", hid === id);
      });
    };



      const createMarkerAndLabel = (h: Hospital, lat: number, lng: number) => {
        const pos = new window.naver.maps.LatLng(lat, lng);
        coordsRef.current[h.id] = pos;

        const mk = new window.naver.maps.Marker({ position: pos, map: m, zIndex: 3 });
        markersRef.current[h.id] = mk;

        const el = document.createElement("div");
        el.className = "nv-label";
        el.innerHTML = `<span class="nv-label__txt">${h.name}</span>`;
        el.style.pointerEvents = "auto"
        el.addEventListener("click", () => handleSelect(h.id, pos));

        const lb = new window.naver.maps.CustomOverlay({
          position: pos,
          content: el,
          xAnchor: 0.5,
          yAnchor: 1.2,
          zIndex: 4,
          map: m,
        });
        labelsRef.current[h.id] = lb;

        window.naver.maps.Event.addListener(mk, "click", () => {
          // 마커 클릭 -> 선택 + 이름 오버레이 표시 + 마커 강조
          handleSelect(h.id, pos);
          // 이름 오버레이
          if (nameOverlayRef.current) { nameOverlayRef.current.setMap(null); nameOverlayRef.current = null; }
          const nameEl = document.createElement('div');
          nameEl.className = 'marker-name-overlay';
          nameEl.textContent = h.name;
          nameOverlayRef.current = new window.naver.maps.CustomOverlay({ position: pos, content: nameEl, yAnchor: -0.6, zIndex: 15, map: m });
          // 마커 강조 (간단히 zIndex 증가)
          mk.setZIndex(9999);
        });

      };

      for (const h of HOSPITALS) {
        if (canceled) break;
        try {

          const coord = await geocode(h.address);
          if (coord) {
            createMarkerAndLabel(h, coord.lat, coord.lng);
          } else {
            console.warn("geocode failed:", h.id, h.address);
          }
        } catch (err) {
          console.warn("marker creation error:", err);
        }
        // 부하 완화: 150ms 쉬어주기
        await new Promise((res) => setTimeout(res, 150));
      }

      // 초기 포커스
      const initId = routeState?.focusId ?? HOSPITALS.find((h) => coordsRef.current[h.id])?.id ?? null;
      if (initId) {
        const pos = coordsRef.current[initId];
        if (pos) {
          setCursor(m, pos, false);
          setSelectedId(initId);
          Object.entries(labelsRef.current).forEach(([hid, overlay]) => {
            const node = overlay.getElement() as HTMLElement | null;
            if (!node) return;
            if (hid === initId) node.classList.add("nv-label--active");
            else node.classList.remove("nv-label--active");
          });
          setMode("list");
        }
      } else {
        setCursor(m, new window.naver.maps.LatLng(37.463, 126.65), false);
      }

      // 지도 클릭 → 커서 이동
      window.naver.maps.Event.addListener(m, "click", (e: MapClickEvt) => {
        setCursor(m, e.coord, true);
      });

      // cleanup
      return () => {
        canceled = true;
        Object.values(markersRef.current).forEach((mk) => mk.setMap(null));
        Object.values(labelsRef.current).forEach((lb) => lb.setMap(null));
        markersRef.current = {};
        labelsRef.current = {};
      };
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // visible list
  const visibleList: Hospital[] = useMemo(() => {
    const kw = keyword.trim();
    return HOSPITALS.filter((h) => {
      if (kw) {
        const hit = h.name.toLowerCase().includes(kw.toLowerCase()) || h.address.toLowerCase().includes(kw.toLowerCase());
        if (!hit) return false;
      }
      if (deptFilter && h.dept !== deptFilter) return false;
      if (hoursFilter) {
        const status = getOpenStatusFromHours(h.hours).left;
        if (hoursFilter === "open" && status !== "영업중") return false;
        if (hoursFilter === "closed" && status !== "영업종료") return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name, "ko");
      if (sortKey === "distance" && geo && coordsRef.current[a.id] && coordsRef.current[b.id]) {
        const pa = coordsRef.current[a.id];
        const pb = coordsRef.current[b.id];
        const da = Math.hypot(pa.y - geo.lat, pa.x - geo.lng);
        const db = Math.hypot(pb.y - geo.lat, pb.x - geo.lng);
        return da - db;
      }
      return 0;
    });
  }, [keyword, deptFilter, hoursFilter, sortKey, geo]);

  const deptChipText = deptFilter ? deptFilter : "진료과목";
  const hoursChipText = hoursFilter === "open" ? "영업중" : hoursFilter === "closed" ? "영업종료" : "영업시간";

  const onSearchBarClick = () => navigate("/location/search", { state: { initial: keyword } });

  const handleGPS = () => {
    if (!map || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const p = new window.naver.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      setGeo({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      map.setCenter(p);
      map.setZoom(14, true);
      setCursor(map, p, false);
    });
  };

  function openDirections(h: Hospital) {
    const query = `${h.name} ${h.address}`;
    const q = encodeURIComponent(query);
    const zoom = 15;
    let cx: number | null = null;
    let cy: number | null = null;
    if (geo) {
      cx = geo.lng;
      cy = geo.lat;
    } else if (coordsRef.current[h.id]) {
      cx = coordsRef.current[h.id].x;
      cy = coordsRef.current[h.id].y;
    }
    const cParam = cx != null && cy != null ? `?c=${cx},${cy},${zoom},0,0,0,dh` : "";
    const url = `https://map.naver.com/p/search/${q}${cParam}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  // bottom sheet drag handlers
  const dragRef = useRef<{ startY: number; startH: number } | null>(null);
  const onDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    const y = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    dragRef.current = { startY: y, startH: sheetPx };
  };
  const onDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!dragRef.current) return;
    const y = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const dy = dragRef.current.startY - y;
    const next = Math.min(FULL_HEIGHT, Math.max(CHIPS_HEIGHT, dragRef.current.startH + dy));
    setSheetPx(next);
  };
  const onDragEnd = () => {
    if (!dragRef.current) return;
    const snapped = sheetPx > CHIPS_HEIGHT + (FULL_HEIGHT - CHIPS_HEIGHT) / 3 ? FULL_HEIGHT : CHIPS_HEIGHT;
    setSheetPx(snapped);
    setMode(snapped === FULL_HEIGHT ? (mode === "chips" ? "list" : mode) : "chips");
    dragRef.current = null;
  };

  const openListWithSort = (key: SortKey) => {
    setSortKey(key);
    setMode("list");
  };

return (
  <div className="location-page">
    {/* 상단 헤더 */}
    <Header title="산재 지정 의료기관 위치" showBack />

    {/* 검색창 */}
    <div className="loc-searchbar" onClick={onSearchBarClick}>
      <input
        className="loc-searchbar_input"
        placeholder="미추홀구 용현동"
        aria-label="주소 또는 의료기관 검색"
        value={keyword}
        readOnly
      />
      <button className="loc-searchbar_btn" aria-label="검색">
        <img src="/Location/search-icon.svg" alt="검색" />
      </button>
    </div>

    {/* 선택된 병원 이름 표시 */}
    {selectedHospitalName && (
      <div className="loc-selected-name" role="status" aria-live="polite">
        {selectedHospitalName}
      </div>
    )}

    {/* 지도 영역 */}
    <div className="loc-map" style={{ height: "60vh", position: "relative" }}>
      <div ref={mapRef} className="loc-map_canvas" />

      {/* 지도 컨트롤 버튼 */}
      {map && (
        <div className="loc-zoomctrl">
          <button
            onClick={() => map.setZoom(map.getZoom() + 1, true)}
            aria-label="확대"
            className="loc-zoombtn"
          >
            ＋
          </button>
          <button
            onClick={() => map.setZoom(map.getZoom() - 1, true)}
            aria-label="축소"
            className="loc-zoombtn"
          >
            －
          </button>
        </div>
      )}

      {/* 목록 보기 / 닫기 버튼 */}
      <button
        className="loc-map_listbtn"
        onClick={() => setMode(mode === "list" ? "chips" : "list")}
        aria-expanded={mode !== "chips"}
      >
        <img src="/Location/menu_blue.svg" alt="" />
        <span>{mode === "list" ? "목록닫기" : "목록보기"}</span>
      </button>

      {/* 내 위치 버튼 */}
      <button
        className="loc-map_gpsbtn"
        aria-label="내 위치로 이동"
        onClick={handleGPS}
      >
        <img src="/Location/gps-icon.svg" alt="GPS" />
      </button>

      {/* 딤처리 (목록 닫기 시) */}
      <div
        className={`loc-dim ${mode !== "chips" ? "on" : ""}`}
        onClick={() => setMode("chips")}
      />
    </div>

    {/* 하단 Bottom Sheet */}
    <div
      className="loc-bottomsheet"
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onTouchStart={onDragStart}
      onTouchMove={onDragMove}
      onTouchEnd={onDragEnd}
    >
      <div className="loc-bottomsheet_panel">
        {/* 핸들 */}
        <div className="loc-bottomsheet_handle" />

        {/* 필터 칩 영역 */}
        <div className="loc-filterbar in-sheet">
          <button
            className={`chip ${sortKey === "distance" ? "chip--active" : ""}`}
            onClick={() => openListWithSort("distance")}
          >
            거리순
          </button>

          <button
            className={`chip ${sortKey === "name" ? "chip--active" : ""}`}
            onClick={() => openListWithSort("name")}
          >
            가나다순
          </button>

          {/* 진료과 필터 */}
          <button
            className={`chip chip--dropdown ${isDeptActive ? "chip--active" : ""}`}
            onClick={() => {
              if (mode === "dept") setMode("list");
              else if (deptFilter) {
                setDeptFilter(null);
                setMode("list");
              } else setMode("dept");
            }}
          >
            {deptChipText}
            <img
              src="/arrow-down.svg"
              alt=""
              className={`arrow-icon ${mode === "dept" ? "rotated" : ""}`}
            />
          </button>

          {/* 영업시간 필터 */}
          <button
            className={`chip chip--dropdown ${isHoursActive ? "chip--active" : ""}`}
            onClick={() => {
              if (mode === "hours") setMode("list");
              else if (hoursFilter) {
                setHoursFilter(null);
                setMode("list");
              } else setMode("hours");
            }}
          >
            {hoursChipText}
            <img
              src="/arrow-down.svg"
              alt=""
              className={`arrow-icon ${mode === "hours" ? "rotated" : ""}`}
            />
          </button>
        </div>

        {/* 진료과 선택 */}
        {mode === "dept" && (
          <div className="dept-grid">
            {[
              "내과/가정의학과",
              "특수외과",
              "의원",
              "재활/물리치료",
              "정신과",
              "종합",
              "한방",
              "기타",
              "요양",
              "치과",
              "정형외과",
            ].map((d) => (
              <button
                key={d}
                className={`dept-chip ${deptFilter === d ? "on" : ""}`}
                onClick={() => {
                  setDeptFilter((prev) => (prev === d ? null : d));
                  setMode("list");
                }}
              >
                {d}
              </button>
            ))}
          </div>
        )}

        {/* 영업중 / 종료 필터 */}
        {mode === "hours" && (
          <div className="hours-filter">
            <button
              className={`hours-chip ${hoursFilter === "open" ? "on" : ""}`}
              onClick={() =>
                setHoursFilter((prev) => (prev === "open" ? null : "open"))
              }
            >
              영업중
            </button>

            <button
              className={`hours-chip ${hoursFilter === "closed" ? "on" : ""}`}
              onClick={() =>
                setHoursFilter((prev) => (prev === "closed" ? null : "closed"))
              }
            >
              영업종료
            </button>
          </div>
        )}

        {/* 병원 리스트 */}
        {(mode === "list" || mode === "hours" || mode === "chips") && (
          <div className="hospital-list">
            {visibleList.length === 0 ? (
              <div style={{ padding: 16, color: "#666", fontSize: 13 }}>
                조건을 만족하는 의료기관이 없습니다
              </div>
            ) : (
              visibleList.map((h) => {
                const status = getOpenStatusFromHours(h.hours);
                const isSelected = selectedId === h.id;
                const marker = markersRef.current[h.id];

                return (
                  <div
                    key={h.id}
                    id={`hospital-card-${h.id}`}
                    className={`hospital-card ${isSelected ? "is-selected" : ""}`}
                    onClick={() => {
                      setSelectedId(h.id);
                      if (marker && map) {
                        const pos = marker.getPosition();
                        map.setCenter(pos as naver.maps.Coord);
                        setCursor(map, pos as naver.maps.Coord, false);

                        Object.entries(labelsRef.current).forEach(([id, overlay]) => {
                          const node = overlay.getElement() as HTMLElement | null;
                          if (!node) return;
                          node.classList.toggle("nv-label--active", id === h.id);
                        });
                      }
                      if (mode === "chips") setMode("list");
                    }}
                  >
                    <div className="card-title">
                      <span className="card-name">{h.name}</span>
                      <span className="card-dept">{h.dept}</span>
                    </div>

                    <div className="card-row card-open">
                      <span className="open-left">{status.left}</span>
                      {status.right && <span className="open-right"> · {status.right}</span>}
                    </div>

                    <div className="card-row">{h.address}</div>

                    <div className="card-row phone-row">
                      <img src="/Location/phone-icon.svg" alt="" className="icon-sm" />
                      <span className="phone">{h.phone}</span>
                    </div>

                    <div className="card-actions">
                      <button
                        className="icon-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDirections(h);
                        }}
                        aria-label="길찾기"
                        title="길찾기"
                      >
                        <img src="/Location/direction-icon.svg" alt="길찾기" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>

    {/* 하단 바 */}
    <BottomBar />
  </div>
);

}
