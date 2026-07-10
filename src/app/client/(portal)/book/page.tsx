import { prisma } from "@/lib/prisma";
import { requireCustomerSession } from "@/lib/session";
import { bookServiceAction } from "./actions";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-600";

const SERVICES = ["HVAC Repair", "HVAC Install", "Plumbing", "Electrical", "Cleaning", "Landscaping"];

export default async function BookServicePage() {
  const session = await requireCustomerSession();
  const customer = await prisma.customer.findUnique({ where: { id: session.user.id } });

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Book a Service</h1>
        <p className="text-sm text-gray-500">Pick a service, choose a time, and get instant confirmation.</p>
      </div>

      <form action={bookServiceAction} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <div>
          <label className={labelClass} htmlFor="serviceType">
            Select Service
          </label>
          <select id="serviceType" name="serviceType" required className={inputClass}>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="preferredDate">
            Preferred Date &amp; Time
          </label>
          <input id="preferredDate" name="preferredDate" type="datetime-local" required className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="address">
            Address
          </label>
          <input
            id="address"
            name="address"
            defaultValue={customer?.address ?? ""}
            placeholder="Service address"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="notes">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Describe the issue or any details that will help us prepare..."
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-orange-500 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
        >
          Request Booking
        </button>
        <p className="text-center text-xs text-gray-400">
          Our team will confirm your appointment shortly after you submit.
        </p>
      </form>
    </div>
  );
}
