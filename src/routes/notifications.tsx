import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader } from "@/components/ui-kit/Page";
import { Bell, DoorOpen, CloudSun, Train, Siren, CalendarClock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — FIFA Smart Stadium" }, { name: "description", content: "Gate changes, weather, transport, emergency broadcasts and match reminders." }] }),
  component: Notes,
});

const N = [
  { icon: <DoorOpen className="h-4 w-4" />, tone: "bg-success/15 text-success", t: "Gate change", b: "Your recommended entry is now Gate B (was C).", time: "just now" },
  { icon: <CloudSun className="h-4 w-4" />, tone: "bg-info/15 text-secondary", t: "Weather update", b: "Clear skies through the match. 24°C at kickoff.", time: "8m" },
  { icon: <Train className="h-4 w-4" />, tone: "bg-warning/15 text-warning", t: "Transport delay", b: "Metro Line 2 delay ~6 min. Consider leaving 5 min earlier.", time: "12m" },
  { icon: <Sparkles className="h-4 w-4" />, tone: "bg-primary/10 text-primary", t: "AI recommendation", b: "Skip Court 3 dinner rush — Court 5 is quieter tonight.", time: "22m" },
  { icon: <CalendarClock className="h-4 w-4" />, tone: "bg-muted text-muted-foreground", t: "Match reminder", b: "Kickoff in 2 hours. Bring your digital ticket.", time: "1h" },
  { icon: <Siren className="h-4 w-4" />, tone: "bg-destructive/10 text-destructive", t: "Emergency broadcast", b: "Drill completed successfully in East wing. No action needed.", time: "3h" },
];

function Notes() {
  return (
    <PageContainer>
      <PageHeader eyebrow="Notifications" title="What's happening" description="Only what matters — gate, weather, transport, and safety." />
      <Card className="p-0">
        {N.map((n) => (
          <div key={n.t + n.time} className="flex items-start gap-3 border-b border-border p-4 last:border-0">
            <div className={"grid h-9 w-9 shrink-0 place-items-center rounded-lg " + n.tone}>{n.icon}</div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3"><div className="text-sm font-medium">{n.t}</div><div className="text-xs text-muted-foreground">{n.time}</div></div>
              <div className="mt-0.5 text-sm text-muted-foreground">{n.b}</div>
            </div>
          </div>
        ))}
      </Card>
    </PageContainer>
  );
}
