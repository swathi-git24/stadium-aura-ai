import { Globe, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LANGUAGES, useLanguage } from "@/lib/language";

export function LanguageMenu() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-elevated hover:bg-muted"
      >
        <Globe className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-elevated shadow-[var(--shadow-float)]">
          <div className="border-b border-border px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Language · {current.native}
          </div>
          <ul className="max-h-80 overflow-y-auto py-1">
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-muted"
                >
                  <span>
                    <span className="font-medium">{l.native}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{l.label}</span>
                  </span>
                  {l.code === lang && <Check className="h-4 w-4 text-primary" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
