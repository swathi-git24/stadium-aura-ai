import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle } from "@/components/ui-kit/Page";
import { Volume2, Mic, Eye, Contrast, Keyboard, Accessibility } from "lucide-react";

export const Route = createFileRoute("/accessibility")({
  head: () => ({ meta: [{ title: "Accessibility — FIFA Smart Stadium" }, { name: "description", content: "Voice, text-to-speech, high contrast, larger text, wheelchair routes and more." }] }),
  component: A11y,
});

const TOGGLES = [
  { icon: <Volume2 className="h-4 w-4" />, label: "Text-to-speech", hint: "Read screens aloud" },
  { icon: <Mic className="h-4 w-4" />, label: "Voice navigation", hint: "Control the app with your voice" },
  { icon: <Eye className="h-4 w-4" />, label: "Large text", hint: "Increase body text size" },
  { icon: <Contrast className="h-4 w-4" />, label: "High contrast", hint: "Increase color contrast" },
  { icon: <Contrast className="h-4 w-4" />, label: "Color-blind mode", hint: "Deuteranopia-safe palette" },
  { icon: <Keyboard className="h-4 w-4" />, label: "Keyboard navigation", hint: "Full keyboard shortcuts" },
];

function A11y() {
  return (
    <PageContainer>
      <PageHeader eyebrow="Accessibility" title="Built for everyone" description="Personalize how you see, hear and move through the stadium." />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <SectionTitle>Preferences</SectionTitle>
          <div className="divide-y divide-border">
            {TOGGLES.map((t) => (
              <label key={t.label} className="flex cursor-pointer items-center justify-between py-3.5">
                <span className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-muted-foreground">{t.icon}</span>
                  <span>
                    <div className="text-sm font-medium">{t.label}</div>
                    <div className="text-xs text-muted-foreground">{t.hint}</div>
                  </span>
                </span>
                <input type="checkbox" className="h-5 w-9 appearance-none rounded-full bg-muted transition-colors checked:bg-primary relative before:absolute before:left-0.5 before:top-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-transform checked:before:translate-x-4" />
              </label>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle>Wheelchair route</SectionTitle>
          <div className="rounded-xl bg-muted p-4 text-sm">
            <div className="flex items-center gap-2 font-medium"><Accessibility className="h-4 w-4 text-primary" /> To Section 204</div>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted-foreground">
              <li>Enter via accessible Gate B-1.</li>
              <li>Elevator E2 to Level 2.</li>
              <li>Follow purple accessible-route markers.</li>
            </ol>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
