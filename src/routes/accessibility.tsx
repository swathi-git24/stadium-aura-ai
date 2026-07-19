import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle } from "@/components/ui-kit/Page";
import { Volume2, Mic, Eye, Contrast, Keyboard, Accessibility, Zap } from "lucide-react";
import { usePrefs } from "@/lib/preferences";
import { ACCESSIBILITY } from "@/lib/venue-data";

export const Route = createFileRoute("/accessibility")({
  head: () => ({ meta: [{ title: "Accessibility — FIFA Smart Stadium" }, { name: "description", content: "Persistent accessibility preferences, wheelchair routing, sensory support, translation." }] }),
  component: A11y,
});

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={"relative h-6 w-11 rounded-full transition-colors " + (checked ? "bg-primary" : "bg-muted")}
    >
      <span className={"absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform " + (checked ? "translate-x-5" : "translate-x-0.5")} />
    </button>
  );
}

function speak(text: string, lang = "en-US") {
  const synth = window.speechSynthesis;
  if (!synth) return alert("Text-to-speech is not supported in this browser.");
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  synth.speak(u);
}

function A11y() {
  const { prefs, setPref } = usePrefs();

  const items = [
    { key: "largeText" as const, icon: <Eye className="h-4 w-4" />, label: "Large text", hint: "Increase body text size" },
    { key: "highContrast" as const, icon: <Contrast className="h-4 w-4" />, label: "High contrast", hint: "Bolder borders and text" },
    { key: "reduceMotion" as const, icon: <Zap className="h-4 w-4" />, label: "Reduce motion", hint: "Disable non-essential animations" },
  ];

  return (
    <PageContainer>
      <PageHeader eyebrow="Accessibility" title="Built for everyone" description="Preferences persist across sessions and apply site-wide." />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <SectionTitle>Preferences</SectionTitle>
          <div className="divide-y divide-border">
            {items.map((t) => (
              <div key={t.key} className="flex items-center justify-between py-3.5">
                <span className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-muted-foreground">{t.icon}</span>
                  <span>
                    <div className="text-sm font-medium">{t.label}</div>
                    <div className="text-xs text-muted-foreground">{t.hint}</div>
                  </span>
                </span>
                <Toggle checked={prefs[t.key]} onChange={(v) => setPref(t.key, v)} />
              </div>
            ))}
            <div className="flex items-center justify-between py-3.5">
              <span className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-muted-foreground"><Volume2 className="h-4 w-4" /></span>
                <span>
                  <div className="text-sm font-medium">Text-to-speech</div>
                  <div className="text-xs text-muted-foreground">Read directions aloud</div>
                </span>
              </span>
              <button onClick={() => speak("Your seat is Section 204, Row F. Nearest gate is Gate B, three minutes east.")} className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs hover:bg-muted">
                Preview
              </button>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-muted-foreground"><Mic className="h-4 w-4" /></span>
                <span>
                  <div className="text-sm font-medium">Voice input</div>
                  <div className="text-xs text-muted-foreground">Use the mic in the AI Assistant</div>
                </span>
              </span>
              <Link to="/assistant" className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs hover:bg-muted">Open</Link>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-muted-foreground"><Keyboard className="h-4 w-4" /></span>
                <span>
                  <div className="text-sm font-medium">Keyboard shortcuts</div>
                  <div className="text-xs text-muted-foreground">Cmd/Ctrl+K to search</div>
                </span>
              </span>
              <span className="rounded-md border border-border px-2 py-1 font-mono text-[11px]">⌘K</span>
            </div>
          </div>
        </Card>

        <Card>
          <SectionTitle>Accessible services</SectionTitle>
          <ul className="space-y-2 text-sm">
            {ACCESSIBILITY.map((a) => (
              <li key={a.id} className="rounded-xl bg-muted p-3">
                <div className="flex items-center gap-2 font-medium"><Accessibility className="h-4 w-4 text-primary" />{a.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{a.detail}</div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </PageContainer>
  );
}
