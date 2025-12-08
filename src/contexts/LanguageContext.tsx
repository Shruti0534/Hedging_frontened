import { createContext, useContext, useState, } from 'react';
import type { ReactNode } from 'react';
import type { TranslationKey } from '../lib/i18n';
import { translations } from '../lib/i18n';
import type { Language } from '../lib/i18n';
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  mode: "seekho" | "vyapaar";      
  setMode: (value: "seekho" | "vyapaar") => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [mode, setMode] = useState<"seekho" | "vyapaar">("seekho");

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t ,mode, setMode}}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
