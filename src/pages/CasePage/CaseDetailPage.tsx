// 기능 구분: 상세 페이지 렌더
import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import { CASE_DETAILS } from "./detail";
import { isFav, toggleFav } from "./fav";
import { useLocalization } from "../../contexts/LocalizationContext";
import "./CaseDetailPage.css";

type LocationState = { state?: { title?: string } };

// 케이스 번호를 영어 숫자로 변환 (1 → "one", 2 → "two", ...)
function getCaseNumberName(num: number): string {
  const names: Record<number, string> = {
    1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven",
    8: "eight", 9: "nine", 10: "ten", 11: "eleven", 12: "twelve", 13: "thirteen",
    14: "fourteen", 15: "fifteen", 16: "sixteen", 17: "seventeen", 18: "eighteen",
    19: "nineteen", 20: "twenty", 21: "twentyone", 22: "twentytwo", 23: "twentythree",
    24: "twentyfour", 25: "twentyfive", 26: "twentysix", 27: "twentyseven",
    28: "twentyeight", 29: "twentynine", 30: "thirty", 31: "thirtyone",
    32: "thirtytwo", 33: "thirtythree", 34: "thirtyfour", 35: "thirtyfive"
  };
  return names[num] || String(num);
}

// 번역 키로 번역을 시도하고, 없으면 원본 반환
function tryTranslate(t: (key: any) => string, key: string, fallback?: string): string {
  try {
    const translated = t(key);
    // 번역 키가 없으면 원본 키가 반환되므로, 원본과 다르면 번역된 것으로 간주
    return translated !== key ? translated : (fallback || key);
  } catch {
    return fallback || key;
  }
}

// 번역 키 배열 또는 원본 텍스트를 번역된 라인 배열로 변환
function translateField(
  input: string | string[] | undefined,
  t: (key: any) => string
): string[] {
  if (!input) return [];
  
  // 배열인 경우: 각 요소가 번역 키로 간주
  if (Array.isArray(input)) {
    return input
      .map((key) => tryTranslate(t, key))
      .filter(Boolean);
  }
  
  // 문자열인 경우: 번역 키인지 확인
  const str = String(input).trim();
  if (!str) return [];
  
  // 번역 키로 시도 (번역 키는 보통 언더스코어나 특정 패턴을 가짐)
  // 번역 키가 아니면 원본 텍스트를 HTML 파싱하여 라인으로 분리
  const translated = tryTranslate(t, str, str);
  
  // 번역된 결과가 원본과 다르면 번역된 것으로 간주 (단일 라인)
  if (translated !== str) {
    return [translated];
  }
  
  // 원본 텍스트인 경우 HTML 파싱하여 라인으로 분리
  // <li>...</li> 추출
  const liMatches = [...str.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) =>
    m[1]
      .replace(/<br\s*\/?>/gi, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
  );
  if (liMatches.length) return liMatches.filter(Boolean);

  // 줄바꿈/세미콜론 등으로 분리
  const cleaned = str
    .replace(/<br\s*\/?>/gi, "")
    .replace(/<[^>]+>/g, "");
  const parts = cleaned
    .split(/\?|·|•|;|，|、/g)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length ? parts : [cleaned.trim()];
}

export default function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const caseId = Number(id);
  const loc = useLocation() as unknown as LocationState;
  const { t } = useLocalization();

  const [fav, setFav] = useState<boolean>(isFav(caseId));
  useEffect(() => {
    setFav(isFav(caseId));
  }, [caseId]);

  // 제목 번역: 번역 키 배열이면 첫 번째 요소 사용, 아니면 단일 값
  const titleField = CASE_DETAILS[caseId]?.title;
  const title = useMemo(() => {
    if (loc?.state?.title) return loc.state.title;
    if (Array.isArray(titleField)) {
      return tryTranslate(t, titleField[0], titleField[0]);
    }
    return tryTranslate(t, titleField || "사례", titleField || "사례");
  }, [caseId, titleField, loc?.state?.title, t]);

  // 섹션 데이터 정규화 (번역 적용)
  const summaryLines = useMemo(
    () => translateField(CASE_DETAILS[caseId]?.summary, t),
    [caseId, t]
  );
  const situationLines = useMemo(
    () => translateField(CASE_DETAILS[caseId]?.situation, t),
    [caseId, t]
  );
  const factsLines = useMemo(
    () => translateField(CASE_DETAILS[caseId]?.facts, t),
    [caseId, t]
  );
  const importantLines = useMemo(
    () => translateField(CASE_DETAILS[caseId]?.important, t),
    [caseId, t]
  );
  const decisionLines = useMemo(
    () => translateField(CASE_DETAILS[caseId]?.decision, t),
    [caseId, t]
  );
  const lawLines = useMemo(
    () => translateField(CASE_DETAILS[caseId]?.laws, t),
    [caseId, t]
  );
  const sourceLines = useMemo(
    () => translateField(CASE_DETAILS[caseId]?.source, t),
    [caseId, t]
  );

  const renderLines = (lines: string[]) =>
    lines.map((line, i) => <p key={i}>{line}</p>);

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
          <h2 className="num-title">1. {t("event_summary")} 📌</h2>
          <div className="summary bullets">
            {renderLines(summaryLines)}
          </div>
        </section>

        {/* 2. 사고 발생 경위 */}
        <section className="sec sec-2">
          <h2 className="num-title">2. {t("event_situation")}</h2>
          <div className="body">{renderLines(situationLines)}</div>
        </section>

        {/* 3. 사실관계 및 조사 내용 */}
        <section className="sec sec-3">
          <h2 className="num-title">3. {t("event_facts")}</h2>
          <div className="body bullets">{renderLines(factsLines)}</div>
        </section>

        {/* 4. 중요 쟁점 */}
        {importantLines.length > 0 && (
          <section className="sec sec-4">
            <h2 className="num-title">4. {t("event_important")}</h2>
            <div className="body bullets">
              {importantLines.map((line, i) => {
                if (line.includes(":")) {
                  const [boldPart, ...rest] = line.split(/:(.+)/);
                  return (
                    <p key={i}>
                      <span style={{ fontWeight: "bold" }}>{boldPart}:</span>{" "}
                      <span>{rest.join(":").trim().replace(/:$/, "")}</span>
                    </p>
                  );
                } else {
                  return <p key={i}>{line}</p>;
                }
              })}
            </div>
          </section>
        )}

        {/* 5. 판정 요지 */}
        <section className="sec sec-5">
          <h2 className="num-title">5. {t("event_decision")}</h2>
          <div className="body bullets">{renderLines(decisionLines)}</div>
        </section>

        {/* 6. 관계 법령 */}
        {lawLines.length > 0 && (
          <section className="sec sec-6">
            <h2 className="num-title">6. {t("event_laws")}</h2>
            <div className="body bullets">{renderLines(lawLines)}</div>
          </section>
        )}

        {/* 7. 출처 */}
        {sourceLines.length > 0 && (
          <section className="sec sec-7">
            <h2 className="num-title">7. {t("event_source")}</h2>
            <div className="body bullets">{renderLines(sourceLines)}</div>
          </section>
        )}
      </div>

      <BottomBar />
    </div>
  );
}
