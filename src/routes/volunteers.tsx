import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle, Stat } from "@/components/ui-kit/Page";
import { HandHeart, ClipboardList, Megaphone } from "lucide-react";

export const Route = createFileRoute("/volunteers")({
  head: () => ({ meta: [{ title: "Volunteers — FIFA Smart Stadium" }, { name: "description", content: "Volunteer tasks, incidents and announcements powered by AI." }] }),
  component: Vol,
});

function Vol() {
  return (
    <PageContainer>
      <PageHeader eyebrow="Volunteers" title="Today's shift" description="Your assigned zone, tasks and AI-generated incident summaries." />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Zone" value="East · Level 2" icon={<HandHeart className="h-5 w-5" />} />
        <Stat label="Tasks open" value="3" tone="warning" icon={<ClipboardList className="h-5 w-5" />} />
        <Stat label="Tasks done" value="14" tone="success" icon={<ClipboardList className="h-5 w-5" />} />
        <Stat label="Shift ends" value="23:30" icon={<Megaphone className="h-5 w-5" />} />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle>Assigned tasks</SectionTitle>
          <ul className="divide-y divide-border">
            {[
              { t: "Guide guest to Section 208", p: "High", tone: "text-destructive" },
              { t: "Restock water at Kiosk 5", p: "Medium", tone: "text-warning" },
              { t: "Confirm Elevator E2 accessible signage", p: "Low", tone: "text-muted-foreground" },
            ].map((r) => (
              <li key={r.t} className="flex items-center justify-between py-3 text-sm">
                <span>{r.t}</span><span className={"text-xs font-medium " + r.tone}>{r.p}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <SectionTitle>AI shift summary</SectionTitle>
          <p className="text-sm text-muted-foreground">Zone East is calm. Expect a wave of arrivals at 19:40. Prioritize wayfinding at Elevator E2 and hydration at Kiosk 5. Great work so far today — 14 tasks completed with 100% resolution.</p>
        </Card>
      </div>
    </PageContainer>
  );
}
