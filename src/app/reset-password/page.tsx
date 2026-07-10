"use client";

import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { resetPasswordAction, ResetPasswordState } from "./actions";

const initialState: ResetPasswordState = { status: "idle" };

function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(resetPasswordAction, initialState);
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  return (
    <div className="w-full rounded-3xl bg-gray-50 p-8 shadow-sm">
      <h1 className="mb-1 text-center text-2xl font-bold text-gray-800">Set a new password</h1>
      <p className="mb-6 text-center text-sm text-gray-500">Choose a new password for your account.</p>

      {!token ? (
        <p className="text-center text-sm text-red-500">
          Missing reset token. Please use the link from your password reset email.
        </p>
      ) : (
        <form action={formAction} className="space-y-3">
          <input type="hidden" name="token" value={token} />
          <input
            name="password"
            type="password"
            required
            placeholder="New password (min 6 characters)"
            className="w-full rounded-full bg-white px-5 py-3 text-sm text-gray-800 shadow-sm outline-none focus:ring-2 focus:ring-teal-300"
          />
          <input
            name="confirmPassword"
            type="password"
            required
            placeholder="Confirm new password"
            className="w-full rounded-full bg-white px-5 py-3 text-sm text-gray-800 shadow-sm outline-none focus:ring-2 focus:ring-teal-300"
          />
          {state.status === "error" && <p className="px-2 text-sm text-red-500">{state.message}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-orange-500 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-orange-600 disabled:opacity-60"
          >
            {pending ? "Saving..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
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
        <Suspense fallback={<div className="h-80 w-full animate-pulse rounded-3xl bg-gray-50" />}>
          <ResetPasswordForm />
        </Suspense>
      </main>
    </div>
  );
}
