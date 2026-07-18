import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle } from "@/components/ui-kit/Page";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — FIFA Smart Stadium" }, { name: "description", content: "Notification, privacy and app preferences." }] }),
  component: SettingsPage,
});

const GROUPS = [
  { title: "Notifications", items: ["Match reminders", "Gate changes", "Transport alerts", "AI recommendations", "Emergency broadcasts"] },
  { title: "Privacy", items: ["Share live location with AI", "Share preferences for recommendations", "Anonymous crowd analytics"] },
  { title: "App", items: ["Sound effects", "Haptic feedback", "Offline mode"] },
];

function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader eyebrow="Account" title="Settings" description="Fine-tune the experience to your liking." />
      <div className="grid gap-6 lg:grid-cols-3">
        {GROUPS.map((g) => (
          <Card key={g.title}>
            <SectionTitle>{g.title}</SectionTitle>
            <div className="divide-y divide-border">
              {g.items.map((i) => (
                <label key={i} className="flex cursor-pointer items-center justify-between py-3 text-sm">
                  <span>{i}</span>
                  <input type="checkbox" defaultChecked className="h-5 w-9 appearance-none rounded-full bg-muted transition-colors checked:bg-primary relative before:absolute before:left-0.5 before:top-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-transform checked:before:translate-x-4" />
                </label>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
