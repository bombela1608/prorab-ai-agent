import { format } from "date-fns";
import { prisma } from "@/lib/prisma";
import { requireCustomerSession } from "@/lib/session";

const STATUS_BADGE: Record<string, string> = {
  SCHEDULED: "bg-teal-50 text-teal-700",
  IN_PROGRESS: "bg-orange-50 text-orange-600",
  COMPLETED: "bg-emerald-50 text-emerald-600",
  CANCELLED: "bg-gray-100 text-gray-500",
};

export default async function ClientOrdersPage() {
  const session = await requireCustomerSession();

  const jobs = await prisma.job.findMany({
    where: { customerId: session.user.id },
    orderBy: { scheduledAt: "desc" },
    include: { technician: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
        <p className="text-sm text-gray-500">Your full service history, anytime, anywhere.</p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase text-gray-400">
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Technician</th>
              <th className="px-4 py-3 font-medium">Cost</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b border-gray-50 last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800">{job.title}</p>
                  <p className="text-xs text-gray-400">{job.serviceType}</p>
                </td>
                <td className="px-4 py-3 text-gray-500">{format(job.scheduledAt, "MMM d, yyyy · h:mm a")}</td>
                <td className="px-4 py-3 text-gray-500">{job.technician?.name ?? "—"}</td>
                <td className="px-4 py-3 text-gray-500">{job.amount ? `$${job.amount.toLocaleString()}` : "—"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_BADGE[job.status]}`}>
                    {job.status.replace("_", " ")}
                  </span>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
