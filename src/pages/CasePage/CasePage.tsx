import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import { CASES, type CaseItem, type CaseKind } from "./cases";
import { useLocalization } from "../../contexts/LocalizationContext";
import "./CasePage.css";

type DisplayCaseItem = CaseItem & { displayTitle: string };

export default function CasePage() {
  const { t } = useLocalization();
  const [tab, setTab] = useState<CaseKind>("accident");
  const [filter, setFilter] = useState<string>(t("entire"));
  const [search, setSearch] = useState<string>("");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  const filterOptions: Record<CaseKind, string[]> = {
    accident: [t("entire"), "exampleWhileWork", "exampleWhileGo", "exampleWhileEvents", "exampleWhileCrime", "exampleWhileNone", "exampleOtherAccident"],
    disease: [t("entire"), "exampleWhileSick"],
  };

  const translateTitle = (titleKey: string) => {
    try {
      const translated = t(titleKey as any);
      return translated !== titleKey ? translated : titleKey;
    } catch {
      return titleKey;
    }
  };

  // 필터 + 검색 적용
  const list = useMemo<DisplayCaseItem[]>(() => {
    const all = CASES.filter((c) => c.kind === tab).map((item) => ({
      ...item,
      displayTitle: translateTitle(item.title),
    }));

    const filtered =
      filter === t("entire") ? all : all.filter((c) => c.tag === filter);

    if (!search) return filtered;
    const keyword = search.trim().toLowerCase();
    if (!keyword) return filtered;

    return filtered.filter((c) =>
      c.displayTitle.toLowerCase().includes(keyword)
    );
  }, [tab, filter, search, t]);

  const goDetail = (id: number, title: string) => {
    nav(`/cases/${id}`, { state: { title } });
  };

  const getTagDisplay = (tag: string) => {
    // 번역 키로 시작하면 번역, 아니면 그대로 반환
    if (tag.startsWith("example")) {
      return t(tag as any);
    }
    return tag;
  };

  const filterLabel =
    filter === t("entire")
      ? tab === "accident"
        ? t("exampleAccident")
        : t("kindDisease")
      : getTagDisplay(filter);

  return (
    <div className="case-page">
      <Header
        title={t("mainSearch")}
        showSearch
        onSearchClick={() => setSearchOpen((prev) => !prev)}
      />

      <div className="case-content">
        {/* 검색창 토글 */}
        {searchOpen && (
          <input
            type="text"
            className="case-search-input"
            placeholder={t("exampleSearch")}
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
              setFilter(t("entire"));
              setSearch("");
            }}
          >
            {t("applyAccident")}
          </button>
          <button
            className={`tab-btn ${tab === "disease" ? "is-active" : ""}`}
            type="button"
            onClick={() => {
              setTab("disease");
              setFilter(t("entire"));
              setSearch("");
            }}
          >
            {t("applySick")}
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
                  {getTagDisplay(opt)}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 리스트 */}
        {list.length === 0 ? (
          <div className="case-empty">{t("nocase")}</div>
        ) : (
          <ul className="case-list">
            {list.map((c) => (
              <li key={c.id} className="case-row">
                <div className="case-title-line">
                  <button
                    className="title"
                    onClick={() => goDetail(c.id, c.displayTitle)}
                  >
                    {c.displayTitle}
                  </button>
                </div>

                <div className="case-meta">
                  <span className="approval">{t(c.approval as any)}</span>
                  <span className="tag">{getTagDisplay(c.tag)}</span>
                </div>

                <img
                  className="arrow"
                  src="/arrow-gray.svg"
                  alt="자세히"
                  onClick={() => goDetail(c.id, c.displayTitle)}
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
