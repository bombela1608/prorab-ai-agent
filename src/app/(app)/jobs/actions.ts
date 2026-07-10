"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export async function createJob(formData: FormData) {
  const session = await requireSession();
  const tenantId = session.user.tenantId;

  const leadId = (formData.get("leadId") as string) || null;

  await prisma.job.create({
    data: {
      tenantId,
      leadId,
      customerId: String(formData.get("customerId")),
      technicianId: (formData.get("technicianId") as string) || null,
      title: String(formData.get("title")),
      serviceType: (formData.get("serviceType") as string) || null,
      scheduledAt: new Date(String(formData.get("scheduledAt"))),
      amount: formData.get("amount") ? Number(formData.get("amount")) : null,
      notes: (formData.get("notes") as string) || null,
    },
  });

  if (leadId) {
    await prisma.lead.updateMany({
      where: { id: leadId, tenantId },
      data: { status: "WON" },
    });
  }

  revalidatePath("/jobs");
  revalidatePath("/leads");
  redirect("/jobs");
}

export async function updateJobStatus(jobId: string, status: string) {
  const session = await requireSession();

  await prisma.job.updateMany({
    where: { id: jobId, tenantId: session.user.tenantId },
    data: { status: status as never },
  });

  revalidatePath("/jobs");
  revalidatePath("/dashboard");
}
