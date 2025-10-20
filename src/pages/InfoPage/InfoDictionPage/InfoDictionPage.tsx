import Header from "../../../components/Header/Header";
import BottomBar from "../../../components/BottomBar/BottomBar";
import "./InfoDictionPage.css";

// ✅ 내부 유틸: <p> 안의 '•' 라인 자동 분리
function toBullets(text: string): string[] {
  return text
    .split(/<br\s*\/?>/gi)
    .map((t) => t.trim())
    .filter((line) => line.startsWith("•"))
    .map((line) => line.replace(/^•\s*/, "").trim());
}

export default function InfoDictionPage() {
  return (
    <div className="dict-page">
      <Header title="산재 관련 용어 사전" />

      <main className="dict-content">
        {/* 페이지 타이틀 */}
        <h1 className="dict-title">용어 사전</h1>

        {/* 1. 업무상 재해 */}
        <h2 className="section-title hl">1. 업무상 재해</h2>
        <p className="paragraph">
          업무상 재해는 근로자가 회사(사업주)의 지시나 관리를 받으며 일하는 도중에 일어난
          사고나 질병을 말하며, 업무와 재해 사이에 인과관계가 반드시 인정되어야 합니다.
          <br />크게 <b>업무 상 사고 / 질병 / 출퇴근 재해</b>로 구분됩니다.
        </p>

        {/* 1-1. 업무상 사고 */}
        <h3 className="sub-title hl">1-1. 업무상 사고</h3>
        <div className="bullets">
          {toBullets(`
            • 근로자가 근로계약에 따른 업무나 그에 따르는 행위를 하던 중 발생한 사고
            <br/>• 사업주가 제공한 시설물 등을 이용하다 그 시설물의 결함이나 관리 소홀로 발생한 사고
            <br/>• 사업주가 주관하거나 지시한 행사 또는 행사 준비 중에 발생한 사고
            <br/>• 휴게시간 중 사업주의 관리하에 있다고 볼 수 있는 행위 중 발생한 사고
            <br/>• 업무와 관련하여 발생한 기타 사고
          `).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {/* 1-2. 업무상 질병 */}
        <h3 className="sub-title hl">1-2. 업무상 질병</h3>
        <div className="bullets">
          {toBullets(`
            • 업무 수행 중 물리적, 화학적, 생물학적 요인에 노출되어 발생한 질병
            <br/>• 업무상 부상에 의해 발생한 질병
            <br/>• 직장 내 괴롭힘이나 고객의 폭언 등 업무 스트레스로 인한 정신적 질병
            <br/>• 업무와 관련하여 발생한 기타 질병
          `).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {/* 1-3. 출퇴근 재해 */}
        <h3 className="sub-title hl">1-3. 출퇴근 재해</h3>
        <div className="bullets">
          {toBullets(`
            • 사업주가 제공하는 교통수단이나 이에 준하는 통근 수단을 이용 중 발생한 사고
            <br/>• 통상적인 경로와 방법으로 출퇴근하는 도중 발생한 사고(경로 일탈·중단 시 인정 제한 가능)
          `).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {/* 제외 사유 */}
        <h2 className="sub-title hl">제외 사유</h2>
        <p className="paragraph">
          근로자의 고의, 자해행위, 범죄행위 등으로 인한 부상, 질병, 장해 또는 사망은
          업무상 재해로 인정하지 않음
          <br />
          <br />단, 인식능력이 낮아진 상태에서 발생한 경우는 예외
        </p>

        {/* 2~9 */}
        <h2 className="section-title hl">2. 근로자</h2>
        <p className="paragraph">
          사업주에게 근로를 제공하는 사람으로서, 정규직, 계약직, 일용직 근로자 등 모든 고용 형태를 포함
        </p>

        <h2 className="section-title hl">3. 사업주</h2>
        <p className="paragraph">
          근로자를 고용하고 지휘·감독하며 임금을 지급하는 사람이나 법인
        </p>

        <h2 className="section-title hl">4. 산재보험가입자</h2>
        <p className="paragraph">
          산업재해보상보험에 가입하여 보험료를 납부하는 사업주 또는 개인
        </p>

        <h2 className="section-title hl">5. 진단서</h2>
        <p className="paragraph">
          의사가 근로자의 부상이나 질병 상태를 진단하고 기록한 공식 문서
        </p>

        <h2 className="section-title hl">6. 재해 신고 / 조사</h2>
        <p className="paragraph">
          업무상 재해가 발생했을 때 사업주 또는 근로자가 이를 관리하는 기관에 공식 보고하는 절차 /
          재해 발생 원인과 경위를 조사하여 업무상 재해 여부와 관련 책임을 파악하는 과정
        </p>

        <h2 className="section-title hl">7. 수급권자</h2>
        <p className="paragraph">
          산재보험 급여를 받을 권리가 있는 사람, 피해 근로자 또는 유족
        </p>

        <h2 className="section-title hl">8. 심사 청구 / 재심사 청구</h2>
        <p className="paragraph">
          급여 지급 결정에 다시 판단을 요구하는 절차 / 심사 청구 후 불복할 시 추가로 요청하는 제도
        </p>

        <h2 className="section-title hl">9. 법적 대리인</h2>
        <p className="paragraph">
          본인 대신에 법적으로 권한을 가진 사람
        </p>

        <div className="bottom-spacer" />
      </main>

      <BottomBar />
    </div>
  );
}
