// 기능 구분: 상세 페이지 렌더
import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import { CASE_DETAILS } from "./detail";
import { isFav, toggleFav } from "./fav";
import "./CaseDetailPage.css";

type LocationState = { state?: { title?: string } };

// 기능 구분: 문자열/HTML/배열을 <p> 라인 배열로 변환
function toLines(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input.map((s) => String(s).trim()).filter(Boolean);
  }
  const s = String(input ?? "").trim();
  if (!s) return [];

  // <li>...</li> 추출
  const liMatches = [...s.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) =>
    m[1]
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
  );
  if (liMatches.length) return liMatches.filter(Boolean);

  // 줄바꿈/세미콜론 등으로 분리
  const cleaned = s
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "");
  const parts = cleaned
    .split(/\r?\n|·|•|;|，|、/g)
    .map((t) => t.trim())
    .filter(Boolean);
  return parts.length ? parts : [cleaned.trim()];
}

export default function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const caseId = Number(id);
  const loc = useLocation() as unknown as LocationState;

  const [fav, setFav] = useState<boolean>(isFav(caseId));
  useEffect(() => {
    setFav(isFav(caseId));
  }, [caseId]);

  const title = loc?.state?.title ?? CASE_DETAILS[caseId]?.title ?? "사례";

  // 기능 구분: 섹션 데이터 정규화
  const summaryHTML = CASE_DETAILS[caseId]?.summary ?? "";
  const situationLines = useMemo(
    () => toLines(CASE_DETAILS[caseId]?.situation),
    [caseId]
  );
  const factsLines = useMemo(
    () => toLines(CASE_DETAILS[caseId]?.facts),
    [caseId]
  );
  const decisionLines = useMemo(
    () => toLines(CASE_DETAILS[caseId]?.decision),
    [caseId]
  );
  const lawLines = useMemo(
    () => toLines(CASE_DETAILS[caseId]?.laws),
    [caseId]
  );

  return (
    <div className={`case-detail-page ${fav ? "is-fav" : ""}`}>
      <Header
        title={title}
        showBack
        showBookmark
        bookmarkIconSrc={fav ? "/star-on.svg" : "/star-off.svg"}
        onBookmarkClick={() => setFav(toggleFav(caseId).includes(caseId))}
        showSearch={false}
      />

      <div className="case-detail-content">
        {/* 1. 사건 개요 */}
        <section className="card first-card">
          <h2 className="num-title">1. 사건 개요 📌</h2>
          <div
            className="summary"
            dangerouslySetInnerHTML={{ __html: summaryHTML }}
          />
        </section>

        {/* 2. 사고 발생 경위 */}
        <section className="sec sec-2">
          <h2 className="num-title">2. 사고 발생 경위</h2>
          <div className="body bullets">
            {situationLines.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        </section>

        {/* 3. 사실관계 및 조사 내용 */}
        <section className="sec sec-3">
          <h2 className="num-title">3. 사실관계 및 조사 내용</h2>
          <div className="body bullets">
            {factsLines.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        </section>

        {/* 4. 판정 요지 */}
        <section className="sec sec-4">
          <h2 className="num-title">4. 판정 요지</h2>
          <div className="body bullets">
            {decisionLines.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        </section>

        {/* 5. 관계 법령 */}
        {lawLines.length > 0 && (
          <section className="sec sec-5">
            <h2 className="num-title">5. 관계 법령</h2>
            <div className="body bullets">
              {lawLines.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
          </section>
        )}
      </div>

      <BottomBar />
    </div>
  );
}
