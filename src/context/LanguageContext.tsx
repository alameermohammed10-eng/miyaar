import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Direction, Translations } from '../types/i18n';
import { arTranslations } from '../locales/ar';
import { enTranslations } from '../locales/en';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  t: Translations;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('miyaar_lang') as Language;
      if (saved === 'ar' || saved === 'en') return saved;
    }
    return 'ar'; // Arabic RTL-first default
  });

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';
  const t = language === 'ar' ? arTranslations : enTranslations;

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('miyaar_lang', lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', direction);
      document.documentElement.setAttribute('lang', language);
      document.title = language === 'ar' 
        ? 'مِعيار | استوديو التصميم والحلول الرقمية الفائقة' 
        : 'Miyaar | Premium Digital Solutions & Craft Studio';
    }
  }, [language, direction]);

  return (
    <LanguageContext.Provider value={{ language, direction, t, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
