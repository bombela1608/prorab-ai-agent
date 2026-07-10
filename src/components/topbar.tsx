import { Bell, Search } from "lucide-react";
import { signOut } from "@/auth";

export function Topbar({
  userName,
  role,
  plan,
}: {
  userName: string;
  role: string;
  plan: string;
}) {
  return (
    <header className="flex h-20 shrink-0 items-center justify-between gap-4 border-b border-black/5 bg-white px-6">
      <div className="relative w-full max-w-md">
        <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Search..."
          className="w-full rounded-full border border-transparent bg-gray-100 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-teal-300"
        />
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 sm:inline-block">
          {plan} Plan
        </span>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:text-gray-700">
          <Bell size={16} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-orange-500" />
        </button>
        <div className="hidden items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 sm:flex">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-500 text-xs font-semibold text-white">
            {userName.slice(0, 2).toUpperCase()}
          </div>
          <div className="text-sm leading-tight">
            <p className="font-semibold text-gray-800">{userName}</p>
            <p className="text-[11px] text-gray-500">{role}</p>
          </div>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
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
