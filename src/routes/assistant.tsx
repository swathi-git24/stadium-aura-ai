import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { Card, PageContainer, PageHeader, SectionTitle } from "@/components/ui-kit/Page";
import { Sparkles, Mic, Send, Languages, Loader2, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { askAI, type ChatMsg } from "@/lib/ai-client";
import { useLanguage, LANGUAGES } from "@/lib/language";

export const Route = createFileRoute("/assistant")({
  validateSearch: (search: Record<string, unknown>) => ({ q: typeof search.q === "string" ? search.q : "" }),
  head: () => ({ meta: [{ title: "AI Assistant — FIFA Smart Stadium" }, { name: "description", content: "Contextual AI with memory, voice input, and multilingual replies." }] }),
  component: Assistant,
});

const PROMPTS = ["Take me to Gate B", "Find nearest restroom", "Where is my seat?", "Which exit is less crowded?", "What vegan food is nearby?", "Translate 'help me' to Portuguese"];

const STORAGE_KEY = "assistant-history-v1";

function Assistant() {
  const { q } = Route.useSearch();
  const { lang } = useLanguage();
  const page = useRouterState({ select: (s) => s.location.pathname });
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { role: "assistant", content: "¡Hola! I can help you navigate the stadium, find food, translate anything, or assist in an emergency — in any language. How can I help?" },
  ]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load memory
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ChatMsg[];
        if (Array.isArray(parsed) && parsed.length) setMsgs(parsed);
      }
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save memory
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(-40))); } catch { /* ignore */ }
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  // Auto-send seed query from search param
  const seeded = useRef(false);
  useEffect(() => {
    if (!seeded.current && q) { seeded.current = true; void send(q); }
    inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const send = async (t: string) => {
    const s = t.trim();
    if (!s || busy) return;
    const next: ChatMsg[] = [...msgs, { role: "user", content: s }];
    setMsgs(next);
    setText("");
    setBusy(true);
    try {
      const reply = await askAI(next, { page, lang });
      setMsgs((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      setMsgs((m) => [...m, { role: "assistant", content: `⚠️ ${e instanceof Error ? e.message : "Something went wrong."}` }]);
    } finally {
      setBusy(false);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  };

  const clear = () => {
    setMsgs([{ role: "assistant", content: "Cleared. How can I help you now?" }]);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  };

  const voice = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!SR) return alert("Voice input is not supported in this browser.");
    const rec = new SR();
    rec.lang = lang;
    rec.onresult = (e: { results: ArrayLike<{ 0: { transcript: string } }> }) => {
      const tr = e.results[0][0].transcript;
      setText(tr);
      setTimeout(() => send(tr), 100);
    };
    rec.start();
  };

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <PageContainer>
      <PageHeader eyebrow="Intelligence" title="Stadium AI Assistant" description="Contextual, multilingual, and aware of live venue signals." />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="flex h-[600px] flex-col p-0">
          <div className="flex items-center gap-2 border-b border-border px-5 py-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Stadium AI</span>
            <span className="ml-auto flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
              <Languages className="h-3 w-3" /> {currentLang.native}
            </span>
            <button onClick={clear} title="Clear memory" className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"><Trash2 className="h-4 w-4" /></button>
          </div>
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-5">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className={"max-w-[75%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed " + (m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>{m.content}</div>
              </div>
            ))}
            {busy && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> thinking…</div>
              </div>
            )}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="border-t border-border p-3">
            <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-2 py-1.5">
              <button type="button" onClick={voice} aria-label="Voice" className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted"><Mic className="h-4 w-4" /></button>
              <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask in any language…" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
              <button type="submit" disabled={busy || !text.trim()} aria-label="Send" className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground disabled:opacity-50"><Send className="h-4 w-4" /></button>
            </div>
          </form>
        </Card>

        <Card>
          <SectionTitle>Try asking</SectionTitle>
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
