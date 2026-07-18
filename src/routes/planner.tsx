import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle } from "@/components/ui-kit/Page";
import { Sparkles, Clock } from "lucide-react";

export const Route = createFileRoute("/planner")({
  head: () => ({ meta: [{ title: "AI Match Planner — FIFA Smart Stadium" }, { name: "description", content: "AI-generated personalized itinerary for your match day." }] }),
  component: Planner,
});

const STEPS = [
  { time: "17:30", title: "Leave home", body: "Take Metro Line 2 — 34 min. Avoids current traffic on Av. Cuauhtémoc." },
  { time: "18:15", title: "Arrive at Lot P3", body: "AI-recommended parking. 4-minute walk to Gate B." },
  { time: "18:40", title: "Enter through Gate B", body: "Predicted 3-minute wait — the shortest of your 4 eligible gates." },
  { time: "19:10", title: "Dinner at Food Court 3", body: "Vegetarian burrito bowl · 6 min wait · ~$14 · rated 4.7" },
  { time: "20:00", title: "Kickoff", body: "Section 204, Row F, Seat 12. Enjoy the match." },
  { time: "21:00", title: "Half-time" , body: "Skip the rush — refreshments at Kiosk 2B are quieter." },
  { time: "22:05", title: "Exit via Gate D" , body: "Predicted lowest congestion at final whistle." },
  { time: "22:20", title: "Ride home", body: "Metro Line 2 — 38 min. AI holds an alert if delays appear." },
];

function Planner() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Match Planner"
        title="Your AI-generated match day"
        description="Every step optimized for time, crowd, weather, cost and comfort."
        actions={<button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"><Sparkles className="h-4 w-4"/> Regenerate</button>}
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <ol className="relative space-y-6 pl-8">
            <span className="absolute left-3 top-2 bottom-2 w-px bg-border" />
            {STEPS.map((s, i) => (
              <li key={s.time} className="relative">
                <span className="absolute -left-6 top-1 grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">{i + 1}</span>
                <div className="flex items-baseline justify-between gap-3">
                  <div className="text-sm font-medium">{s.title}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{s.time}</div>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{s.body}</div>
              </li>
            ))}
          </ol>
        </Card>
        <div className="space-y-4">
          <Card>
            <SectionTitle>Preferences</SectionTitle>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span className="text-muted-foreground">Diet</span><span className="font-medium">Vegetarian</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Budget</span><span className="font-medium">$$</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Mobility</span><span className="font-medium">Standard</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Language</span><span className="font-medium">English</span></li>
            </ul>
          </Card>
          <Card className="bg-gradient-to-b from-primary/10 to-transparent">
            <div className="mb-1 flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wide"><Sparkles className="h-4 w-4"/>AI note</div>
            <p className="text-sm">Weather is clear all evening — no umbrella needed. Metro Line 2 has a minor delay; leaving 5 min earlier is prudent.</p>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
