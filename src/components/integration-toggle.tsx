"use client";

import { useTransition } from "react";
import { toggleIntegration } from "@/app/(app)/integrations/actions";
import { cn } from "@/lib/utils";

export function IntegrationToggle({ id, connected }: { id: string; connected: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => toggleIntegration(id, !connected))}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition disabled:opacity-50",
        connected ? "bg-teal-500" : "bg-gray-200"
      )}
      aria-pressed={connected}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition",
          connected ? "left-5" : "left-0.5"
        )}
      />
    </button>
  );
}
