// src/pages/LocationPage/LocationPage.tsx
// 기능 구분: 페이지/상태/지도 타입
import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import { HOSPITALS, type Hospital, type Hours, type Day } from "./hospitals";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import "./LocationPage.css";

type SortKey = "distance" | "name";
type SheetMode = "chips" | "list" | "dept" | "hours";
type Geo = { lat: number; lng: number };
type CoordLike = naver.maps.Coord | naver.maps.LatLng;
type MapClickEvt = { coord: naver.maps.Coord };

type LocationState = {
  fromSearch?: boolean;
  keyword?: string;
  focusId?: string;
  forceList?: boolean;
} | null | undefined;

declare global {
  interface Window {
    naver: typeof naver;
  }
}

// 기능 구분: Naver SDK 대기
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

// 기능 구분: 지오코딩
async function geocode(query: string): Promise<naver.maps.Service.GeocodeResponse | null> {
  return new Promise((resolve) => {
    window.naver.maps.Service.geocode({ query }, (status, response) => {
      resolve(status === window.naver.maps.Service.Status.OK ? response : null);
    });
  });
}

// 기능 구분: 영업여부 계산
function getOpenStatusFromHours(hours: Hours, now = new Date()) {
  const day = now.getDay() as Day;
  const today = hours.byDay[day] ?? null;
  const closedDays: Day[] = (Object.keys(hours.byDay) as unknown as Day[]).filter(
    (d) => hours.byDay[d] === null
  );
  const rightText =
    closedDays.length > 0
      ? `매주 ${closedDays.map((d) => ["일", "월", "화", "수", "목", "금", "토"][d]).join(", ")} 휴무`
      : "";
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

export default function LocationPage() {
  // 기능 구분: 지도/커서/마커/라벨 참조
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const markersRef = useRef<Record<string, naver.maps.Marker>>({});
  const labelsRef = useRef<Record<string, naver.maps.CustomOverlay>>({});
  const coordsRef = useRef<Record<string, naver.maps.LatLng>>({});
  const cursorRef = useRef<naver.maps.Marker | null>(null);

  // 기능 구분: 시트/필터/정렬
  const [mode, setMode] = useState<SheetMode>("chips");
  const [sortKey, setSortKey] = useState<SortKey>("distance");
  const [deptFilter, setDeptFilter] = useState<string | null>(null);
  const [hoursFilter, setHoursFilter] = useState<"open" | "closed" | null>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  const isDeptActive = mode === "dept" || !!deptFilter;
  const isHoursActive = mode === "hours" || !!hoursFilter;

  // 기능 구분: 선택/바텀시트 높이
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const CHIPS_HEIGHT = 140;
  const FULL_HEIGHT = 360;
  const [sheetPx, setSheetPx] = useState<number>(CHIPS_HEIGHT);

  // 기능 구분: 북마크
  const [bookmarked, setBookmarked] = useState<string[]>(
    () => JSON.parse(localStorage.getItem("bookmarkedHospitals") || "[]") ?? []
  );
  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => {
      const updated = prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id];
      localStorage.setItem("bookmarkedHospitals", JSON.stringify(updated));
      return updated;
    });
  };

  // 기능 구분: 라우팅/검색키워드
  const location = useLocation();
  const navType = useNavigationType();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>("");
  const routeState = useMemo<LocationState>(() => location.state as LocationState, [location.state]);

  useEffect(() => {
    if (routeState?.fromSearch === true && typeof routeState.keyword === "string") {
      setKeyword(routeState.keyword.trim());
    } else if (navType === "POP") {
      setKeyword("");
    }
  }, [location.key, navType, routeState]);

  // 기능 구분: 시트 높이/모드
  useEffect(() => {
    document.documentElement.style.setProperty("--sheet-height", `${sheetPx}px`);
  }, [sheetPx]);
  useEffect(() => {
    setSheetPx(mode === "chips" ? CHIPS_HEIGHT : FULL_HEIGHT);
  }, [mode]);

  // 기능 구분: 커서 유틸
  function setCursor(m: naver.maps.Map, pos: naver.maps.LatLng | naver.maps.Coord, center = false) {
    if (!cursorRef.current) {
      cursorRef.current = new window.naver.maps.Marker({
        position: pos as naver.maps.Coord,
        map: m,
        zIndex: 10,
        icon: {
          content: `
            <div class="loc-cursor"><div class="loc-cursor__dot"></div></div>
          `,
          size: new window.naver.maps.Size(24, 24),
          anchor: new window.naver.maps.Point(12, 12),
        },
        clickable: false,
      });
    } else {
      cursorRef.current.setPosition(pos as naver.maps.Coord);
    }
    if (center) m.setCenter(pos as naver.maps.Coord);
  }

  // 기능 구분: 지도 생성/마커/라벨/커서/이벤트
  useEffect(() => {
    let canceled = false;

    (async () => {
      await waitForNaverMaps();
      if (canceled || !mapRef.current) return;

      const m = new window.naver.maps.Map(mapRef.current!, {
        center: new window.naver.maps.LatLng(37.463, 126.65),
        zoom: 13,
        logoControl: true,
        logoControlOptions: { position: window.naver.maps.Position.TOP_LEFT },
        mapDataControl: true,
        mapDataControlOptions: { position: window.naver.maps.Position.TOP_RIGHT },
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
      });
      setMap(m);

      // 기능 구분: 현재 위치 원
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

      // 기능 구분: 선택 헬퍼
      const handleSelect = (id: string, pos: CoordLike) => {
        setSelectedId(id);
        setMode("list");
        m.setCenter(pos as naver.maps.Coord);
        setCursor(m, pos as naver.maps.Coord, false);
        Object.entries(labelsRef.current).forEach(([hid, overlay]) => {
          const node = overlay.getElement() as HTMLElement | null;
          if (!node) return;
          if (hid === id) node.classList.add("nv-label--active");
          else node.classList.remove("nv-label--active");
        });
      };

      // 기능 구분: 마커/라벨 생성
      const createMarkerAndLabel = (h: Hospital, lat: number, lng: number) => {
        const pos = new window.naver.maps.LatLng(lat, lng);
        coordsRef.current[h.id] = pos;

        const mk = new window.naver.maps.Marker({ position: pos, map: m, zIndex: 3 });
        markersRef.current[h.id] = mk;

        const el = document.createElement("div");
        el.className = "nv-label";
        el.innerHTML = `<span class="nv-label__txt">${h.name}</span>`;
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

        window.naver.maps.Event.addListener(mk, "click", () => handleSelect(h.id, pos));
      };

      // 기능 구분: 주소→좌표→마커
      const jobs = HOSPITALS.map(async (h) => {
        if (typeof h.lat === "number" && typeof h.lng === "number") {
          createMarkerAndLabel(h, h.lat, h.lng);
          return;
        }
        const res = await geocode(h.address);
        const addr = res?.v2?.addresses?.[0];
        if (addr) createMarkerAndLabel(h, Number(addr.y), Number(addr.x));
      });
      await Promise.all(jobs);

      // 기능 구분: 초기 커서(포커스→첫 좌표→센터)
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

      // 기능 구분: 지도 클릭→커서 이동
      window.naver.maps.Event.addListener(m, "click", (e: MapClickEvt) => {
        setCursor(m, e.coord, true);
      });

      // 기능 구분: 언마운트 정리
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

  // 기능 구분: 필터/정렬/키워드
  const visibleList: Hospital[] = useMemo(() => {
    const kw = keyword.trim();
    return HOSPITALS.filter((h) => {
      if (kw) {
        const hit =
          h.name.toLowerCase().includes(kw.toLowerCase()) ||
          h.address.toLowerCase().includes(kw.toLowerCase());
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

  // 기능 구분: 칩 텍스트
  const deptChipText = deptFilter ? deptFilter : "진료과목";
  const hoursChipText = hoursFilter === "open" ? "영업중" : hoursFilter === "closed" ? "영업종료" : "영업시간";

  // 기능 구분: 검색바 클릭→SearchPage
  const onSearchBarClick = () => {
    navigate("/location/search", { state: { initial: keyword } });
  };

  // 기능 구분: GPS 이동
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

  // 기능 구분: 네이버 지도 검색 URL 열기(이름+주소)
  function openDirections(h: Hospital) {
    const query = `${h.name} ${h.address}`;
    const q = encodeURIComponent(query);
    const zoom = 15;

    // 중심: 현재위치 우선, 없으면 병원 좌표
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

  // 기능 구분: 바텀시트 드래그
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

  // 기능 구분: 정렬→목록
  const openListWithSort = (key: SortKey) => {
    setSortKey(key);
    setMode("list");
  };

  return (
    <div className="location-page">
      <Header
        title="산재 지정 의료기관 위치"
        showBack
        showBookmark
        bookmarkTo="/location/bookmark"
        bookmarkIconSrc="/bookmark-icon.svg"
      />

      {/* 검색바 */}
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

      {/* 지도 */}
      <div className="loc-map">
        <div ref={mapRef} className="loc-map_canvas" />

        {/* 줌 컨트롤 */}
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

        {/* 지도 타입 컨트롤 */}
        {map && (
          <div
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              display: "flex",
              gap: 6,
              zIndex: 5,
            }}
          >
            <button
              onClick={() => map.setMapTypeId(window.naver.maps.MapTypeId.NORMAL)}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                border: "1px solid #E5E7EB",
                background: "#fff",
                fontSize: 13,
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,.12)",
              }}
            >
              일반
            </button>
            <button
              onClick={() => map.setMapTypeId(window.naver.maps.MapTypeId.HYBRID)}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                border: "1px solid #E5E7EB",
                background: "#fff",
                fontSize: 13,
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,.12)",
              }}
            >
              위성
            </button>
          </div>
        )}

        {/* 목록보기 토글 */}
        <button
          className="loc-map_listbtn"
          onClick={() => setMode(mode === "list" ? "chips" : "list")}
          aria-expanded={mode !== "chips"}
        >
          <img src="/Location/menu_blue.svg" alt="" />
          <span>{mode === "list" ? "목록닫기" : "목록보기"}</span>
        </button>

        {/* GPS (목록보기와 같은 줄) */}
        <button className="loc-map_gpsbtn" aria-label="내 위치로 이동" onClick={handleGPS}>
          <img src="/Location/gps-icon.svg" alt="GPS" />
        </button>

        <div className={`loc-dim ${mode !== "chips" ? "on" : ""}`} onClick={() => setMode("chips")} />
      </div>

      {/* 바텀시트 */}
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
          <div className="loc-bottomsheet_handle" />

          {/* 칩바 */}
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
              <img src="/arrow-down.svg" alt="" className={`arrow-icon ${mode === "dept" ? "rotated" : ""}`} />
            </button>

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
              <img src="/arrow-down.svg" alt="" className={`arrow-icon ${mode === "hours" ? "rotated" : ""}`} />
            </button>
          </div>

          {/* dept 벡터 */}
          {mode === "dept" && <img className="gray-vector" src="/gray-vector.svg" alt="" />}

          {/* 본문 */}
          <div className="loc-bottomsheet_body">
            {mode === "dept" && (
              <div className="dept-grid">
                {["내과", "정형외과", "일반외과", "치과", "안과", "영상의학", "예방의학", "수의학", "건강검진"].map((d) => (
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

            {mode === "hours" && (
              <div className="hours-filter">
                <button
                  className={`hours-chip ${hoursFilter === "open" ? "on" : ""}`}
                  onClick={() => setHoursFilter((prev) => (prev === "open" ? null : "open"))}
                >
                  영업중
                </button>
                <button
                  className={`hours-chip ${hoursFilter === "closed" ? "on" : ""}`}
                  onClick={() => setHoursFilter((prev) => (prev === "closed" ? null : "closed"))}
                >
                  영업종료
                </button>
              </div>
            )}

            {(mode === "list" || mode === "hours" || mode === "chips") && (
              <div className="hospital-list">
                {visibleList.length === 0 && (
                  <div style={{ padding: 16, color: "#666", fontSize: 13 }}>조건을 만족하는 의료기관이 없습니다</div>
                )}

                {visibleList.map((h) => {
                  const status = getOpenStatusFromHours(h.hours);
                  const isSelected = selectedId === h.id;
                  const dept = h.dept;
                  const mk = markersRef.current[h.id];

                  return (
                    <div
                      key={h.id}
                      className={`hospital-card ${isSelected ? "is-selected" : ""}`}
                      onClick={() => {
                        setSelectedId(h.id);
                        if (mk && map) {
                          const pos = mk.getPosition();
                          map.setCenter(pos as naver.maps.Coord);
                          setCursor(map, pos as naver.maps.Coord, false);
                          Object.entries(labelsRef.current).forEach(([id, overlay]) => {
                            const node = overlay.getElement() as HTMLElement | null;
                            if (!node) return;
                            if (id === h.id) node.classList.add("nv-label--active");
                            else node.classList.remove("nv-label--active");
                          });
                        }
                        if (mode === "chips") setMode("list");
                      }}
                    >
                      <div className="card-title">
                        <span className="card-name">{h.name}</span>
                        <span className="card-dept">{dept}</span>
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
                        <button
                          className="icon-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(h.id);
                          }}
                          aria-label="북마크"
                          title="북마크"
                        >
                          <img
                            src={bookmarked.includes(h.id) ? "/Location/bookmark-on.svg" : "/Location/bookmark-off.svg"}
                            alt="북마크"
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
