"use client";

import { useTransition } from "react";
import { updateLeadStatus } from "@/app/(app)/leads/actions";

const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "WON", "LOST"];

export function LeadStatusSelect({ leadId, status }: { leadId: string; status: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) => startTransition(() => updateLeadStatus(leadId, e.target.value))}
      className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 outline-none focus:ring-2 focus:ring-teal-300 disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
