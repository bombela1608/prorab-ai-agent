import Link from "next/link";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isToday,
  isSameDay,
  parse,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { cn } from "@/lib/utils";

const STATUS_DOT: Record<string, string> = {
  SCHEDULED: "bg-teal-500",
  IN_PROGRESS: "bg-orange-500",
  COMPLETED: "bg-emerald-500",
  CANCELLED: "bg-gray-400",
};

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const session = await requireSession();
  const { month } = await searchParams;

  const anchor = month ? parse(month, "yyyy-MM", new Date()) : new Date();
  const monthStart = startOfMonth(anchor);
  const monthEnd = endOfMonth(anchor);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const jobs = await prisma.job.findMany({
    where: { tenantId: session.user.tenantId, scheduledAt: { gte: gridStart, lte: gridEnd } },
    orderBy: { scheduledAt: "asc" },
    include: { customer: true, technician: true },
  });

  const prevMonth = format(subMonths(anchor, 1), "yyyy-MM");
  const nextMonth = format(addMonths(anchor, 1), "yyyy-MM");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Calendar &amp; Planner</h1>
          <p className="text-sm text-gray-500">All appointments, jobs, and team availability in one place.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white p-1 shadow-sm">
          <Link
            href={`/calendar?month=${prevMonth}`}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
          >
            <ChevronLeft size={16} />
          </Link>
          <span className="px-2 text-sm font-semibold text-gray-700">{format(anchor, "MMMM yyyy")}</span>
          <Link
            href={`/calendar?month=${nextMonth}`}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
          >
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="grid grid-cols-7 border-b border-gray-100 text-center text-xs font-semibold uppercase text-gray-400">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="py-3">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day) => {
            const dayJobs = jobs.filter((j) => isSameDay(j.scheduledAt, day));
            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "min-h-[110px] border-b border-r border-gray-50 p-2",
                  !isSameMonth(day, anchor) && "bg-gray-50/60"
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                    isToday(day)
                      ? "bg-orange-500 text-white"
                      : isSameMonth(day, anchor)
                        ? "text-gray-600"
                        : "text-gray-300"
                  )}
                >
                  {format(day, "d")}
                </span>
                <div className="mt-1.5 space-y-1">
                  {dayJobs.slice(0, 3).map((job) => (
                    <div
                      key={job.id}
                      title={`${job.title} · ${job.customer.name} · ${job.technician?.name ?? "Unassigned"}`}
                      className="flex items-center gap-1.5 truncate rounded-md bg-gray-50 px-1.5 py-0.5 text-[10px] text-gray-600"
                    >
                      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", STATUS_DOT[job.status])} />
                      <span className="truncate">{job.title}</span>
                    </div>
                  ))}
                  {dayJobs.length > 3 && (
                    <p className="px-1.5 text-[10px] text-gray-400">+{dayJobs.length - 3} more</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
