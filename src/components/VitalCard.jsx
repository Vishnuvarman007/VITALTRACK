import React from "react";
import {
  Heart,
  Activity,
  Wind,
  Thermometer,
  Droplet,
  Dna,
  CircleGauge,
  AlertCircle
} from "lucide-react";
import { evaluateVitalStatus } from "../utils/riskUtils";

const VITAL_META = {
  heartRate: {
    label: "Heart Rate",
    icon: Heart,
    color: "rose",
    unit: "BPM",
    normalRange: "60 - 100 BPM"
  },
  bloodPressure: {
    label: "Blood Pressure",
    icon: Activity,
    color: "blue",
    unit: "mmHg",
    normalRange: "< 120/80 mmHg"
  },
  spo2: {
    label: "Oxygen (SpO₂)",
    icon: Wind,
    color: "teal",
    unit: "%",
    normalRange: "95% - 100%"
  },
  temperature: {
    label: "Temperature",
    icon: Thermometer,
    color: "amber",
    unit: "°F",
    normalRange: "97.0 - 99.0°F"
  },
  glucose: {
    label: "Blood Glucose",
    icon: Droplet,
    color: "purple",
    unit: "mg/dL",
    normalRange: "70 - 140 mg/dL"
  },
  hemoglobin: {
    label: "Hemoglobin",
    icon: Dna,
    color: "emerald",
    unit: "g/dL",
    normalRange: "12.0 - 16.0 g/dL"
  },
  cholesterol: {
    label: "Total Cholesterol",
    icon: CircleGauge,
    color: "indigo",
    unit: "mg/dL",
    normalRange: "< 200 mg/dL"
  }
};

export default function VitalCard({ vitalKey, value, customLabel }) {
  const meta = VITAL_META[vitalKey] || {
    label: customLabel || vitalKey,
    icon: Activity,
    color: "blue",
    unit: "",
    normalRange: "Standard clinical threshold"
  };

  const Icon = meta.icon;
  const status = evaluateVitalStatus(vitalKey, value);

  const statusStyles = {
    normal: {
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
      text: "Normal",
      border: "border-slate-200/80 dark:border-slate-800"
    },
    warning: {
      badge: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
      text: "Borderline",
      border: "border-amber-300 dark:border-amber-800"
    },
    critical: {
      badge: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800 animate-pulse",
      text: "Abnormal",
      border: "border-rose-300 dark:border-rose-800 ring-1 ring-rose-400/30"
    }
  };

  const currentStatus = statusStyles[status] || statusStyles.normal;

  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl border ${currentStatus.border} p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
            <Icon className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          </div>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {meta.label}
          </span>
        </div>

        <span
          className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${currentStatus.badge}`}
        >
          {currentStatus.text}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {value}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {meta.unit}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Target:</span>
        <span className="font-medium text-slate-700 dark:text-slate-300">{meta.normalRange}</span>
      </div>
    </div>
  );
}
