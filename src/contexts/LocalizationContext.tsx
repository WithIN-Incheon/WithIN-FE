// src/contexts/LocalizationContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import localizationData from '../localization.json';

// 지원하는 언어 타입
export type Language = 'KO' | 'MM' | 'VN' | 'ID' | 'EN' | 'NP' | 'TH' | 'RU';

// localization.json의 키 타입
export type LocalizationKey = keyof typeof localizationData;

interface LocalizationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: LocalizationKey) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

// localStorage 키
const LANGUAGE_STORAGE_KEY = 'app_language';

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // localStorage에서 언어 가져오기, 없으면 기본값 'KO'
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return (saved as Language) || 'KO';
  });

  // 언어 변경 시 localStorage에 저장
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  // 번역 함수
  const t = (key: LocalizationKey): string => {
    const translation = localizationData[key];
    if (!translation) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }
    return translation[language] || translation['KO'] || key;
  };

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};

// 커스텀 훅
export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within LocalizationProvider');
  }
  return context;
};