import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export default async function CustomersPage() {
  const session = await requireSession();

  const customers = await prisma.customer.findMany({
    where: { tenantId: session.user.tenantId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { jobs: true } },
      jobs: { orderBy: { scheduledAt: "desc" }, take: 1 },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
        <p className="text-sm text-gray-500">Full history of orders, payments, and communications.</p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase text-gray-400">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Address</th>
              <th className="px-4 py-3 font-medium">Jobs</th>
              <th className="px-4 py-3 font-medium">Last Job</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-gray-50 last:border-0">
                <td className="px-4 py-3 font-medium text-gray-800">{c.name}</td>
                <td className="px-4 py-3 text-gray-500">
                  <div>{c.email ?? "—"}</div>
                  <div className="text-xs text-gray-400">{c.phone ?? ""}</div>
                </td>
                <td className="px-4 py-3 text-gray-500">{c.address ?? "—"}</td>
                <td className="px-4 py-3 text-gray-500">{c._count.jobs}</td>
                <td className="px-4 py-3 text-gray-400">
                  {c.jobs[0] ? c.jobs[0].title : "—"}
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  No customers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
