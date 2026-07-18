import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle } from "@/components/ui-kit/Page";
import { Languages, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/multilingual")({
  head: () => ({ meta: [{ title: "Multilingual — FIFA Smart Stadium" }, { name: "description", content: "Instant translation across 8+ languages. Auto-detect and speak your language." }] }),
  component: Multi,
});

const LANGS = ["English", "Spanish", "French", "Portuguese", "Arabic", "Hindi", "Japanese", "Korean"];

function Multi() {
  const [from, setFrom] = useState("English");
  const [to, setTo] = useState("Spanish");
  const [text, setText] = useState("Where is the nearest restroom?");
  return (
    <PageContainer>
      <PageHeader eyebrow="Multilingual" title="Speak the stadium's language" description="Auto-detect, translate, and speak in 8+ languages instantly." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-2 flex items-center justify-between text-xs">
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-lg border border-border bg-background px-2 py-1.5 text-sm">
              {LANGS.map((l) => <option key={l}>{l}</option>)}
            </select>
            <span className="text-muted-foreground">Auto-detect enabled</span>
          </div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className="w-full resize-none rounded-xl border border-input bg-background p-3 text-sm outline-none focus:ring-focus" />
        </Card>
        <Card>
          <div className="mb-2 flex items-center justify-between text-xs">
            <select value={to} onChange={(e) => setTo(e.target.value)} className="rounded-lg border border-border bg-background px-2 py-1.5 text-sm">
              {LANGS.map((l) => <option key={l}>{l}</option>)}
            </select>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground"><Sparkles className="h-3.5 w-3.5" /> Translate</button>
          </div>
          <div className="min-h-[8.5rem] rounded-xl bg-muted p-3 text-sm">¿Dónde está el baño más cercano?</div>
        </Card>
      </div>
      <SectionTitle>Supported languages</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {LANGS.map((l) => (
          <span key={l} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs"><Languages className="h-3.5 w-3.5 text-primary" />{l}</span>
        ))}
      </div>
    </PageContainer>
  );
}
