"use client";

import { useState } from "react";

export function WhatIfAnalysis({
  baseRevenue,
  baseUtilization,
}: {
  baseRevenue: number;
  baseUtilization: number;
}) {
  const [adSpend, setAdSpend] = useState(0);
  const [utilizationTarget, setUtilizationTarget] = useState(baseUtilization);

  const revenueImpact = Math.round(baseRevenue * (1 + adSpend / 100) * 0.6 * (adSpend / 100));
  const projectedRevenue = baseRevenue + revenueImpact;

  const utilizationDelta = utilizationTarget - baseUtilization;
  const responseTimeDelta = Math.max(0, Math.round(utilizationDelta * 0.15));

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-xl bg-gray-50 p-4">
        <p className="text-sm font-medium text-gray-700">If ad spend increases by {adSpend}%</p>
        <input
          type="range"
          min={0}
          max={50}
          value={adSpend}
          onChange={(e) => setAdSpend(Number(e.target.value))}
          className="my-3 w-full accent-teal-500"
        />
        <p className="text-sm text-gray-600">
          Predicted revenue: <span className="font-semibold text-teal-600">${projectedRevenue.toLocaleString()}</span>{" "}
          <span className="text-xs text-gray-400">(+${revenueImpact.toLocaleString()})</span>
        </p>
      </div>

      <div className="rounded-xl bg-gray-50 p-4">
        <p className="text-sm font-medium text-gray-700">If staff utilization reaches {utilizationTarget}%</p>
        <input
          type="range"
          min={baseUtilization}
          max={100}
          value={utilizationTarget}
          onChange={(e) => setUtilizationTarget(Number(e.target.value))}
          className="my-3 w-full accent-orange-500"
        />
        <p className="text-sm text-gray-600">
          Est. response time impact:{" "}
          <span className="font-semibold text-orange-600">+{responseTimeDelta} min</span> average delay
        </p>
      </div>
    </div>
  );
}
