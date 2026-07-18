import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, Stat, SectionTitle } from "@/components/ui-kit/Page";
import { Radio, Users, Timer, DoorOpen, Activity } from "lucide-react";

export const Route = createFileRoute("/live")({
  head: () => ({ meta: [{ title: "Live Stadium — FIFA Smart Stadium" }, { name: "description", content: "Real-time stadium status, attendance, gates and match feed." }] }),
  component: Live,
});

function Live() {
  return (
    <PageContainer>
      <PageHeader eyebrow="Live" title="Estadio Azteca — Match Day" description="Real-time signals from every sensor, gate and camera across the venue." />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Attendance" value="64,812" hint="74% of capacity" icon={<Users className="h-5 w-5" />} tone="info" />
        <Stat label="Avg. entry wait" value="3.4 min" icon={<Timer className="h-5 w-5" />} tone="success" />
        <Stat label="Open gates" value="12 / 14" icon={<DoorOpen className="h-5 w-5" />} />
        <Stat label="Live incidents" value="0" hint="No active alerts" icon={<Activity className="h-5 w-5" />} tone="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle>Match feed</SectionTitle>
          <ol className="space-y-4">
            {[
              { t: "19:58", e: "Teams entering the pitch", tone: "bg-primary" },
              { t: "19:45", e: "Gate D reopened after brief pause", tone: "bg-success" },
              { t: "19:32", e: "Concessions restocked at Court 3", tone: "bg-muted-foreground/40" },
              { t: "19:15", e: "Weather stable — 24°C clear skies", tone: "bg-info" },
            ].map((r) => (
              <li key={r.t} className="flex items-start gap-3">
                <span className={"mt-1.5 h-2 w-2 rounded-full " + r.tone} />
                <div className="flex-1 text-sm"><span className="font-medium">{r.e}</span></div>
                <div className="text-xs text-muted-foreground">{r.t}</div>
              </li>
            ))}
          </ol>
        </Card>
        <Card>
          <SectionTitle>Gate status</SectionTitle>
          <div className="space-y-2.5">
            {["A","B","C","D","E","F"].map((g, i) => {
              const wait = [7, 3, 5, 4, 12, 8][i];
              const tone = wait < 5 ? "text-success" : wait < 10 ? "text-warning" : "text-destructive";
              return (
                <div key={g} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                  <div className="text-sm font-medium">Gate {g}</div>
                  <div className={"text-sm font-semibold " + tone}>{wait} min</div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
