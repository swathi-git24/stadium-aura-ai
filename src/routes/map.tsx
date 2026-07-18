import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle } from "@/components/ui-kit/Page";
import { MapPin, Accessibility, UtensilsCrossed, Zap, Cross, Bath, Car, Train } from "lucide-react";

export const Route = createFileRoute("/map")({
  head: () => ({ meta: [{ title: "Interactive Map — FIFA Smart Stadium" }, { name: "description", content: "Find seats, gates, food, medical, restrooms and AI-recommended routes." }] }),
  component: MapPage,
});

const LAYERS = [
  { icon: <MapPin className="h-4 w-4" />, label: "Seat finder", on: true },
  { icon: <Car className="h-4 w-4" />, label: "Parking" },
  { icon: <Cross className="h-4 w-4" />, label: "Medical rooms" },
  { icon: <UtensilsCrossed className="h-4 w-4" />, label: "Food courts", on: true },
  { icon: <Bath className="h-4 w-4" />, label: "Washrooms" },
  { icon: <Accessibility className="h-4 w-4" />, label: "Wheelchair access" },
  { icon: <Zap className="h-4 w-4" />, label: "Charging stations" },
  { icon: <Train className="h-4 w-4" />, label: "Metro stations" },
];

function MapPage() {
  return (
    <PageContainer>
      <PageHeader eyebrow="Map" title="Interactive Stadium" description="Layered venue map with AI route suggestions and live crowd density." />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card>
          <SectionTitle>Layers</SectionTitle>
          <div className="space-y-1.5">
            {LAYERS.map((l) => (
              <label key={l.label} className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 hover:bg-muted">
                <span className="flex items-center gap-2.5 text-sm">
                  <span className="text-muted-foreground">{l.icon}</span>{l.label}
                </span>
                <input type="checkbox" defaultChecked={l.on} className="h-4 w-4 accent-[var(--primary)]" />
              </label>
            ))}
          </div>
        </Card>

        <Card className="p-0 overflow-hidden">
          <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-primary/10 via-muted to-secondary/10">
            {/* Stylized stadium schematic */}
            <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full">
              <defs>
                <radialGradient id="pitch" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="oklch(0.75 0.15 145)" />
                  <stop offset="100%" stopColor="oklch(0.55 0.12 145)" />
                </radialGradient>
              </defs>
              <ellipse cx="400" cy="250" rx="360" ry="210" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2"/>
              <ellipse cx="400" cy="250" rx="300" ry="170" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2"/>
              <ellipse cx="400" cy="250" rx="240" ry="130" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2"/>
              <rect x="280" y="170" width="240" height="160" rx="8" fill="url(#pitch)" opacity="0.6" />
              <line x1="400" y1="170" x2="400" y2="330" stroke="white" strokeOpacity="0.5" />
              <circle cx="400" cy="250" r="24" fill="none" stroke="white" strokeOpacity="0.5" />
              {/* Pins */}
              {[
                { x: 200, y: 110, l: "Gate A", c: "oklch(0.72 0.17 145)" },
                { x: 600, y: 110, l: "Gate B", c: "oklch(0.55 0.19 265)" },
                { x: 660, y: 380, l: "Gate D", c: "oklch(0.79 0.16 75)" },
                { x: 140, y: 380, l: "Food Ct 3", c: "oklch(0.52 0.09 175)" },
                { x: 700, y: 250, l: "Metro", c: "oklch(0.55 0.19 265)" },
              ].map((p) => (
                <g key={p.l}>
                  <circle cx={p.x} cy={p.y} r="10" fill={p.c} />
                  <circle cx={p.x} cy={p.y} r="18" fill={p.c} opacity="0.25" />
                  <text x={p.x + 16} y={p.y + 4} fontSize="12" fill="currentColor" opacity="0.75">{p.l}</text>
                </g>
              ))}
            </svg>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-border bg-elevated/90 px-3 py-2 text-xs backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-success" /> Low
              <span className="ml-2 h-2 w-2 rounded-full bg-warning" /> Medium
              <span className="ml-2 h-2 w-2 rounded-full bg-destructive" /> High
              <span className="ml-2 text-muted-foreground">crowd density</span>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
