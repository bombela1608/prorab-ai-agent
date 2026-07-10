"use server";

import { prisma } from "@/lib/prisma";
import { createResetToken } from "@/lib/password-reset";

export type ForgotPasswordState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; resetLink?: string };

export async function forgotPasswordAction(
  _prevState: ForgotPasswordState,
  formData: FormData
): Promise<ForgotPasswordState> {
  const email = String(formData.get("email") || "");
  if (!email) {
    return { status: "error", message: "Email is required." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { status: "success" };
  }

  const token = await createResetToken("staff", user.id);
  return { status: "success", resetLink: `/reset-password?token=${token}` };
}
