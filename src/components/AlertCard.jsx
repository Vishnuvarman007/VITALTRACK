import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, CheckCircle, PhoneCall, Clock, ArrowRight } from "lucide-react";
import RiskBadge from "./RiskBadge";
import { useToast } from "../context/ToastContext";

export default function AlertCard({ alert, onAcknowledge, onResolve }) {
  const { addToast } = useToast();

  const handleContactDoctor = () => {
    addToast(`Emergency notification sent to on-call doctor for ${alert.patientName}.`, "info");
  };

  const handleAcknowledge = () => {
    if (onAcknowledge) onAcknowledge(alert.id);
    addToast(`Alert #${alert.id} acknowledged.`, "success");
  };

  const handleResolve = () => {
    if (onResolve) onResolve(alert.id);
    addToast(`Alert #${alert.id} marked as resolved.`, "success");
  };

  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-200 ${
        alert.type === "CRITICAL"
          ? "bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60 shadow-sm hover:shadow-rose-500/10"
          : alert.type === "HIGH"
          ? "bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60"
          : alert.type === "RESOLVED"
          ? "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-75"
          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <RiskBadge level={alert.type} size="sm" />
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {alert.category}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {alert.time}
          </span>
        </div>

        <div className="text-xs font-mono font-medium text-slate-400">
          ID: {alert.id}
        </div>
      </div>

      <div className="mt-3">
        <div className="flex flex-wrap items-baseline gap-2">
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            {alert.patientName}
          </h4>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            ({alert.patientId})
          </span>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
          {alert.message}
        </p>
      </div>

      {/* Metric details */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 text-xs">
        <div>
          <span className="text-slate-400 block">Metric</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{alert.metric}</span>
        </div>
        <div>
          <span className="text-slate-400 block">Current Value</span>
          <span className="font-bold text-rose-600 dark:text-rose-400">{alert.currentValue}</span>
        </div>
        <div>
          <span className="text-slate-400 block">Threshold</span>
          <span className="font-medium text-slate-600 dark:text-slate-300">{alert.threshold}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <Link
          to={`/patients/${alert.patientId}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300"
        >
          <span>View Patient Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleContactDoctor}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-sky-500" />
            Contact Doctor
          </button>

          {!alert.acknowledged ? (
            <button
              onClick={handleAcknowledge}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium transition-colors shadow-sm"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Acknowledge
            </button>
          ) : alert.type !== "RESOLVED" ? (
            <button
              onClick={handleResolve}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Resolve
            </button>
          ) : (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold px-2 py-1">
              ✓ Resolved
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
