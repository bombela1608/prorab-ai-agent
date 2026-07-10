"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { platformSignupAction } from "./actions";

function SignupForm() {
  const [error, formAction, pending] = useActionState(platformSignupAction, undefined);
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") ?? "Professional";

  return (
    <div className="w-full rounded-3xl bg-gray-50 p-8 shadow-sm">
      <h1 className="mb-1 text-center text-2xl font-bold text-gray-800">Create your workspace</h1>
      <p className="mb-6 text-center text-sm text-gray-500">
        Start your 14-day free trial on the <span className="font-semibold text-teal-600">{plan}</span> plan.
      </p>

      <form action={formAction} className="space-y-3">
        <input type="hidden" name="plan" value={plan} />
        <input
          name="fullName"
          required
          placeholder="Full name"
          className="w-full rounded-full bg-white px-5 py-3 text-sm text-gray-800 shadow-sm outline-none focus:ring-2 focus:ring-teal-300"
        />
        <input
          name="companyName"
          required
          placeholder="Company name"
          className="w-full rounded-full bg-white px-5 py-3 text-sm text-gray-800 shadow-sm outline-none focus:ring-2 focus:ring-teal-300"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Work email"
          className="w-full rounded-full bg-white px-5 py-3 text-sm text-gray-800 shadow-sm outline-none focus:ring-2 focus:ring-teal-300"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password (min 6 characters)"
          className="w-full rounded-full bg-white px-5 py-3 text-sm text-gray-800 shadow-sm outline-none focus:ring-2 focus:ring-teal-300"
        />

        {error && <p className="px-2 text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-orange-500 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-orange-600 disabled:opacity-60"
        >
          {pending ? "Creating workspace..." : "Start Free Trial"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500">
        Already have a workspace?{" "}
        <Link href="/login" className="font-semibold text-teal-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function PlatformSignupPage() {
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
      </header>

      <main className="mx-auto flex max-w-sm flex-col items-center px-4 pb-16 pt-8">
        <Suspense fallback={<div className="h-96 w-full animate-pulse rounded-3xl bg-gray-50" />}>
          <SignupForm />
        </Suspense>
      </main>
    </div>
  );
}
