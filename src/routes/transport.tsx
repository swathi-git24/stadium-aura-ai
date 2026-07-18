import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle } from "@/components/ui-kit/Page";
import { Train, Bus, Car, Bike, PersonStanding, ParkingSquare, Sparkles } from "lucide-react";

export const Route = createFileRoute("/transport")({
  head: () => ({ meta: [{ title: "Transportation — FIFA Smart Stadium" }, { name: "description", content: "Compare metro, bus, taxi, ride share, walking and parking with AI recommendations." }] }),
  component: Transport,
});

const OPTIONS = [
  { icon: <Train className="h-5 w-5" />, mode: "Metro Line 2", time: "14 min", cost: "$1", traffic: "Low", rec: true },
  { icon: <Bus className="h-5 w-5" />, mode: "Bus 76", time: "28 min", cost: "$0.60", traffic: "Medium" },
  { icon: <Car className="h-5 w-5" />, mode: "Ride share", time: "22 min", cost: "$14", traffic: "Light" },
  { icon: <Car className="h-5 w-5" />, mode: "Taxi", time: "24 min", cost: "$17", traffic: "Light" },
  { icon: <Bike className="h-5 w-5" />, mode: "Bike share", time: "32 min", cost: "$3", traffic: "—" },
  { icon: <PersonStanding className="h-5 w-5" />, mode: "Walk", time: "38 min", cost: "Free", traffic: "—" },
  { icon: <ParkingSquare className="h-5 w-5" />, mode: "Drive · Lot P3", time: "19 min", cost: "$12", traffic: "Moderate" },
];

function Transport() {
  return (
    <PageContainer>
      <PageHeader eyebrow="Transportation" title="Get to the stadium" description="Compare every option — with live traffic, cost and AI recommendation." />
      <Card className="mb-6 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <div className="text-sm font-semibold">AI recommends Metro Line 2</div>
            <p className="mt-0.5 text-sm text-muted-foreground">Fastest and lowest-stress. Direct to Estadio Azteca station · 3 stops · low crowd right now.</p>
          </div>
        </div>
      </Card>
      <Card className="p-0">
        <div className="grid grid-cols-[minmax(0,1.4fr)_1fr_1fr_1fr_auto] gap-4 border-b border-border px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div>Mode</div><div>Time</div><div>Cost</div><div>Traffic</div><div>Action</div>
        </div>
        {OPTIONS.map((o) => (
          <div key={o.mode} className="grid grid-cols-[minmax(0,1.4fr)_1fr_1fr_1fr_auto] items-center gap-4 border-b border-border/60 px-5 py-3.5 last:border-0">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">{o.icon}</div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 truncate text-sm font-medium">{o.mode}
                  {o.rec && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">AI pick</span>}
                </div>
              </div>
            </div>
            <div className="text-sm">{o.time}</div>
            <div className="text-sm">{o.cost}</div>
            <div className="text-sm text-muted-foreground">{o.traffic}</div>
            <button className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs hover:bg-muted">Select</button>
          </div>
        ))}
      </Card>
    </PageContainer>
  );
}
