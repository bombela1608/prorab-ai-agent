"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export async function createKnowledgeDocument(formData: FormData) {
  const session = await requireSession();

  await prisma.knowledgeDocument.create({
    data: {
      tenantId: session.user.tenantId,
      title: String(formData.get("title")),
      content: String(formData.get("content")),
    },
  });

  revalidatePath("/knowledge-base");
}

export async function deleteKnowledgeDocument(formData: FormData) {
  const session = await requireSession();
  const id = String(formData.get("id"));

  await prisma.knowledgeDocument.deleteMany({
    where: { id, tenantId: session.user.tenantId },
  });

  revalidatePath("/knowledge-base");
}
