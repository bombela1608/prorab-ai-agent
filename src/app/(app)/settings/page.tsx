import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { updateTenantBranding } from "./actions";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-600";

export default async function SettingsPage() {
  const session = await requireSession();

  const [tenant, users] = await Promise.all([
    prisma.tenant.findUnique({ where: { id: session.user.tenantId } }),
    prisma.user.findMany({ where: { tenantId: session.user.tenantId }, orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-500">Workspace branding, plan, and team.</p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-700">Workspace Branding</h2>
        <form action={updateTenantBranding} className="space-y-4">
          <div>
            <label className={labelClass} htmlFor="name">
              Company Name
            </label>
            <input id="name" name="name" defaultValue={tenant?.name} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="brandColor">
              Brand Color
            </label>
            <div className="flex items-center gap-3">
              <input
                id="brandColor"
                name="brandColor"
                type="color"
                defaultValue={tenant?.brandColor}
                className="h-9 w-14 rounded-xl border border-gray-200 bg-gray-50"
              />
              <span className="text-sm text-gray-500">{tenant?.brandColor}</span>
            </div>
          </div>
          <button
            type="submit"
            className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
          >
            Save Changes
          </button>
        </form>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-sm font-semibold text-gray-700">Plan</h2>
        <p className="text-sm text-gray-500">
          You&apos;re on the <span className="font-medium text-teal-600">{tenant?.plan}</span> plan.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-700">Team</h2>
        <div className="space-y-2">
          {users.map((u) => (
            <div key={u.id} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-2.5">
              <div>
                <p className="text-sm text-gray-800">{u.name}</p>
                <p className="text-xs text-gray-500">{u.email}</p>
              </div>
              <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                {u.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
