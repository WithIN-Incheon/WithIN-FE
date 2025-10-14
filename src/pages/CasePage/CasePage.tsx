import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import { CASES, type CaseItem, type CaseKind } from "./cases";
import "./CasePage.css";

export default function CasePage() {
  const [tab, setTab] = useState<CaseKind>("accident");
  const [filter, setFilter] = useState<string>("전체");
  const [search, setSearch] = useState<string>("");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  const filterOptions: Record<CaseKind, string[]> = {
    accident: ["전체", "업무수행 중의 사고", "출퇴근 중의 사고", "행사 중의 사고", "근로자 범죄행위", "비업무 관련 행위"],
    disease: ["전체", "업무상 질병"],
  };

  // 필터 + 검색 적용
  const list = useMemo<CaseItem[]>(() => {
    const all = CASES.filter((c) => c.kind === tab);
    const filtered = filter === "전체" ? all : all.filter((c) => c.tag === filter);
    if (!search) return filtered;
    return filtered.filter((c) => c.title.includes(search));
  }, [tab, filter, search]);

  const goDetail = (id: number, title: string) => {
    nav(`/cases/${id}`, { state: { title } });
  };

  const filterLabel =
    filter === "전체"
      ? tab === "accident"
        ? "사고 유형"
        : "질병 유형"
      : filter;

  return (
    <div className="case-page">
      <Header
        title="사례 검색"
        showSearch
        onSearchClick={() => setSearchOpen((prev) => !prev)}
      />

      <div className="case-content">
        {/* 검색창 토글 */}
        {searchOpen && (
          <input
            type="text"
            className="case-search-input"
            placeholder="사례 제목 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}

        {/* 탭 */}
        <div className="case-tabs">
          <button
            className={`tab-btn ${tab === "accident" ? "is-active" : ""}`}
            type="button"
            onClick={() => {
              setTab("accident");
              setFilter("전체");
              setSearch("");
            }}
          >
            업무상 사고
          </button>
          <button
            className={`tab-btn ${tab === "disease" ? "is-active" : ""}`}
            type="button"
            onClick={() => {
              setTab("disease");
              setFilter("전체");
              setSearch("");
            }}
          >
            업무상 질병
          </button>
        </div>

        {/* 필터 영역 */}
        <div className="case-filter-area">
          <button
            className="case-filter-pill"
            type="button"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="case-filter-label">{filterLabel}</span>
            <svg
              className={`arrow-icon ${open ? "open" : ""}`}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 16L6 10H18L12 16Z" fill="currentColor"/>
            </svg>
          </button>

          {open && (
            <ul className="case-filter-dropdown">
              {filterOptions[tab].map((opt) => (
                <li
                  key={opt}
                  className={`filter-item ${filter === opt ? "is-selected" : ""}`}
                  onClick={() => {
                    setFilter(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 리스트 */}
        {list.length === 0 ? (
          <div className="case-empty">해당 조건의 사례가 없습니다.</div>
        ) : (
          <ul className="case-list">
            {list.map((c) => (
              <li key={c.id} className="case-row">
                <div className="case-title-line">
                  <button
                    className="title"
                    onClick={() => goDetail(c.id, c.title)}
                  >
                    {c.title}
                  </button>
                </div>

                <div className="case-meta">
                  <span className="approval">{c.approval}</span>
                  <span className="tag">{c.tag}</span>
                </div>

                <img
                  className="arrow"
                  src="/arrow-gray.svg"
                  alt="자세히"
                  onClick={() => goDetail(c.id, c.title)}
                />
                <div className="divider" />
              </li>
            ))}
          </ul>
        )}
      </div>

      <BottomBar />
    </div>
  );
}
