import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Mic, Send, Loader2 } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { askAI, type ChatMsg } from "@/lib/ai-client";
import { useLanguage } from "@/lib/language";

const SUGGESTIONS = [
  "Take me to Gate B",
  "I'm hungry",
  "I'm travelling with children",
  "Which exit is less crowded?",
  "Translate 'where is the bathroom' to Spanish",
];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "assistant", content: "Hi Alex — I'm your stadium AI. Ask me for directions, food, translations, or emergency help in any language." },
  ]);
  const { lang } = useLanguage();
  const page = useRouterState({ select: (s) => s.location.pathname });
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const nextMsgs: ChatMsg[] = [...messages, { role: "user", content: q }];
    setMessages(nextMsgs);
    setInput("");
    setBusy(true);
    try {
      const reply = await askAI(nextMsgs, { page, lang });
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${e instanceof Error ? e.message : "Something went wrong."}` }]);
    } finally {
      setBusy(false);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  };

  const voice = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!SR) { alert("Voice input is not supported in this browser."); return; }
    const rec = new SR();
    rec.lang = lang;
    rec.onresult = (e: { results: ArrayLike<{ 0: { transcript: string } }> }) => {
      const t = e.results[0][0].transcript;
      setInput(t);
      setTimeout(() => send(t), 100);
    };
    rec.start();
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
                <div className="text-[11px] text-muted-foreground">Live · {page}</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 hover:bg-muted" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed " +
                    (m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-muted px-3.5 py-2.5 text-sm text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> thinking…
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border px-3 pb-3 pt-2">
            {messages.length <= 1 && (
              <div className="mb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground">
                    {s}
                  </button>
                ))}
              </div>
            )}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 rounded-xl border border-input bg-background px-2 py-1.5"
            >
              <button type="button" onClick={voice} aria-label="Voice input" className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
                <Mic className="h-4 w-4" />
              </button>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything…"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" disabled={busy || !input.trim()} aria-label="Send" className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
