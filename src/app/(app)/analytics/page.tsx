import { subMonths, startOfMonth, endOfMonth, format } from "date-fns";
import { DollarSign, TrendingUp, Repeat, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { KpiCard } from "@/components/kpi-card";
import { RevenueBarChart, ChannelPieChart, DistributionBarChart } from "@/components/analytics-charts";

export default async function AnalyticsPage() {
  const session = await requireSession();
  const tenantId = session.user.tenantId;
  const now = new Date();

  const [leads, jobs, customers] = await Promise.all([
    prisma.lead.findMany({ where: { tenantId } }),
    prisma.job.findMany({ where: { tenantId }, include: { lead: true } }),
    prisma.customer.findMany({ where: { tenantId }, include: { _count: { select: { jobs: true } } } }),
  ]);

  const completedJobs = jobs.filter((j) => j.status === "COMPLETED");
  const revenueThisMonth = completedJobs
    .filter((j) => j.scheduledAt >= startOfMonth(now) && j.scheduledAt <= endOfMonth(now))
    .reduce((sum, j) => sum + (j.amount ?? 0), 0);
  const revenueLastMonth = completedJobs
    .filter(
      (j) => j.scheduledAt >= startOfMonth(subMonths(now, 1)) && j.scheduledAt <= endOfMonth(subMonths(now, 1))
    )
    .reduce((sum, j) => sum + (j.amount ?? 0), 0);
  const revenueChangePct = revenueLastMonth === 0 ? null : Math.round(((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100);

  const closedLeads = leads.filter((l) => l.status === "WON" || l.status === "LOST");
  const conversionRate = closedLeads.length === 0 ? 0 : Math.round((leads.filter((l) => l.status === "WON").length / closedLeads.length) * 100);

  const customersWithJobs = customers.filter((c) => c._count.jobs > 0);
  const repeatCustomers = customersWithJobs.filter((c) => c._count.jobs > 1);
  const repeatRate = customersWithJobs.length === 0 ? 0 : Math.round((repeatCustomers.length / customersWithJobs.length) * 100);

  const responseTimes = jobs
    .filter((j) => j.lead)
    .map((j) => (j.createdAt.getTime() - j.lead!.createdAt.getTime()) / (1000 * 60 * 60));
  const avgResponseHours =
    responseTimes.length === 0 ? null : responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;

  const revenueTrend = Array.from({ length: 6 }).map((_, i) => {
    const monthDate = subMonths(now, 5 - i);
    const revenue = completedJobs
      .filter((j) => j.scheduledAt >= startOfMonth(monthDate) && j.scheduledAt <= endOfMonth(monthDate))
      .reduce((sum, j) => sum + (j.amount ?? 0), 0);
    return { month: format(monthDate, "MMM"), revenue };
  });

  const channelCounts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.channel] = (acc[l.channel] ?? 0) + 1;
    return acc;
  }, {});
  const channelData = Object.entries(channelCounts).map(([name, value]) => ({
    name: name.replace("_", " "),
    value,
  }));

  const distributionData = [
    { name: "New (1 job)", value: customersWithJobs.length - repeatCustomers.length },
    { name: "Returning (2+ jobs)", value: repeatCustomers.length },
  ];

  const topChannel = channelData.slice().sort((a, b) => b.value - a.value)[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">AI Analytics</h1>
        <p className="text-sm text-gray-500">Smarter decisions with real-time business metrics.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Revenue This Month" value={`$${revenueThisMonth.toLocaleString()}`} icon={DollarSign} />
        <KpiCard label="Conversion Rate" value={`${conversionRate}%`} icon={TrendingUp} />
        <KpiCard label="Repeat Customer Rate" value={`${repeatRate}%`} icon={Repeat} />
        <KpiCard
          label="Avg. Response Time"
          value={avgResponseHours === null ? "—" : `${avgResponseHours.toFixed(1)}h`}
          icon={Clock}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-1">
          <h2 className="mb-2 text-sm font-semibold text-gray-700">Revenue Trend</h2>
          <p className="mb-2 text-xs text-gray-400">Last 6 months</p>
          <RevenueBarChart data={revenueTrend} />
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-1">
          <h2 className="mb-2 text-sm font-semibold text-gray-700">Leads by Channel</h2>
          <p className="mb-2 text-xs text-gray-400">All-time distribution</p>
          <ChannelPieChart data={channelData} />
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-1">
          <h2 className="mb-2 text-sm font-semibold text-gray-700">Customer Distribution</h2>
          <p className="mb-2 text-xs text-gray-400">New vs. returning</p>
          <DistributionBarChart data={distributionData} />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">AI Insights</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-teal-50 p-4 text-sm text-teal-800">
            {revenueChangePct === null
              ? "Not enough history yet to compare month-over-month revenue."
              : `Revenue is ${revenueChangePct >= 0 ? "up" : "down"} ${Math.abs(revenueChangePct)}% vs. last month.`}
          </div>
          <div className="rounded-xl bg-orange-50 p-4 text-sm text-orange-800">
            {topChannel
              ? `${topChannel.name} is your top lead source with ${topChannel.value} lead${topChannel.value === 1 ? "" : "s"}.`
              : "No lead channel data yet."}
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">Export Data</h2>
        <p className="mb-3 text-xs text-gray-500">
          Download as CSV to import into Tableau, Power BI, or Google Data Studio.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/api/export/csv?type=leads"
            className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
          >
            Export Leads CSV
          </a>
          <a
            href="/api/export/csv?type=jobs"
            className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-600"
          >
            Export Jobs CSV
          </a>
        </div>
      </div>
    </div>
  );
}
