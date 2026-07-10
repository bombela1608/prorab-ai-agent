import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/session";
import { answerInternalQuestion } from "@/lib/ai-internal";

export async function POST(req: NextRequest) {
  const session = await requireSession();
  const { message } = (await req.json()) as { message: string };

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  const reply = await answerInternalQuestion(session.user.tenantId, message);
  return NextResponse.json({ reply });
}
