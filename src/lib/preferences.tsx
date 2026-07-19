import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Prefs = {
  highContrast: boolean;
  largeText: boolean;
  reduceMotion: boolean;
};

type Ctx = { prefs: Prefs; setPref: <K extends keyof Prefs>(k: K, v: Prefs[K]) => void };
const PrefsContext = createContext<Ctx>({ prefs: { highContrast: false, largeText: false, reduceMotion: false }, setPref: () => {} });

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>({ highContrast: false, largeText: false, reduceMotion: false });
  useEffect(() => {
    try {
      const raw = localStorage.getItem("prefs");
      if (raw) setPrefs({ ...prefs, ...JSON.parse(raw) });
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("hc", prefs.highContrast);
    root.classList.toggle("lg-text", prefs.largeText);
    root.classList.toggle("reduce-motion", prefs.reduceMotion);
    try { localStorage.setItem("prefs", JSON.stringify(prefs)); } catch {}
  }, [prefs]);
  const setPref: Ctx["setPref"] = (k, v) => setPrefs((p) => ({ ...p, [k]: v }));
  return <PrefsContext.Provider value={{ prefs, setPref }}>{children}</PrefsContext.Provider>;
}

export const usePrefs = () => useContext(PrefsContext);
