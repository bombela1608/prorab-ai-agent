import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { createJob } from "../actions";

export default async function NewJobPage({
  searchParams,
}: {
  searchParams: Promise<{ leadId?: string; customerId?: string }>;
}) {
  const session = await requireSession();
  const { leadId, customerId } = await searchParams;
  const tenantId = session.user.tenantId;

  const [customers, technicians, lead] = await Promise.all([
    prisma.customer.findMany({ where: { tenantId }, orderBy: { name: "asc" } }),
    prisma.user.findMany({ where: { tenantId, role: "TECHNICIAN" }, orderBy: { name: "asc" } }),
    leadId ? prisma.lead.findFirst({ where: { id: leadId, tenantId } }) : null,
  ]);

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Link href="/jobs" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft size={15} /> Back to jobs
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-800">New Job</h1>
        <p className="text-sm text-gray-500">
          {lead ? `Scheduling service for lead: ${lead.name}` : "Schedule a new job for a customer."}
        </p>
      </div>

      <form action={createJob} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        {leadId && <input type="hidden" name="leadId" value={leadId} />}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-600" htmlFor="title">
            Job Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={lead?.serviceType ? `${lead.serviceType} Service` : ""}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-600" htmlFor="customerId">
            Customer
          </label>
          <select
            id="customerId"
            name="customerId"
            required
            defaultValue={customerId ?? ""}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100"
          >
            <option value="" disabled>
              Select a customer
            </option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-600" htmlFor="technicianId">
            Technician
          </label>
          <select
            id="technicianId"
            name="technicianId"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100"
          >
            <option value="">Unassigned</option>
            {technicians.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600" htmlFor="serviceType">
              Service Type
            </label>
            <input
              id="serviceType"
              name="serviceType"
              defaultValue={lead?.serviceType ?? ""}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600" htmlFor="amount">
              Amount ($)
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-600" htmlFor="scheduledAt">
            Scheduled At
          </label>
          <input
            id="scheduledAt"
            name="scheduledAt"
            type="datetime-local"
            required
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-600" htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-orange-500 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
        >
          Schedule Job
        </button>
      </form>
    </div>
  );
}
