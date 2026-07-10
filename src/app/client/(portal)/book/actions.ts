"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireCustomerSession } from "@/lib/session";

export async function bookServiceAction(formData: FormData) {
  const session = await requireCustomerSession();

  const customer = await prisma.customer.findUnique({ where: { id: session.user.id } });
  if (!customer) redirect("/client/login");

  const serviceType = String(formData.get("serviceType"));
  const preferredDate = String(formData.get("preferredDate"));
  const address = (formData.get("address") as string) || customer.address;
  const notes = (formData.get("notes") as string) || "";

  if (address && address !== customer.address) {
    await prisma.customer.update({ where: { id: customer.id }, data: { address } });
  }

  await prisma.lead.create({
    data: {
      tenantId: customer.tenantId,
      customerId: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      serviceType,
      channel: "WEB_FORM",
      status: "NEW",
      notes: `Requested via client portal for ${preferredDate || "no preferred time given"}. Address: ${address ?? "on file"}. ${notes}`.trim(),
    },
  });

  redirect("/client/dashboard?requested=1");
}
