// cspell:ignore listbtn gpsbtn bottomsheet filterbar

// src/pages/Location/LocationPage.tsx
import { useEffect, useRef, useState, useMemo } from "react";
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import { HOSPITALS, type Hospital, type Hours, type Day } from "./hospitals";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import "./LocationPage.css";

type SortKey = "distance" | "name";
type SheetMode = "chips" | "list" | "dept" | "hours";
type Geo = { lat: number; lng: number };
type CoordLike = naver.maps.Coord | naver.maps.LatLng;

/** SearchPage */
type LocationState = {
  fromSearch?: boolean;
  keyword?: string;
  focusId?: string;
  forceList?: boolean; 
} | null | undefined;

declare global {
  interface Window { naver: typeof naver; }
}

/** Naver Maps SDK 로드 대기 */
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

/** 주소 → 좌표 */
async function geocode(query: string): Promise<naver.maps.Service.GeocodeResponse | null> {
  return new Promise((resolve) => {
    window.naver.maps.Service.geocode({ query }, (status, response) => {
      resolve(status === window.naver.maps.Service.Status.OK ? response : null);
    });
  });
}

function getOpenStatusFromHours(hours: Hours, now = new Date()) {
  const day = now.getDay() as Day;
  const today = hours.byDay[day] ?? null;
  const closedDays: Day[] = (Object.keys(hours.byDay) as unknown as Day[]).filter((d) => hours.byDay[d] === null);
  const rightText =
    closedDays.length > 0
      ? `매주 ${closedDays.map((d) => ["일","월","화","수","목","금","토"][d]).join(", ")} 휴무`
      : "";
  if (!today) return { left: "영업종료", right: rightText };

  const [oh, om] = today.open.split(":").map(Number);
  const [ch, cm] = today.close.split(":").map(Number);
  const openDate = new Date(now); openDate.setHours(oh, om, 0, 0);
  const closeDate = new Date(now); closeDate.setHours(ch, cm, 0, 0);
  const isOpen = now >= openDate && now <= closeDate;
  return { left: isOpen ? "영업중" : "영업종료", right: rightText };
}

export default function LocationPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  // 시트/필터
  const [mode, setMode] = useState<SheetMode>("chips");
  const [sortKey, setSortKey] = useState<SortKey>("distance");
  const [deptFilter, setDeptFilter] = useState<string | null>(null);
  const [hoursFilter, setHoursFilter] = useState<"open" | "closed" | null>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  const isDeptActive = mode === "dept" || !!deptFilter;
  const isHoursActive = mode === "hours" || !!hoursFilter;

  // 마커/라벨
  const markersRef = useRef<Record<string, naver.maps.Marker>>({});
  const labelsRef  = useRef<Record<string, naver.maps.CustomOverlay>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 바텀시트 높이
  const CHIPS_HEIGHT = 140;
  const FULL_HEIGHT  = 360;
  const [sheetPx, setSheetPx] = useState<number>(CHIPS_HEIGHT);

  // 북마크
  const [bookmarked, setBookmarked] = useState<string[]>(() => {
    const saved = localStorage.getItem("bookmarkedHospitals");
    return saved ? JSON.parse(saved) : [];
  });
  const toggleBookmark = (id: string) => {
    setBookmarked(prev => {
      const updated = prev.includes(id) ? prev.filter(bid => bid !== id) : [...prev, id];
      localStorage.setItem("bookmarkedHospitals", JSON.stringify(updated));
      return updated;
    });
  };

  // 검색/뒤로가기 처리
  const location = useLocation();
  const navType = useNavigationType();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState<string>("");

  // location.state를 안전하게 참조(메모이즈)해서 deps에 넣음 → exhaustive-deps 해결
  const routeState = useMemo<LocationState>(() => location.state as LocationState, [location.state]);

  // location 변화 시: 의도적 검색이면 반영, POP(뒤로가기)면 초기화
  useEffect(() => {
    if (routeState?.fromSearch === true && typeof routeState.keyword === "string") {
      setKeyword(routeState.keyword.trim());
      
    } else if (navType === "POP") {
      setKeyword("");
    }
    // 의존성: location.key(히스토리 이동), navType, routeState(검색 제출로 들어온 경우)
  }, [location.key, navType, routeState]);

  // 시트 높이 CSS 변수 반영
  useEffect(() => {
    document.documentElement.style.setProperty("--sheet-height", `${sheetPx}px`);
  }, [sheetPx]);

  useEffect(() => {
    setSheetPx(mode === "chips" ? CHIPS_HEIGHT : FULL_HEIGHT);
  }, [mode]);

  // 지도 생성 & 마커/라벨 생성
  useEffect(() => {
    let canceled = false;

    (async () => {
      await waitForNaverMaps();
      if (canceled || !mapRef.current) return;

      // 지도 생성 (로고/저작권 상단 배치, 기본 컨트롤 비활성화)
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

      // 선택 헬퍼(로컬 m 사용)
      const handleSelect = (id: string, pos: CoordLike) => {
        setSelectedId(id);
        setMode("list");
        m.setCenter(pos as naver.maps.Coord);
        Object.entries(labelsRef.current).forEach(([hid, overlay]) => {
          const node = overlay.getElement() as HTMLElement | null;
          if (!node) return;
          if (hid === id) node.classList.add("nv-label--active");
          else node.classList.remove("nv-label--active");
        });
      };

      // 마커/라벨 생성
      const createMarkerAndLabel = (h: Hospital, lat: number, lng: number) => {
        const pos = new window.naver.maps.LatLng(lat, lng);
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

      // 주소 → 좌표 → 마커
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

      // 초기 포커스 (SearchPage에서 focusId 전달시)
      const initialFocusId = routeState?.focusId ?? null;
      if (initialFocusId) {
        const mk = markersRef.current[initialFocusId];
        if (mk) {
          const pos = mk.getPosition();
          m.setCenter(pos as naver.maps.Coord);
          setSelectedId(initialFocusId);
          Object.entries(labelsRef.current).forEach(([hid, overlay]) => {
            const node = overlay.getElement() as HTMLElement | null;
            if (!node) return;
            if (hid === initialFocusId) node.classList.add("nv-label--active");
            else node.classList.remove("nv-label--active");
          });
          setMode("list");
        }
      }
    })();

    return () => {
      canceled = true;
      Object.values(markersRef.current).forEach((mk) => mk.setMap(null));
      Object.values(labelsRef.current).forEach((lb) => lb.setMap(null));
      markersRef.current = {};
      labelsRef.current = {};
    };
    // 의존성: 최초 1회(지도 생성 시)만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // 필터/정렬 + 키워드
  const visibleList: Hospital[] = useMemo(() => {
    const kw = keyword.trim();
    return HOSPITALS
      .filter((h) => {
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
      })
      .sort((a, b) => {
        if (sortKey === "name") return a.name.localeCompare(b.name, "ko");
        if (sortKey === "distance" && geo && a.lat != null && a.lng != null && b.lat != null && b.lng != null) {
          const da = Math.hypot(a.lat - geo.lat, a.lng - geo.lng);
          const db = Math.hypot(b.lat - geo.lat, b.lng - geo.lng);
          return da - db;
        }
        return 0;
      });
  }, [keyword, deptFilter, hoursFilter, sortKey, geo]);

  const deptChipText = deptFilter ? deptFilter : "진료과목";
  const hoursChipText = hoursFilter === "open" ? "영업중" : hoursFilter === "closed" ? "영업종료" : "영업시간";

  // 검색바 클릭 → SearchPage로 이동(현재 keyword를 initial로 전달)
  const onSearchBarClick = () => {
    navigate("/location/search", { state: { initial: keyword } });
  };

  // 현재 위치로 이동
  const handleGPS = () => {
    if (!map || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const p = new window.naver.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      setGeo({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      map.setCenter(p);
      map.setZoom(14, true);
    });
  };

  // 길찾기
  const openDirections = (h: Hospital) => {
    if (h.address) {
      const url = `https://map.naver.com/v5/search/${encodeURIComponent(h.address)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      alert("주소 정보를 찾지 못했습니다.");
    }
  };

  // 바텀시트 드래그
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

  const openListWithSort = (key: SortKey) => { setSortKey(key); setMode("list"); };

  return (
    <div className="location-page">
      <Header title="산재 지정 의료기관 위치" showBack showBookmark bookmarkTo="/location/bookmark" bookmarkIconSrc="/bookmark-icon.svg" />

      {/* 검색바 */}
      <div className="loc-searchbar" onClick={onSearchBarClick}>
        <input className="loc-searchbar_input" placeholder="미추홀구 용현동" aria-label="주소 또는 의료기관 검색" value={keyword} readOnly />
        <button className="loc-searchbar_btn" aria-label="검색">
          <img src="/Location/search-icon.svg" alt="검색" />
        </button>
      </div>

      {/* 지도 */}
      <div className="loc-map">
        <div ref={mapRef} className="loc-map_canvas" />

        {/* 커스텀 줌 컨트롤: 오른쪽 중앙 기준 20px 위 */}
        {map && (
          <div
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(calc(-50% - 20px))",
              display: "grid",
              gap: 8,
              zIndex: 5, // 목록보기 버튼(6)보다 뒤
            }}
          >
            <button
              onClick={() => map.setZoom(map.getZoom() + 1, true)}
              aria-label="확대"
              style={{
                width: 36, height: 36, borderRadius: 6, border: "1px solid #E5E7EB",
                background: "#fff", fontSize: 18, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,.12)"
              }}
            >＋</button>
            <button
              onClick={() => map.setZoom(map.getZoom() - 1, true)}
              aria-label="축소"
              style={{
                width: 36, height: 36, borderRadius: 6, border: "1px solid #E5E7EB",
                background: "#fff", fontSize: 18, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,.12)"
              }}
            >－</button>
          </div>
        )}

        {/* 지도 타입 컨트롤: 오른쪽 상단 */}
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
                boxShadow: "0 1px 3px rgba(0,0,0,.12)"
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
                boxShadow: "0 1px 3px rgba(0,0,0,.12)"
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

        {/* GPS */}
        <button className="loc-map_gpsbtn" aria-label="내 위치로 이동" onClick={handleGPS}>
          <img src="/Location/gps-icon.svg" alt="GPS" />
        </button>

        <div className={`loc-dim ${mode !== "chips" ? "on" : ""}`} onClick={() => setMode("chips")} />
      </div>

      {/* 바텀시트 */}
      <div className="loc-bottomsheet"
           onMouseDown={onDragStart} onMouseMove={onDragMove} onMouseUp={onDragEnd}
           onTouchStart={onDragStart} onTouchMove={onDragMove} onTouchEnd={onDragEnd}>
        <div className="loc-bottomsheet_panel">
          <div className="loc-bottomsheet_handle" />

          {/* 칩 영역 */}
          <div className="loc-filterbar in-sheet">
            <button className={`chip ${sortKey === "distance" ? "chip--active" : ""}`} onClick={() => openListWithSort("distance")}>거리순</button>
            <button className={`chip ${sortKey === "name" ? "chip--active" : ""}`} onClick={() => openListWithSort("name")}>가나다순</button>

            <button
              className={`chip chip--dropdown ${isDeptActive ? "chip--active" : ""}`}
              onClick={() => {
                if (mode === "dept") setMode("list");
                else if (deptFilter) { setDeptFilter(null); setMode("list"); }
                else setMode("dept");
              }}
            >
              {deptChipText}
              <img src="/arrow-down.svg" alt="" className={`arrow-icon ${mode === "dept" ? "rotated" : ""}`} />
            </button>

            <button
              className={`chip chip--dropdown ${isHoursActive ? "chip--active" : ""}`}
              onClick={() => {
                if (mode === "hours") setMode("list");
                else if (hoursFilter) { setHoursFilter(null); setMode("list"); }
                else setMode("hours");
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
                {["내과","정형외과","일반외과","치과","안과","영상의학","예방의학","수의학","건강검진"].map((d) => (
                  <button
                    key={d}
                    className={`dept-chip ${deptFilter === d ? "on" : ""}`}
                    onClick={() => { setDeptFilter(prev => prev === d ? null : d); setMode("list"); }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}

            {mode === "hours" && (
              <div className="hours-filter">
                <button className={`hours-chip ${hoursFilter === "open" ? "on" : ""}`} onClick={() => setHoursFilter(prev => prev === "open" ? null : "open")}>영업중</button>
                <button className={`hours-chip ${hoursFilter === "closed" ? "on" : ""}`} onClick={() => setHoursFilter(prev => prev === "closed" ? null : "closed")}>영업종료</button>
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

                  return (
                    <div
                      key={h.id}
                      className={`hospital-card ${isSelected ? "is-selected" : ""}`}
                      onClick={() => {
                        setSelectedId(h.id);
                        const mk = markersRef.current[h.id];
                        if (mk && map) {
                          const pos = mk.getPosition();
                          map.setCenter(pos as naver.maps.Coord);
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
                        <button className="icon-btn" onClick={(e) => { e.stopPropagation(); openDirections(h); }} aria-label="길찾기" title="길찾기">
                          <img src="/Location/direction-icon.svg" alt="길찾기" />
                        </button>
                        <button className="icon-btn" onClick={(e) => { e.stopPropagation(); toggleBookmark(h.id); }} aria-label="북마크" title="북마크">
                          <img src={bookmarked.includes(h.id) ? "/Location/bookmark-on.svg" : "/Location/bookmark-off.svg"} alt="북마크" />
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
