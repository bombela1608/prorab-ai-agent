"use client";

import { useTransition } from "react";
import { updateJobStatus } from "@/app/(app)/jobs/actions";
import { cn } from "@/lib/utils";

const STATUSES = ["SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

const STATUS_COLORS: Record<string, string> = {
  SCHEDULED: "bg-teal-50 text-teal-700",
  IN_PROGRESS: "bg-orange-50 text-orange-600",
  COMPLETED: "bg-emerald-50 text-emerald-600",
  CANCELLED: "bg-gray-100 text-gray-500",
};

export function JobStatusSelect({ jobId, status }: { jobId: string; status: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) => startTransition(() => updateJobStatus(jobId, e.target.value))}
      className={cn(
        "rounded-full px-2.5 py-1 text-xs font-medium outline-none focus:ring-2 focus:ring-teal-300 disabled:opacity-50",
        STATUS_COLORS[status]
      )}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s} className="text-gray-700">
          {s.replace("_", " ")}
        </option>
      ))}
    </select>
  );
}
