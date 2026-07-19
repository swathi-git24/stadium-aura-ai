import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle } from "@/components/ui-kit/Page";
import { Train, Bus, Car, Bike, PersonStanding, ParkingSquare, Sparkles, Loader2, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { TRANSPORT } from "@/lib/venue-data";
import { askAI } from "@/lib/ai-client";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/transport")({
  head: () => ({ meta: [{ title: "Transportation — FIFA Smart Stadium" }, { name: "description", content: "Compare live transport with AI recommendations and step-by-step routing." }] }),
  component: Transport,
});

const ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  "metro-2": Train, "bus-76": Bus, taxi: Car, ride: Car, bike: Bike, walk: PersonStanding, drive: ParkingSquare,
};

type SortKey = "ai" | "time" | "cost";

function Transport() {
  const { lang } = useLanguage();
  const [selected, setSelected] = useState<string>("metro-2");
  const [sort, setSort] = useState<SortKey>("ai");
  const [route, setRoute] = useState<string>("");
  const [busy, setBusy] = useState(false);

  const options = useMemo(() => {
    const arr = [...TRANSPORT];
    if (sort === "time") arr.sort((a, b) => Number(a.meta?.time ?? 999) - Number(b.meta?.time ?? 999));
    else if (sort === "cost") arr.sort((a, b) => Number(a.meta?.cost ?? 999) - Number(b.meta?.cost ?? 999));
    return arr;
  }, [sort]);

  const pick = options[0];

  const startRoute = async (id: string, name: string) => {
    setSelected(id);
    setBusy(true);
    setRoute("");
    try {
      const reply = await askAI(
        [{ role: "user", content: `I want to take ${name} to Estadio Azteca right now. Give me a short numbered turn-by-turn route (max 6 steps), include time and cost, and note current crowd/traffic.` }],
        { page: "/transport", lang }
      );
      setRoute(reply);
    } catch (e) {
      setRoute(`⚠️ ${e instanceof Error ? e.message : "Routing unavailable."}`);
    } finally { setBusy(false); }
  };

  return (
    <PageContainer>
      <PageHeader eyebrow="Transportation" title="Get to the stadium" description="Live options with AI recommendation and step-by-step routing." />

      <Card className="mb-6 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 text-primary" />
          <div className="flex-1">
            <div className="text-sm font-semibold">AI recommends {pick.name}</div>
            <p className="mt-0.5 text-sm text-muted-foreground">{pick.detail} · Fastest and lowest-stress right now.</p>
          </div>
          <button onClick={() => startRoute(pick.id, pick.name)} className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">Start route</button>
        </div>
      </Card>

      <div className="mb-3 flex items-center gap-2 text-xs">
        <span className="text-muted-foreground">Sort by</span>
        {(["ai", "time", "cost"] as SortKey[]).map((k) => (
          <button key={k} onClick={() => setSort(k)} className={"rounded-full border px-2.5 py-1 " + (sort === k ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted")}>
            {k === "ai" ? "AI pick" : k}
          </button>
        ))}
      </div>

      <Card className="p-0">
        <div className="grid grid-cols-[minmax(0,1.4fr)_1fr_1fr_1fr_auto] gap-4 border-b border-border px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div>Mode</div><div>Time</div><div>Cost</div><div>Status</div><div>Action</div>
        </div>
        {options.map((o) => {
          const Icon = ICON[o.id] ?? Car;
          const isSelected = selected === o.id;
          return (
            <div key={o.id} id={o.hash?.slice(1)} className={"grid grid-cols-[minmax(0,1.4fr)_1fr_1fr_1fr_auto] items-center gap-4 border-b border-border/60 px-5 py-3.5 last:border-0 " + (isSelected ? "bg-primary/5" : "")}>
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground"><Icon className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 truncate text-sm font-medium">
                    {o.name}
                    {o.id === pick.id && sort === "ai" && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">AI pick</span>}
                  </div>
                </div>
              </div>
              <div className="text-sm">{o.meta?.time ?? "—"} min</div>
              <div className="text-sm">{o.meta?.cost === 0 ? "Free" : `$${o.meta?.cost}`}</div>
              <div className="text-sm text-muted-foreground">{o.detail?.split("·").pop()?.trim() ?? "—"}</div>
              <button onClick={() => startRoute(o.id, o.name)} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs hover:bg-muted">
                {isSelected ? <><Check className="h-3.5 w-3.5 text-primary" /> Selected</> : "Select"}
              </button>
            </div>
          );
        })}
      </Card>

      {(busy || route) && (
        <Card className="mt-6">
          <SectionTitle>Turn-by-turn</SectionTitle>
          {busy ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Building your route…</div>
          ) : (
            <div className="whitespace-pre-wrap text-sm leading-relaxed">{route}</div>
          )}
        </Card>
      )}
    </PageContainer>
  );
}
