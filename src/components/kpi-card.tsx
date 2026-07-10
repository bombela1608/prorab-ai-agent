import { LucideIcon } from "lucide-react";

export function KpiCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{label}</p>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
          <Icon size={17} />
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
