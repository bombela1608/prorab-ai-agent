"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Contact,
  Settings,
  Bot,
  LineChart,
  Radar,
  CalendarDays,
  Share2,
  BookOpen,
  UsersRound,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/ai-agents", label: "AI Agents", icon: Bot },
  { href: "/analytics", label: "AI Analytics", icon: LineChart },
  { href: "/forecasts", label: "AI Forecasts", icon: Radar },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/customers", label: "Customers", icon: Contact },
  { href: "/integrations", label: "Integrations", icon: Share2 },
  { href: "/knowledge-base", label: "Knowledge Base", icon: BookOpen },
  { href: "/hr", label: "HR", icon: UsersRound },
  { href: "/operations", label: "Operations", icon: Building2 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ tenantName }: { tenantName: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col bg-teal-500 text-white">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/95 text-base font-extrabold text-orange-500 shadow-sm font-[family-name:var(--font-baloo)]">
          P
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold leading-tight font-[family-name:var(--font-baloo)]">
            ProRab AI Agent
          </p>
          <p className="truncate text-[11px] text-teal-50/80">{tenantName}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-full px-3.5 py-2 text-xs font-semibold tracking-wide uppercase transition",
                active
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-white/90 hover:bg-white/10"
              )}
            >
              <Icon size={15} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3">
        <Link
          href="/demo"
          target="_blank"
          className="flex items-center gap-2.5 rounded-full px-3.5 py-2 text-xs font-semibold tracking-wide uppercase text-white/90 hover:bg-white/10"
        >
          <Bot size={15} />
          AI Widget
        </Link>
      </div>
    </aside>
  );
}
