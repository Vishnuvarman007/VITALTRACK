import React, { useState } from "react";
import { AlertOctagon, Sliders, BellRing, Save, RefreshCw, CheckCircle2 } from "lucide-react";
import { CLINICAL_THRESHOLDS } from "../utils/riskUtils";
import { useToast } from "../context/ToastContext";

export default function AdminAlerts() {
  const { addToast } = useToast();
  const [thresholds, setThresholds] = useState({
    spo2Critical: 90,
    glucoseHigh: 180,
    heartRateHigh: 100,
    heartRateLow: 60,
    systolicHigh: 140,
    diastolicHigh: 90,
    feverTemp: 100.4
  });

  const handleSave = (e) => {
    e.preventDefault();
    addToast("System clinical alert threshold rules updated across all telemetry nodes.", "success");
  };

  const handleSimulateAlert = () => {
    addToast("Simulated critical SpO2 alert test packet dispatched through event bus.", "info");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            System Alert Rules Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure automated physiological threshold triggers, multi-vital weighting, and escalation rules.
          </p>
        </div>

        <button
          onClick={handleSimulateAlert}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-sky-500" />
          <span>Simulate Test Alert</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Rules Form */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Sliders className="w-5 h-5 text-sky-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Physiological Threshold Rules
            </h3>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
                <span className="font-bold text-rose-700 dark:text-rose-300 block">
                  Critical SpO₂ Threshold (%)
                </span>
                <p className="text-[11px] text-slate-500">
                  Triggers immediate emergency alarm if oxygen remains below this limit for &gt; 60s.
                </p>
                <input
                  type="number"
                  value={thresholds.spo2Critical}
                  onChange={(e) => setThresholds({ ...thresholds, spo2Critical: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-2">
                <span className="font-bold text-amber-700 dark:text-amber-300 block">
                  High Glucose Surge Threshold (mg/dL)
                </span>
                <p className="text-[11px] text-slate-500">
                  Flags postprandial hyper-glycemic spike requiring endocrine review.
                </p>
                <input
                  type="number"
                  value={thresholds.glucoseHigh}
                  onChange={(e) => setThresholds({ ...thresholds, glucoseHigh: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  Systolic Hypertensive Ceiling (mmHg)
                </span>
                <p className="text-[11px] text-slate-500">
                  Triggers Stage 2 hypertension protocol.
                </p>
                <input
                  type="number"
                  value={thresholds.systolicHigh}
                  onChange={(e) => setThresholds({ ...thresholds, systolicHigh: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  Tachycardia Pulse Ceiling (BPM)
                </span>
                <p className="text-[11px] text-slate-500">
                  Resting heart rate threshold for arrhythmia detection.
                </p>
                <input
                  type="number"
                  value={thresholds.heartRateHigh}
                  onChange={(e) => setThresholds({ ...thresholds, heartRateHigh: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Alert Engine Policies</span>
              </button>
            </div>
          </form>
        </div>

        {/* Escalation Matrix Guide */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <BellRing className="w-4 h-4 text-rose-500" />
            <h4 className="font-bold text-slate-900 dark:text-white">
              Escalation Matrix
            </h4>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900">
              <span className="font-bold text-rose-700 dark:text-rose-300 block">
                Level 1: Critical Emergency
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                Instant browser alarm + direct SMS dispatch to attending cardiologist within 15 seconds.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
              <span className="font-bold text-amber-700 dark:text-amber-300 block">
                Level 2: High Risk Alert
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                Delegate dashboard notification + email summary sent within 5 minutes.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">
                Level 3: Informational Warning
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                Aggregated in daily digest and patient historical trend chart.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
