import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => escape(row[h])).join(","));
  }
  return lines.join("\n");
}

export async function GET(req: NextRequest) {
  const session = await requireSession();
  const tenantId = session.user.tenantId;
  const type = req.nextUrl.searchParams.get("type") ?? "leads";

  let rows: Record<string, unknown>[] = [];

  if (type === "jobs") {
    const jobs = await prisma.job.findMany({
      where: { tenantId },
      include: { customer: true, technician: true },
      orderBy: { scheduledAt: "desc" },
    });
    rows = jobs.map((j) => ({
      title: j.title,
      customer: j.customer.name,
      technician: j.technician?.name ?? "",
      serviceType: j.serviceType ?? "",
      status: j.status,
      scheduledAt: j.scheduledAt.toISOString(),
      amount: j.amount ?? "",
    }));
  } else {
    const leads = await prisma.lead.findMany({ where: { tenantId }, orderBy: { createdAt: "desc" } });
    rows = leads.map((l) => ({
      name: l.name,
      email: l.email ?? "",
      phone: l.phone ?? "",
      serviceType: l.serviceType ?? "",
      channel: l.channel,
      status: l.status,
      createdAt: l.createdAt.toISOString(),
    }));
  }

  const csv = toCsv(rows);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${type}-export.csv"`,
    },
  });
}
