import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOSPITALS } from "../../src/pages/LocationPage/hospitals";
import "./SearchPage.css";

type HistoryItem = { id: string; term: string; ts: number };
const STORAGE_KEY = "loSearchHistory";

function loadHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
function saveHistory(list: HistoryItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
function formatMD(ts: number) {
  const d = new Date(ts);
  return `${d.getMonth() + 1}.${d.getDate()}`;
}

export default function SearchPage() {
  const nav = useNavigate();
  const location = useLocation() as { state?: { initial?: string } | null };

  const [q, setQ] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  // Location에서 넘어온 초기값 프리필 (있을 때만)
  useEffect(() => {
    if (typeof location.state?.initial === "string") {
      setQ(location.state.initial);
    }
  }, [location.state?.initial]);


  const gotoLocation = (term: string, focusId?: string) => {
    nav("/location", {
        replace: true,
        state: {
        fromSearch: true,
        keyword: term,    
        ...(focusId ? { focusId } : null),
        forceList: true,  
        },
    });
  };

  const runSearch = (term: string) => {
    // 기록 저장
    const item: HistoryItem = { id: crypto.randomUUID(), term, ts: Date.now() };
    const next = [item, ...history];
    setHistory(next);
    saveHistory(next);

    // 병원명/주소 부분 매칭 
    const found = HOSPITALS.find(
      (h) => h.name.includes(term) || h.address.includes(term)
    );

    setNoResult(!found && term.length > 0);

    // 매칭이 없어도 Location으로 이동해 필터 결과를 보여준다
    gotoLocation(term, found?.id);
  };

  const handleSearch = () => {
    const term = q.trim();
    // 빈칸 검색도 허용 → 전체 노출을 위해 keyword: ""
    if (term.length === 0) {
      setNoResult(false);
      gotoLocation("");
      return;
    }
    runSearch(term);
    setQ(""); // 제출 후 입력값 초기화
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const clearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  const recentList = useMemo(() => history, [history]);

  return (
    <div className="search-page">
      {/* 검색바 */}
      <div className="bm-searchbar">
        <button className="bm-back" aria-label="뒤로가기" onClick={() => nav(-1)}>
          <img src="/Location/arrow-back_gray.svg" alt="" />
        </button>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="장소 검색"
          aria-label="장소 검색"
        />
        <button className="bm-search" aria-label="검색" onClick={handleSearch}>
          <img src="/Location/search-icon.svg" alt="검색" />
        </button>
      </div>

      {/* 즐겨찾기 텍스트 이미지 */}
      <button
        className="bm-bookmark-link"
        onClick={() => nav("/location/bookmark")}
        aria-label="즐겨찾기 이동"
      >
        <img src="/Location/bookmark-text.svg" alt="즐겨찾기" />
      </button>

      {/* 구분선 */}
      <div className="bm-sep" />

      {/* 최근검색 */}
      <div className="bm-recent">
        <div className="bm-recent-title">최근검색</div>

        {noResult && <div className="bm-noresult">검색 결과 없습니다.</div>}

        {recentList.length === 0 ? (
          <div className="bm-empty">최근 검색 기록이 없습니다.</div>
        ) : (
          <ul className="bm-recent-list">
            {recentList.map((it) => (
              <li
                key={it.id}
                className="bm-recent-item"
                onClick={() => runSearch(it.term)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && runSearch(it.term)}
              >
                <img className="bm-recent-icon" src="/Location/search-icon.svg" alt="" />
                <span className="bm-recent-term">{it.term}</span>
                <span className="bm-recent-date">{formatMD(it.ts)}</span>
              </li>
            ))}
          </ul>
        )}

        <button className="bm-clear" onClick={clearHistory}>
          검색기록 삭제
        </button>
      </div>

      <div className="bm-kb-spacer" />
    </div>
  );
}
