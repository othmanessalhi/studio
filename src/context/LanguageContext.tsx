
'use client';

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import translations from '@/lib/translations.json';
import { LanguageSelector } from '@/components/shared/LanguageSelector';

export type Language = 'en' | 'ar';
export type Translations = typeof translations;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Translations[Language];
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
      setIsLanguageSelected(true);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    setIsLanguageSelected(true);
  };
  
  const value = {
    language,
    setLanguage: handleSetLanguage,
    translations: translations[language],
  };

  if (!mounted) {
    return null; 
  }

  if (!isLanguageSelected) {
    return <LanguageSelector onSelectLanguage={handleSetLanguage} />;
  }

  return (
    <LanguageContext.Provider value={value}>
        <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {children}
        </div>
    </LanguageContext.Provider>
  );
};


export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
