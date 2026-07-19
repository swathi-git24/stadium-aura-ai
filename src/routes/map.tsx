import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle } from "@/components/ui-kit/Page";
import { MapPin, Accessibility, UtensilsCrossed, Zap, Cross, Bath, Car, Train, Navigation as NavIcon, X } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/map")({
  head: () => ({ meta: [{ title: "Interactive Map — FIFA Smart Stadium" }, { name: "description", content: "Layered venue map with clickable pins, AI routing, and live crowd density." }] }),
  component: MapPage,
});

type LayerKey = "seat" | "parking" | "medical" | "food" | "wc" | "access" | "charge" | "metro";
const LAYERS: { key: LayerKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "seat", label: "Seat finder", icon: MapPin },
  { key: "parking", label: "Parking", icon: Car },
  { key: "medical", label: "Medical rooms", icon: Cross },
  { key: "food", label: "Food courts", icon: UtensilsCrossed },
  { key: "wc", label: "Washrooms", icon: Bath },
  { key: "access", label: "Wheelchair access", icon: Accessibility },
  { key: "charge", label: "Charging stations", icon: Zap },
  { key: "metro", label: "Metro stations", icon: Train },
];

type Pin = {
  id: string; x: number; y: number; label: string; layer: LayerKey;
  color: string; detail: string; density?: "low" | "med" | "high";
  route?: string; hash?: string;
};

const PINS: Pin[] = [
  { id: "gate-a", x: 200, y: 110, label: "Gate A", layer: "seat", color: "oklch(0.72 0.17 145)", detail: "North entrance · 4 min wait", density: "low" },
  { id: "gate-b", x: 600, y: 110, label: "Gate B", layer: "seat", color: "oklch(0.55 0.19 265)", detail: "Your seat is nearest here · 3 min wait", density: "low" },
  { id: "gate-c", x: 200, y: 400, label: "Gate C", layer: "seat", color: "oklch(0.65 0.20 25)", detail: "South · 14 min wait — avoid", density: "high" },
  { id: "gate-d", x: 660, y: 380, label: "Gate D", layer: "access", color: "oklch(0.79 0.16 75)", detail: "VIP + accessible · 6 min", density: "med" },
  { id: "food-3", x: 140, y: 300, label: "Food Ct 3", layer: "food", color: "oklch(0.52 0.09 175)", detail: "Vegan · gluten-free · 5 min wait", density: "low" },
  { id: "food-1", x: 660, y: 240, label: "Food Ct 1", layer: "food", color: "oklch(0.52 0.09 175)", detail: "Tacos & grill · halal · 8 min", density: "med" },
  { id: "wc-204", x: 500, y: 180, label: "WC 204", layer: "wc", color: "oklch(0.60 0.05 250)", detail: "Nearest to your seat", density: "low" },
  { id: "med-east", x: 720, y: 260, label: "Medical", layer: "medical", color: "oklch(0.65 0.20 25)", detail: "24/7 paramedics", density: "low" },
  { id: "charge-1", x: 350, y: 380, label: "Charging", layer: "charge", color: "oklch(0.79 0.16 75)", detail: "12 fast-charge ports", density: "low" },
  { id: "metro", x: 730, y: 130, label: "Metro Line 2", layer: "metro", color: "oklch(0.55 0.19 265)", detail: "Estadio Azteca · 14 min · $1", density: "med" },
  { id: "p3", x: 90, y: 180, label: "Lot P3", layer: "parking", color: "oklch(0.79 0.16 75)", detail: "42% full · recommended", density: "low" },
];

const DEFAULT_ON: LayerKey[] = ["seat", "food", "access", "medical"];

function MapPage() {
  const navigate = useNavigate();
  const [on, setOn] = useState<Set<LayerKey>>(new Set(DEFAULT_ON));
  const [selected, setSelected] = useState<Pin | null>(null);

  const visible = useMemo(() => PINS.filter((p) => on.has(p.layer)), [on]);

  const toggle = (k: LayerKey) => {
    setOn((s) => { const n = new Set(s); n.has(k) ? n.delete(k) : n.add(k); return n; });
  };

  const densityColor: Record<string, string> = { low: "var(--success)", med: "var(--warning)", high: "var(--destructive)" };

  return (
    <PageContainer>
      <PageHeader eyebrow="Map" title="Interactive Stadium" description="Layered venue map — click a pin to see details and start AI routing." />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card>
          <SectionTitle>Layers</SectionTitle>
          <div className="space-y-1.5">
            {LAYERS.map((l) => {
              const Icon = l.icon;
              return (
                <label key={l.key} className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 hover:bg-muted">
                  <span className="flex items-center gap-2.5 text-sm">
                    <Icon className="h-4 w-4 text-muted-foreground" />{l.label}
                  </span>
                  <input type="checkbox" checked={on.has(l.key)} onChange={() => toggle(l.key)} className="h-4 w-4 accent-[var(--primary)]" />
                </label>
              );
            })}
          </div>
        </Card>

        <Card className="relative overflow-hidden p-0">
          <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-primary/10 via-muted to-secondary/10">
            <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full">
              <defs>
                <radialGradient id="pitch" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="oklch(0.75 0.15 145)" />
                  <stop offset="100%" stopColor="oklch(0.55 0.12 145)" />
                </radialGradient>
              </defs>
              <ellipse cx="400" cy="250" rx="360" ry="210" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
              <ellipse cx="400" cy="250" rx="300" ry="170" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
              <ellipse cx="400" cy="250" rx="240" ry="130" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
              <rect x="280" y="170" width="240" height="160" rx="8" fill="url(#pitch)" opacity="0.6" />
              <line x1="400" y1="170" x2="400" y2="330" stroke="white" strokeOpacity="0.5" />
              <circle cx="400" cy="250" r="24" fill="none" stroke="white" strokeOpacity="0.5" />

              {visible.map((p) => (
                <g key={p.id} className="cursor-pointer" onClick={() => setSelected(p)} tabIndex={0} role="button" aria-label={p.label}>
                  <circle cx={p.x} cy={p.y} r="20" fill={p.color} opacity="0.2" />
                  <circle cx={p.x} cy={p.y} r="10" fill={p.color} stroke={selected?.id === p.id ? "white" : "transparent"} strokeWidth="2" />
                  {p.density && (
                    <circle cx={p.x + 8} cy={p.y - 8} r="4" fill={densityColor[p.density]} stroke="white" strokeWidth="1.5" />
                  )}
                  <text x={p.x + 16} y={p.y + 4} fontSize="12" fill="currentColor" opacity="0.85">{p.label}</text>
                </g>
              ))}
            </svg>

            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-border bg-elevated/90 px-3 py-2 text-xs backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-success" /> Low
              <span className="ml-2 h-2 w-2 rounded-full bg-warning" /> Medium
              <span className="ml-2 h-2 w-2 rounded-full bg-destructive" /> High
              <span className="ml-2 text-muted-foreground">crowd density</span>
            </div>

            {selected && (
              <div className="absolute right-4 top-4 w-72 rounded-2xl border border-border bg-elevated p-4 shadow-[var(--shadow-float)]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold">{selected.label}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{selected.detail}</div>
                  </div>
                  <button onClick={() => setSelected(null)} className="rounded-md p-1 hover:bg-muted"><X className="h-4 w-4" /></button>
                </div>
                <button
                  onClick={() => navigate({ to: "/navigation", search: { to: selected.id } as never })}
                  className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
                >
                  <NavIcon className="h-4 w-4" /> Navigate here
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
