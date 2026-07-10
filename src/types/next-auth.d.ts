import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      tenantId: string;
      accountType: "staff" | "customer";
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    tenantId: string;
    accountType: "staff" | "customer";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    role?: string;
    tenantId: string;
    accountType: "staff" | "customer";
  }
}
