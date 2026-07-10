export type Intent = "booking" | "billing" | "complaint" | "inquiry";

export interface ExtractedEntities {
  name?: string;
  phone?: string;
  email?: string;
  serviceType?: string;
}

const SERVICE_KEYWORDS: Record<string, string[]> = {
  "HVAC": ["hvac", "ac ", "a/c", "air condition", "heating", "furnace", "thermostat"],
  "Plumbing": ["plumb", "leak", "pipe", "drain", "faucet", "toilet", "water heater"],
  "Electrical": ["electric", "wiring", "outlet", "breaker", "panel", "light fixture"],
  "Cleaning": ["clean", "housekeep", "maid"],
  "Landscaping": ["lawn", "yard", "landscap", "tree", "mow"],
};

const BOOKING_WORDS = [
  "book", "schedule", "appointment", "come out", "come by", "need someone",
  "fix", "repair", "install", "urgent", "asap", "broken", "not working",
  "when can", "available",
];
const BILLING_WORDS = ["invoice", "bill", "payment", "charge", "refund", "cost", "price", "quote", "estimate"];
const COMPLAINT_WORDS = ["complain", "unhappy", "terrible", "angry", "disappointed", "still broken", "never showed", "unacceptable", "worst"];

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_RE = /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const NAME_RE = /(?:my name is|i'm|i am|this is)\s+([a-zA-Z]+(?:\s[a-zA-Z]+)?)/i;

export function classifyIntent(text: string): { intent: Intent; confidence: number } {
  const t = text.toLowerCase();

  const score = (words: string[]) => words.filter((w) => t.includes(w)).length;

  const billingScore = score(BILLING_WORDS);
  const complaintScore = score(COMPLAINT_WORDS);
  const bookingScore = score(BOOKING_WORDS);

  if (complaintScore > 0) {
    return { intent: "complaint", confidence: Math.min(0.6 + complaintScore * 0.15, 0.95) };
  }
  if (billingScore > 0) {
    return { intent: "billing", confidence: Math.min(0.6 + billingScore * 0.15, 0.95) };
  }
  if (bookingScore > 0) {
    return { intent: "booking", confidence: Math.min(0.55 + bookingScore * 0.12, 0.95) };
  }
  return { intent: "inquiry", confidence: 0.5 };
}

export function extractEntities(text: string): ExtractedEntities {
  const entities: ExtractedEntities = {};
  const t = text.toLowerCase();

  const emailMatch = text.match(EMAIL_RE);
  if (emailMatch) entities.email = emailMatch[0];

  const phoneMatch = text.match(PHONE_RE);
  if (phoneMatch) entities.phone = phoneMatch[0];

  const nameMatch = text.match(NAME_RE);
  if (nameMatch) entities.name = nameMatch[1].replace(/\b\w/g, (c) => c.toUpperCase());

  for (const [service, keywords] of Object.entries(SERVICE_KEYWORDS)) {
    if (keywords.some((k) => t.includes(k))) {
      entities.serviceType = service;
      break;
    }
  }

  return entities;
}

export function mergeEntities(a: ExtractedEntities, b: ExtractedEntities): ExtractedEntities {
  return {
    name: b.name ?? a.name,
    phone: b.phone ?? a.phone,
    email: b.email ?? a.email,
    serviceType: b.serviceType ?? a.serviceType,
  };
}

export function nextBookingPrompt(entities: ExtractedEntities): string | null {
  if (!entities.serviceType) return "What type of service do you need help with (HVAC, plumbing, electrical, cleaning, or landscaping)?";
  if (!entities.name) return "Got it. Can I get your name?";
  if (!entities.phone) return `Thanks${entities.name ? ", " + entities.name : ""}. What's the best phone number to reach you at?`;
  return null;
}

export function replyForIntent(intent: Intent, entities: ExtractedEntities): string {
  switch (intent) {
    case "billing":
      return "I can help with billing questions. For invoice details or payment issues, I'll flag this for our finance team to follow up — could you also share your name and phone number?";
    case "complaint":
      return "I'm sorry to hear that. I'm escalating this to a human team member right away so they can make it right. Can you share your name and phone number so they can reach you?";
    case "inquiry":
      return "Happy to help! We handle HVAC, plumbing, electrical, cleaning, and landscaping for homes in the area. Are you looking to book a service, or do you have another question?";
    case "booking":
    default: {
      const prompt = nextBookingPrompt(entities);
      if (prompt) return prompt;
      return `Perfect — I've got a ${entities.serviceType} request for ${entities.name} at ${entities.phone}. A team member will confirm your appointment shortly!`;
    }
  }
}
