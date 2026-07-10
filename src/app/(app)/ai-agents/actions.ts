"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export async function updateAgentSettings(formData: FormData) {
  const session = await requireSession();

  await prisma.tenant.update({
    where: { id: session.user.tenantId },
    data: {
      aiTone: String(formData.get("aiTone")),
      aiOperatingHours: String(formData.get("aiOperatingHours")),
    },
  });

  revalidatePath("/ai-agents");
}
