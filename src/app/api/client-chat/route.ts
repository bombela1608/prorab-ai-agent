import { NextRequest, NextResponse } from "next/server";
import { requireCustomerSession } from "@/lib/session";
import { answerClientQuestion } from "@/lib/ai-client";

export async function POST(req: NextRequest) {
  const session = await requireCustomerSession();
  const { message } = (await req.json()) as { message: string };

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  const reply = await answerClientQuestion(session.user.tenantId, session.user.id, message);
  return NextResponse.json({ reply });
}
