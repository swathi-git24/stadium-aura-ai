import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle, Stat } from "@/components/ui-kit/Page";
import { Leaf, Recycle, Train, Droplet, Ticket } from "lucide-react";

export const Route = createFileRoute("/sustainability")({
  head: () => ({ meta: [{ title: "Sustainability — FIFA Smart Stadium" }, { name: "description", content: "Carbon footprint, recycling and water stations across the venue." }] }),
  component: Sust,
});

function Sust() {
  return (
    <PageContainer>
      <PageHeader eyebrow="Sustainability" title="A greener match day" description="Small choices add up. Here's your footprint and the greenest options nearby." />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Your CO₂ today" value="3.2 kg" hint="-42% vs. driving" tone="success" icon={<Leaf className="h-5 w-5" />} />
        <Stat label="Recycling bins nearby" value="6" icon={<Recycle className="h-5 w-5" />} />
        <Stat label="Water stations" value="12" icon={<Droplet className="h-5 w-5" />} />
        <Stat label="Paperless tickets" value="94%" hint="venue average" tone="info" icon={<Ticket className="h-5 w-5" />} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle>Greener options for you</SectionTitle>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3"><Train className="mt-0.5 h-4 w-4 text-primary" /> Use Metro Line 2 home — save 4.1 kg CO₂.</li>
            <li className="flex items-start gap-3"><Droplet className="mt-0.5 h-4 w-4 text-primary" /> Refill your bottle at Station W3 — no plastic needed.</li>
            <li className="flex items-start gap-3"><Recycle className="mt-0.5 h-4 w-4 text-primary" /> Nearest bin: Concourse E, next to Kiosk 4.</li>
          </ul>
        </Card>
        <Card>
          <SectionTitle>Venue impact today</SectionTitle>
          <div className="space-y-3 text-sm">
            <Row label="Renewable energy share" value="78%" />
            <Row label="Waste diverted from landfill" value="86%" />
            <Row label="Reusable cups issued" value="41,220" />
            <Row label="Public transit ridership" value="63%" />
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span></div>;
}
