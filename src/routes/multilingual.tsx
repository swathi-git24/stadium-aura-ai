import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle } from "@/components/ui-kit/Page";
import { Languages, Sparkles, Loader2, ArrowLeftRight, Volume2 } from "lucide-react";
import { useState } from "react";
import { LANGUAGES } from "@/lib/language";
import { askAI } from "@/lib/ai-client";

export const Route = createFileRoute("/multilingual")({
  head: () => ({ meta: [{ title: "Multilingual — FIFA Smart Stadium" }, { name: "description", content: "Real-time translation across 8 languages, powered by AI." }] }),
  component: Multi,
});

function Multi() {
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("es");
  const [text, setText] = useState("Where is the nearest restroom?");
  const [out, setOut] = useState("¿Dónde está el baño más cercano?");
  const [busy, setBusy] = useState(false);

  const translate = async () => {
    if (!text.trim() || busy) return;
    setBusy(true);
    try {
      const fromLang = LANGUAGES.find((l) => l.code === from)?.label ?? from;
      const toLang = LANGUAGES.find((l) => l.code === to)?.label ?? to;
      const reply = await askAI(
        [{ role: "user", content: `Translate the following from ${fromLang} to ${toLang}. Reply with the translation only, no quotes, no commentary.\n\n${text}` }],
        { page: "/multilingual", lang: to }
      );
      setOut(reply);
    } catch (e) {
      setOut(`⚠️ ${e instanceof Error ? e.message : "Translation failed."}`);
    } finally { setBusy(false); }
  };

  const swap = () => { setFrom(to); setTo(from); setText(out); setOut(text); };

  const speak = (t: string, code: string) => {
    const synth = window.speechSynthesis;
    if (!synth) return alert("Text-to-speech not supported.");
    synth.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = code;
    synth.speak(u);
  };

  return (
    <PageContainer>
      <PageHeader eyebrow="Multilingual" title="Speak the stadium's language" description="Instant AI translation across 8 languages — including RTL for Arabic." />
      <div className="mb-3 flex items-center justify-center">
        <button onClick={swap} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-elevated px-3 py-1.5 text-xs hover:bg-muted">
          <ArrowLeftRight className="h-3.5 w-3.5" /> Swap
        </button>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-2 flex items-center justify-between text-xs">
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-lg border border-border bg-background px-2 py-1.5 text-sm">
              {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.native}</option>)}
            </select>
            <button onClick={() => speak(text, from)} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted"><Volume2 className="h-4 w-4" /></button>
          </div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} className="w-full resize-none rounded-xl border border-input bg-background p-3 text-sm outline-none focus:ring-focus" />
          <button onClick={translate} disabled={busy} className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">
            {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />} Translate
          </button>
        </Card>
        <Card>
          <div className="mb-2 flex items-center justify-between text-xs">
            <select value={to} onChange={(e) => setTo(e.target.value)} className="rounded-lg border border-border bg-background px-2 py-1.5 text-sm">
              {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.native}</option>)}
            </select>
            <button onClick={() => speak(out, to)} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted"><Volume2 className="h-4 w-4" /></button>
          </div>
          <div dir={to === "ar" ? "rtl" : "ltr"} className="min-h-[10.5rem] whitespace-pre-wrap rounded-xl bg-muted p-3 text-sm">{out}</div>
        </Card>
      </div>
      <SectionTitle>Supported languages</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {LANGUAGES.map((l) => (
          <span key={l.code} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs">
            <Languages className="h-3.5 w-3.5 text-primary" />{l.native}
          </span>
        ))}
      </div>
    </PageContainer>
  );
}
