import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      id: "staff-credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          tenantId: user.tenantId,
          accountType: "staff",
        };
      },
    }),
    Credentials({
      id: "customer-credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const customer = await prisma.customer.findFirst({ where: { email } });
        if (!customer || !customer.passwordHash) return null;

        const valid = await bcrypt.compare(password, customer.passwordHash);
        if (!valid) return null;

        return {
          id: customer.id,
          email: customer.email,
          name: customer.name,
          tenantId: customer.tenantId,
          accountType: "customer",
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        token.tenantId = user.tenantId;
        token.accountType = user.accountType;
        if (user.accountType === "staff") {
          token.role = user.role;
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.tenantId = token.tenantId as string;
        session.user.accountType = token.accountType as "staff" | "customer";
        if (token.accountType === "staff") {
          session.user.role = token.role as string;
        }
      }
      return session;
    },
  },
});
