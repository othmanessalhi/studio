
'use client';

import { useLanguage } from '@/context/LanguageContext';
import { NAV_LINKS_EN, NAV_LINKS_AR } from '@/lib/constants';
import type { Translations } from '@/context/LanguageContext';


type TranslationKeys = keyof Translations['en'];

export const useTranslation = () => {
  const context = useLanguage();

  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }

  const { language, setLanguage, translations } = context;

  const t = (key: TranslationKeys): string => {
    return translations[key] || key;
  };

  const navLinks = language === 'ar' ? NAV_LINKS_AR : NAV_LINKS_EN;

  return { language, setLanguage, t, navLinks };
};
