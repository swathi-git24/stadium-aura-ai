import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle } from "@/components/ui-kit/Page";
import { Siren, Cross, Flame, Baby, Search, ShieldAlert, PhoneCall } from "lucide-react";

export const Route = createFileRoute("/emergency")({
  head: () => ({ meta: [{ title: "Emergency AI — FIFA Smart Stadium" }, { name: "description", content: "AI-guided emergency support: medical, fire, lost child, SOS with nearest safe exit." }] }),
  component: Emergency,
});

const TYPES = [
  { icon: <Cross className="h-5 w-5" />, label: "Medical help", tone: "bg-destructive/10 text-destructive" },
  { icon: <Flame className="h-5 w-5" />, label: "Fire", tone: "bg-destructive/10 text-destructive" },
  { icon: <Baby className="h-5 w-5" />, label: "Lost child", tone: "bg-warning/15 text-warning" },
  { icon: <Search className="h-5 w-5" />, label: "Lost item", tone: "bg-muted text-muted-foreground" },
  { icon: <ShieldAlert className="h-5 w-5" />, label: "Suspicious activity", tone: "bg-warning/15 text-warning" },
  { icon: <PhoneCall className="h-5 w-5" />, label: "Contact staff", tone: "bg-secondary/10 text-secondary" },
];

function Emergency() {
  return (
    <PageContainer>
      <PageHeader eyebrow="Emergency AI" title="We're here. Stay calm." description="Tap the situation. AI will guide you step-by-step and dispatch the nearest responder." />

      <div className="mb-6 rounded-3xl border border-destructive/30 bg-destructive/5 p-6">
        <div className="flex items-start gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-destructive text-destructive-foreground">
            <Siren className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-lg font-semibold">Emergency SOS</div>
            <p className="mt-1 text-sm text-muted-foreground">Press and hold to alert on-site security with your live location.</p>
          </div>
          <button className="rounded-xl bg-destructive px-5 py-3 text-sm font-semibold text-destructive-foreground hover:opacity-90">
            Hold to send SOS
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TYPES.map((t) => (
          <button key={t.label} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left hover:bg-muted">
            <div className={"grid h-11 w-11 place-items-center rounded-xl " + t.tone}>{t.icon}</div>
            <div className="min-w-0">
              <div className="text-sm font-medium">{t.label}</div>
              <div className="text-xs text-muted-foreground">AI-guided response</div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle>Nearest safe exit</SectionTitle>
          <div className="text-sm">Exit <span className="font-semibold">D3</span> — 68 m east. Follow illuminated green arrows.</div>
          <div className="mt-2 text-xs text-muted-foreground">Route computed for wheelchair accessibility.</div>
        </Card>
        <Card>
          <SectionTitle>Live guidance</SectionTitle>
          <ol className="list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
            <li>Stay where you are unless in immediate danger.</li>
            <li>A responder is 2 minutes from your location.</li>
            <li>Keep the line open — the AI will translate for staff.</li>
          </ol>
        </Card>
      </div>
    </PageContainer>
  );
}
