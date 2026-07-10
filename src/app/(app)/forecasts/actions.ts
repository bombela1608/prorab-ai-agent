"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export async function applyStaleLeadWorkflow(formData: FormData) {
  const session = await requireSession();
  const leadIds = String(formData.get("leadIds")).split(",").filter(Boolean);

  await prisma.lead.updateMany({
    where: { id: { in: leadIds }, tenantId: session.user.tenantId },
    data: { status: "CONTACTED" },
  });

  revalidatePath("/forecasts");
  revalidatePath("/leads");
}
