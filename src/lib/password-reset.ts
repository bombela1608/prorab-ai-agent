import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function createResetToken(accountType: "staff" | "customer", accountId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  await prisma.passwordResetToken.create({
    data: {
      token,
      accountType,
      accountId,
      expiresAt: new Date(Date.now() + TOKEN_TTL_MS),
    },
  });
  return token;
}

export async function getValidResetToken(token: string) {
  const record = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!record) return null;
  if (record.usedAt) return null;
  if (record.expiresAt < new Date()) return null;
  return record;
}

export async function consumeResetToken(id: string) {
  await prisma.passwordResetToken.update({ where: { id }, data: { usedAt: new Date() } });
}
