"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Locale = "en" | "de" | "es" | "fr" | "ar";

export const locales: { code: Locale; name: string; nativeName: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  { code: "de", name: "German", nativeName: "Deutsch", dir: "ltr" },
  { code: "es", name: "Spanish", nativeName: "Español", dir: "ltr" },
  { code: "fr", name: "French", nativeName: "Français", dir: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl" },
];

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children, translations }: { children: ReactNode; translations: Record<Locale, Record<string, string>> }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLocale = localStorage.getItem("locale") as Locale;
    if (savedLocale && locales.some(l => l.code === savedLocale)) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    // Update document direction for RTL languages
    document.documentElement.dir = locales.find(l => l.code === newLocale)?.dir || "ltr";
    document.documentElement.lang = newLocale;
  };

  const t = (key: string): string => {
    const translation = translations[locale]?.[key];
    if (!translation) {
      // Fallback to English
      return translations.en?.[key] || key;
    }
    return translation;
  };

  const dir = locales.find(l => l.code === locale)?.dir || "ltr";

  // Set initial direction
  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = dir;
      document.documentElement.lang = locale;
    }
  }, [locale, dir, mounted]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
