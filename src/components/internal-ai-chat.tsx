"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function InternalAiChat({
  endpoint = "/api/internal-chat",
  welcomeMessage = "Hi! I can answer questions about your leads, jobs, revenue, and team workload, or reference anything you've added to the Knowledge Base. Try asking \"how much revenue this month?\" or \"what's on the schedule today?\"",
  placeholder = "Ask about leads, jobs, revenue, or your team...",
}: {
  endpoint?: string;
  welcomeMessage?: string;
  placeholder?: string;
}) {
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: welcomeMessage }]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || sending) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex h-[520px] flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500">
          <Sparkles size={15} className="text-white" />
        </div>
        <p className="text-sm font-semibold text-gray-700">Chat with AI</p>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
        {messages.map((m, i) => (
          <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm",
                m.role === "user" ? "bg-teal-500 text-white" : "bg-white text-gray-700 shadow-sm"
              )}
            >
              {m.content}
            </div>
          </div>
        ))}
        {sending && <div className="text-xs text-gray-400">AI is thinking...</div>}
      </div>

      <div className="flex items-center gap-2 bg-white p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={placeholder}
          className="flex-1 rounded-full bg-gray-100 px-4 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-teal-300"
        />
        <button
          onClick={sendMessage}
          disabled={sending || !input.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white transition hover:bg-orange-600 disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
