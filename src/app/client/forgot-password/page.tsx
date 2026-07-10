"use client";

import { useActionState } from "react";
import Link from "next/link";
import { clientForgotPasswordAction, ForgotPasswordState } from "./actions";

const initialState: ForgotPasswordState = { status: "idle" };

export default function ClientForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(clientForgotPasswordAction, initialState);

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
        <div className="w-full rounded-3xl bg-gray-50 p-8 shadow-sm">
          <h1 className="mb-1 text-center text-2xl font-bold text-gray-800">Reset your password</h1>
          <p className="mb-6 text-center text-sm text-gray-500">
            Enter the email on your client account and we&apos;ll help you reset your password.
          </p>

          {state.status === "success" ? (
            <div className="space-y-4 text-center">
              <p className="text-sm text-gray-600">
                If an account exists for that email, a reset link has been generated.
              </p>
              {state.resetLink && (
                <div className="rounded-xl bg-teal-50 p-4 text-left text-sm">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal-700">
                    Demo mode — no email service configured
                  </p>
                  <p className="mb-2 text-gray-600">In production this link would be emailed to you:</p>
                  <Link href={state.resetLink} className="break-all font-medium text-teal-700 hover:underline">
                    {state.resetLink}
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <form action={formAction} className="space-y-3">
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="w-full rounded-full bg-white px-5 py-3 text-sm text-gray-800 shadow-sm outline-none focus:ring-2 focus:ring-teal-300"
              />
              {state.status === "error" && <p className="px-2 text-sm text-red-500">{state.message}</p>}
              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-full bg-teal-500 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-teal-600 disabled:opacity-60"
              >
                {pending ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}

          <p className="mt-4 text-center text-sm text-gray-500">
            <Link href="/client/login" className="font-semibold text-teal-600 hover:underline">
              Back to sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
