"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function signupAction(_prevState: string | undefined, formData: FormData) {
  const name = String(formData.get("name"));
  const email = String(formData.get("email"));
  const phone = (formData.get("phone") as string) || null;
  const password = String(formData.get("password"));

  if (!name || !email || !password) {
    return "Name, email, and password are required.";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  const tenant = await prisma.tenant.findFirst();
  if (!tenant) {
    return "No workspace is configured yet.";
  }

  const existing = await prisma.customer.findFirst({ where: { tenantId: tenant.id, email } });
  if (existing?.passwordHash) {
    return "An account with this email already exists. Please sign in instead.";
  }

  const passwordHash = await bcrypt.hash(password, 10);

  if (existing) {
    await prisma.customer.update({
      where: { id: existing.id },
      data: { name, phone: phone ?? existing.phone, passwordHash },
    });
  } else {
    await prisma.customer.create({
      data: { tenantId: tenant.id, name, email, phone, passwordHash },
    });
  }

  try {
    await signIn("customer-credentials", {
      email,
      password,
      redirectTo: "/client/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Account created, but sign-in failed. Please try signing in.";
    }
    throw error;
  }
}
