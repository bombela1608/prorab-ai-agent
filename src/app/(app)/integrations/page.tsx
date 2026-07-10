import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { IntegrationToggle } from "@/components/integration-toggle";

export default async function IntegrationsPage() {
  const session = await requireSession();

  const integrations = await prisma.integration.findMany({
    where: { tenantId: session.user.tenantId },
    orderBy: { name: "asc" },
  });

  const categories = Array.from(new Set(integrations.map((i) => i.category)));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Integrations &amp; Automations</h1>
        <p className="text-sm text-gray-500">
          Connect your CRM, ERP, finance, e-commerce, and communication tools.
        </p>
      </div>

      {categories.map((category) => (
        <div key={category}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">{category}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {integrations
              .filter((i) => i.category === category)
              .map((integration) => (
                <div key={integration.id} className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-800">{integration.name}</p>
                      <p className="mt-1 text-xs text-gray-500">{integration.description}</p>
                    </div>
                    <IntegrationToggle id={integration.id} connected={integration.connected} />
                  </div>
                  <p className="mt-4 text-xs font-medium text-teal-600">
                    {integration.connected ? "Connected" : "Not connected"}
                  </p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
