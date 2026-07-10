"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export function RevenueChart({ data }: { data: { day: string; revenue: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
        <YAxis stroke="#9ca3af" fontSize={12} />
        <Tooltip
          contentStyle={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12 }}
          labelStyle={{ color: "#374151" }}
        />
        <Line type="monotone" dataKey="revenue" stroke="#37a8b0" strokeWidth={2.5} dot={{ r: 3, fill: "#37a8b0" }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
