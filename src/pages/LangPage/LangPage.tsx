import React, { useState } from 'react';
import './LangPage.css';
import LangSelector from '../../components/Lang/LangSelector';
import LoginButton from '../../components/Login/Button/LoginButton';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const LangPage = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

    const handleLanguageChange = (language: Language) => {
        setSelectedLanguage(language);
    };

    const handleStart = () => {
        if (selectedLanguage) {
            console.log('Selected language:', selectedLanguage);
            // 여기서 다음 페이지로 이동하는 로직을 구현할 수 있습니다
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
                <LoginButton 
                    text="시작하기" 
                    onClick={handleStart}
                />
            </div>
        </div>
    );
};

export default LangPage;