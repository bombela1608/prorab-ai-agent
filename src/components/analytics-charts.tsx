"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#37a8b0", "#e07c22", "#7dd3d8", "#f0a75c", "#2c8a91", "#c2661a"];

export function RevenueBarChart({ data }: { data: { month: string; revenue: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
        <YAxis stroke="#9ca3af" fontSize={12} />
        <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12 }} />
        <Bar dataKey="revenue" fill="#37a8b0" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ChannelPieChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="45%"
          innerRadius="45%"
          outerRadius="70%"
          paddingAngle={2}
          isAnimationActive={false}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={24} wrapperStyle={{ fontSize: 12 }} />
        <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function DistributionBarChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
        <YAxis stroke="#9ca3af" fontSize={12} />
        <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12 }} />
        <Bar dataKey="value" fill="#e07c22" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
