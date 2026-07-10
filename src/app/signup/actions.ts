"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { DEFAULT_INTEGRATIONS } from "@/lib/default-integrations";

export async function platformSignupAction(_prevState: string | undefined, formData: FormData) {
  const fullName = String(formData.get("fullName"));
  const companyName = String(formData.get("companyName"));
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const plan = (formData.get("plan") as string) || "Professional";

  if (!fullName || !companyName || !email || !password) {
    return "All fields are required.";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return "An account with this email already exists. Please sign in instead.";
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const tenant = await prisma.tenant.create({
    data: { name: companyName, plan },
  });

  await prisma.user.create({
    data: { tenantId: tenant.id, email, name: fullName, passwordHash, role: "ADMIN" },
  });

  await prisma.integration.createMany({
    data: DEFAULT_INTEGRATIONS.map((i) => ({ tenantId: tenant.id, ...i, connected: false })),
  });

  try {
    await signIn("staff-credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Workspace created, but sign-in failed. Please try signing in.";
    }
    throw error;
  }
}
