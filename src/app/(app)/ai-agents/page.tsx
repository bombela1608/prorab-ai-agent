import Link from "next/link";
import { format } from "date-fns";
import { FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { InternalAiChat } from "@/components/internal-ai-chat";
import { updateAgentSettings } from "./actions";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-600";

const TONES = ["Neutral", "Friendly", "Formal"];
const HOURS = ["Always Active (24/7)", "Business Hours Only (8am-6pm)", "Weekdays Only"];

export default async function AiAgentsPage() {
  const session = await requireSession();

  const [tenant, documents] = await Promise.all([
    prisma.tenant.findUnique({ where: { id: session.user.tenantId } }),
    prisma.knowledgeDocument.findMany({
      where: { tenantId: session.user.tenantId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">AI Agents</h1>
        <p className="text-sm text-gray-500">Your AI business assistant — ask questions, generate reports, and manage tasks.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">Recent Uploads</h2>
              <Link href="/knowledge-base" className="text-xs font-medium text-teal-600 hover:underline">
                Manage
              </Link>
            </div>
            <div className="space-y-2">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center gap-2.5 rounded-xl bg-gray-50 px-3 py-2.5">
                  <FileText size={14} className="shrink-0 text-teal-600" />
                  <div className="min-w-0">
                    <p className="truncate text-sm text-gray-700">{doc.title}</p>
                    <p className="text-[11px] text-gray-400">{format(doc.createdAt, "MMM d, yyyy")}</p>
                  </div>
                </div>
              ))}
              {documents.length === 0 && (
                <p className="text-xs text-gray-400">No documents yet.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-gray-700">Agent Settings</h2>
            <form action={updateAgentSettings} className="space-y-4">
              <div>
                <label className={labelClass} htmlFor="aiTone">
                  Tone of Voice
                </label>
                <select id="aiTone" name="aiTone" defaultValue={tenant?.aiTone} className={inputClass}>
                  {TONES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="aiOperatingHours">
                  Operating Hours
                </label>
                <select
                  id="aiOperatingHours"
                  name="aiOperatingHours"
                  defaultValue={tenant?.aiOperatingHours}
                  className={inputClass}
                >
                  {HOURS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-orange-500 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Save Settings
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <InternalAiChat />
        </div>
      </div>
    </div>
  );
}
