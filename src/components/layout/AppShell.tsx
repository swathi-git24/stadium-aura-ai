import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Home, Radio, Map as MapIcon, Compass, Sparkles, CalendarClock, Train,
  UtensilsCrossed, Accessibility, Users, Siren, HandHeart, LayoutDashboard,
  Languages, Leaf, Bell, UserCircle, Settings, Sun, Moon, Menu, X, ShieldAlert,
} from "lucide-react";
import { AIAssistant } from "./AIAssistant";
import { GlobalSearch } from "./GlobalSearch";
import { LanguageMenu } from "./LanguageMenu";
import { useLanguage } from "@/lib/language";

type NavItem = { to: string; labelKey: string; icon: React.ComponentType<{ className?: string }>; groupKey: string };

const NAV: NavItem[] = [
  { to: "/", labelKey: "home", icon: Home, groupKey: "overview" },
  { to: "/live", labelKey: "live_stadium", icon: Radio, groupKey: "overview" },
  { to: "/map", labelKey: "map", icon: MapIcon, groupKey: "overview" },
  { to: "/navigation", labelKey: "navigation", icon: Compass, groupKey: "overview" },

  { to: "/assistant", labelKey: "ai_assistant", icon: Sparkles, groupKey: "intelligence" },
  { to: "/planner", labelKey: "planner", icon: CalendarClock, groupKey: "intelligence" },
  { to: "/crowd", labelKey: "crowd", icon: Users, groupKey: "intelligence" },
  { to: "/multilingual", labelKey: "multilingual", icon: Languages, groupKey: "intelligence" },

  { to: "/transport", labelKey: "transport", icon: Train, groupKey: "fan_experience" },
  { to: "/food", labelKey: "food", icon: UtensilsCrossed, groupKey: "fan_experience" },
  { to: "/accessibility", labelKey: "accessibility", icon: Accessibility, groupKey: "fan_experience" },
  { to: "/sustainability", labelKey: "sustainability", icon: Leaf, groupKey: "fan_experience" },

  { to: "/emergency", labelKey: "emergency", icon: Siren, groupKey: "operations" },
  { to: "/volunteers", labelKey: "volunteers", icon: HandHeart, groupKey: "operations" },
  { to: "/operations", labelKey: "operations", icon: LayoutDashboard, groupKey: "operations" },

  { to: "/notifications", labelKey: "notifications", icon: Bell, groupKey: "account" },
  { to: "/profile", labelKey: "profile", icon: UserCircle, groupKey: "account" },
  { to: "/settings", labelKey: "settings", icon: Settings, groupKey: "account" },
];

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
    setDark(next);
  };
  return { dark, toggle };
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useLanguage();
  const groups = Array.from(new Set(NAV.map((n) => n.groupKey)));

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5" onClick={onClose}>
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
            <span className="text-sm font-bold tracking-tight">FS</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">FIFA Smart Stadium</div>
            <div className="text-[11px] text-muted-foreground">World Cup 2026</div>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-sidebar-accent md:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        {groups.map((g) => (
          <div key={g} className="mb-4">
            <div className="px-3 pb-1.5 pt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {t(g)}
            </div>
            <div className="space-y-0.5">
              {NAV.filter((n) => n.groupKey === g).map((n) => {
                const active = pathname === n.to;
                const Icon = n.icon;
                return (
                  <Link
                    key={n.to}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    to={n.to as any}
                    onClick={onClose}
                    className={
                      "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors " +
                      (active
                        ? "bg-sidebar-accent font-medium text-sidebar-primary"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground")
                    }
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className={"h-[18px] w-[18px] " + (active ? "text-sidebar-primary" : "text-muted-foreground group-hover:text-foreground")} />
                    <span className="truncate">{t(n.labelKey)}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <Link
          to="/emergency"
          onClick={onClose}
          className="flex items-center gap-3 rounded-lg bg-destructive/10 px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/15"
        >
          <ShieldAlert className="h-4 w-4" /> {t("emergency_sos")}
        </Link>
      </div>
    </aside>
  );
}

function TopBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { dark, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-8">
      <button onClick={onOpenMenu} className="rounded-lg p-2 hover:bg-muted md:hidden" aria-label="Open menu">
        <Menu className="h-5 w-5" />
      </button>

      <GlobalSearch />

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-full border border-border bg-elevated px-3 py-1.5 text-xs md:flex">
          <span className="relative inline-flex h-2 w-2 items-center justify-center rounded-full bg-success text-success">
            <span className="pulse-dot" />
          </span>
          <span className="font-medium">Live</span>
          <span className="text-muted-foreground">Estadio Azteca · 82,000</span>
        </div>

        <LanguageMenu />

        <button onClick={toggle} aria-label="Toggle theme" className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-elevated hover:bg-muted">
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <Link to="/notifications" aria-label="Notifications" className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-elevated hover:bg-muted">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
        </Link>

        <Link to="/profile" className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
          AR
        </Link>
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <div className="flex min-h-dvh bg-background text-foreground">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10">
            <Sidebar onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar onOpenMenu={() => setMobileOpen(true)} />
        <div className="border-b border-border bg-background/70 px-4 py-2 md:hidden">
          <GlobalSearch compact />
        </div>
        <main className="flex-1">{children}</main>
      </div>

      <AIAssistant />
    </div>
  );
}
