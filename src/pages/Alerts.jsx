import React, { useState, useMemo } from "react";
import { AlertOctagon, Filter, CheckCircle2, PhoneCall, Check, Clock } from "lucide-react";
import AlertCard from "../components/AlertCard";
import EmptyState from "../components/EmptyState";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";

export default function Alerts() {
  const { alerts, acknowledgeAlert, resolveAlert } = useData();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("ALL"); // "ALL" | "CRITICAL" | "HIGH" | "WARNING" | "RESOLVED"

  const filteredAlerts = useMemo(() => {
    if (activeTab === "ALL") return alerts;
    if (activeTab === "CRITICAL") return alerts.filter((a) => a.type === "CRITICAL");
    if (activeTab === "HIGH") return alerts.filter((a) => a.type === "HIGH");
    if (activeTab === "WARNING") return alerts.filter((a) => a.type === "WARNING");
    if (activeTab === "RESOLVED") return alerts.filter((a) => a.type === "RESOLVED" || a.status === "Resolved");
    return alerts;
  }, [alerts, activeTab]);

  const counts = {
    all: alerts.length,
    critical: alerts.filter((a) => a.type === "CRITICAL").length,
    high: alerts.filter((a) => a.type === "HIGH").length,
    warning: alerts.filter((a) => a.type === "WARNING").length,
    resolved: alerts.filter((a) => a.type === "RESOLVED" || a.status === "Resolved").length
  };

  const handleAcknowledgeAll = () => {
    alerts.forEach((a) => {
      if (!a.acknowledged) acknowledgeAlert(a.id);
    });
    addToast("All pending alerts acknowledged.", "success");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Emergency & Health Alerts
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              {alerts.filter((a) => !a.acknowledged).length} unacknowledged
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time multi-vital threshold breach alerts and clinical escalation queue.
          </p>
        </div>

        <button
          onClick={handleAcknowledgeAll}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Acknowledge All Alerts</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
        {[
          { id: "ALL", label: "All Alerts", count: counts.all },
          { id: "CRITICAL", label: "Critical", count: counts.critical, color: "text-rose-600 dark:text-rose-400" },
          { id: "HIGH", label: "High Priority", count: counts.high, color: "text-amber-600 dark:text-amber-400" },
          { id: "WARNING", label: "Warnings", count: counts.warning },
          { id: "RESOLVED", label: "Resolved", count: counts.resolved, color: "text-emerald-600 dark:text-emerald-400" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-sky-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Alert Feed */}
      {filteredAlerts.length === 0 ? (
        <EmptyState
          title="No alerts in this category"
          description="All clear! No threshold breaches are currently recorded for this filter criteria."
          icon={AlertOctagon}
        />
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onAcknowledge={acknowledgeAlert}
              onResolve={resolveAlert}
            />
          ))}
        </div>
      )}
    </div>
  );
}
