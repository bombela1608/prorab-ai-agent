import { Users, Gauge, Briefcase } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { KpiCard } from "@/components/kpi-card";

export default async function HrPage() {
  const session = await requireSession();
  const tenantId = session.user.tenantId;

  const [users, jobs] = await Promise.all([
    prisma.user.findMany({ where: { tenantId }, orderBy: { name: "asc" } }),
    prisma.job.findMany({ where: { tenantId } }),
  ]);

  const technicians = users.filter((u) => u.role === "TECHNICIAN");
  const capacityPerTech = 8;
  const activeJobs = jobs.filter((j) => j.status === "SCHEDULED" || j.status === "IN_PROGRESS").length;
  const utilizationPct = Math.min(
    100,
    Math.round((activeJobs / Math.max(technicians.length, 1) / capacityPerTech) * 100)
  );

  const performance = users.map((u) => {
    const userJobs = jobs.filter((j) => j.technicianId === u.id);
    const completed = userJobs.filter((j) => j.status === "COMPLETED");
    const upcoming = userJobs.filter((j) => j.status === "SCHEDULED" || j.status === "IN_PROGRESS");
    const revenue = completed.reduce((sum, j) => sum + (j.amount ?? 0), 0);
    return {
      user: u,
      totalJobs: userJobs.length,
      completed: completed.length,
      upcoming: upcoming.length,
      completionRate: userJobs.length === 0 ? 0 : Math.round((completed.length / userJobs.length) * 100),
      revenue,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">HR</h1>
        <p className="text-sm text-gray-500">Team headcount, utilization, and performance.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard label="Active Employees" value={String(users.length)} icon={Users} />
        <KpiCard label="Utilization Rate" value={`${utilizationPct}%`} icon={Gauge} />
        <KpiCard label="Active Jobs" value={String(activeJobs)} icon={Briefcase} />
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase text-gray-400">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Total Jobs</th>
              <th className="px-4 py-3 font-medium">Completed</th>
              <th className="px-4 py-3 font-medium">Upcoming</th>
              <th className="px-4 py-3 font-medium">Completion Rate</th>
              <th className="px-4 py-3 font-medium">Revenue Generated</th>
            </tr>
          </thead>
          <tbody>
            {performance.map((p) => (
              <tr key={p.user.id} className="border-b border-gray-50 last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800">{p.user.name}</p>
                  <p className="text-xs text-gray-400">{p.user.email}</p>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                    {p.user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{p.totalJobs}</td>
                <td className="px-4 py-3 text-gray-500">{p.completed}</td>
                <td className="px-4 py-3 text-gray-500">{p.upcoming}</td>
                <td className="px-4 py-3 text-gray-500">{p.totalJobs === 0 ? "—" : `${p.completionRate}%`}</td>
                <td className="px-4 py-3 text-gray-500">${p.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
