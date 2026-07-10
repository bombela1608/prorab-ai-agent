"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export async function toggleIntegration(integrationId: string, connected: boolean) {
  const session = await requireSession();

  await prisma.integration.updateMany({
    where: { id: integrationId, tenantId: session.user.tenantId },
    data: { connected },
  });

  revalidatePath("/integrations");
}
