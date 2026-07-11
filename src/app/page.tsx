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
  MessageCircle,
  DollarSign,
  Workflow,
  Mic,
  ShieldCheck,
  Lock,
  KeyRound,
  Server,
  Quote,
  Wrench,
  ShoppingBag,
  UtensilsCrossed,
  Truck,
  Factory,
  GraduationCap,
} from "lucide-react";

const STATS = [
  { value: "12+", label: "Built-in business modules" },
  { value: "5,000+", label: "App integrations via Zapier & Make" },
  { value: "24/7", label: "AI-powered customer intake" },
  { value: "6", label: "Industries served out of the box" },
];

const INTEGRATIONS = [
  "Salesforce",
  "HubSpot",
  "QuickBooks",
  "Stripe",
  "Square",
  "Shopify",
  "Slack",
  "Microsoft Teams",
  "Twilio",
  "Odoo",
  "SAP",
  "NetSuite",
  "Zapier",
  "Make",
  "Tableau",
  "Power BI",
];

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

const INDUSTRIES = [
  { icon: Wrench, title: "Service & Maintenance", description: "HVAC, plumbing, electrical, cleaning, and landscaping teams with field crews to dispatch." },
  { icon: ShoppingBag, title: "Retail & E-commerce", description: "Orders, inventory signals, and customer communication unified with your storefront." },
  { icon: UtensilsCrossed, title: "HoReCa", description: "Restaurants, hotels, and delivery operations that live and die by scheduling." },
  { icon: Truck, title: "Logistics & Transportation", description: "Route-driven operators who need dispatch, tracking, and utilization in one view." },
  { icon: Factory, title: "Small-scale Manufacturing", description: "Sewing, culinary, and furniture workshops balancing orders against capacity." },
  { icon: GraduationCap, title: "Professional Services", description: "Consulting, training, and wellness practices built on appointments and retention." },
];

const WORKFLOW_POINTS = [
  "Trigger → condition → action chains, assembled visually — no code",
  "AI-driven steps: classify requests, extract fields, generate replies, make decisions",
  "Pre-built templates: new lead → assign → notify → follow up",
  "Webhook triggers and outbound actions for anything custom",
];

const AI_CORE_POINTS = [
  "RAG pipeline grounds every answer in your own price lists, policies, and manuals",
  "Voice-ready architecture: speech-to-text intake and synthesized responses",
  "Human-in-the-loop: low-confidence conversations escalate to your team with full context",
  "Model monitoring tracks quality, latency, and cost — no silent regressions",
];

const COMPLIANCE = [
  { name: "SOC 2", detail: "Audit-ready architecture with immutable activity logging" },
  { name: "HIPAA", detail: "Data isolation designed for healthcare and wellness clients" },
  { name: "GDPR / CCPA", detail: "Consent management, right to erasure, and data export" },
  { name: "ISO 27001", detail: "Aligned with the information security management framework" },
];

const SECURITY_POINTS = [
  { icon: Lock, text: "TLS 1.3 in transit, AES-256 at rest" },
  { icon: KeyRound, text: "MFA, SSO (OIDC), and role-based access control" },
  { icon: Server, text: "WAF and DDoS protection at the network layer" },
  { icon: ShieldCheck, text: "Strict tenant isolation — zero cross-tenant access" },
];

// PLACEHOLDER testimonials — replace with real customer quotes before public marketing push.
const TESTIMONIALS = [
  {
    quote:
      "The AI agent books jobs while we sleep. We stopped losing after-hours leads to competitors the first week.",
    name: "Placeholder — Early Access User",
    role: "Owner, HVAC & Plumbing Services",
  },
  {
    quote:
      "One dashboard replaced our CRM, calendar spreadsheet, and three group chats. Dispatch finally runs itself.",
    name: "Placeholder — Early Access User",
    role: "Operations Manager, Cleaning Company",
  },
  {
    quote:
      "The forecasts flagged a slow month before it hit. We ran a promo two weeks early and closed the gap.",
    name: "Placeholder — Early Access User",
    role: "Founder, Landscaping Business",
  },
];

const FAQ = [
  {
    q: "How does the 14-day free trial work?",
    a: "You get full Professional-tier access for 14 days — AI Analytics, Forecasts, unlimited requests, everything. No credit card required, and demo data is included so you can explore before importing your own.",
  },
  {
    q: "Which industries is ProRab AI Agent built for?",
    a: "The platform is designed for service & maintenance companies (HVAC, plumbing, electrical, cleaning, landscaping), retail and e-commerce, HoReCa, logistics and transportation, small-scale manufacturing, and professional services. Any business built on scheduling, client communication, and invoicing fits.",
  },
  {
    q: "Can it connect to the tools we already use?",
    a: "Yes. Native connectors cover Salesforce, HubSpot, QuickBooks, Stripe, Square, Shopify, Slack, Microsoft Teams, Twilio, and Odoo, with ERP options (SAP, NetSuite) on Enterprise. Beyond that, 5,000+ apps are reachable through Zapier and Make, and analytics export to Tableau, Power BI, and Google Data Studio.",
  },
  {
    q: "How is our data protected?",
    a: "Every company operates in an isolated tenant — zero cross-tenant access is a hard architectural requirement. Data is encrypted with TLS 1.3 in transit and AES-256 at rest, access is governed by role-based controls with MFA and SSO, and the platform is engineered to align with SOC 2, HIPAA, GDPR/CCPA, and ISO 27001 requirements.",
  },
  {
    q: "Do our customers get their own portal?",
    a: "Yes. Clients get a dedicated self-service portal where they can book services, track active jobs, review order history, and chat with your AI assistant — no phone calls required.",
  },
  {
    q: "What happens when the AI can't answer?",
    a: "Human-in-the-loop is built in. When the AI's confidence drops or a conversation turns sensitive, it hands off to your team with the full transcript and a summary — the customer never gets stuck with a bot loop.",
  },
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
    <div className="min-h-screen overflow-x-hidden bg-white text-gray-800">
      <header className="sticky top-0 z-20 border-b border-gray-100/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-500 text-base font-extrabold text-white font-[family-name:var(--font-baloo)]">
              P
            </div>
            <span className="text-lg font-bold font-[family-name:var(--font-baloo)]">ProRab AI Agent</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm font-medium text-gray-600 md:flex">
            <a href="#features" className="transition hover:text-gray-900">Platform</a>
            <a href="#industries" className="transition hover:text-gray-900">Industries</a>
            <a href="#security" className="transition hover:text-gray-900">Security</a>
            <a href="#pricing" className="transition hover:text-gray-900">Pricing</a>
            <Link href="/demo" className="transition hover:text-gray-900">Live Demo</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-gray-300 sm:inline-block"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-200 transition hover:bg-orange-600 hover:shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-teal-100/60 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full bg-orange-100/70 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-inset ring-teal-100">
              Cloud AI-SaaS Platform for SMB
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-gray-800 sm:text-6xl">
              Run your business with an
              <span className="block text-teal-600">AI agent that never clocks out.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500">
              ProRab AI Agent unifies the entire business cycle — from lead capture and CRM to execution,
              payment, and reporting — with AI agents that handle customer requests 24/7 and a no-code
              workflow engine that automates the rest.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/signup"
                className="flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl"
              >
                Start your free 14-day trial <ArrowRight size={16} />
              </Link>
              <Link
                href="/demo"
                className="rounded-full border border-gray-200 px-7 py-3.5 text-sm font-semibold text-gray-700 transition hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50"
              >
                View Live Demo
              </Link>
            </div>
            <p className="mt-4 text-xs text-gray-400">No credit card required · Full Professional access for 14 days</p>
          </div>

          {/* Product preview mockup */}
          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-gray-200/80">
              <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                <span className="ml-3 text-xs text-gray-400">app.prorabagent.com/dashboard</span>
              </div>
              <div className="flex">
                <div className="hidden w-40 shrink-0 space-y-2 bg-teal-500 p-4 sm:block">
                  <div className="h-6 w-6 rounded-lg bg-white/90" />
                  {["Dashboard", "AI Agents", "Leads", "Jobs", "Analytics"].map((label, i) => (
                    <div
                      key={label}
                      className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide ${
                        i === 0 ? "bg-white text-teal-700" : "text-white/80"
                      }`}
                    >
                      {label}
                    </div>
                  ))}
                </div>
                <div className="flex-1 space-y-3 bg-gray-50/60 p-5">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { label: "Active Leads", value: "12", icon: Users },
                      { label: "Jobs Today", value: "5", icon: CalendarDays },
                      { label: "Revenue", value: "$8.4k", icon: DollarSign },
                      { label: "AI Chats", value: "28", icon: MessageCircle },
                    ].map((kpi) => (
                      <div key={kpi.label} className="rounded-xl bg-white p-3 shadow-sm">
                        <kpi.icon size={13} className="text-teal-500" />
                        <p className="mt-1.5 text-sm font-bold text-gray-800">{kpi.value}</p>
                        <p className="text-[10px] text-gray-400">{kpi.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      Revenue — Last 7 Days
                    </p>
                    <div className="flex h-16 items-end gap-2">
                      {[40, 65, 35, 80, 55, 95, 70].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t-sm bg-teal-400/70" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-4 hidden items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-gray-100 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
                <Bot size={14} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">AI Agent</p>
                <p className="text-[10px] text-emerald-500">● Online 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-gray-100 bg-gray-50/60">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-teal-600 sm:text-4xl font-[family-name:var(--font-baloo)]">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Integrations wall */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
          Works with the tools you already use
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {INTEGRATIONS.map((name) => (
            <span
              key={name}
              className="rounded-full border border-gray-100 bg-white px-5 py-2.5 text-sm font-semibold text-gray-500 shadow-sm transition hover:border-teal-200 hover:text-teal-700"
            >
              {name}
            </span>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-gray-400">
          Native connectors plus 5,000+ apps through Zapier and Make · BI export to Tableau, Power BI, and Google Data Studio
        </p>
      </section>

      {/* Who it's for */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">Who is it for?</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-gray-500">
          Built for U.S. service businesses that want corporate-level tools without corporate-level cost.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE.map((a) => (
            <div
              key={a.title}
              className="group rounded-2xl bg-gray-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-gray-100"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-white transition group-hover:scale-110">
                <a.icon size={18} />
              </div>
              <p className="mt-4 font-semibold text-gray-800">{a.title}</p>
              <p className="mt-1 text-sm text-gray-500">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">
            One platform, every business function
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-gray-500">
            CRM, finance, scheduling, and AI — all connected, all managed from a single dashboard.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/70"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition group-hover:scale-110">
                  <f.icon size={18} />
                </div>
                <p className="mt-4 font-semibold text-gray-800">{f.title}</p>
                <p className="mt-1 text-sm text-gray-500">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep dive: Workflow Engine + AI Core */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Enterprise capabilities, SMB simplicity
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-gray-500">
          The automation and AI depth usually reserved for large corporations — assembled without writing a line of code.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-500 text-white">
              <Workflow size={20} />
            </div>
            <h3 className="mt-5 text-xl font-bold text-gray-800">No-code Workflow Engine</h3>
            <p className="mt-2 text-sm text-gray-500">
              Owners and managers assemble automations themselves — functionality rarely found outside enterprise suites.
            </p>
            <ul className="mt-6 space-y-3">
              {WORKFLOW_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <Check size={15} className="mt-0.5 shrink-0 text-teal-600" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-white">
              <Mic size={20} />
            </div>
            <h3 className="mt-5 text-xl font-bold text-gray-800">An AI Core built for business</h3>
            <p className="mt-2 text-sm text-gray-500">
              Not a chatbot bolted on — an AI layer wired into your data, your documents, and your escalation rules.
            </p>
            <ul className="mt-6 space-y-3">
              {AI_CORE_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <Check size={15} className="mt-0.5 shrink-0 text-orange-500" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">
            Versatile across industries
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-gray-500">
            One platform, adapted to the way each vertical actually operates.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.title}
                className="group rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/70"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition group-hover:scale-110">
                  <ind.icon size={18} />
                </div>
                <p className="mt-4 font-semibold text-gray-800">{ind.title}</p>
                <p className="mt-1 text-sm text-gray-500">{ind.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">Live in minutes, not months</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-gray-500">
          No implementation team required — most businesses are automating their first lead the same day.
        </p>
        <div className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent md:block"
          />
          {[
            { number: "01", title: "Create your workspace", description: "Sign up in under a minute — no credit card, full Professional access for 14 days." },
            { number: "02", title: "Configure your AI Agent", description: "Upload price lists and FAQs, set your tone of voice, and connect the tools you already use." },
            { number: "03", title: "Let automation take over", description: "Leads get answered, jobs get scheduled, and your dashboard tells you what to do next." },
          ].map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white shadow-lg shadow-teal-100">
                {step.number}
              </div>
              <p className="mt-5 font-semibold text-gray-800">{step.title}</p>
              <p className="mx-auto mt-2 max-w-xs text-sm text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Security & Compliance */}
      <section id="security" className="relative overflow-hidden bg-gradient-to-br from-teal-600 to-teal-800 py-20 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-teal-50 ring-1 ring-inset ring-white/20">
              <ShieldCheck size={13} /> Security by default
            </span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Enterprise-grade security, from day one
            </h2>
            <p className="mt-2 text-teal-100">
              Multi-tenant isolation is a hard architectural requirement — not an afterthought. The platform is
              engineered to align with the standards regulated industries expect.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {COMPLIANCE.map((c) => (
              <div key={c.name} className="rounded-2xl bg-white/10 p-5 ring-1 ring-inset ring-white/15 backdrop-blur-sm">
                <p className="text-lg font-bold font-[family-name:var(--font-baloo)]">{c.name}</p>
                <p className="mt-1.5 text-xs text-teal-100">{c.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SECURITY_POINTS.map((p) => (
              <div key={p.text} className="flex items-center gap-2.5 rounded-xl bg-white/5 px-4 py-3 text-sm text-teal-50">
                <p.icon size={15} className="shrink-0 text-teal-200" />
                {p.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          What early users are saying
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.role} className="flex flex-col rounded-2xl bg-gray-50 p-7">
              <Quote size={22} className="text-teal-300" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-gray-200/70 pt-4">
                <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                <p className="text-xs text-gray-400">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
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
                    ? "relative flex flex-col rounded-2xl bg-gradient-to-b from-teal-500 to-teal-600 p-6 text-white shadow-2xl shadow-teal-200 ring-1 ring-teal-400 lg:-my-3 lg:scale-105"
                    : "flex flex-col rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/70"
                }
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
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
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">Frequently asked questions</h2>
        <div className="mt-10 space-y-3">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-gray-100 bg-white px-6 py-4 shadow-sm open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-gray-800 [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500 to-teal-700 px-8 py-16 text-center text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-orange-400/20 blur-2xl"
          />
          <h2 className="relative text-2xl font-bold sm:text-3xl">Ready to put your business on autopilot?</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-teal-50">
            Join SMBs automating leads, scheduling, and support with ProRab AI Agent.
          </p>
          <Link
            href="/signup"
            className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl"
          >
            Start your free 14-day trial <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-100 bg-gray-50/60">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-5">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500 text-sm font-extrabold text-white font-[family-name:var(--font-baloo)]">
                  P
                </div>
                <span className="font-bold font-[family-name:var(--font-baloo)]">ProRab AI Agent</span>
              </div>
              <p className="mt-3 text-sm text-gray-500">AI-powered automation for U.S. service businesses.</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Platform</p>
              <ul className="mt-3 space-y-2 text-sm text-gray-500">
                <li><a href="#features" className="hover:text-gray-800">Features</a></li>
                <li><a href="#industries" className="hover:text-gray-800">Industries</a></li>
                <li><a href="#security" className="hover:text-gray-800">Security</a></li>
                <li><a href="#faq" className="hover:text-gray-800">FAQ</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Product</p>
              <ul className="mt-3 space-y-2 text-sm text-gray-500">
                <li><a href="#pricing" className="hover:text-gray-800">Pricing</a></li>
                <li><Link href="/demo" className="hover:text-gray-800">Live Demo</Link></li>
                <li><a href="#how-it-works" className="hover:text-gray-800">How it Works</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Account</p>
              <ul className="mt-3 space-y-2 text-sm text-gray-500">
                <li><Link href="/signup" className="hover:text-gray-800">Start Free Trial</Link></li>
                <li><Link href="/login" className="hover:text-gray-800">Staff Sign In</Link></li>
                <li><Link href="/client/login" className="hover:text-gray-800">Client Sign In</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Legal</p>
              <ul className="mt-3 space-y-2 text-sm text-gray-500">
                <li><Link href="/privacy" className="hover:text-gray-800">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-gray-800">Terms of Use</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-100 pt-6 text-xs text-gray-400">
            © 2026 ProRab AI Agent. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
