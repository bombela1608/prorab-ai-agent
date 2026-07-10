"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export async function createLead(formData: FormData) {
  const session = await requireSession();

  await prisma.lead.create({
    data: {
      tenantId: session.user.tenantId,
      name: String(formData.get("name")),
      email: (formData.get("email") as string) || null,
      phone: (formData.get("phone") as string) || null,
      serviceType: (formData.get("serviceType") as string) || null,
      channel: (formData.get("channel") as string) as never,
      notes: (formData.get("notes") as string) || null,
    },
  });

  revalidatePath("/leads");
  redirect("/leads");
}

export async function updateLeadStatus(leadId: string, status: string) {
  const session = await requireSession();

  await prisma.lead.updateMany({
    where: { id: leadId, tenantId: session.user.tenantId },
    data: { status: status as never },
  });

  revalidatePath("/leads");
}

export async function convertLeadToJob(formData: FormData) {
  const session = await requireSession();
  const tenantId = session.user.tenantId;
  const leadId = String(formData.get("leadId"));

  const lead = await prisma.lead.findFirst({ where: { id: leadId, tenantId } });
  if (!lead) redirect("/leads");

  let customerId = lead.customerId;
  if (!customerId) {
    const customer = await prisma.customer.create({
      data: {
        tenantId,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
      },
    });
    customerId = customer.id;
    await prisma.lead.update({ where: { id: lead.id }, data: { customerId } });
  }

  redirect(`/jobs/new?leadId=${lead.id}&customerId=${customerId}`);
}
