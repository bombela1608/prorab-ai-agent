import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createLead } from "../actions";

const CHANNELS = ["WEB_FORM", "PHONE", "EMAIL", "CHAT", "WHATSAPP", "FACEBOOK", "YELP", "GOOGLE_LSA"];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-600";

export default function NewLeadPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Link href="/leads" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft size={15} /> Back to leads
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-800">New Lead</h1>
        <p className="text-sm text-gray-500">Manually log a lead from any channel.</p>
      </div>

      <form action={createLead} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <Field label="Name" name="name" required />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Email" name="email" type="email" />
          <Field label="Phone" name="phone" type="tel" />
        </div>
        <Field label="Service Type" name="serviceType" placeholder="e.g. HVAC Repair" />
        <div>
          <label className={labelClass} htmlFor="channel">
            Channel
          </label>
          <select id="channel" name="channel" defaultValue="WEB_FORM" className={inputClass}>
            {CHANNELS.map((c) => (
              <option key={c} value={c}>
                {c.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="notes">
            Notes
          </label>
          <textarea id="notes" name="notes" rows={3} className={inputClass} />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-orange-500 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
        >
          Create Lead
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}
