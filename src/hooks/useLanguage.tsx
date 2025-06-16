import React, { createContext, useContext, useState, useEffect } from 'react';
import zhTW from '../i18n/zh-TW';
import enUS from '../i18n/en-US';

type Language = 'zh-TW' | 'en-US';
type I18nTexts = typeof zhTW;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: I18nTexts;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  'zh-TW': zhTW,
  'en-US': enUS,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // 從 localStorage 讀取語言設定，預設為中文
    const savedLanguage = localStorage.getItem('tax-calculator-language') as Language;
    return savedLanguage || 'zh-TW';
  });

  // 當語言改變時，保存到 localStorage
  useEffect(() => {
    localStorage.setItem('tax-calculator-language', language);
    // 更新 HTML lang 屬性
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language] as any;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};