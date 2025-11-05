import "./LangPage.css";
import LangSelector from "../../components/Lang/LangSelector";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import { useNavigate } from "react-router-dom";
import { useLocalization } from "../../contexts/LocalizationContext";

const LangPage = () => {
  const navigate = useNavigate();
  const { t } = useLocalization();

  const handleStart = () => {
    navigate("/home");
  };

  return (
    <div className="lang-page">
      {/* 로고 섹션 */}
      <div className="logo-section">
        <img src="/Logo-lang.svg" alt="WithIN" className="logo" />
      </div>

      {/* 메인 콘텐츠 섹션 */}
      <div className="main-content">
        <div className="welcome-text">
          <h1>반가워요!</h1>
          <h1>언어를 선택해 주세요</h1>
        </div>

        <div className="language-section">
          <LangSelector />
        </div>
      </div>

      {/* 시작하기 버튼 */}
      <div className="button-section">
        <ContinueButton text={t('firstButton')} onClick={handleStart} />
      </div>
    </div>
  );
};

export default LangPage;