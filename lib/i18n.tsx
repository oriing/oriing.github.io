import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "ko" | "en";
export type LocalizedText = { ko: string; en: string };

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (value: LocalizedText) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function initialLocale(): Locale {
  if (typeof window === "undefined") return "ko";
  const saved = window.localStorage.getItem("portfolio-locale");
  if (saved === "ko" || saved === "en") return saved;
  return window.navigator.language.toLowerCase().startsWith("ko") ? "ko" : "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("portfolio-locale", locale);
  }, [locale]);

  const value = useMemo<LocaleContextValue>(() => ({
    locale,
    setLocale,
    t: (text) => text[locale],
  }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
