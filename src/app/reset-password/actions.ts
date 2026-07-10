"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getValidResetToken, consumeResetToken } from "@/lib/password-reset";

export type ResetPasswordState = { status: "idle" } | { status: "error"; message: string };

export async function resetPasswordAction(
  _prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const token = String(formData.get("token") || "");
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (password.length < 6) {
    return { status: "error", message: "Password must be at least 6 characters." };
  }
  if (password !== confirmPassword) {
    return { status: "error", message: "Passwords do not match." };
  }

  const record = await getValidResetToken(token);
  if (!record) {
    return { status: "error", message: "This reset link is invalid or has expired. Please request a new one." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  if (record.accountType === "staff") {
    await prisma.user.update({ where: { id: record.accountId }, data: { passwordHash } });
  } else {
    await prisma.customer.update({ where: { id: record.accountId }, data: { passwordHash } });
  }

  await consumeResetToken(record.id);

  redirect(record.accountType === "staff" ? "/login?reset=1" : "/client/login?reset=1");
}
