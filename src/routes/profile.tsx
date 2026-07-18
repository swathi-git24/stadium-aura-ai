import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle } from "@/components/ui-kit/Page";
import { Ticket, Globe, Heart } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — FIFA Smart Stadium" }, { name: "description", content: "Your tickets, preferences and personalization." }] }),
  component: Profile,
});

function Profile() {
  return (
    <PageContainer>
      <PageHeader eyebrow="Account" title="Your profile" />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-2xl font-semibold text-primary-foreground">AR</div>
            <div>
              <div className="text-lg font-semibold">Alex Ramirez</div>
              <div className="text-sm text-muted-foreground">Fan · Mexico City</div>
            </div>
          </div>
          <div className="mt-6 space-y-2 text-sm">
            <Row label="Language" value="English" />
            <Row label="Diet" value="Vegetarian" />
            <Row label="Mobility" value="Standard" />
            <Row label="Favorite team" value="El Tri" />
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <SectionTitle>My tickets</SectionTitle>
          <div className="space-y-3">
            {[
              { m: "Mexico vs. Canada", d: "Jun 12 · 20:00", s: "Sec 204 · Row F · 12" },
              { m: "Brazil vs. Portugal", d: "Jun 18 · 17:00", s: "Sec 118 · Row K · 3" },
            ].map((t) => (
              <div key={t.m} className="flex items-center gap-4 rounded-xl border border-border p-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><Ticket className="h-5 w-5" /></div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{t.m}</div>
                  <div className="text-xs text-muted-foreground">{t.d} · {t.s}</div>
                </div>
                <button className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs hover:bg-muted">View</button>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <Mini icon={<Globe className="h-4 w-4" />} label="Countries" value="8" />
            <Mini icon={<Heart className="h-4 w-4" />} label="Matches attended" value="23" />
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
function Row({ label, value }: { label: string; value: string }) { return <div className="flex items-center justify-between"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span></div>; }
function Mini({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="rounded-xl border border-border p-3"><div className="flex items-center gap-2 text-xs text-muted-foreground">{icon}{label}</div><div className="mt-1 text-lg font-semibold">{value}</div></div>; }
