import { subMonths, startOfMonth, endOfMonth, subDays } from "date-fns";
import { prisma } from "@/lib/prisma";

export interface RiskAlert {
  key: string;
  message: string;
  count: number;
}

export async function computeForecasts(tenantId: string) {
  const now = new Date();

  const [jobs, leads, technicians] = await Promise.all([
    prisma.job.findMany({ where: { tenantId } }),
    prisma.lead.findMany({ where: { tenantId } }),
    prisma.user.findMany({ where: { tenantId, role: "TECHNICIAN" } }),
  ]);

  const completedJobs = jobs.filter((j) => j.status === "COMPLETED");
  const monthlyRevenue = [0, 1, 2].map((i) => {
    const monthDate = subMonths(now, i);
    return completedJobs
      .filter((j) => j.scheduledAt >= startOfMonth(monthDate) && j.scheduledAt <= endOfMonth(monthDate))
      .reduce((sum, j) => sum + (j.amount ?? 0), 0);
  });
  const [thisMonth, lastMonth, twoMonthsAgo] = monthlyRevenue;
  const avgGrowth =
    lastMonth > 0 && twoMonthsAgo > 0
      ? ((lastMonth - twoMonthsAgo) / twoMonthsAgo + (thisMonth - lastMonth) / Math.max(lastMonth, 1)) / 2
      : 0;
  const revenueForecast = Math.max(0, Math.round(thisMonth * (1 + avgGrowth)));
  const revenueForecastChangePct = Math.round(avgGrowth * 100);

  const monthlyJobCounts = [0, 1, 2].map((i) => {
    const monthDate = subMonths(now, i);
    return jobs.filter((j) => j.scheduledAt >= startOfMonth(monthDate) && j.scheduledAt <= endOfMonth(monthDate))
      .length;
  });
  const avgJobsPerMonth = monthlyJobCounts.reduce((a, b) => a + b, 0) / monthlyJobCounts.length;
  const demandPrediction = Math.max(0, Math.round(avgJobsPerMonth));

  const activeJobs = jobs.filter((j) => j.status === "SCHEDULED" || j.status === "IN_PROGRESS").length;
  const capacityPerTech = 8;
  const capacity = Math.max(technicians.length, 1) * capacityPerTech;
  const staffUtilizationPct = Math.min(100, Math.round((activeJobs / capacity) * 100));

  const staleLeads = leads.filter(
    (l) => (l.status === "NEW" || l.status === "CONTACTED") && l.createdAt < subDays(now, 3)
  );
  const unassignedJobs = jobs.filter(
    (j) => !j.technicianId && j.status === "SCHEDULED" && j.scheduledAt >= now
  );
  const cancelledThisMonth = jobs.filter(
    (j) => j.status === "CANCELLED" && j.scheduledAt >= startOfMonth(now) && j.scheduledAt <= endOfMonth(now)
  );

  const riskAlerts: RiskAlert[] = [
    ...(staleLeads.length > 0
      ? [{ key: "stale_leads", message: `${staleLeads.length} lead${staleLeads.length === 1 ? "" : "s"} untouched for 3+ days`, count: staleLeads.length }]
      : []),
    ...(unassignedJobs.length > 0
      ? [{ key: "unassigned_jobs", message: `${unassignedJobs.length} upcoming job${unassignedJobs.length === 1 ? "" : "s"} with no technician assigned`, count: unassignedJobs.length }]
      : []),
    ...(cancelledThisMonth.length > 0
      ? [{ key: "cancellations", message: `${cancelledThisMonth.length} job${cancelledThisMonth.length === 1 ? "" : "s"} cancelled this month`, count: cancelledThisMonth.length }]
      : []),
  ];

  return {
    revenueForecast,
    revenueForecastChangePct,
    demandPrediction,
    staffUtilizationPct,
    riskAlerts,
    staleLeadIds: staleLeads.map((l) => l.id),
  };
}
