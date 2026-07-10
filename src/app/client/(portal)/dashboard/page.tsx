import Link from "next/link";
import { format } from "date-fns";
import { CalendarPlus, ClipboardList, MessageCircle, Wrench } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireCustomerSession } from "@/lib/session";

const STATUS_BADGE: Record<string, string> = {
  SCHEDULED: "bg-teal-50 text-teal-700",
  IN_PROGRESS: "bg-orange-50 text-orange-600",
  COMPLETED: "bg-emerald-50 text-emerald-600",
  CANCELLED: "bg-gray-100 text-gray-500",
};

export default async function ClientDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ requested?: string }>;
}) {
  const session = await requireCustomerSession();
  const customerId = session.user.id;
  const { requested } = await searchParams;

  const [activeJob, upcomingJobs, pastJobsCount] = await Promise.all([
    prisma.job.findFirst({
      where: { customerId, status: { in: ["SCHEDULED", "IN_PROGRESS"] } },
      orderBy: { scheduledAt: "asc" },
      include: { technician: true },
    }),
    prisma.job.findMany({
      where: { customerId, status: { in: ["SCHEDULED", "IN_PROGRESS"] } },
      orderBy: { scheduledAt: "asc" },
      take: 3,
      include: { technician: true },
    }),
    prisma.job.count({ where: { customerId, status: "COMPLETED" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Hi, {session.user.name?.split(" ")[0]}!</h1>
        <p className="text-sm text-gray-500">Your dedicated care team, all in one place.</p>
      </div>

      {requested === "1" && (
        <div className="rounded-2xl bg-teal-50 px-5 py-4 text-sm font-medium text-teal-800">
          Your booking request has been submitted! Our team will confirm your appointment shortly.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/client/book"
          className="flex items-center gap-3 rounded-2xl bg-orange-500 p-5 text-white shadow-sm transition hover:bg-orange-600"
        >
          <CalendarPlus size={20} />
          <span className="text-sm font-semibold">Book a Service</span>
        </Link>
        <Link
          href="/client/orders"
          className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
        >
          <ClipboardList size={20} className="text-teal-600" />
          <span className="text-sm font-semibold text-gray-700">
            {pastJobsCount} completed order{pastJobsCount === 1 ? "" : "s"}
          </span>
        </Link>
        <Link
          href="/client/chat"
          className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
        >
          <MessageCircle size={20} className="text-teal-600" />
          <span className="text-sm font-semibold text-gray-700">Chat with AI</span>
        </Link>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-700">Active Booking</h2>
        {activeJob ? (
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <Wrench size={18} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-800">{activeJob.title}</p>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_BADGE[activeJob.status]}`}>
                  {activeJob.status.replace("_", " ")}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {format(activeJob.scheduledAt, "EEEE, MMM d 'at' h:mm a")}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Technician: {activeJob.technician?.name ?? "Not yet assigned"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            No active bookings.{" "}
            <Link href="/client/book" className="font-medium text-teal-600 hover:underline">
              Book a service
            </Link>{" "}
            to get started.
          </p>
        )}
      </div>

      {upcomingJobs.length > 1 && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Upcoming</h2>
          <div className="space-y-2">
            {upcomingJobs.slice(1).map((job) => (
              <div key={job.id} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">{job.title}</p>
                  <p className="text-xs text-gray-500">{format(job.scheduledAt, "MMM d, h:mm a")}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_BADGE[job.status]}`}>
                  {job.status.replace("_", " ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
