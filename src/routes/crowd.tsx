import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, Stat, SectionTitle } from "@/components/ui-kit/Page";
import { Users, TrendingUp, Route as RouteIcon } from "lucide-react";

export const Route = createFileRoute("/crowd")({
  head: () => ({ meta: [{ title: "Crowd Intelligence — FIFA Smart Stadium" }, { name: "description", content: "AI-predicted crowd density, congestion and alternative routes." }] }),
  component: Crowd,
});

const ZONES = [
  { name: "Concourse North", level: "low", value: 32 },
  { name: "Concourse East", level: "medium", value: 61 },
  { name: "Gate B entry", level: "low", value: 28 },
  { name: "Food Court 3", level: "high", value: 88 },
  { name: "Restrooms L2", level: "medium", value: 55 },
  { name: "Exit D corridor", level: "low", value: 21 },
];

const toneOf = (l: string) => (l === "low" ? "bg-success" : l === "medium" ? "bg-warning" : "bg-destructive");

function Crowd() {
  return (
    <PageContainer>
      <PageHeader eyebrow="Crowd Intelligence" title="Live density & flow" description="Real-time occupancy per zone with AI-predicted congestion and reroute suggestions." />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Total on-site" value="64,812" tone="info" icon={<Users className="h-5 w-5" />} />
        <Stat label="Predicted peak" value="82,400" hint="at 19:55" icon={<TrendingUp className="h-5 w-5" />} tone="warning" />
        <Stat label="Reroutes suggested" value="3" icon={<RouteIcon className="h-5 w-5" />} />
        <Stat label="Comfort index" value="Good" tone="success" icon={<TrendingUp className="h-5 w-5" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle>Zone density</SectionTitle>
          <div className="space-y-3">
            {ZONES.map((z) => (
              <div key={z.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={"h-2 w-2 rounded-full " + toneOf(z.level)} />
                    <span className="font-medium">{z.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{z.value}% capacity</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className={"h-full " + toneOf(z.level)} style={{ width: z.value + "%" }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle>AI recommendations</SectionTitle>
          <ul className="space-y-3 text-sm">
            <li className="rounded-xl border border-border p-3">
              <div className="font-medium">Reroute fans from Food Court 3 → Court 5</div>
              <div className="mt-0.5 text-xs text-muted-foreground">Expected wait drop: 9 min → 3 min. Signage triggered on 14 screens.</div>
            </li>
            <li className="rounded-xl border border-border p-3">
              <div className="font-medium">Open supplementary restroom bank L2-B</div>
              <div className="mt-0.5 text-xs text-muted-foreground">Alleviates east concourse pressure ahead of half-time.</div>
            </li>
            <li className="rounded-xl border border-border p-3">
              <div className="font-medium">Pre-stage exits at Gate D and F</div>
              <div className="mt-0.5 text-xs text-muted-foreground">Predicted lowest congestion at final whistle.</div>
            </li>
          </ul>
        </Card>
      </div>
    </PageContainer>
  );
}
