"use client";

import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { clientLoginAction } from "./actions";

function ClientLoginForm() {
  const [error, formAction, pending] = useActionState(clientLoginAction, undefined);
  const searchParams = useSearchParams();
  const justReset = searchParams.get("reset") === "1";

  return (
    <div className="w-full rounded-3xl bg-gray-50 p-8 shadow-sm">
      <h1 className="mb-1 text-center text-2xl font-bold text-gray-800">Client Sign in</h1>
      <p className="mb-6 text-center text-sm text-gray-500">Track your bookings and chat with our AI assistant.</p>

      {justReset && (
        <p className="mb-4 rounded-xl bg-teal-50 px-4 py-2.5 text-center text-sm text-teal-700">
          Password reset successful. Please sign in.
        </p>
      )}

      <form action={formAction} className="space-y-3">
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue="maria.g@example.com"
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

      <p className="mt-4 space-y-1 text-center text-sm text-gray-500">
        <Link href="/client/forgot-password" className="block font-semibold text-teal-600 hover:underline">
          Forgot password?
        </Link>
        <span className="block">
          Don&apos;t have an account?{" "}
          <Link href="/client/signup" className="font-semibold text-teal-600 hover:underline">
            Sign up
          </Link>
        </span>
      </p>
    </div>
  );
}

export default function ClientLoginPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-8 py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-500 text-lg font-extrabold text-white font-[family-name:var(--font-baloo)]">
            P
          </div>
          <span className="text-lg font-bold text-gray-800 font-[family-name:var(--font-baloo)]">
            ProRab AI Agent
          </span>
        </Link>
        <Link
          href="/login"
          className="rounded-full border border-gray-200 px-5 py-2 text-xs font-bold uppercase tracking-wide text-gray-500 hover:border-gray-300"
        >
          Staff Login
        </Link>
      </header>

      <main className="mx-auto flex max-w-sm flex-col items-center px-4 pb-16 pt-8">
        <Suspense fallback={<div className="h-96 w-full animate-pulse rounded-3xl bg-gray-50" />}>
          <ClientLoginForm />
        </Suspense>
      </main>
    </div>
  );
}
