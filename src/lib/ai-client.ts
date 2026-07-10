import { format } from "date-fns";
import { prisma } from "@/lib/prisma";

export async function answerClientQuestion(tenantId: string, customerId: string, message: string): Promise<string> {
  const q = message.toLowerCase();

  if (q.includes("cancel")) {
    const job = await prisma.job.findFirst({
      where: { customerId, status: "SCHEDULED" },
      orderBy: { scheduledAt: "asc" },
    });
    if (!job) return "You don't have any upcoming bookings to cancel.";
    await prisma.job.update({ where: { id: job.id }, data: { status: "CANCELLED" } });
    return `Done — I've cancelled your ${job.title} appointment on ${format(job.scheduledAt, "MMM d 'at' h:mm a")}. Let me know if you'd like to book a new time.`;
  }

  if (q.includes("next") || q.includes("when") || q.includes("appointment") || q.includes("schedule") || q.includes("eta")) {
    const job = await prisma.job.findFirst({
      where: { customerId, status: { in: ["SCHEDULED", "IN_PROGRESS"] } },
      orderBy: { scheduledAt: "asc" },
      include: { technician: true },
    });
    if (!job) return "You don't have any upcoming appointments. Want to book one?";
    return `Your next appointment is ${job.title} on ${format(job.scheduledAt, "EEEE, MMM d 'at' h:mm a")}, with ${job.technician?.name ?? "a technician to be assigned"}. Status: ${job.status.replace("_", " ").toLowerCase()}.`;
  }

  if (q.includes("book") || q.includes("new service") || q.includes("request")) {
    return "You can book a new service anytime from the \"Book a Service\" tab — pick a service type, preferred date, and address, and our team will confirm shortly.";
  }

  if (q.includes("order") || q.includes("history") || q.includes("past")) {
    const count = await prisma.job.count({ where: { customerId, status: "COMPLETED" } });
    return `You have ${count} completed order${count === 1 ? "" : "s"} with us. You can see the full list under "My Orders."`;
  }

  const docs = await prisma.knowledgeDocument.findMany({ where: { tenantId } });
  const words = q.split(/\W+/).filter((w) => w.length > 3);
  const match = docs.find((d) =>
    words.some((w) => d.title.toLowerCase().includes(w) || d.content.toLowerCase().includes(w))
  );
  if (match) {
    return match.content.slice(0, 400) + (match.content.length > 400 ? "..." : "");
  }

  return "I can help you check your next appointment, cancel a booking, review your order history, or point you to booking a new service. What would you like to do?";
}
