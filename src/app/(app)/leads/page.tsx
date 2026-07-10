import Link from "next/link";
import { format } from "date-fns";
import { Plus, Briefcase } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { LeadStatusSelect } from "@/components/lead-status-select";
import { convertLeadToJob } from "./actions";

const COLUMNS: { status: string; label: string }[] = [
  { status: "NEW", label: "New" },
  { status: "CONTACTED", label: "Contacted" },
  { status: "QUALIFIED", label: "Qualified" },
  { status: "WON", label: "Won" },
  { status: "LOST", label: "Lost" },
];

export default async function LeadsPage() {
  const session = await requireSession();

  const leads = await prisma.lead.findMany({
    where: { tenantId: session.user.tenantId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Leads</h1>
          <p className="text-sm text-gray-500">Pipeline across all intake channels.</p>
        </div>
        <Link
          href="/leads/new"
          className="flex items-center gap-1.5 rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
        >
          <Plus size={15} /> New Lead
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {COLUMNS.map((col) => {
          const colLeads = leads.filter((l) => l.status === col.status);
          return (
            <div key={col.status} className="rounded-2xl bg-gray-100 p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {col.label}
                </h2>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-gray-500 shadow-sm">
                  {colLeads.length}
                </span>
              </div>
              <div className="space-y-2">
                {colLeads.map((lead) => (
                  <div key={lead.id} className="rounded-xl bg-white p-3 shadow-sm">
                    <p className="text-sm font-semibold text-gray-800">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.serviceType ?? "General inquiry"}</p>
                    <p className="mt-1 text-[11px] text-gray-400">
                      {lead.channel.replace("_", " ")} · {format(lead.createdAt, "MMM d")}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <LeadStatusSelect leadId={lead.id} status={lead.status} />
                      <form action={convertLeadToJob}>
                        <input type="hidden" name="leadId" value={lead.id} />
                        <button
                          type="submit"
                          title="Convert to job"
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-50 text-teal-600 hover:bg-teal-100"
                        >
                          <Briefcase size={13} />
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
                {colLeads.length === 0 && (
                  <p className="px-1 py-2 text-xs text-gray-400">No leads</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
