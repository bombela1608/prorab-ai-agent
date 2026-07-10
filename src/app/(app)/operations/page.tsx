import { format } from "date-fns";
import { CheckCircle2, XCircle, Gauge } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { KpiCard } from "@/components/kpi-card";

export default async function OperationsPage() {
  const session = await requireSession();
  const tenantId = session.user.tenantId;
  const now = new Date();

  const [jobs, technicians, upcomingJobs] = await Promise.all([
    prisma.job.findMany({ where: { tenantId } }),
    prisma.user.findMany({ where: { tenantId, role: "TECHNICIAN" } }),
    prisma.job.findMany({
      where: { tenantId, scheduledAt: { gte: now } },
      orderBy: { scheduledAt: "asc" },
      take: 6,
      include: { customer: true, technician: true },
    }),
  ]);

  const totalJobs = jobs.length;
  const completed = jobs.filter((j) => j.status === "COMPLETED").length;
  const cancelled = jobs.filter((j) => j.status === "CANCELLED").length;
  const completionRate = totalJobs === 0 ? 0 : Math.round((completed / totalJobs) * 100);
  const cancellationRate = totalJobs === 0 ? 0 : Math.round((cancelled / totalJobs) * 100);

  const activeJobs = jobs.filter((j) => j.status === "SCHEDULED" || j.status === "IN_PROGRESS").length;
  const utilizationPct = Math.min(
    100,
    Math.round((activeJobs / Math.max(technicians.length, 1) / 8) * 100)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Operations</h1>
        <p className="text-sm text-gray-500">Job completion, cancellations, and team capacity.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard label="Job Completion Rate" value={`${completionRate}%`} icon={CheckCircle2} />
        <KpiCard label="Cancellation Rate" value={`${cancellationRate}%`} icon={XCircle} />
        <KpiCard label="Team Utilization" value={`${utilizationPct}%`} icon={Gauge} />
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-700">Upcoming Tasks</h2>
        <div className="space-y-3">
          {upcomingJobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {job.customer.name} — {job.title}
                </p>
                <p className="text-xs text-gray-500">
                  {format(job.scheduledAt, "MMM d, h:mm a")} · Assigned to {job.technician?.name ?? "Unassigned"}
                </p>
              </div>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
                {job.status.replace("_", " ")}
              </span>
            </div>
          ))}
          {upcomingJobs.length === 0 && <p className="text-sm text-gray-400">No upcoming tasks.</p>}
        </div>
      </div>
    </div>
  );
}
