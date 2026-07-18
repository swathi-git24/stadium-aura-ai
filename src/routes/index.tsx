import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users, Car, Train, CloudSun, DoorOpen, ShieldAlert, Sparkles, ArrowRight,
  MapPin, Ticket, Clock, TrendingUp, ChevronRight,
} from "lucide-react";
import { Card, PageContainer, PageHeader, SectionTitle, Stat } from "@/components/ui-kit/Page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — FIFA Smart Stadium" },
      { name: "description", content: "Live stadium status, crowd, weather, gates, parking and your personalized match day timeline." },
      { property: "og:title", content: "FIFA Smart Stadium — Home" },
      { property: "og:description", content: "Your AI-powered command center for World Cup 2026 match days." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageContainer>
      {/* Hero */}
      <section className="mb-8 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="grid gap-8 p-6 md:grid-cols-[1.4fr_1fr] md:p-10">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs">
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success text-success"><span className="pulse-dot" /></span>
              <span className="font-medium">Match day · Live</span>
              <span className="text-muted-foreground">Estadio Azteca</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Good afternoon, Alex.
              <span className="block text-muted-foreground">Kickoff in 2h 14m.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Your route, gate and seat are ready. Crowd density is calm at Gate B — the recommended entrance for you today.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/navigation" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
                Navigate to my seat <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/planner" className="inline-flex items-center gap-2 rounded-xl border border-border bg-elevated px-4 py-2.5 text-sm font-medium hover:bg-muted">
                <Sparkles className="h-4 w-4 text-primary" /> Open Match Planner
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MiniInfo icon={<Ticket className="h-4 w-4" />} label="Section" value="204 · Row F" />
            <MiniInfo icon={<DoorOpen className="h-4 w-4" />} label="Gate" value="B — East" />
            <MiniInfo icon={<Clock className="h-4 w-4" />} label="Kickoff" value="20:00" />
            <MiniInfo icon={<CloudSun className="h-4 w-4" />} label="Weather" value="24° Clear" />
          </div>
        </div>
      </section>

      {/* Live stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Attendance" value="64,812" hint="of 87,000 capacity" icon={<Users className="h-5 w-5" />} tone="info" />
        <Stat label="Crowd level" value="Calm" hint="AI: comfortable flow" icon={<TrendingUp className="h-5 w-5" />} tone="success" />
        <Stat label="Gate B wait" value="3 min" hint="Recommended entry" icon={<DoorOpen className="h-5 w-5" />} />
        <Stat label="Parking" value="42%" hint="Lot P3 available" icon={<Car className="h-5 w-5" />} tone="warning" />
      </div>

      {/* Two columns */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <SectionTitle action={<Link to="/planner" className="text-xs text-primary hover:underline">Open planner</Link>}>
              Your match day timeline
            </SectionTitle>
            <ol className="relative space-y-5 pl-6">
              <span className="absolute left-2 top-2 bottom-2 w-px bg-border" />
              {TIMELINE.map((t) => (
                <li key={t.time} className="relative">
                  <span className={"absolute -left-6 top-1.5 h-3 w-3 rounded-full " + t.dot} />
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium">{t.title}</div>
                      <div className="text-xs text-muted-foreground">{t.hint}</div>
                    </div>
                    <div className="shrink-0 text-xs font-medium text-muted-foreground">{t.time}</div>
                  </div>
                </li>
              ))}
            </ol>
          </Card>

          <Card>
            <SectionTitle action={<Link to="/notifications" className="text-xs text-primary hover:underline">View all</Link>}>
              Recent alerts
            </SectionTitle>
            <div className="divide-y divide-border">
              {ALERTS.map((a) => (
                <div key={a.title} className="flex items-start gap-3 py-3">
                  <div className={"grid h-9 w-9 shrink-0 place-items-center rounded-lg " + a.tone}>{a.icon}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="truncate text-sm font-medium">{a.title}</div>
                      <div className="shrink-0 text-xs text-muted-foreground">{a.time}</div>
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{a.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-gradient-to-b from-primary/10 to-transparent">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Quick AI</span>
            </div>
            <div className="text-sm font-medium">Ask the stadium anything.</div>
            <p className="mt-1 text-xs text-muted-foreground">Directions, food, translations, medical help — instant answers in your language.</p>
            <div className="mt-4 space-y-1.5">
              {QUICK.map((q) => (
                <Link key={q.to} to={q.to} className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-muted">
                  <span>{q.label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </Card>

          <Card>
            <SectionTitle>Transportation</SectionTitle>
            <div className="space-y-3">
              {TRANSPORT.map((t) => (
                <div key={t.mode} className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-muted-foreground">{t.icon}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between">
                      <div className="text-sm font-medium">{t.mode}</div>
                      <div className="text-xs text-muted-foreground">{t.eta}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{t.hint}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-destructive/30 bg-destructive/5">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-destructive text-destructive-foreground">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">Emergency SOS</div>
                <p className="mt-0.5 text-xs text-muted-foreground">One-tap AI-guided help — medical, lost child, safety.</p>
                <Link to="/emergency" className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground hover:opacity-90">
                  Open Emergency AI
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}

function MiniInfo({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {icon}{label}
      </div>
      <div className="mt-1.5 text-base font-semibold tracking-tight">{value}</div>
    </div>
  );
}

const TIMELINE = [
  { time: "17:30", title: "Leave home", hint: "Metro Line 2 → Estadio Azteca · 34 min", dot: "bg-muted-foreground/40" },
  { time: "18:15", title: "Arrive at Lot P3", hint: "AI-recommended parking · 4 min walk", dot: "bg-secondary" },
  { time: "18:40", title: "Enter Gate B", hint: "Least crowded · 3 min wait", dot: "bg-primary" },
  { time: "19:10", title: "Grab dinner at Court 3", hint: "Vegetarian option · 6 min wait", dot: "bg-accent" },
  { time: "20:00", title: "Kickoff", hint: "Seat 204 · Row F · 12", dot: "bg-success" },
  { time: "22:05", title: "Exit via Gate D", hint: "Predicted lowest congestion", dot: "bg-muted-foreground/40" },
];

const ALERTS = [
  { title: "Gate B open for entry", body: "Your recommended entrance has short lines right now.", time: "just now", tone: "bg-success/15 text-success", icon: <DoorOpen className="h-4 w-4" /> },
  { title: "Metro Line 2 slight delay", body: "Estimated +6 min. Consider Lot P3 shuttle.", time: "4m", tone: "bg-warning/15 text-warning", icon: <Train className="h-4 w-4" /> },
  { title: "Clear skies over Azteca", body: "24°C, no rain expected during match.", time: "12m", tone: "bg-info/15 text-secondary", icon: <CloudSun className="h-4 w-4" /> },
];

const QUICK = [
  { to: "/map", label: "Find my seat" },
  { to: "/food", label: "Vegetarian food nearby" },
  { to: "/accessibility", label: "Wheelchair route" },
  { to: "/multilingual", label: "Translate a sign" },
];

const TRANSPORT = [
  { mode: "Metro Line 2", eta: "14 min", hint: "3 stops · low crowd", icon: <Train className="h-4 w-4" /> },
  { mode: "Ride share", eta: "22 min", hint: "$14 · light traffic", icon: <Car className="h-4 w-4" /> },
  { mode: "Walk", eta: "38 min", hint: "Scenic route", icon: <MapPin className="h-4 w-4" /> },
];
