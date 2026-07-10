import { AlertTriangle, DollarSign, Package, Gauge } from "lucide-react";
import { requireSession } from "@/lib/session";
import { computeForecasts } from "@/lib/forecasts";
import { KpiCard } from "@/components/kpi-card";
import { WhatIfAnalysis } from "@/components/what-if-analysis";
import { applyStaleLeadWorkflow } from "./actions";

export default async function ForecastsPage() {
  const session = await requireSession();
  const forecast = await computeForecasts(session.user.tenantId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">AI Forecasts &amp; Anomalies</h1>
        <p className="text-sm text-gray-500">Predict and prevent — forecasts and risk alerts based on your data.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Revenue Forecast"
          value={`$${forecast.revenueForecast.toLocaleString()}`}
          icon={DollarSign}
        />
        <KpiCard label="Demand Prediction" value={`${forecast.demandPrediction} jobs`} icon={Package} />
        <KpiCard label="Staff Utilization" value={`${forecast.staffUtilizationPct}%`} icon={Gauge} />
        <KpiCard label="Risk Alerts" value={String(forecast.riskAlerts.length)} icon={AlertTriangle} />
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">Risk Alerts</h2>
        {forecast.riskAlerts.length === 0 ? (
          <p className="text-sm text-gray-400">No risks detected right now.</p>
        ) : (
          <div className="space-y-2">
            {forecast.riskAlerts.map((alert) => (
              <div
                key={alert.key}
                className="flex items-center justify-between rounded-xl bg-orange-50 px-4 py-3 text-sm text-orange-800"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle size={15} />
                  {alert.message}
                </div>
                {alert.key === "stale_leads" && (
                  <form action={applyStaleLeadWorkflow}>
                    <input type="hidden" name="leadIds" value={forecast.staleLeadIds.join(",")} />
                    <button
                      type="submit"
                      className="rounded-full bg-orange-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-orange-600"
                    >
                      Apply via Workflow
                    </button>
                  </form>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-1 text-sm font-semibold text-gray-700">What-if Analysis</h2>
        <p className="mb-4 text-xs text-gray-400">Model scenarios before acting.</p>
        <WhatIfAnalysis baseRevenue={forecast.revenueForecast} baseUtilization={forecast.staffUtilizationPct} />
      </div>
    </div>
  );
}
