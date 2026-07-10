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
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/customers", label: "Customers", icon: Contact },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ tenantName }: { tenantName: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-teal-500 text-white">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 text-lg font-extrabold text-orange-500 shadow-sm font-[family-name:var(--font-baloo)]">
          P
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-bold leading-tight font-[family-name:var(--font-baloo)]">
            ProRab AI
          </p>
          <p className="truncate text-base font-bold leading-tight font-[family-name:var(--font-baloo)]">
            Agent
          </p>
        </div>
      </div>
      <p className="truncate px-6 pb-2 text-xs text-teal-50/80">{tenantName}</p>

      <nav className="mt-2 flex-1 space-y-1.5 px-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-semibold tracking-wide uppercase transition",
                active
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-white/90 hover:bg-white/10"
              )}
            >
              <Icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-semibold tracking-wide uppercase text-white/90 hover:bg-white/10"
        >
          <Bot size={17} />
          AI Widget
        </Link>
      </div>
    </aside>
  );
}
