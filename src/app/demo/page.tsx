import Link from "next/link";
import { ChatWidget } from "@/components/chat-widget";
import { Wrench, Zap, Droplet, Sparkles as SparkleIcon, Leaf, ArrowRight } from "lucide-react";

const SERVICES = [
  { icon: Wrench, name: "HVAC" },
  { icon: Droplet, name: "Plumbing" },
  { icon: Zap, name: "Electrical" },
  { icon: SparkleIcon, name: "Cleaning" },
  { icon: Leaf, name: "Landscaping" },
];

export default function DemoTenantPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-500 text-base font-extrabold text-white font-[family-name:var(--font-baloo)]">
            P
          </div>
          <span className="font-bold font-[family-name:var(--font-baloo)]">Cascade Home Services</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/client/login"
            className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-gray-300"
          >
            Client Login
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            Staff Login
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <Link
            href="/"
            className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 hover:bg-teal-100"
          >
            ← Powered by ProRab AI Agent
          </Link>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-800 sm:text-5xl">
            Home services, booked in seconds — by AI, 24/7.
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Chat with our AI intake agent to book HVAC, plumbing, electrical, cleaning, or
            landscaping service. No hold music, no callbacks — just an instant appointment.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {SERVICES.map((s) => (
              <div
                key={s.name}
                className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600"
              >
                <s.icon size={16} className="text-teal-600" />
                {s.name}
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-2 text-sm text-gray-500">
            <ArrowRight size={16} className="text-orange-500" />
            Click the chat bubble in the corner to talk to our AI agent right now.
          </div>
        </div>
      </main>

      <ChatWidget />
    </div>
  );
}
