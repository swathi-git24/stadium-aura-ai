// Central venue data — used by search, map, transport, emergency, AI context.

export type EntityKind =
  | "gate"
  | "seat"
  | "food"
  | "restroom"
  | "medical"
  | "parking"
  | "transport"
  | "accessibility"
  | "volunteer"
  | "faq"
  | "emergency"
  | "page";

export type Entity = {
  id: string;
  kind: EntityKind;
  name: string;
  detail?: string;
  keywords?: string[];
  route: string;      // page to navigate to
  hash?: string;      // optional #anchor
  meta?: Record<string, string | number>;
};

export const GATES: Entity[] = [
  { id: "gate-a", kind: "gate", name: "Gate A — North", detail: "Family entrance · low crowd", route: "/map", keywords: ["north", "family", "entrance"], meta: { wait: 4, crowd: "low" } },
  { id: "gate-b", kind: "gate", name: "Gate B — East", detail: "Recommended · 3 min wait", route: "/map", keywords: ["east", "recommended"], meta: { wait: 3, crowd: "calm" } },
  { id: "gate-c", kind: "gate", name: "Gate C — South", detail: "Busy · avoid if possible", route: "/map", keywords: ["south", "busy"], meta: { wait: 14, crowd: "high" } },
  { id: "gate-d", kind: "gate", name: "Gate D — West", detail: "VIP + accessible entrance", route: "/map", keywords: ["west", "vip", "accessible"], meta: { wait: 6, crowd: "medium" } },
];

export const FOOD: Entity[] = [
  { id: "food-1", kind: "food", name: "Court 1 — Tacos & Grill", detail: "8 min wait · halal available", route: "/food", keywords: ["tacos", "grill", "halal", "meat"], meta: { wait: 8 } },
  { id: "food-2", kind: "food", name: "Court 2 — Pizza & Pasta", detail: "12 min wait · vegetarian", route: "/food", keywords: ["pizza", "pasta", "vegetarian", "italian"], meta: { wait: 12 } },
  { id: "food-3", kind: "food", name: "Court 3 — Bowls & Salads", detail: "5 min wait · vegan · gluten-free", route: "/food", keywords: ["salad", "bowl", "vegan", "gluten-free", "healthy"], meta: { wait: 5 } },
  { id: "food-4", kind: "food", name: "Court 4 — Burgers", detail: "16 min wait", route: "/food", keywords: ["burger", "fries", "american"], meta: { wait: 16 } },
  { id: "food-5", kind: "food", name: "Kids Zone — Snacks", detail: "3 min wait · kid-friendly", route: "/food", keywords: ["kids", "snacks", "candy", "children"], meta: { wait: 3 } },
];

export const RESTROOMS: Entity[] = [
  { id: "wc-1", kind: "restroom", name: "Restroom — Section 204", detail: "Closest to Gate B", route: "/map", keywords: ["toilet", "bathroom", "wc"] },
  { id: "wc-2", kind: "restroom", name: "Restroom — Section 118", detail: "Wheelchair accessible", route: "/map", keywords: ["toilet", "bathroom", "accessible", "wheelchair"] },
  { id: "wc-baby", kind: "restroom", name: "Baby Care Room — Level 2", detail: "Changing tables + nursing pods", route: "/accessibility", keywords: ["baby", "nursing", "diaper", "children"] },
];

export const MEDICAL: Entity[] = [
  { id: "med-1", kind: "medical", name: "Medical Room — East Concourse", detail: "24/7 · paramedics on site", route: "/emergency", keywords: ["doctor", "paramedic", "first aid", "medical"] },
  { id: "med-2", kind: "medical", name: "Medical Room — West Concourse", detail: "Nearest to VIP + accessible seats", route: "/emergency", keywords: ["doctor", "nurse", "medical"] },
];

export const PARKING: Entity[] = [
  { id: "p1", kind: "parking", name: "Lot P1 — North", detail: "72% full · $10", route: "/transport", keywords: ["car", "parking", "north"], meta: { fill: 72, cost: 10 } },
  { id: "p2", kind: "parking", name: "Lot P2 — South", detail: "88% full · $8", route: "/transport", keywords: ["car", "parking", "south"], meta: { fill: 88, cost: 8 } },
  { id: "p3", kind: "parking", name: "Lot P3 — East", detail: "42% full · $12 · recommended", route: "/transport", keywords: ["car", "parking", "recommended"], meta: { fill: 42, cost: 12 } },
  { id: "p-acc", kind: "parking", name: "Accessible Parking — Gate D", detail: "Reserved · wheelchair access", route: "/accessibility", keywords: ["accessible", "disabled", "wheelchair"] },
];

export const TRANSPORT: Entity[] = [
  { id: "metro-2", kind: "transport", name: "Metro Line 2 — Estadio Azteca", detail: "14 min · $1 · low crowd", route: "/transport", hash: "#metro", keywords: ["metro", "subway", "train"], meta: { time: 14, cost: 1 } },
  { id: "bus-76", kind: "transport", name: "Bus 76", detail: "28 min · $0.60", route: "/transport", hash: "#bus", keywords: ["bus"], meta: { time: 28, cost: 0.6 } },
  { id: "taxi", kind: "transport", name: "Taxi", detail: "24 min · $17", route: "/transport", hash: "#taxi", keywords: ["taxi", "cab"], meta: { time: 24, cost: 17 } },
  { id: "ride", kind: "transport", name: "Ride Share", detail: "22 min · $14", route: "/transport", hash: "#ride", keywords: ["uber", "lyft", "ride"], meta: { time: 22, cost: 14 } },
  { id: "bike", kind: "transport", name: "Bike Share", detail: "32 min · $3", route: "/transport", hash: "#bike", keywords: ["bike", "cycling"], meta: { time: 32, cost: 3 } },
  { id: "walk", kind: "transport", name: "Walking Route", detail: "38 min · free", route: "/transport", hash: "#walk", keywords: ["walk", "on foot"], meta: { time: 38, cost: 0 } },
  { id: "drive", kind: "transport", name: "Drive · Lot P3", detail: "19 min · $12 parking", route: "/transport", hash: "#drive", keywords: ["car", "drive", "parking"], meta: { time: 19, cost: 12 } },
];

export const ACCESSIBILITY: Entity[] = [
  { id: "acc-wc", kind: "accessibility", name: "Wheelchair Route from Gate D", detail: "Step-free · elevators marked", route: "/accessibility", keywords: ["wheelchair", "step-free"] },
  { id: "acc-audio", kind: "accessibility", name: "Audio Descriptive Commentary", detail: "Available in EN/ES · headset at Gate B", route: "/accessibility", keywords: ["blind", "audio", "vision"] },
  { id: "acc-sign", kind: "accessibility", name: "Sign Language Interpreter", detail: "Section 118 · Row A", route: "/accessibility", keywords: ["deaf", "sign", "asl"] },
  { id: "acc-sensory", kind: "accessibility", name: "Sensory Room", detail: "Quiet space · Level 2 East", route: "/accessibility", keywords: ["autism", "sensory", "quiet"] },
];

export const VOLUNTEERS: Entity[] = [
  { id: "vol-info", kind: "volunteer", name: "Volunteer Info Desk", detail: "Concourse East · 20 volunteers on shift", route: "/volunteers", keywords: ["help", "volunteer", "staff"] },
  { id: "vol-lang", kind: "volunteer", name: "Multilingual Volunteers", detail: "EN · ES · FR · AR · PT available", route: "/volunteers", keywords: ["translator", "language", "volunteer"] },
];

export const FAQ: Entity[] = [
  { id: "faq-bag", kind: "faq", name: "Bag policy", detail: "Bags up to 30×20×15 cm allowed", route: "/settings", keywords: ["bag", "backpack", "policy"] },
  { id: "faq-cam", kind: "faq", name: "Camera policy", detail: "Personal cameras allowed · no tripods", route: "/settings", keywords: ["camera", "photo"] },
  { id: "faq-reentry", kind: "faq", name: "Re-entry", detail: "Not permitted after entry", route: "/settings", keywords: ["exit", "re-entry"] },
  { id: "faq-lost", kind: "faq", name: "Lost & Found", detail: "Located at Volunteer Info Desk", route: "/volunteers", keywords: ["lost", "found"] },
];

export const EMERGENCY: Entity[] = [
  { id: "em-medical", kind: "emergency", name: "Medical Emergency", route: "/emergency", hash: "#medical", keywords: ["injury", "sick", "faint", "chest"] },
  { id: "em-fire", kind: "emergency", name: "Fire", route: "/emergency", hash: "#fire", keywords: ["smoke", "flame", "burn"] },
  { id: "em-lost-child", kind: "emergency", name: "Lost Child", route: "/emergency", hash: "#lost-child", keywords: ["child", "missing", "kid"] },
  { id: "em-lost-item", kind: "emergency", name: "Lost Item", route: "/emergency", hash: "#lost-item", keywords: ["wallet", "phone", "keys", "lost"] },
  { id: "em-security", kind: "emergency", name: "Security Threat", route: "/emergency", hash: "#security", keywords: ["weapon", "threat", "fight"] },
  { id: "em-suspicious", kind: "emergency", name: "Suspicious Activity", route: "/emergency", hash: "#suspicious", keywords: ["suspicious", "unattended", "bag"] },
  { id: "em-disaster", kind: "emergency", name: "Natural Disaster", route: "/emergency", hash: "#disaster", keywords: ["earthquake", "storm", "flood"] },
];

export const PAGES: Entity[] = [
  { id: "p-home", kind: "page", name: "Home", route: "/", keywords: ["home", "dashboard"] },
  { id: "p-live", kind: "page", name: "Live Stadium", route: "/live", keywords: ["live", "match"] },
  { id: "p-map", kind: "page", name: "Interactive Map", route: "/map", keywords: ["map"] },
  { id: "p-nav", kind: "page", name: "Navigation", route: "/navigation", keywords: ["navigate", "direction"] },
  { id: "p-ai", kind: "page", name: "AI Assistant", route: "/assistant", keywords: ["assistant", "ai", "chat"] },
  { id: "p-planner", kind: "page", name: "Match Planner", route: "/planner", keywords: ["planner", "itinerary"] },
  { id: "p-crowd", kind: "page", name: "Crowd Intelligence", route: "/crowd", keywords: ["crowd"] },
  { id: "p-lang", kind: "page", name: "Multilingual", route: "/multilingual", keywords: ["translate", "language"] },
  { id: "p-transport", kind: "page", name: "Transportation", route: "/transport", keywords: ["transport"] },
  { id: "p-food", kind: "page", name: "Food & Drinks", route: "/food", keywords: ["food", "drink"] },
  { id: "p-acc", kind: "page", name: "Accessibility", route: "/accessibility", keywords: ["accessibility"] },
  { id: "p-em", kind: "page", name: "Emergency AI", route: "/emergency", keywords: ["emergency", "sos"] },
  { id: "p-vol", kind: "page", name: "Volunteers", route: "/volunteers", keywords: ["volunteers"] },
  { id: "p-ops", kind: "page", name: "Operations", route: "/operations", keywords: ["ops"] },
  { id: "p-notif", kind: "page", name: "Notifications", route: "/notifications", keywords: ["notifications"] },
  { id: "p-profile", kind: "page", name: "Profile", route: "/profile", keywords: ["profile"] },
  { id: "p-settings", kind: "page", name: "Settings", route: "/settings", keywords: ["settings"] },
];

// Generate a few sample seats deterministically
export const SEATS: Entity[] = [];
for (const section of ["101", "118", "204", "312"]) {
  for (const row of ["A", "F", "M"]) {
    SEATS.push({
      id: `seat-${section}-${row}`,
      kind: "seat",
      name: `Section ${section} · Row ${row}`,
      detail: section === "204" ? "Your seat · Gate B" : "Available",
      route: "/map",
      keywords: ["seat", "section", section, "row", row.toLowerCase()],
    });
  }
}

export const ALL_ENTITIES: Entity[] = [
  ...GATES, ...SEATS, ...FOOD, ...RESTROOMS, ...MEDICAL, ...PARKING,
  ...TRANSPORT, ...ACCESSIBILITY, ...VOLUNTEERS, ...FAQ, ...EMERGENCY, ...PAGES,
];

// Simple fuzzy scoring
export function fuzzyScore(query: string, entity: Entity): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;
  const hay = [entity.name, entity.detail ?? "", entity.kind, ...(entity.keywords ?? [])]
    .join(" ")
    .toLowerCase();
  if (hay.includes(q)) return 100 - Math.abs(hay.indexOf(q));
  // token match
  let score = 0;
  for (const t of q.split(/\s+/)) {
    if (!t) continue;
    if (hay.includes(t)) score += 40;
    else {
      // char subsequence
      let i = 0;
      for (const ch of hay) if (ch === t[i]) { i++; if (i === t.length) break; }
      if (i === t.length) score += 15;
    }
  }
  return score;
}

export function searchEntities(query: string, limit = 8): Entity[] {
  const q = query.trim();
  if (!q) return [];
  return ALL_ENTITIES
    .map((e) => ({ e, s: fuzzyScore(q, e) }))
    .filter((x) => x.s > 20)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.e);
}
