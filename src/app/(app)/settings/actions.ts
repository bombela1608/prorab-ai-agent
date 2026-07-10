"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export async function updateTenantBranding(formData: FormData) {
  const session = await requireSession();

  await prisma.tenant.update({
    where: { id: session.user.tenantId },
    data: {
      name: String(formData.get("name")),
      brandColor: String(formData.get("brandColor")),
    },
  });

  revalidatePath("/settings");
  revalidatePath("/dashboard");
}
