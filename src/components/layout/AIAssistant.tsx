import { useState } from "react";
import { Sparkles, X, Mic, Send } from "lucide-react";

const SUGGESTIONS = [
  "Take me to Gate B",
  "Nearest restroom",
  "Which exit is less crowded?",
  "Vegetarian food nearby",
  "Translate to Spanish",
];

type Msg = { role: "user" | "ai"; text: string };

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi Alex — I'm your stadium assistant. Ask me anything: directions, food, translations, or emergencies." },
  ]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text:
            "Gate B is a 4-minute walk east from your current position. Corridor C is currently the least crowded route — I'll guide you turn by turn.",
        },
      ]);
    }, 700);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open AI Assistant"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-primary-foreground shadow-[var(--shadow-float)] transition-transform hover:-translate-y-0.5"
        >
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">Ask AI</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-40 flex h-[560px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-elevated shadow-[var(--shadow-float)]">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">Stadium AI</div>
                <div className="text-[11px] text-muted-foreground">Online · Multilingual</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 hover:bg-muted" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed " +
                    (m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground")
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border px-3 pb-3 pt-2">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 rounded-xl border border-input bg-background px-2 py-1.5"
            >
              <button type="button" aria-label="Voice input" className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
                <Mic className="h-4 w-4" />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything…"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" aria-label="Send" className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground hover:opacity-90">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
