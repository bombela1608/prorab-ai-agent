"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export async function clientLoginAction(_prevState: string | undefined, formData: FormData) {
  try {
    await signIn("customer-credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/client/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Invalid email or password.";
    }
    throw error;
  }
}
