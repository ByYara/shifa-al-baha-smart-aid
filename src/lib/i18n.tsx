import * as React from "react";

export type Lang = "ar" | "en";
export type Pair = { ar: string; en: string };

type Ctx = {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  toggle: () => void;
  tx: (p: Pair) => string;
};

const LangContext = React.createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState<Lang>("ar");
  const dir = lang === "ar" ? "rtl" : "ltr";

  React.useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const value = React.useMemo<Ctx>(
    () => ({
      lang,
      dir,
      setLang,
      toggle: () => setLang((l) => (l === "ar" ? "en" : "ar")),
      tx: (p: Pair) => p[lang],
    }),
    [lang, dir],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = React.useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}

export const p = (ar: string, en: string): Pair => ({ ar, en });
