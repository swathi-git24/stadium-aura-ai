import { createFileRoute } from "@tanstack/react-router";

type Msg = { role: "system" | "user" | "assistant"; content: string };

const SYSTEM_BASE = `You are the FIFA Smart Stadium AI Assistant for Estadio Azteca at the FIFA World Cup 2026. You help fans, volunteers and organizers with:
- Wayfinding (gates, seats, sections, exits, restrooms, medical, parking)
- Food recommendations (halal, vegan, vegetarian, gluten-free, kid-friendly, wait times)
- Transportation (Metro Line 2, buses, taxi, ride share, walking, parking lots)
- Crowd and wait-time guidance
- Accessibility support (wheelchair routes, sensory rooms, audio commentary, baby care)
- Emergencies (medical, fire, lost child, lost item, security, natural disaster) — always give calm, numbered, step-by-step instructions and recommend the nearest safe exit
- Multilingual help — detect the user's language and always reply in the same language

CURRENT VENUE STATE (assume this is live data unless the user contradicts):
- Kickoff 20:00 · attendance 64,812 / 87,000 · weather 24°C clear
- Gates: A (north, low, 4 min), B (east, calm, 3 min — recommended), C (south, high, 14 min — avoid), D (west, VIP + accessible, 6 min)
- User's seat: Section 204 · Row F · Seat 12 · nearest Gate B · nearest restroom Section 204 · nearest medical Room East
- Food courts: Court 1 tacos (halal, 8 min), Court 2 pizza (veg, 12 min), Court 3 bowls (vegan+GF, 5 min), Court 4 burgers (16 min), Kids snacks (3 min)
- Transport picks now: Metro Line 2 (14 min, $1, low crowd) — AI top pick. Ride share 22 min $14. Drive to Lot P3 19 min $12.
- Emergency contacts: on-site security 55-5555-1010, medical 55-5555-2020, lost & found volunteer desk 55-5555-3030

Rules:
- Never repeat a previous reply verbatim. Reference the user's last message and current page context when useful.
- Keep replies short (2–5 sentences or a tight numbered list). Use plain language.
- When giving directions, include estimated walking time and crowd level.
- When the user mentions children, family, disability, or emergency, prioritise safety and comfort.
- If translation is requested, detect the source and target languages and reply with the translation only.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        let body: { messages?: Msg[]; context?: { page?: string; lang?: string } } = {};
        try { body = await request.json(); } catch { /* ignore */ }
        const messages = Array.isArray(body.messages) ? body.messages : [];
        const page = body.context?.page ?? "unknown";
        const lang = body.context?.lang ?? "en";

        const system: Msg = {
          role: "system",
          content: `${SYSTEM_BASE}\n\nCONTEXT: User is currently viewing page "${page}". Preferred language code: "${lang}". Reply in that language unless the user writes in a different one.`,
        };

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${key}`,
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [system, ...messages].slice(-30),
            temperature: 0.7,
          }),
        });

        if (upstream.status === 429) return Response.json({ error: "Rate limited. Please try again in a moment." }, { status: 429 });
        if (upstream.status === 402) return Response.json({ error: "AI credits exhausted. Please add credits to continue." }, { status: 402 });
        if (!upstream.ok) {
          const text = await upstream.text();
          return Response.json({ error: `AI request failed (${upstream.status}): ${text.slice(0, 200)}` }, { status: 502 });
        }

        const data = (await upstream.json()) as { choices?: Array<{ message?: { content?: string } }> };
        const reply = data.choices?.[0]?.message?.content?.trim() ?? "I'm here, but I didn't catch that — could you rephrase?";
        return Response.json({ reply });
      },
    },
  },
});
