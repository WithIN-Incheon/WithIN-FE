// 산재 정보 안내 (리팩토링 최종 버전)
import Header from "../../../components/Header/Header";
import BottomBar from "../../../components/BottomBar/BottomBar";
import "./InfoCompPage.css";

// ✅ 내부 유틸: HTML/텍스트 → bullet 라인 배열로 변환
function toLines(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input.map((s) => String(s).trim()).filter(Boolean);
  }

  const s = String(input ?? "").trim();
  if (!s) return [];

  // li 태그가 있으면 그 내부만 사용
  const liMatches = [...s.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) =>
    m[1]
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
  );
  if (liMatches.length) return liMatches.filter(Boolean);

  // <br> 제거 후 줄/구분자 분해, 앞의 "• ", "- ", "· " 제거
  const cleaned = s.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "");
  return cleaned
    .split(/\r?\n|·|•|;|，|、/g)
    .map((t) => t.trim().replace(/^[-•·]\s*/, "")) // ← bullet 문자 제거 핵심
    .filter(Boolean);
}

export default function InfoCompPage() {
  return (
    <div className="comp-page">
      <Header title={"산업재해 정보 안내"} />

      <main className="comp-content">
        <div className="comp-title-wrap">
          <h1 className="comp-title">산업재해보상보험</h1>
          <h3 className="comp-title2">(산재보험)</h3>
        </div>

        {/* 정의 */}
        <h2 className="section-title hl">정의</h2>
        <div className="paragraph">
            근로자의 업무상 사고와 질병 등으로 인한 부상, 장애, 사망을 국가가 신속하고 공정하게 보상하고 재해근로자의 재활과 사회복귀를 위해 시행되는 사회 보험입니다.
        </div>

        {/* 적용 대상 */}
        <h2 className="section-title hl">적용 대상</h2>
        <div className="paragraph">
            업무 상 재해에 의한 질병 또는 사고가 발생하여 4일 이상의 요양이 필요한 재해자
        </div>

        <ul className="check-list">
          <li>
            국적이나 비자와 관계없이, 모든 근로자는 근로 중 발생한 재해에 대해 보호받을 수 있음.
          </li>
          <li>
            불법체류 외국인 근로자 또한 산재보상보험을 받을 수 있으며 체류 연장 지원도 병행됨.
          </li>
        </ul>

        {/* 안내 박스 */}
        <div className="note-box">
          <div className="note-text">
            <p className="note-title">*업무상 재해</p>
            <p className="note-body">
              업무와 재해 사이에 상당 인과관계가 인정되는 재해를 뜻함.
            </p>
            <p className="note-body">
              근로자가 업무상 사고 또는 업무상 질병으로 부상, 질병, 장애가 발생하거나 또는
              사망(고의, 자해행위나 범죄행위 또는 그것이 원인이 되어 발생한 경우는 제외함)을 하게 될 경우.
            </p>
          </div>
        </div>

        {/* 대상 범위 */}
        <h2 className="section-title hl">대상 범위</h2>

        {/* 1) 일반 적용 대상 */}
        <h3 className="section-title">일반 적용 대상</h3>
        <div className="bullets">
          {toLines(`
            모든 근로자를 사용하는 사업 또는 사업장이 원칙적으로 산재보험법 적용 대상입니다.
            사업장의 규모나 업종, 고용 형태(상용, 일용직, 비정규직 등)에 관계없이 1인 이상의 근로자가 있으면 적용됩니다.
            건설업 면허가 있는 자가 시공하는 모든 건설공사도 포함됩니다.
          `).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {/* 2) 예외 적용 대상 */}
        <h3 className="section-title">예외 적용 대상</h3>
        <div className="bullets">
          {toLines(`
            별도 재해보상 제도를 갖춘 경우 산재보험법 적용이 제외됨
            소규모 사업장 제외 : 가정 내 고용활동, 농업/임업/어업에서 5명 미만
            상시 근로자 1명 미만인 사업장 (간헐적 근로)
          `).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {/* 3) 특례 적용 대상 */}
        <h3 className="section-title">특례 적용 대상</h3>
        <div className="bullets">
          {toLines(`
            중소기업 사업주 및 가족, 현장실습생, 학생 연구자 등은 산재보험 특례 적용
            근로기준법 적용 대상은 아니지만 노동 사각지대 보호 목적
          `).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <div className="bottom-spacer" />
      </main>

      <BottomBar />
    </div>
  );
}
