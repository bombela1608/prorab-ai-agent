import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  classifyIntent,
  extractEntities,
  mergeEntities,
  replyForIntent,
  nextBookingPrompt,
} from "@/lib/ai-agent";

const CONFIDENCE_ESCALATION_THRESHOLD = 0.7;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message, sessionId } = body as { message: string; sessionId?: string };

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  const tenant = await prisma.tenant.findFirst();
  if (!tenant) {
    return NextResponse.json({ error: "No tenant configured" }, { status: 500 });
  }

  const session = sessionId
    ? await prisma.chatSession.findUnique({
        where: { id: sessionId },
        include: { messages: true },
      })
    : null;

  const chatSession =
    session ??
    (await prisma.chatSession.create({
      data: { tenantId: tenant.id },
      include: { messages: true },
    }));

  await prisma.chatMessage.create({
    data: { chatSessionId: chatSession.id, role: "user", content: message },
  });

  const priorUserMessages = chatSession.messages
    .filter((m) => m.role === "user")
    .map((m) => m.content);
  const allUserMessages = [...priorUserMessages, message];
  const allUserText = allUserMessages.join(" ");

  const entities = allUserMessages.reduce(
    (acc, m) => mergeEntities(acc, extractEntities(m)),
    {} as ReturnType<typeof extractEntities>
  );

  const { intent: rawIntent, confidence } = classifyIntent(message);
  // Once the booking flow has started (a service type is already on file and
  // no lead has been created yet), keep steering the conversation through the
  // guided flow even if a later reply (e.g. "My name is Jamie") doesn't itself
  // contain booking keywords. Complaints/billing always override so real
  // escalations aren't swallowed by an in-progress booking.
  const entitiesBeforeThisMessage = priorUserMessages.reduce(
    (acc, m) => mergeEntities(acc, extractEntities(m)),
    {} as ReturnType<typeof extractEntities>
  );
  const inBookingFlow = Boolean(entitiesBeforeThisMessage.serviceType) && !chatSession.convertedLeadId;
  const intent =
    rawIntent === "complaint" || rawIntent === "billing"
      ? rawIntent
      : inBookingFlow
        ? "booking"
        : rawIntent;

  const escalate = confidence < CONFIDENCE_ESCALATION_THRESHOLD || intent === "complaint";
  let replyText = replyForIntent(intent, entities);
  let leadCreated = false;

  if (
    intent === "booking" &&
    !chatSession.convertedLeadId &&
    !nextBookingPrompt(entities)
  ) {
    const lead = await prisma.lead.create({
      data: {
        tenantId: tenant.id,
        name: entities.name ?? "Web Visitor",
        phone: entities.phone,
        email: entities.email,
        serviceType: entities.serviceType,
        channel: "CHAT",
        status: "NEW",
        notes: `Captured by AI intake widget. Conversation: ${allUserText}`,
      },
    });
    await prisma.chatSession.update({
      where: { id: chatSession.id },
      data: { convertedLeadId: lead.id },
    });
    leadCreated = true;
    replyText = `You're all set! I've booked a ${entities.serviceType ?? "service"} request for ${entities.name} and our team will call ${entities.phone} shortly to confirm a time.`;
  }

  await prisma.chatMessage.create({
    data: { chatSessionId: chatSession.id, role: "assistant", content: replyText },
  });

  return NextResponse.json({
    sessionId: chatSession.id,
    reply: replyText,
    intent,
    entities,
    confidence: Number(confidence.toFixed(2)),
    escalate,
    leadCreated,
  });
}
