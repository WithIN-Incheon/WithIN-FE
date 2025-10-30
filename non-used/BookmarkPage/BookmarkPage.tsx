import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../../src/components/Header/Header";
import BottomBar from "../../src/components/BottomBar/BottomBar";
import { HOSPITALS, type Hospital } from "../../src/pages/LocationPage/hospitals";
import "./BookmarkPage.css";

type SortKey = "distance" | "alpha";
type UnknownRecord = Record<string, unknown>;

/** 즐겨찾기 로컬스토리지 키 후보(호환) */
const FAV_KEYS = [
  "bookmarkedHospitals",
  "favHospitalIds",
  "bookmarks",
  "favorites",
  "favIds",
];

/** 안전한 동적 접근 */
const asObj = (v: unknown): UnknownRecord | null =>
  v && typeof v === "object" ? (v as UnknownRecord) : null;

/** 병원 기본 정보 추출 */
function getId(h: Hospital): string {
  const o = asObj(h);
  const id = o?.id;
  if (typeof id === "string" || typeof id === "number") return String(id);
  const nm = o?.name;
  return typeof nm === "string" ? nm : "unknown";
}
function getName(h: Hospital): string {
  const o = asObj(h);
  return typeof o?.name === "string" ? o.name : "";
}
function pickString(obj: UnknownRecord, keys: readonly string[], fallback = ""): string {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim()) return v;
  }
  return fallback;
}
function getAddress(h: Hospital): string {
  const o = asObj(h) ?? {};
  // roadAddress 우선, 없으면 addr / address 순
  return pickString(o, ["roadAddress", "addr", "address"], "주소 정보 없음");
}
function getDept(h: Hospital): string {
  const o = asObj(h) ?? {};
  const s = pickString(o, ["dept", "department", "category"], "");
  return s.replace(/[()]/g, "") || "진료과 정보 없음";
}
function hasCoords(h: Hospital): h is Hospital & { lat: number; lng: number } {
  const o = asObj(h);
  return typeof o?.lat === "number" && typeof o?.lng === "number";
}
function getLatLng(h: Hospital): { lat: number; lng: number } | null {
  if (!hasCoords(h)) return null;
  const o = asObj(h)!;
  return { lat: o.lat as number, lng: o.lng as number };
}

/** 거리(m) */
function distanceMeter(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371e3;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

/** 네이버 지도 검색 */
function openNaverSearch(addr: string, name?: string) {
  const q = name ? `${name} ${addr}` : addr;
  window.open(`https://map.naver.com/v5/search/${encodeURIComponent(q)}`, "_blank");
}

/** 배열/맵 모두 파싱 */
function parseIds(val: unknown): string[] {
  if (!val) return [];
  try {
    const data = typeof val === "string" ? JSON.parse(val) : val;
    if (Array.isArray(data)) return data.map((v) => String(v)); // 배열
    if (typeof data === "object" && data !== null) {
      // 맵 { "123": true }
      return Object.entries(data)
        .filter(([, v]) => Boolean(v))
        .map(([k]) => String(k));
    }
    return [];
  } catch {
    // malformed JSON or unexpected structure
    return [];
  }
}

/** 즐겨찾기 로드/저장 */
function loadFavIds(): string[] {
  for (const key of FAV_KEYS) {
    const raw = localStorage.getItem(key);
    const ids = parseIds(raw);
    if (ids.length) return ids;
  }
  return [];
}
function saveFavIds(ids: string[]) {
  localStorage.setItem(FAV_KEYS[0], JSON.stringify(ids));
}

export default function BookmarkPage() {
  const [sortKey, setSortKey] = useState<SortKey>("distance");
  const [myPos, setMyPos] = useState<{ lat: number; lng: number } | null>(null);
  const [favIds, setFavIds] = useState<string[]>([]);
  const [openMenuFor, setOpenMenuFor] = useState<string | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);

  // 최초 로드
  useEffect(() => {
    setFavIds(loadFavIds());
  }, []);

  // 다른 탭/페이지 변경 반영
  useEffect(() => {
    const onStorage = () => setFavIds(loadFavIds());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // 현재 위치
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setMyPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setMyPos(null),
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, []);

  // 바깥 클릭 시 메뉴 닫기
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!menuRef.current.contains(e.target)) setOpenMenuFor(null);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // 즐겨찾기 병원 리스트
  const favHospitals = useMemo<Hospital[]>(() => {
    if (!favIds.length) return [];
    const index = new Map<string, Hospital>(HOSPITALS.map((h) => [getId(h), h]));
    return favIds.map((id) => index.get(id)).filter((x): x is Hospital => Boolean(x));
  }, [favIds]);

  // 정렬
  const sortedList = useMemo(() => {
    const list = [...favHospitals];
    if (sortKey === "distance" && myPos) {
      list.sort((a, b) => {
        const ca = getLatLng(a);
        const cb = getLatLng(b);
        if (ca && cb) return distanceMeter(myPos, ca) - distanceMeter(myPos, cb);
        if (ca) return -1;
        if (cb) return 1;
        return getName(a).localeCompare(getName(b), "ko");
      });
    } else {
      list.sort((a, b) => getName(a).localeCompare(getName(b), "ko"));
    }
    return list;
  }, [favHospitals, sortKey, myPos]);

  // 북마크 해제(삭제)
  function removeFavorite(id: string) {
    setFavIds((prev) => {
      const next = prev.filter((x) => x !== id);
      saveFavIds(next);
      return next;
    });
  }

  return (
    <div className="bm-page">
      <Header title="기관 즐겨찾기" />

      <div className="bm-content">
        {/* 정렬 칩: 클릭된(활성) 것만 파란계열 */}
        <div className="bm-tabs">
          <button
            className={`bm-tab ${sortKey === "distance" ? "active" : ""}`}
            onClick={() => setSortKey("distance")}
            aria-pressed={sortKey === "distance"}
          >
            거리순
          </button>
          <button
            className={`bm-tab ${sortKey === "alpha" ? "active" : ""}`}
            onClick={() => setSortKey("alpha")}
            aria-pressed={sortKey === "alpha"}
          >
            가나다순
          </button>
        </div>

        {/* 구분선: width 90%, #F8F8F8, 1px */}
        <div className="bm-sep" />

        <ul className="bm-list" ref={menuRef}>
          {sortedList.map((h) => {
            const id = getId(h);
            const name = getName(h);
            const addr = getAddress(h);
            const dept = getDept(h);
            const isMenuOpen = openMenuFor === id;

            return (
              <li key={id} className="bm-item">
                {/* 본문(길찾기) */}
                <button
                  className="bm-item-body"
                  onClick={() => openNaverSearch(addr, name)}
                  aria-label={`${name} 길찾기`}
                >
                  <div className="bm-title">{name}</div>
                  <div className="bm-sub">
                    <span className="bm-dept">{dept}</span>
                    <span className="bm-bar">   |   </span>
                    <span className="bm-addr">{addr}</span>
                  </div>
                </button>

                {/* 플러스 아이콘 (우측 36px) */}
                <button
                  className={`bm-plus ${isMenuOpen ? "open" : ""}`}
                  aria-label="메뉴 열기"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuFor((prev) => (prev === id ? null : id));
                  }}
                >
                  {/* plus 아이콘 */}
                  <span className="bm-plus-v" />
                  <span className="bm-plus-h" />
                </button>

                {/* 플러스 클릭 시 우측에 삭제 버튼 노출 */}
                {isMenuOpen && (
                  <div className="bm-action">
                    <button
                      className="bm-del"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFavorite(id);
                        setOpenMenuFor(null);
                      }}
                      aria-label="북마크 해제"
                    >
                      삭제
                    </button>
                  </div>
                )}

                {/* 아이템 구분선 (마지막 아래에도 보여야 하므로 각 아이템에 존재) */}
                <div className="bm-item-sep" />
              </li>
            );
          })}

          {!sortedList.length && (
            <li className="bm-empty">저장된 즐겨찾기가 없습니다.</li>
          )}
        </ul>

        {/* 리스트 마지막 하단 구분선(요청: 마지막 의료재단 아래에도 있어야 함) */}
        <div className="bm-end-sep" />
      </div>

      <BottomBar />
    </div>
  );
}
