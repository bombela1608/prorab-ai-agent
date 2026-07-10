import Link from "next/link";
import { Users, Briefcase, DollarSign, Bot } from "lucide-react";
import { startOfDay, endOfDay, startOfMonth, endOfMonth, subDays, format, isSameDay } from "date-fns";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { KpiCard } from "@/components/kpi-card";
import { RevenueChart } from "@/components/revenue-chart";

export default async function DashboardPage() {
  const session = await requireSession();
  const tenantId = session.user.tenantId;

  const now = new Date();
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const weekStart = subDays(now, 6);

  const [activeLeads, jobsToday, completedThisMonth, aiSessionsToday, recentLeads, upcomingJobs, recentJobsForChart] =
    await Promise.all([
      prisma.lead.count({
        where: { tenantId, status: { notIn: ["WON", "LOST"] } },
      }),
      prisma.job.count({
        where: { tenantId, scheduledAt: { gte: todayStart, lte: todayEnd } },
      }),
      prisma.job.findMany({
        where: {
          tenantId,
          status: "COMPLETED",
          scheduledAt: { gte: monthStart, lte: monthEnd },
        },
        select: { amount: true },
      }),
      prisma.chatSession.count({
        where: { tenantId, createdAt: { gte: todayStart, lte: todayEnd } },
      }),
      prisma.lead.findMany({
        where: { tenantId },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.job.findMany({
        where: { tenantId, scheduledAt: { gte: now } },
        orderBy: { scheduledAt: "asc" },
        take: 5,
        include: { customer: true, technician: true },
      }),
      prisma.job.findMany({
        where: { tenantId, scheduledAt: { gte: weekStart } },
        select: { scheduledAt: true, amount: true },
      }),
    ]);

  const revenueThisMonth = completedThisMonth.reduce((sum, j) => sum + (j.amount ?? 0), 0);

  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const day = subDays(now, 6 - i);
    const revenue = recentJobsForChart
      .filter((j) => isSameDay(j.scheduledAt, day))
      .reduce((sum, j) => sum + (j.amount ?? 0), 0);
    return { day: format(day, "EEE"), revenue };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back, {session.user.name?.split(" ")[0]}. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Active Leads" value={String(activeLeads)} icon={Users} />
        <KpiCard label="Jobs Today" value={String(jobsToday)} icon={Briefcase} />
        <KpiCard
          label="Revenue This Month"
          value={`$${revenueThisMonth.toLocaleString()}`}
          icon={DollarSign}
        />
        <KpiCard label="AI Conversations Today" value={String(aiSessionsToday)} icon={Bot} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Revenue — Last 7 Days</h2>
          <RevenueChart data={chartData} />
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Upcoming Jobs</h2>
            <Link href="/jobs" className="text-xs font-medium text-teal-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingJobs.length === 0 && (
              <p className="text-sm text-gray-400">No upcoming jobs scheduled.</p>
            )}
            {upcomingJobs.map((job) => (
              <div key={job.id} className="rounded-xl bg-gray-50 p-3">
                <p className="text-sm font-medium text-gray-800">{job.title}</p>
                <p className="text-xs text-gray-500">{job.customer.name}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {format(job.scheduledAt, "MMM d, h:mm a")} · {job.technician?.name ?? "Unassigned"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Recent Leads</h2>
          <Link href="/leads" className="text-xs font-medium text-teal-600 hover:underline">
            View all
          </Link>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase text-gray-400">
              <th className="pb-2 font-medium">Name</th>
              <th className="pb-2 font-medium">Service</th>
              <th className="pb-2 font-medium">Channel</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Received</th>
            </tr>
          </thead>
          <tbody>
            {recentLeads.map((lead) => (
              <tr key={lead.id} className="border-b border-gray-50 last:border-0">
                <td className="py-2.5 text-gray-800">{lead.name}</td>
                <td className="py-2.5 text-gray-500">{lead.serviceType ?? "—"}</td>
                <td className="py-2.5 text-gray-500">{lead.channel.replace("_", " ")}</td>
                <td className="py-2.5">
                  <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                    {lead.status}
                  </span>
                </td>
                <td className="py-2.5 text-gray-400">{format(lead.createdAt, "MMM d, h:mm a")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
