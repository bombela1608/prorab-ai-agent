import Link from "next/link";
import { format, isSameDay } from "date-fns";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { JobStatusSelect } from "@/components/job-status-select";

export default async function JobsPage() {
  const session = await requireSession();

  const jobs = await prisma.job.findMany({
    where: { tenantId: session.user.tenantId },
    orderBy: { scheduledAt: "asc" },
    include: { customer: true, technician: true },
  });

  const groups: { day: Date; jobs: typeof jobs }[] = [];
  for (const job of jobs) {
    const existing = groups.find((g) => isSameDay(g.day, job.scheduledAt));
    if (existing) {
      existing.jobs.push(job);
    } else {
      groups.push({ day: job.scheduledAt, jobs: [job] });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Jobs</h1>
          <p className="text-sm text-gray-500">Scheduling and dispatch across your team.</p>
        </div>
        <Link
          href="/jobs/new"
          className="flex items-center gap-1.5 rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
        >
          <Plus size={15} /> New Job
        </Link>
      </div>

      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.day.toISOString()}>
            <h2 className="mb-2 text-sm font-semibold text-gray-600">
              {format(group.day, "EEEE, MMMM d")}
            </h2>
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase text-gray-400">
                    <th className="px-4 py-3 font-medium">Time</th>
                    <th className="px-4 py-3 font-medium">Job</th>
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium">Technician</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {group.jobs.map((job) => (
                    <tr key={job.id} className="border-b border-gray-50 last:border-0">
                      <td className="px-4 py-3 text-gray-500">{format(job.scheduledAt, "h:mm a")}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-800">{job.title}</p>
                        <p className="text-xs text-gray-400">{job.serviceType}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{job.customer.name}</td>
                      <td className="px-4 py-3 text-gray-500">{job.technician?.name ?? "Unassigned"}</td>
                      <td className="px-4 py-3 text-gray-500">
                        {job.amount ? `$${job.amount.toLocaleString()}` : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <JobStatusSelect jobId={job.id} status={job.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        {groups.length === 0 && (
          <p className="rounded-2xl bg-white p-6 text-center text-sm text-gray-400 shadow-sm">
            No jobs scheduled yet.
          </p>
        )}
      </div>
    </div>
  );
}
