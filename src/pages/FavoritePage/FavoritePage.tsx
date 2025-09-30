// 기능: 즐겨찾기 목록
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import { CASES, type CaseItem } from "../CasePage/cases";
import { toggleFav } from "../CasePage/fav";
import "./FavoritePage.css";

const FAV_KEY = "case_favs_v1";

export default function FavoritePage() {
  const nav = useNavigate();

  // 즐겨찾기 로드
  const [favorites, setFavorites] = useState<number[]>(
    () => (JSON.parse(localStorage.getItem(FAV_KEY) || "[]") ?? [])
  );

  // 즐겨찾기 필터된 리스트
  const list = useMemo<CaseItem[]>(
    () => CASES.filter((c) => favorites.includes(c.id)),
    [favorites]
  );

  // 즐겨찾기 토글
  const handleToggleFav = (id: number) => {
    setFavorites(toggleFav(id)); // off 되면 목록에서 바로 제거됨
  };

  // 상세 이동
  const goDetail = (id: number, title: string) => {
    nav(`/cases/${id}`, { state: { title } });
  };

  return (
    <div className="bookmark-page">
      <Header title="즐겨찾기" showBack />

      {/* 본문 */}
      <div className="bookmark-content">
        {list.length === 0 ? (
          <div className="empty">
            즐겨찾기한 사례가 없습니다.
          </div>
        ) : (
          <ul className="case-list">
            {list.map((c) => (
              <li key={c.id} className="case-row">
                <div className="case-title-line">
                  <button className="title" onClick={() => goDetail(c.id, c.title)}>
                    {c.title}
                  </button>
                  <img
                    className="star"
                    src={"/star-on.svg"}
                    alt="즐겨찾기 해제"
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
            ))}
          </ul>
        )}
      </div>

      <BottomBar />
    </div>
  );
}
