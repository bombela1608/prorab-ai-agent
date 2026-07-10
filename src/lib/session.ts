import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function requireSession() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  if (session.user.accountType !== "staff") {
    redirect("/client/dashboard");
  }
  return session;
}

export async function requireCustomerSession() {
  const session = await auth();
  if (!session?.user) {
    redirect("/client/login");
  }
  if (session.user.accountType !== "customer") {
    redirect("/dashboard");
  }
  return session;
}
