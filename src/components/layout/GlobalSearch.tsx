import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, Sparkles, X } from "lucide-react";
import { searchEntities, type Entity } from "@/lib/venue-data";
import { useLanguage } from "@/lib/language";

export function GlobalSearch({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchEntities(q, 8), [q]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (entity: Entity) => {
    setOpen(false);
    setQ("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate({ to: entity.route as any, hash: entity.hash });
  };

  const askAI = () => {
    setOpen(false);
    const query = q;
    setQ("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate({ to: "/assistant", search: { q: query } as any });
  };

  return (
    <div ref={wrapRef} className={"relative " + (compact ? "w-full" : "hidden max-w-md flex-1 md:block")}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        ref={inputRef}
        type="search"
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(0); }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length)); }
          else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
          else if (e.key === "Enter") {
            e.preventDefault();
            if (results[active]) go(results[active]);
            else if (q.trim()) askAI();
          } else if (e.key === "Escape") setOpen(false);
        }}
        placeholder={t("search_placeholder")}
        aria-label="Search stadium"
        className="h-10 w-full rounded-xl border border-input bg-muted/40 pl-9 pr-9 text-sm outline-none placeholder:text-muted-foreground focus:bg-background focus:ring-focus"
      />
      {q && (
        <button
          onClick={() => { setQ(""); inputRef.current?.focus(); }}
          className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-muted"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}

      {open && q && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-elevated shadow-[var(--shadow-float)]">
          {results.length === 0 ? (
            <button onClick={askAI} className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-muted">
              <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <div className="text-sm font-medium">{t("no_results")}</div>
                <div className="text-xs text-muted-foreground">Ask AI: "{q}"</div>
              </div>
            </button>
          ) : (
            <>
              <ul className="max-h-80 overflow-y-auto py-1">
                {results.map((r, i) => (
                  <li key={r.id}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(r)}
                      className={
                        "flex w-full items-start gap-3 px-4 py-2.5 text-left " +
                        (i === active ? "bg-muted" : "hover:bg-muted/60")
                      }
                    >
                      <span className="mt-0.5 inline-flex rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                        {r.kind}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{r.name}</span>
                        {r.detail && <span className="block truncate text-xs text-muted-foreground">{r.detail}</span>}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <button onClick={askAI} className="flex w-full items-center gap-2 border-t border-border bg-background/60 px-4 py-2 text-xs text-muted-foreground hover:bg-muted">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Ask AI about "{q}"
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
