import { startOfDay, endOfDay, startOfMonth, endOfMonth, format } from "date-fns";
import { prisma } from "@/lib/prisma";

export async function answerInternalQuestion(tenantId: string, message: string): Promise<string> {
  const q = message.toLowerCase();
  const now = new Date();

  if (q.includes("revenue") || q.includes("income") || q.includes("earn")) {
    const jobs = await prisma.job.findMany({
      where: {
        tenantId,
        status: "COMPLETED",
        scheduledAt: { gte: startOfMonth(now), lte: endOfMonth(now) },
      },
      select: { amount: true },
    });
    const total = jobs.reduce((sum, j) => sum + (j.amount ?? 0), 0);
    return `Revenue from completed jobs this month (${format(now, "MMMM")}) is $${total.toLocaleString()} across ${jobs.length} job${jobs.length === 1 ? "" : "s"}.`;
  }

  if (q.includes("lead")) {
    const [active, won, lost, total] = await Promise.all([
      prisma.lead.count({ where: { tenantId, status: { notIn: ["WON", "LOST"] } } }),
      prisma.lead.count({ where: { tenantId, status: "WON" } }),
      prisma.lead.count({ where: { tenantId, status: "LOST" } }),
      prisma.lead.count({ where: { tenantId } }),
    ]);
    return `You have ${active} active lead${active === 1 ? "" : "s"} out of ${total} total. ${won} won, ${lost} lost so far.`;
  }

  if (q.includes("job") || q.includes("schedule") || q.includes("today")) {
    const jobsToday = await prisma.job.findMany({
      where: { tenantId, scheduledAt: { gte: startOfDay(now), lte: endOfDay(now) } },
      include: { customer: true, technician: true },
      orderBy: { scheduledAt: "asc" },
    });
    if (jobsToday.length === 0) return "No jobs are scheduled for today.";
    const lines = jobsToday
      .map((j) => `${format(j.scheduledAt, "h:mm a")} — ${j.title} for ${j.customer.name} (${j.technician?.name ?? "unassigned"})`)
      .join("; ");
    return `You have ${jobsToday.length} job${jobsToday.length === 1 ? "" : "s"} today: ${lines}.`;
  }

  if (q.includes("technician") || q.includes("staff") || q.includes("team") || q.includes("workload")) {
    const technicians = await prisma.user.findMany({ where: { tenantId, role: "TECHNICIAN" } });
    const counts = await Promise.all(
      technicians.map(async (t) => ({
        name: t.name,
        count: await prisma.job.count({
          where: { tenantId, technicianId: t.id, status: { in: ["SCHEDULED", "IN_PROGRESS"] } },
        }),
      }))
    );
    const lines = counts.map((c) => `${c.name}: ${c.count} upcoming job${c.count === 1 ? "" : "s"}`).join(", ");
    return `Team workload — ${lines}.`;
  }

  const docs = await prisma.knowledgeDocument.findMany({ where: { tenantId } });
  const words = q.split(/\W+/).filter((w) => w.length > 3);
  const match = docs.find((d) =>
    words.some((w) => d.title.toLowerCase().includes(w) || d.content.toLowerCase().includes(w))
  );
  if (match) {
    return `Based on your knowledge base document "${match.title}": ${match.content.slice(0, 400)}${match.content.length > 400 ? "..." : ""}`;
  }

  return "I don't have information on that yet. Try asking about leads, jobs, revenue, or team workload — or upload a document to the Knowledge Base so I can reference it.";
}
