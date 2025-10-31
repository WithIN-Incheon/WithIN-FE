// 산재 정보 페이지
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import { useNavigate } from "react-router-dom";
import "./InfoPage.css";

export default function InfoPage() {
  const navigate = useNavigate();

  return (
    <div className="info-page">
      <Header title="산재재해 정보 가이드" />

      <main className="info-content">
        <h2 className="info-title">
          {`산재에 대한\n전반적인 내용을 알아보세요!`}
        </h2>

        <div className="info-grid">
          <img
            className="info-box"
            src="/Info/Compensation-box.svg"
            alt="산재 보험 안내"
            onClick={() => navigate("/info/compensation")}
          />
          <img
            className="info-box"
            src="/Info/Process-box.svg"
            alt="산재 보험 보상 절차"
            onClick={() => navigate("/info/process")}
          />
          <img
            className="info-box"
            src="/Info/Benefit-box.svg"
            alt="산재 보험 급여 안내"
            onClick={() => navigate("/info/salary")}
          />
          <img
            className="info-box"
            src="/Info/Glossary-box.svg"
            alt="산재 관련 용어사전"
            onClick={() => navigate("/info/dictionary")}
          />
        </div>
      </main>

      <BottomBar />
    </div>
  );
}
