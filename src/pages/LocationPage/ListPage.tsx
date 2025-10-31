import { useState, useMemo } from "react";
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import { HOSPITALS } from "./hospitals";
import "./ListPage.css";

// 요일별 영업시간 텍스트 생성
function getWeeklyHoursText(hours: any): string {
  if (!hours || !hours.byDay) return "(정보없음)";

  const texts: string[] = [];
  const sat = hours.byDay[6];
  const sun = hours.byDay[0];

  // 토요일이 존재하고 18시 이전 종료 시
  if (sat) {
    const cH = Number(sat.close.split(":")[0]);
    if (cH < 18) texts.push(`토요일 ${sat.close} 종료`);
  }

  // 일요일 체크
  if (!sun) {
    texts.push("일요일 휴무");
  } else {
    const cH = Number(sat.close.split(":")[0]);
    if (cH < 18) texts.push(`일요일 ${sun.close} 종료`);
  }

  // 위 조건에 해당 없으면 오늘 기준 표시
  if (texts.length === 0) {
    const today = new Date().getDay();
    const todayH = hours.byDay[today];
    if (!todayH) texts.push("(휴무)");
    else texts.push(`(${todayH.open}-${todayH.close})`);
  }

  return texts.join(", ");
}

// 현재 영업중 여부 판단
function isOpenNow(hours: any): boolean {
  if (!hours || !hours.byDay) return false;

  const now = new Date();
  const day = now.getDay();
  const todayHours = hours.byDay[day];

  // 휴무(C 또는 null)
  if (!todayHours) return false;

  const [oH, oM] = todayHours.open.split(":").map(Number);
  const [cH, cM] = todayHours.close.split(":").map(Number);
  const openMin = oH * 60 + oM;
  const closeMin = cH * 60 + cM;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  return currentMinutes >= openMin && currentMinutes < closeMin;
}

// 오늘 요일 영업시간 텍스트
function getTodayHours(hours: any): string {
  if (!hours || !hours.byDay) return "(정보없음)";
  const day = new Date().getDay();
  const todayHours = hours.byDay[day];
  if (!todayHours) return "(휴무)";
  return `(${todayHours.open}-${todayHours.close})`;
}

export default function ListPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<"list" | "region" | "dept" | "hours">("list");

  const [regionFilter, setRegionFilter] = useState<string | null>(null);
  const [deptFilter, setDeptFilter] = useState<string | null>(null);
  const [hoursFilter, setHoursFilter] = useState<"open" | "closed" | null>(null);

  const [keyword, setKeyword] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const regionChipText = regionFilter || "자치구";
  const deptChipText = deptFilter || "진료과목";
  const hoursChipText = hoursFilter
    ? hoursFilter === "open"
      ? "영업중"
      : "영업종료"
    : "영업시간";

  const isRegionActive = !!regionFilter;
  const isDeptActive = !!deptFilter;
  const isHoursActive = !!hoursFilter;

  // === 필터링 로직 ===
  const filteredHospitals = useMemo(() => {
    return HOSPITALS.filter((h) => {
      let ok = true;
      if (regionFilter && !h.address.includes(regionFilter)) ok = false;
      if (deptFilter && !h.dept.includes(deptFilter)) ok = false;
      if (hoursFilter === "open" && !isOpenNow(h.hours)) ok = false;
      if (hoursFilter === "closed" && isOpenNow(h.hours)) ok = false;
      if (keyword && !(h.name.includes(keyword) || h.address.includes(keyword))) ok = false;
      return ok;
    });
  }, [regionFilter, deptFilter, hoursFilter, keyword]);

  return (
    <div className="list-page">
      <Header
        title="산재 의료기관 리스트"
        showBack
        showSearch
        onSearchClick={() => setShowSearch((p) => !p)}
      />

      {/* 🔍 검색창 */}
      {showSearch && (
        <div className="loc-searchbar">
          <input
            className="loc-searchbar_input"
            placeholder="의료기관명 또는 주소 검색"
            aria-label="주소 또는 의료기관 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      )}

      {/* 필터바 */}
      <div className="loc-filterbar in-sheet">
        <button
          className={`chip chip--dropdown ${isRegionActive ? "chip--active" : ""}`}
          onClick={() => {
            if (mode === "region") setMode("list");
            else if (regionFilter) {
              setRegionFilter(null);
              setMode("list");
            } else setMode("region");
          }}
        >
          {regionChipText}
          <img
            src="/arrow-down.svg"
            alt=""
            className={`arrow-icon ${mode === "region" ? "rotated" : ""}`}
          />
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
          <img
            src="/arrow-down.svg"
            alt=""
            className={`arrow-icon ${mode === "dept" ? "rotated" : ""}`}
          />
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
          <img
            src="/arrow-down.svg"
            alt=""
            className={`arrow-icon ${mode === "hours" ? "rotated" : ""}`}
          />
        </button>
      </div>

      {/* 자치구 선택 */}
      {mode === "region" && (
        <div className="region-grid">
          {["중구", "미추홀구", "부평구", "남동구", "연수구", "서구", "계양구"].map((r) => (
            <button
              key={r}
              className={`region-chip ${regionFilter === r ? "on" : ""}`}
              onClick={() => {
                setRegionFilter((prev) => (prev === r ? null : r));
                setMode("list");
              }}
            >
              {r}
            </button>
          ))}
        </div>
      )}

      {/* 진료과목 선택 */}
      {mode === "dept" && (
        <div className="dept-grid">
          {[
            "내과/가정의학과",
            "정형외과",
            "재활/물리치료",
            "정신과",
            "치과",
            "한방",
            "요양",
            "특수외과",
            "종합",
            "의원",
            "기타",
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

      {/* 영업시간 선택 */}
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

      {/* 병원 리스트 */}
      <div className="hospital-list">
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((h) => {
            const isSelected = selectedId === h.id;
            const open = isOpenNow(h.hours);
            const todayHours = getTodayHours(h.hours);

            return (
              <div
                key={h.id}
                className={`hospital-card ${isSelected ? "is-selected" : ""}`}
                onClick={() => setSelectedId(h.id)}
              >
                <div className="hospital-header">
                  <span className="hospital-name">{h.name}</span>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(h.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-icon"
                  >
                    <img src="/Location/view-button.svg" alt="link" />
                  </a>
                </div>

                <div className="hospital-dept">{h.dept}</div>
                <div className="hospital-info">
                  <div>
                    <span className={open ? "status-open" : "status-closed"}>
                      {open ? "영업중" : "영업종료"}
                    </span>
                    &nbsp;{todayHours} / {getWeeklyHoursText(h.hours)}
                  </div>
                  <div>{h.address}</div>
                  <div className="phone">☎ {h.phone}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-result">해당 조건의 의료기관이 없습니다.</div>
        )}
      </div>

      <BottomBar />
    </div>
  );
}
