"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [error, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-500 text-lg font-extrabold text-white font-[family-name:var(--font-baloo)]">
            P
          </div>
          <span className="text-lg font-bold text-gray-800 font-[family-name:var(--font-baloo)]">
            ProRab AI Agent
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/demo"
            className="rounded-full bg-orange-500 px-5 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-orange-600"
          >
            View Site
          </Link>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">
            EN
          </span>
        </div>
      </header>

      <main className="mx-auto flex max-w-sm flex-col items-center px-4 pb-16 pt-8">
        <div className="w-full rounded-3xl bg-gray-50 p-8 shadow-sm">
          <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Sign in</h1>

          <form action={formAction} className="space-y-3">
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue="admin@cascadehs.com"
              placeholder="Email"
              className="w-full rounded-full bg-white px-5 py-3 text-sm text-gray-800 shadow-sm outline-none focus:ring-2 focus:ring-teal-300"
            />
            <input
              id="password"
              name="password"
              type="password"
              required
              defaultValue="prorab123"
              placeholder="Password"
              className="w-full rounded-full bg-white px-5 py-3 text-sm text-gray-800 shadow-sm outline-none focus:ring-2 focus:ring-teal-300"
            />

            {error && <p className="px-2 text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-teal-500 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-teal-600 disabled:opacity-60"
            >
              {pending ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <div className="mt-4 w-full rounded-3xl bg-teal-500 p-6 text-center text-white shadow-sm">
          <p className="mb-2 text-sm">Demo accounts</p>
          <p className="text-xs text-teal-50">admin@cascadehs.com — Admin</p>
          <p className="text-xs text-teal-50">jordan@cascadehs.com — Technician</p>
          <p className="mt-1 text-xs text-teal-50">Password for both: prorab123</p>
        </div>
      </main>
    </div>
  );
}
