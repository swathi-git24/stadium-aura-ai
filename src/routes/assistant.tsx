import { createFileRoute } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle } from "@/components/ui-kit/Page";
import { Sparkles, Mic, Send, Languages } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [{ title: "AI Assistant — FIFA Smart Stadium" }, { name: "description", content: "Full-screen AI assistant with voice, translation and context-aware answers." }] }),
  component: Assistant,
});

const PROMPTS = ["Take me to Gate B", "Find nearest restroom", "Where is my seat?", "Which exit is less crowded?", "What food is nearby?", "Translate to Spanish"];

function Assistant() {
  const [msgs, setMsgs] = useState([
    { r: "ai", t: "¡Hola! I can help you navigate the stadium, find food, translate, or assist in an emergency. How can I help?" },
  ]);
  const [text, setText] = useState("");
  const send = (t: string) => {
    if (!t.trim()) return;
    setMsgs((m) => [...m, { r: "user", t }, { r: "ai", t: "Gate B is 4 min east. I'll guide you turn by turn — the corridor is currently the least crowded." }]);
    setText("");
  };
  return (
    <PageContainer>
      <PageHeader eyebrow="Intelligence" title="Stadium AI Assistant" description="Ask anything — in any language. Powered by real-time venue signals." />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="flex h-[560px] flex-col p-0">
          <div className="flex items-center gap-2 border-b border-border px-5 py-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Stadium AI</span>
            <span className="ml-auto flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
              <Languages className="h-3 w-3" /> Auto-detect
            </span>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-5">
            {msgs.map((m, i) => (
              <div key={i} className={m.r === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className={"max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed " + (m.r === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>{m.t}</div>
              </div>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="border-t border-border p-3">
            <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-2 py-1.5">
              <button type="button" aria-label="Voice" className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted"><Mic className="h-4 w-4" /></button>
              <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask in any language…" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
              <button type="submit" aria-label="Send" className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground"><Send className="h-4 w-4" /></button>
            </div>
          </form>
        </Card>

        <Card>
          <SectionTitle>Suggested</SectionTitle>
          <div className="space-y-1.5">
            {PROMPTS.map((p) => (
              <button key={p} onClick={() => send(p)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-left text-sm hover:bg-muted">{p}</button>
            ))}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
