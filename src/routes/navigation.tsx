import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle } from "@/components/ui-kit/Page";
import { Compass, ArrowUpRight, MoveRight } from "lucide-react";

export const Route = createFileRoute("/navigation")({
  head: () => ({ meta: [{ title: "Navigation — FIFA Smart Stadium" }, { name: "description", content: "Turn-by-turn wayfinding across the venue." }] }),
  component: Nav,
});

const STEPS = [
  { d: "Head east toward the North Concourse", m: "120 m", icon: <MoveRight className="h-4 w-4" /> },
  { d: "Take the escalator up to Level 2", m: "1 min", icon: <ArrowUpRight className="h-4 w-4" /> },
  { d: "Turn right at the purple wayfinding pillar", m: "40 m", icon: <MoveRight className="h-4 w-4" /> },
  { d: "Enter Section 204 through Portal 2", m: "20 m", icon: <MoveRight className="h-4 w-4" /> },
];

function Nav() {
  return (
    <PageContainer>
      <PageHeader eyebrow="Navigation" title="To Section 204 · Row F · 12" description="4 minutes · least crowded route right now." />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <ol className="space-y-4">
            {STEPS.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">{s.icon}</div>
                <div className="flex-1"><div className="text-sm font-medium">{s.d}</div><div className="text-xs text-muted-foreground">{s.m}</div></div>
              </li>
            ))}
          </ol>
        </Card>
        <Card>
          <SectionTitle>Route summary</SectionTitle>
          <div className="space-y-2 text-sm">
            <Row label="Distance" value="180 m" />
            <Row label="Steps" value="4" />
            <Row label="ETA" value="4 min" />
            <Row label="Accessible" value="Yes" />
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-background p-3 text-xs text-muted-foreground">
            <Compass className="h-4 w-4 text-primary" /> Voice guidance available in 8 languages.
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
function Row({ label, value }: { label: string; value: string }) { return <div className="flex items-center justify-between"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span></div>; }
