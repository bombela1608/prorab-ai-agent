import Link from "next/link";
import {
  Bot,
  LineChart,
  Radar,
  Users,
  CalendarDays,
  Share2,
  BookOpen,
  Building2,
  Check,
  ArrowRight,
  Briefcase,
  Rocket,
  Building,
  UserCheck,
} from "lucide-react";

const AUDIENCE = [
  {
    icon: Briefcase,
    title: "Small and Medium Businesses",
    description: "Automate operations, save time, and grow revenue.",
  },
  {
    icon: UserCheck,
    title: "Business Owners and Managers",
    description: "Gain real-time control over finance, HR, and logistics.",
  },
  {
    icon: Building,
    title: "Teams Across All Industries",
    description: "Streamline workflows and improve performance.",
  },
  {
    icon: Rocket,
    title: "Entrepreneurs and Startups",
    description: "Access enterprise-grade AI without enterprise costs.",
  },
];

const FEATURES = [
  { icon: Bot, title: "AI Agents", description: "24/7 chat and voice assistants that book jobs, answer questions, and hand off to a human when needed." },
  { icon: LineChart, title: "AI Analytics", description: "Real-time KPIs, revenue trends, and AI-generated insights — no spreadsheets required." },
  { icon: Radar, title: "AI Forecasts & Anomalies", description: "Predict demand and revenue, catch risks early, and model what-if scenarios before acting." },
  { icon: Users, title: "CRM & Orders", description: "Every lead, customer, and job in one pipeline — from first contact to completed work." },
  { icon: CalendarDays, title: "Calendar & Planner", description: "A unified schedule for your whole team, with drag-and-drop dispatch." },
  { icon: Share2, title: "Integrations & Automations", description: "Connect Salesforce, QuickBooks, Stripe, Slack, and thousands more via no-code workflows." },
  { icon: BookOpen, title: "Knowledge Base & RAG", description: "Upload price lists and policies once — your AI agent uses them to answer accurately." },
  { icon: Building2, title: "HR & Operations", description: "Team utilization, job completion rates, and performance — tracked automatically." },
];

const PLANS = [
  {
    name: "Free Trial",
    price: "$0",
    period: "14 days",
    description: "Full Professional access, no credit card required.",
    features: ["Full access to Professional features", "Demo data included", "1 external integration"],
    cta: "Get Started",
    href: "/signup?plan=Professional",
    highlight: false,
  },
  {
    name: "Basic",
    price: "Starter",
    period: "1–5 users",
    description: "For small businesses getting started with automation.",
    features: ["CRM & Lead Management", "24/7 AI chatbot", "1 external integration", "Up to 50 requests/month"],
    cta: "Start Basic",
    href: "/signup?plan=Basic",
    highlight: false,
  },
  {
    name: "Professional",
    price: "Growth",
    period: "Up to 15 users",
    description: "Everything a growing service business needs.",
    features: ["Everything in Basic", "Unlimited requests", "AI Analytics & Forecasts", "GPS tracking & route optimization"],
    cta: "Upgrade to Professional",
    href: "/signup?plan=Professional",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "Unlimited users",
    description: "For franchises and multi-location operations.",
    features: ["Everything in Professional", "White-label branding", "ERP integrations (SAP, NetSuite, Odoo)", "24/7 premium support"],
    cta: "Contact Sales",
    href: "mailto:sales@prorabagent.com",
    highlight: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-500 text-base font-extrabold text-white font-[family-name:var(--font-baloo)]">
            P
          </div>
          <span className="text-lg font-bold font-[family-name:var(--font-baloo)]">ProRab AI Agent</span>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          <a href="#features" className="hover:text-gray-900">Features</a>
          <a href="#pricing" className="hover:text-gray-900">Pricing</a>
          <Link href="/demo" className="hover:text-gray-900">Live Demo</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-gray-300"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
            Cloud AI-SaaS Platform for SMB
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-800 sm:text-6xl">
            Run your business with an AI agent that never clocks out.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-500">
            ProRab AI Agent unifies CRM, scheduling, finance, and analytics into one platform — with AI agents
            that handle customer requests 24/7 and a no-code workflow engine that automates the rest.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              Start your free 14-day trial <ArrowRight size={16} />
            </Link>
            <Link
              href="/demo"
              className="rounded-full border border-gray-200 px-7 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300"
            >
              View Live Demo
            </Link>
          </div>
          <p className="mt-4 text-xs text-gray-400">No credit card required · Full Professional access for 14 days</p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">Who is it for?</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-gray-500">
          Built for U.S. service businesses that want corporate-level tools without corporate-level cost.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE.map((a) => (
            <div key={a.title} className="rounded-2xl bg-gray-50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-white">
                <a.icon size={18} />
              </div>
              <p className="mt-4 font-semibold text-gray-800">{a.title}</p>
              <p className="mt-1 text-sm text-gray-500">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">
            One platform, every business function
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-gray-500">
            CRM, finance, scheduling, and AI — all connected, all managed from a single dashboard.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <f.icon size={18} />
                </div>
                <p className="mt-4 font-semibold text-gray-800">{f.title}</p>
                <p className="mt-1 text-sm text-gray-500">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Choose the Perfect Plan for Your Business
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-gray-500">
          Flexible subscription plans designed to grow with you. Upgrade, downgrade, or cancel anytime.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.highlight
                  ? "relative flex flex-col rounded-2xl bg-teal-500 p-6 text-white shadow-lg"
                  : "flex flex-col rounded-2xl bg-gray-50 p-6"
              }
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Most Popular
                </span>
              )}
              <p className={plan.highlight ? "text-sm font-semibold text-teal-50" : "text-sm font-semibold text-gray-500"}>
                {plan.name}
              </p>
              <p className={plan.highlight ? "mt-2 text-2xl font-bold text-white" : "mt-2 text-2xl font-bold text-gray-800"}>
                {plan.price}
              </p>
              <p className={plan.highlight ? "text-xs text-teal-50" : "text-xs text-gray-400"}>{plan.period}</p>
              <p className={plan.highlight ? "mt-3 text-sm text-teal-50" : "mt-3 text-sm text-gray-500"}>
                {plan.description}
              </p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={15} className={plan.highlight ? "mt-0.5 shrink-0 text-white" : "mt-0.5 shrink-0 text-teal-600"} />
                    <span className={plan.highlight ? "text-teal-50" : "text-gray-600"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={
                  plan.highlight
                    ? "mt-6 rounded-full bg-white py-2.5 text-center text-sm font-semibold text-teal-700 shadow-sm transition hover:bg-teal-50"
                    : "mt-6 rounded-full bg-orange-500 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
                }
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl bg-teal-500 px-8 py-14 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to put your business on autopilot?</h2>
          <p className="mx-auto mt-3 max-w-xl text-teal-50">
            Join SMBs automating leads, scheduling, and support with ProRab AI Agent.
          </p>
          <Link
            href="/signup"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            Start your free 14-day trial <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-gray-400 sm:flex-row">
          <p>© 2026 ProRab AI Agent. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/demo" className="hover:text-gray-600">Live Demo</Link>
            <Link href="/privacy" className="hover:text-gray-600">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-600">Terms of Use</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
