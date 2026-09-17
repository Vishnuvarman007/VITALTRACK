import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, FileText, ChevronRight } from "lucide-react";
import RiskBadge from "./RiskBadge";

export default function PatientTable({ patients }) {
  if (!patients || patients.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400">
        No patients match your search criteria.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            <th className="py-3.5 px-4">Patient</th>
            <th className="py-3.5 px-3">Condition</th>
            <th className="py-3.5 px-3 text-center">HR</th>
            <th className="py-3.5 px-3 text-center">BP</th>
            <th className="py-3.5 px-3 text-center">SpO₂</th>
            <th className="py-3.5 px-3 text-center">Glucose</th>
            <th className="py-3.5 px-3 text-center">Risk</th>
            <th className="py-3.5 px-3 text-center">Status</th>
            <th className="py-3.5 px-3 text-right">Updated</th>
            <th className="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {patients.map((p) => (
            <tr
              key={p.id}
              className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
            >
              {/* Patient */}
              <td className="py-3 px-4">
                <Link to={`/patients/${p.id}`} className="group block">
                  <span className="font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {p.name}
                  </span>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span className="font-mono text-sky-600 dark:text-sky-400">{p.id}</span>
                    <span>•</span>
                    <span>{p.age}y {p.gender[0]}</span>
                    <span>•</span>
                    <span className="truncate max-w-[100px]">{p.location.split(",")[0]}</span>
                  </div>
                </Link>
              </td>

              {/* Condition */}
              <td className="py-3 px-3">
                <span className="inline-block font-medium text-slate-700 dark:text-slate-300 max-w-[180px] truncate">
                  {p.condition}
                </span>
              </td>

              {/* HR */}
              <td className="py-3 px-3 text-center">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {p.heartRate}
                </span>
                <span className="text-[10px] text-slate-400 block">BPM</span>
              </td>

              {/* BP */}
              <td className="py-3 px-3 text-center">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {p.bloodPressure}
                </span>
              </td>

              {/* SpO2 */}
              <td className="py-3 px-3 text-center">
                <span
                  className={`font-bold ${
                    p.spo2 < 90
                      ? "text-rose-600 dark:text-rose-400 font-extrabold"
                      : p.spo2 < 94
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-slate-800 dark:text-slate-200"
                  }`}
                >
                  {p.spo2}%
                </span>
              </td>

              {/* Glucose */}
              <td className="py-3 px-3 text-center">
                <span
                  className={`font-bold ${
                    p.glucose > 200
                      ? "text-rose-600 dark:text-rose-400 font-extrabold"
                      : "text-slate-800 dark:text-slate-200"
                  }`}
                >
                  {p.glucose}
                </span>
                <span className="text-[10px] text-slate-400 block">mg/dL</span>
              </td>

              {/* Risk */}
              <td className="py-3 px-3 text-center">
                <RiskBadge level={p.riskLevel} size="sm" />
              </td>

              {/* Status */}
              <td className="py-3 px-3 text-center">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {p.monitoringStatus}
                </span>
              </td>

              {/* Updated */}
              <td className="py-3 px-3 text-right text-slate-400 text-[11px]">
                {p.lastUpdated}
              </td>

              {/* Actions */}
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <Link
                    to={`/reports?patientId=${p.id}`}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="View Report"
                  >
                    <FileText className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to={`/patients/${p.id}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold transition-colors"
                  >
                    <span>View</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
