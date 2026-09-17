import React from "react";
import { Link } from "react-router-dom";
import { Heart, Activity, Wind, Droplet, MapPin, ArrowUpRight, FileText } from "lucide-react";
import RiskBadge from "./RiskBadge";

export default function PatientCard({ patient }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-md hover:border-sky-300 dark:hover:border-sky-700 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {patient.name}
              </h4>
              <span className="text-xs font-mono font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                {patient.id}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <span>{patient.age} yrs • {patient.gender}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5 truncate max-w-[150px]">
                <MapPin className="w-3 h-3 text-slate-400" />
                {patient.location}
              </span>
            </p>
          </div>

          <RiskBadge level={patient.riskLevel} size="sm" />
        </div>

        {/* Condition tag */}
        <div className="mt-3">
          <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 truncate max-w-full">
            {patient.condition}
          </span>
        </div>

        {/* Live Vitals Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Heart Rate</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {patient.heartRate} <span className="text-[10px] font-normal text-slate-400">BPM</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-sky-500 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Blood Pressure</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {patient.bloodPressure}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-teal-500 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">SpO₂</span>
              <span className={`font-bold ${patient.spo2 < 90 ? "text-rose-600 dark:text-rose-400 font-extrabold" : "text-slate-800 dark:text-slate-200"}`}>
                {patient.spo2}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Droplet className="w-4 h-4 text-purple-500 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Glucose</span>
              <span className={`font-bold ${patient.glucose > 200 ? "text-rose-600 dark:text-rose-400" : "text-slate-800 dark:text-slate-200"}`}>
                {patient.glucose} <span className="text-[10px] font-normal text-slate-400">mg/dL</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{patient.lastUpdated}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            to={`/reports?patientId=${patient.id}`}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="View Patient Reports"
          >
            <FileText className="w-3.5 h-3.5" />
          </Link>
          <Link
            to={`/patients/${patient.id}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-medium transition-colors shadow-sm"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
