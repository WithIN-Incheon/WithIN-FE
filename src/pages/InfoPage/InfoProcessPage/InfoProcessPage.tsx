import Header from "../../../components/Header/Header";
import BottomBar from "../../../components/BottomBar/BottomBar";
import "./InfoProcessPage.css";

export default function InfoProcessPage() {
  return (
    <div className="proc-page">
      <Header title="산재 보험 보상 절차" />

      <main className="proc-content">
        {/* 타이틀 */}
        <h1 className="proc-title">산업재해 보험 보상 절차</h1>

        {/* 개요 */}
        <section className="proc-section">
          <h2 className="section-title hl">개요</h2>
          <p className="paragraph14">
            신청은 본인 또는 유족, 대리인(변호사 등)이 근로복지공단에 서류를 제출하여 진행합니다.
          </p>
          <p className="paragraph14">
            신청서 접수 후 근로복지공단이 재해조사를 실시하고, 승인 여부를 결정합니다.
            승인 시 요양급여, 휴업급여, 장해급여 등의 보상이 지급됩니다.
          </p>
        </section>

        {/* 업무상 사고 산재 보험 신청 절차 */}
        <section className="proc-section">
          <h2 className="section-title hl">업무상 사고 산재 보험 신청 절차</h2>
          <ol className="num-list13">
            <li>
              사고 발생 즉시 응급조치 후 산재보험 지정 의료기관으로 이송
              (부득이 시 비지정기관 치료 가능하나 지정기관으로 옮겨야 함)
            </li>
            <li>
              근로복지공단 홈페이지 또는 지정양식을 활용해 신청서 작성
              사고 경위, 인적사항, 소속 사업장 등 기재 및 병원에서 의사 소견서 작성 및 첨부
            </li>
            <li>
              산재 여부를 판단하기 위해 근로복지공단 자문의사 소견 청취
              7일 이내 요양승인 여부 통지(필요 시 연장 가능)
            </li>
          </ol>
          <p className="paragraph13">승인 시 처리 : 요양급여 지급 시작</p>
          <p className="paragraph13">
            불승인 시 처리 : 불승인 통보 후 90일 이내 심사청구, 재심사청구 또는 행정소송 가능
          </p>
        </section>
        <img
            className="proc-flow-img"
            src="/Info/Process.svg"
            alt="업무상 질병 산재 보험 신청 절차 플로우"
        />

        {/* 업무상 질병 산재 보험 신청 절차 */}
        <section className="proc-section">
          <h2 className="section-title hl">업무상 질병 산재 보험 신청 절차</h2>
          <ol className="num-list13">
            <li>
              요양급여신청서 및 증빙서류 제출<br />
              <span className="note-inline">
                신청서 작성 후 근로복지공단 제출 (업무상 질병과 관련한 진단서, 소견서,
                업무환경 노출 증거 등 첨부) (요양급여신청서 작성하기 칸으로 이동)
              </span>
            </li>
            <li>
              업무상질병판정위원회 심의<br />
              <span className="note-inline">
                근로복지공단 소속기관장은 신청서 접수 후 7일 이내 업무상질병판정위원회에 심의를 의뢰,
                판정위원회는 20일 이내(필요 시 10일 연장) 심의 후 결과 통보
              </span>
            </li>
            <li>승인 여부 통지 및 급여 지급</li>
          </ol>

          <p className="paragraph13">승인 시 처리 : 요양급여 지급 시작</p>
          <p className="paragraph13">
            불승인 시 처리 : 불승인 통보 후 90일 이내 심사청구, 재심사청구 또는 행정소송 가능
          </p>
        </section>

        {/* 필요 서류(공통) */}
        <section className="proc-section">
          <h2 className="section-title hl">필요 서류(공통)</h2>
          <ul className="dash-list14">
            • 요양 급여 신청서<br />
            • 사고 또는 질병에 관한 진단서, 의사 소견서<br />
            • 사망 시 유족 관련 서류(사망 진단서, 주민등록등본, 혼인관계증명서 등)
          </ul>
        </section>

        <div className="bottom-spacer" />
      </main>

      <BottomBar />
    </div>
  );
}
