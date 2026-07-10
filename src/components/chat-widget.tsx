"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  meta?: { intent: string; confidence: number; escalate: boolean };
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the Cascade Home Services AI assistant. I can help you book a service, answer questions, or route you to a human. How can I help today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || sending) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId }),
      });
      const data = await res.json();
      setSessionId(data.sessionId);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
          meta: { intent: data.intent, confidence: data.confidence, escalate: data.escalate },
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setSending(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition hover:bg-orange-600"
        aria-label="Open AI chat"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 flex h-[560px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
      <div className="flex items-center justify-between bg-teal-500 px-4 py-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">AI Intake Agent</p>
            <p className="text-xs text-teal-50">● Online 24/7</p>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
          <X size={18} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
        {messages.map((m, i) => (
          <div key={i} className={cn("flex flex-col", m.role === "user" ? "items-end" : "items-start")}>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm",
                m.role === "user"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 shadow-sm"
              )}
            >
              {m.content}
            </div>
            {m.meta && (
              <div className="mt-1 flex gap-1 text-[10px] text-gray-400">
                <span className="rounded-full bg-gray-200 px-2 py-0.5">intent: {m.meta.intent}</span>
                <span className="rounded-full bg-gray-200 px-2 py-0.5">
                  confidence: {Math.round(m.meta.confidence * 100)}%
                </span>
                {m.meta.escalate && (
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-orange-600">
                    escalated to human
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
        {sending && <div className="text-xs text-gray-400">AI is typing...</div>}
      </div>

      <div className="flex items-center gap-2 bg-white p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 rounded-full bg-gray-100 px-4 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-teal-300"
        />
        <button
          onClick={sendMessage}
          disabled={sending || !input.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500 text-white transition hover:bg-teal-600 disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
