import { format } from "date-fns";
import { Trash2, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { createKnowledgeDocument, deleteKnowledgeDocument } from "./actions";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-600";

export default async function KnowledgeBasePage() {
  const session = await requireSession();

  const documents = await prisma.knowledgeDocument.findMany({
    where: { tenantId: session.user.tenantId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Knowledge Base &amp; RAG</h1>
        <p className="text-sm text-gray-500">
          Upload price lists, FAQs, and manuals — the AI Agent uses these to answer questions accurately.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                    <FileText size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{doc.title}</p>
                    <p className="mt-1 text-xs text-gray-500">{format(doc.createdAt, "MMM d, yyyy")}</p>
                  </div>
                </div>
                <form action={deleteKnowledgeDocument}>
                  <input type="hidden" name="id" value={doc.id} />
                  <button
                    type="submit"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </form>
              </div>
              <p className="mt-3 line-clamp-3 text-sm text-gray-500">{doc.content}</p>
            </div>
          ))}
          {documents.length === 0 && (
            <p className="rounded-2xl bg-white p-6 text-center text-sm text-gray-400 shadow-sm">
              No documents uploaded yet.
            </p>
          )}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Add Document</h2>
          <form action={createKnowledgeDocument} className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="title">
                Title
              </label>
              <input id="title" name="title" required placeholder="e.g. Price List" className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="content">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={8}
                placeholder="Paste price lists, FAQs, or policy text here..."
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-orange-500 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
            >
              Add to Knowledge Base
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
