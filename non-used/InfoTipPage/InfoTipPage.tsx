// 알아두면 좋은 정보
import Header from "../../src/components/Header/Header";
import BottomBar from "../../src/components/BottomBar/BottomBar";
import "./InfoTipPage.css";

export default function InfoTipPage() {
  return (
    <div className="tip-page">
      <Header title="알아두면 좋은 정보" />

      <main className="tip-content">
        <h1 className="tip-title">알아두면 좋은 정보</h1>

        {/* 0 */}
        <h2 className="section-title"><span className="line-hl">0. 외국인 근로자도 내국인과 동일하게 산재보험에 의해 보호받음</span></h2>
        <p className="paragraph">
          체류 자격, 국적 여부와 무관하게 모두 산재보험 적용 대상입니다.
        </p>

        {/* 1 */}
        <h2 className="section-title"><span className="line-hl">1. 미등록 이주 노동자도 산재보험 급여를 받을 수 있음</span></h2>
        <p className="paragraph">
          미등록 이주 노동자라도 업무상 재해가 발생하면 산재보험 급여를 받을 권리가 있습니다. 체류 자격과 무관하게 의료비, 휴업급여 등 기본 보상이 가능합니다. 장기간 치료 시 합법적 체류를 위한 G-1 비자 발급 등 체류 지원 조치도 마련되어 있습니다.
        </p>

        {/* 2 */}
        <h2 className="section-title"><span className="line-hl">2. 산재보험 가입이 되어 있지 않아도 급여를 받을 수 있음</span></h2>
        <p className="paragraph">
          사업주가 산재보험에 가입하지 않았어도 근로자가 업무상 재해를 입으면 산재보험 급여를 청구할 수 있습니다. 고용노동부가 이를 대신 처리합니다.
        </p>

        {/* 3 */}
        <h2 className="section-title"><span className="line-hl">3. 출퇴근 중 사고도 업무상 재해로 인정됨</span></h2>
        <p className="paragraph">
          출퇴근길 사고도 정상적인 경로와 방법으로 이동하는 경우 업무상 재해로 인정되어 보험 혜택을 받을 수 있습니다.
        </p>

        {/* 4 */}
        <h2 className="section-title"><span className="line-hl">4. 산재와 민사 손해배상은 별개이며 둘 다 청구 가능</span></h2>
        <p className="paragraph">
          산재보험 급여를 받더라도 사업주에 대해 민사 손해배상을 별도로 청구할 수 있습니다.
        </p>

        {/* 5 */}
        <h2 className="section-title"><span className="line-hl">5. 산재보상청구 기간 제한</span></h2>
        <p className="paragraph">
          산업재해보상보험 청구는 병원비를 지불한 날로부터 3년 이내에 청구해야 하며, 이를 지나면 청구가 어렵습니다.
        </p>

        <div className="bottom-spacer" />
      </main>

      <BottomBar />
    </div>
  );
}