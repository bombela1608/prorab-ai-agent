import Link from "next/link";
import { ReactNode } from "react";

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-500 text-base font-extrabold text-white font-[family-name:var(--font-baloo)]">
            P
          </div>
          <span className="font-bold font-[family-name:var(--font-baloo)]">ProRab AI Agent</span>
        </Link>
        <Link href="/" className="text-sm font-medium text-teal-600 hover:underline">
          ← Back home
        </Link>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <p className="mt-2 text-sm text-gray-400">Last updated: {lastUpdated}</p>
        <div className="prose-legal mt-8 space-y-6 text-sm leading-relaxed text-gray-600">{children}</div>
      </main>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-lg font-semibold text-gray-800">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
