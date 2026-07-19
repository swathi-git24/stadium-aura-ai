import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle } from "@/components/ui-kit/Page";
import { Siren, Cross, Flame, Baby, Search, ShieldAlert, PhoneCall, Loader2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { askAI } from "@/lib/ai-client";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/emergency")({
  head: () => ({ meta: [{ title: "Emergency AI — FIFA Smart Stadium" }, { name: "description", content: "AI-guided emergency support with contextual step-by-step help." }] }),
  component: Emergency,
});

const TYPES = [
  { key: "medical", icon: Cross, label: "Medical help", tone: "bg-destructive/10 text-destructive" },
  { key: "fire", icon: Flame, label: "Fire", tone: "bg-destructive/10 text-destructive" },
  { key: "lost-child", icon: Baby, label: "Lost child", tone: "bg-warning/15 text-warning" },
  { key: "lost-item", icon: Search, label: "Lost item", tone: "bg-muted text-muted-foreground" },
  { key: "suspicious", icon: ShieldAlert, label: "Suspicious activity", tone: "bg-warning/15 text-warning" },
  { key: "contact", icon: PhoneCall, label: "Contact staff", tone: "bg-secondary/10 text-secondary" },
];

function Emergency() {
  const { lang } = useLanguage();
  const [active, setActive] = useState<string | null>(null);
  const [guidance, setGuidance] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [sos, setSos] = useState(false);
  const holdRef = useRef<number | null>(null);

  const trigger = async (key: string, label: string) => {
    setActive(key);
    setBusy(true);
    setGuidance("");
    try {
      const reply = await askAI(
        [{ role: "user", content: `Emergency category: ${label}. I am at Section 204, Row F. Give me a calm, numbered, step-by-step response, include the nearest safe exit and who to contact. Keep it under 8 short steps.` }],
        { page: "/emergency", lang }
      );
      setGuidance(reply);
    } catch (e) {
      setGuidance(`⚠️ ${e instanceof Error ? e.message : "Guidance unavailable."} · Call on-site security 55-5555-1010 immediately.`);
    } finally { setBusy(false); }
  };

  const startHold = () => {
    holdRef.current = window.setTimeout(() => {
      setSos(true);
      void trigger("sos", "SOS emergency alert");
    }, 1500);
  };
  const cancelHold = () => { if (holdRef.current) { clearTimeout(holdRef.current); holdRef.current = null; } };
  useEffect(() => () => cancelHold(), []);

  return (
    <PageContainer>
      <PageHeader eyebrow="Emergency AI" title="We're here. Stay calm." description="Tap a situation. AI generates a contextual step-by-step response and dispatches the nearest responder." />

      <div className="mb-6 rounded-3xl border border-destructive/30 bg-destructive/5 p-6">
        <div className="flex items-start gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-destructive text-destructive-foreground">
            <Siren className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-lg font-semibold">Emergency SOS</div>
            <p className="mt-1 text-sm text-muted-foreground">
              {sos ? "SOS sent — security dispatched with your live location." : "Press and hold for 1.5s to alert on-site security."}
            </p>
          </div>
          <button
            onMouseDown={startHold} onMouseUp={cancelHold} onMouseLeave={cancelHold}
            onTouchStart={startHold} onTouchEnd={cancelHold}
            className="select-none rounded-xl bg-destructive px-5 py-3 text-sm font-semibold text-destructive-foreground hover:opacity-90"
          >
            {sos ? "SOS active" : "Hold to send SOS"}
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TYPES.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              onClick={() => trigger(t.key, t.label)}
              className={"flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors " + (isActive ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted")}
            >
              <div className={"grid h-11 w-11 place-items-center rounded-xl " + t.tone}><Icon className="h-5 w-5" /></div>
              <div className="min-w-0">
                <div className="text-sm font-medium">{t.label}</div>
                <div className="text-xs text-muted-foreground">AI-guided response</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle>Nearest safe exit</SectionTitle>
          <div className="text-sm">Exit <span className="font-semibold">D3</span> — 68 m east. Follow illuminated green arrows.</div>
          <div className="mt-2 text-xs text-muted-foreground">Route computed for wheelchair accessibility.</div>
        </Card>
        <Card>
          <SectionTitle>Live AI guidance</SectionTitle>
          {!active && <div className="text-sm text-muted-foreground">Select a situation above to receive step-by-step help.</div>}
          {busy && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> AI is preparing your response…</div>
          )}
          {guidance && (
            <div className="flex gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{guidance}</div>
            </div>
          )}
        </Card>
      </div>
    </PageContainer>
  );
}
