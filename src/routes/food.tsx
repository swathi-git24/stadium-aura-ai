import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader } from "@/components/ui-kit/Page";
import { Star, Timer } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/food")({
  head: () => ({ meta: [{ title: "Food & Drinks — FIFA Smart Stadium" }, { name: "description", content: "Nearby food with AI recommendations, dietary filters and wait times." }] }),
  component: Food,
});

const TAGS = ["All", "Vegetarian", "Vegan", "Halal", "Gluten Free", "Budget"];
const ITEMS = [
  { name: "Burrito Bowl", stall: "Court 3 · Kiosk 2B", tags: ["Vegetarian", "Gluten Free"], wait: 6, price: 14, rating: 4.7 },
  { name: "Chicken Shawarma", stall: "Court 1 · Kiosk 5", tags: ["Halal"], wait: 9, price: 12, rating: 4.6 },
  { name: "Vegan Ramen", stall: "Court 4 · Kiosk 3", tags: ["Vegan"], wait: 12, price: 15, rating: 4.5 },
  { name: "Classic Hot Dog", stall: "Concourse A · Kiosk 1", tags: ["Budget"], wait: 3, price: 6, rating: 4.2 },
  { name: "Margherita Pizza", stall: "Court 2 · Kiosk 4", tags: ["Vegetarian"], wait: 8, price: 11, rating: 4.5 },
  { name: "Falafel Wrap", stall: "Court 5 · Kiosk 7", tags: ["Vegan", "Halal"], wait: 5, price: 10, rating: 4.8 },
];

function Food() {
  const [tag, setTag] = useState("All");
  const list = tag === "All" ? ITEMS : ITEMS.filter((i) => i.tags.includes(tag));
  return (
    <PageContainer>
      <PageHeader eyebrow="Food & Drinks" title="What are you craving?" description="AI-ranked by proximity, wait time, popularity and your preferences." />
      <div className="mb-5 flex flex-wrap gap-2">
        {TAGS.map((t) => (
          <button key={t} onClick={() => setTag(t)} className={"rounded-full border px-3 py-1.5 text-xs font-medium transition-colors " + (tag === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-muted")}>{t}</button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((i) => (
          <Card key={i.name}>
            <div className="mb-2 flex items-start justify-between gap-2">
              <div>
                <div className="text-sm font-semibold">{i.name}</div>
                <div className="text-xs text-muted-foreground">{i.stall}</div>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium"><Star className="h-3.5 w-3.5 fill-accent text-accent" />{i.rating}</div>
            </div>
            <div className="mb-3 flex flex-wrap gap-1">{i.tags.map((t) => <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{t}</span>)}</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Timer className="h-3.5 w-3.5" /> {i.wait} min wait</div>
              <div className="text-sm font-semibold">${i.price}</div>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
