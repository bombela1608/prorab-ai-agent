import { Bell } from "lucide-react";
import { signOut } from "@/auth";

export function ClientTopbar({ customerName }: { customerName: string }) {
  return (
    <header className="flex h-20 shrink-0 items-center justify-between gap-4 border-b border-black/5 bg-white px-6">
      <div />
      <div className="flex items-center gap-3">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:text-gray-700">
          <Bell size={16} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-orange-500" />
        </button>
        <div className="hidden items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 sm:flex">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-500 text-xs font-semibold text-white">
            {customerName.slice(0, 2).toUpperCase()}
          </div>
          <p className="text-sm font-semibold text-gray-800">{customerName}</p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/client/login" });
          }}
        >
          <button className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
