import React, { useState, useRef, useEffect } from 'react';
import './LangSelector.css';
import { useLocalization, type Language } from '../../contexts/LocalizationContext';

interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: LanguageInfo[] = [
  { code: 'EN', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'KO', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'MM', name: 'Myanmar', nativeName: 'မြန်မာ', flag: '🇲🇲' },
  { code: 'VN', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'RU', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ID', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'NP', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵' },
  { code: 'TH', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
];

const LangSelector: React.FC = () => {
  const { language, setLanguage } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLanguage = languages.find(lang => lang.code === language) || languages[1];

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

  const handleLanguageSelect = (lang: LanguageInfo) => {
    setLanguage(lang.code);
    setIsOpen(false);
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
          {languages.map((lang) => (
            <div
              key={lang.code}
              className={`language-option ${
                lang.code === selectedLanguage.code ? 'selected' : ''
              }`}
              onClick={() => handleLanguageSelect(lang)}
            >
              <span className="flag">{lang.flag}</span>
              <span className="language-name">
                {lang.nativeName}
                {lang.nativeName !== lang.name && (
                  <span className="english-name"> ({lang.name})</span>
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