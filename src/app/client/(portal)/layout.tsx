import { requireCustomerSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { ClientSidebar } from "@/components/client-sidebar";
import { ClientTopbar } from "@/components/client-topbar";

export default async function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireCustomerSession();
  const tenant = await prisma.tenant.findUnique({ where: { id: session.user.tenantId } });

  return (
    <div className="flex h-screen bg-gray-50">
      <ClientSidebar tenantName={tenant?.name ?? "Workspace"} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <ClientTopbar customerName={session.user.name ?? "Customer"} />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
