import React, { useState } from "react";
import { Sparkles, TrendingUp, TrendingDown, Minus, AlertTriangle, ChevronRight, Info } from "lucide-react";
import RiskBadge from "./RiskBadge";
import Modal from "./Modal";

export default function AIInsightCard({ insight, patientName, patientId, riskLevel = "HIGH" }) {
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  if (!insight) return null;

  const getTrendIcon = (trend) => {
    if (trend === "Increasing") return <TrendingUp className="w-4 h-4 text-rose-500" />;
    if (trend === "Decreasing") return <TrendingDown className="w-4 h-4 text-emerald-500" />;
    return <Minus className="w-4 h-4 text-slate-400" />;
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-gradient-to-br from-sky-50/60 via-white to-teal-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-sky-950/40 p-6 shadow-sm">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-500 text-white shadow-sm shadow-sky-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  AI Health Insight
                </h4>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                  Telemetry Engine v2.4
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Automated multi-vital pattern recognition
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <RiskBadge level={riskLevel} size="md" />
            <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {getTrendIcon(insight.trend)}
              <span>{insight.trend} Trend</span>
            </div>
          </div>
        </div>

        {/* Narrative */}
        <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-sm">
          <h5 className="text-sm font-bold text-slate-900 dark:text-white">
            {insight.headline}
          </h5>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            "{insight.description}"
          </p>
        </div>

        {/* Risk score bar */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 text-xs">
          <div className="flex items-center gap-3">
            <div className="text-center px-3 py-1 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-400 block font-medium">Risk Score</span>
              <span className="text-lg font-black text-rose-600 dark:text-rose-400">
                {insight.riskScore || 72}<span className="text-xs font-normal text-slate-400">/100</span>
              </span>
            </div>
            <div>
              <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                Recommended Action:
              </span>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                {insight.recommendedAction}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAnalysisModal(true)}
            className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm transition-colors whitespace-nowrap self-end sm:self-center"
          >
            <span>View Analysis</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mandatory Medical Disclaimer */}
        <div className="mt-3 flex items-start gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <Info className="w-3.5 h-3.5 mt-0.5 text-sky-500 flex-shrink-0" />
          <span>
            <strong>Clinical Prototype Disclaimer:</strong> This automated risk prediction is for decision-support and demonstration. It does not replace independent professional medical diagnosis or clinical judgment.
          </span>
        </div>
      </div>

      {/* Full Analysis Breakdown Modal */}
      <Modal
        isOpen={showAnalysisModal}
        onClose={() => setShowAnalysisModal(false)}
        title="AI Predictive Risk Decomposition"
        subtitle={`Patient: ${patientName || "Rajesh Kumar"} (${patientId || "VT-1024"})`}
      >
        <div className="space-y-4 text-slate-800 dark:text-slate-200">
          <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800">
            <h6 className="font-bold text-sky-900 dark:text-sky-200 text-sm">
              Primary Diagnostic Predictive Vectors
            </h6>
            <ul className="mt-2 space-y-1.5 text-xs text-sky-800 dark:text-sky-300 list-disc list-inside">
              <li>Nocturnal SpO₂ dips below 90% detected across 3 distinct sleep epochs.</li>
              <li>Fasting blood glucose 7-day moving average elevated by +18.4%.</li>
              <li>Pulse pressure amplitude elevated (&gt; 50 mmHg), signaling increased arterial stiffness.</li>
              <li>Multi-device synchronization fidelity at 99.4% over past 14 days.</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400">Model Confidence</span>
              <p className="text-base font-bold text-slate-900 dark:text-white mt-1">94.2%</p>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400">30-Day Hospitalization Risk</span>
              <p className="text-base font-bold text-rose-600 dark:text-rose-400 mt-1">High (42%)</p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setShowAnalysisModal(false)}
              className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-semibold"
            >
              Close Analysis
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
