import { useLanguage } from "./language";

export type ChatMsg = { role: "user" | "assistant"; content: string };

export async function askAI(
  messages: ChatMsg[],
  ctx: { page: string; lang: string }
): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ messages, context: ctx }),
  });
  const data = (await res.json().catch(() => ({}))) as { reply?: string; error?: string };
  if (!res.ok) throw new Error(data.error ?? `Request failed (${res.status})`);
  return data.reply ?? "";
}

export function useAIContext() {
  const { lang } = useLanguage();
  return { lang };
}
