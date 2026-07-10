import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();
  const tenant = await prisma.tenant.findUnique({
    where: { id: session.user.tenantId },
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar tenantName={tenant?.name ?? "Workspace"} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          userName={session.user.name ?? "User"}
          role={session.user.role ?? "STAFF"}
          plan={tenant?.plan ?? "Professional"}
        />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
