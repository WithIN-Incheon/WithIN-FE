import React, { useState, useRef, useEffect } from 'react';
import './LangSelector.css';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'fil', name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭' },
  { code: 'my', name: 'Myanmar', nativeName: 'မြန်မာ', flag: '🇲🇲' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
];

interface LangSelectorProps {
  onLanguageChange?: (language: Language) => void;
  initialLanguage?: string;
}

const LangSelector: React.FC<LangSelectorProps> = ({ 
  onLanguageChange, 
  initialLanguage = 'ko' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    languages.find(lang => lang.code === initialLanguage) || languages[1]
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    onLanguageChange?.(language);
  };

  return (
    <div className="lang-selector" ref={dropdownRef}>
      {/* 선택된 언어 표시 영역 */}
      <div 
        className="selected-language"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="selected-language-content">
          {/* <span className="flag">{selectedLanguage.flag}</span> */}
          <span className="language-name">{selectedLanguage.nativeName}</span>
        </div>
        <img src="/arrow-down.svg" alt="arrow-down" className={`chevron ${isOpen ? 'up' : 'down'}`}/>
      </div>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="language-dropdown">
          {languages.map((language) => (
            <div
              key={language.code}
              className={`language-option ${
                language.code === selectedLanguage.code ? 'selected' : ''
              }`}
              onClick={() => handleLanguageSelect(language)}
            >
              <span className="flag">{language.flag}</span>
              <span className="language-name">
                {language.nativeName}
                {language.nativeName !== language.name && (
                  <span className="english-name"> ({language.name})</span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LangSelector;