import { useState } from "react";
import "./LangPage.css";
import LangSelector from "../../components/Lang/LangSelector";
import ContinueButton from "../../components/Login/Button/ContinueButton";
import { useNavigate } from "react-router-dom";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const LangPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null
  );
  const navigate = useNavigate(); // ✅ 라우터 이동 훅

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
  };

  const handleStart = () => {
    if (selectedLanguage) {
      console.log("Selected language:", selectedLanguage);
      navigate("/login"); // ✅ 로그인 페이지로 이동
    }
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
          <LangSelector
            onLanguageChange={handleLanguageChange}
            initialLanguage="ko"
          />
        </div>
      </div>

      {/* 시작하기 버튼 */}
      <div className="button-section">
        <ContinueButton text="시작하기" onClick={handleStart} />
      </div>
    </div>
  );
};

export default LangPage;