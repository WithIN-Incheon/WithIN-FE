import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import { CASES, type CaseItem, type CaseKind } from "./cases";
import { toggleFav } from "./fav";
import "./CasePage.css";

export default function CasePage() {
  const [favorites, setFavorites] = useState<number[]>(
    () => (JSON.parse(localStorage.getItem("case_favs_v1") || "[]") ?? [])
  );
  const [tab, setTab] = useState<CaseKind>("accident"); // "accident" | "disease"
  const nav = useNavigate();

  const list = useMemo<CaseItem[]>(
    () => CASES.filter((c) => c.kind === tab),
    [tab]
  );

  const handleToggleFav = (id: number) => {
    setFavorites(toggleFav(id));
  };

  const goDetail = (id: number, title: string) => {
    nav(`/cases/${id}`, { state: { title } });
  };

  const filterLabel = tab === "accident" ? "사고 유형" : "질병 유형";

  return (
    <div className="case-page">
      <Header
        title="사례 검색"
        showSearch
        onSearchClick={() => {
          /* 검색 페이지 라우팅 연결 예정 */
        }}
      />

      {/* 문서 스크롤: sticky 해제, 일반 flow */}
      <div className="case-content">
        {/* 상단 영역(탭 + 필터) - 이제 고정 아님 */}
        <div className="case-fixed">
          <div className="case-tabs">
            <button
              className={`tab-btn ${tab === "accident" ? "is-active" : ""}`}
              type="button"
              onClick={() => setTab("accident")}
            >
              업무상 사고
            </button>
            <button
              className={`tab-btn ${tab === "disease" ? "is-active" : ""}`}
              type="button"
              onClick={() => setTab("disease")}
            >
              업무상 질병
            </button>
          </div>

          <button className="case-filter-pill" type="button">
            <span className="case-filter-label">{filterLabel}</span>
            <img src="/arrow-down.svg" alt="열기" />
          </button>
        </div>

        {/* 리스트 */}
        {list.length === 0 ? (
          <div className="case-empty">해당 탭에 표시할 사례가 없습니다.</div>
        ) : (
          <ul className="case-list">
            {list.map((c) => {
              const fav = favorites.includes(c.id);
              return (
                <li key={c.id} className="case-row">
                  <div className="case-title-line">
                    <button className="title" onClick={() => goDetail(c.id, c.title)}>
                      {c.title}
                    </button>
                    <img
                      className="star"
                      src={fav ? "/star-on.svg" : "/star-off.svg"}
                      alt={fav ? "즐겨찾기 해제" : "즐겨찾기"}
                      onClick={() => handleToggleFav(c.id)}
                    />
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
              );
            })}
          </ul>
        )}
      </div>

      <BottomBar />
    </div>
  );
}
