import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle, Stat } from "@/components/ui-kit/Page";
import { Activity, Users, AlertTriangle, Sparkles, HandHeart, DoorOpen } from "lucide-react";

export const Route = createFileRoute("/operations")({
  head: () => ({ meta: [{ title: "Operations — FIFA Smart Stadium" }, { name: "description", content: "Live venue command center: analytics, incidents, volunteers and AI insights." }] }),
  component: Ops,
});

function Ops() {
  return (
    <PageContainer>
      <PageHeader eyebrow="Operations" title="Venue Command Center" description="Unified view for organizers — analytics, incidents, staffing and AI operational recommendations." />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Live attendance" value="64,812" tone="info" icon={<Users className="h-5 w-5" />} />
        <Stat label="Active incidents" value="2" tone="warning" icon={<AlertTriangle className="h-5 w-5" />} />
        <Stat label="Volunteers on shift" value="284" icon={<HandHeart className="h-5 w-5" />} tone="success" />
        <Stat label="Gates operating" value="12 / 14" icon={<DoorOpen className="h-5 w-5" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle>Entry gate throughput (last 60 min)</SectionTitle>
          <div className="flex h-56 items-end gap-2">
            {[42, 55, 61, 48, 72, 88, 76, 64, 51, 44, 38, 30].map((v, i) => (
              <div key={i} className="group flex-1 rounded-t-lg bg-primary/20 transition-colors hover:bg-primary" style={{ height: `${v}%` }} />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
            <span>-60m</span><span>-30m</span><span>now</span>
          </div>
        </Card>

        <Card>
          <div className="mb-2 flex items-center gap-2 text-primary">
            <Sparkles className="h-4 w-4" /><span className="text-xs font-semibold uppercase tracking-wide">AI Insight</span>
          </div>
          <div className="text-sm font-medium">Shift 6 volunteers from Zone A → Food Court 3</div>
          <p className="mt-1.5 text-xs text-muted-foreground">Predicted queue build-up in 12 minutes. Redeploying reduces wait by 6 min for ~1,800 fans.</p>
          <button className="mt-4 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:opacity-90">Apply recommendation</button>
        </Card>

        <Card className="lg:col-span-2">
          <SectionTitle>Incident timeline</SectionTitle>
          <ul className="divide-y divide-border text-sm">
            {[
              { t: "19:41", e: "Medical assist · Section 118", s: "Resolved", tone: "text-success" },
              { t: "19:22", e: "Lost child reunited · Gate C", s: "Resolved", tone: "text-success" },
              { t: "18:57", e: "Spill cleanup · Concourse E", s: "In progress", tone: "text-warning" },
              { t: "18:30", e: "Metro delay coordination", s: "Monitoring", tone: "text-secondary" },
            ].map((i) => (
              <li key={i.t} className="flex items-center justify-between py-3">
                <div><span className="text-xs text-muted-foreground">{i.t}</span><div>{i.e}</div></div>
                <div className={"text-xs font-medium " + i.tone}>{i.s}</div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <SectionTitle>Crowd heatmap</SectionTitle>
          <div className="grid grid-cols-8 gap-1">
            {Array.from({ length: 64 }).map((_, i) => {
              const v = Math.sin(i * 0.7) * 0.5 + 0.5;
              const c = v > 0.75 ? "bg-destructive" : v > 0.5 ? "bg-warning" : v > 0.25 ? "bg-success" : "bg-muted";
              return <div key={i} className={"aspect-square rounded-sm " + c} style={{ opacity: 0.35 + v * 0.65 }} />;
            })}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
