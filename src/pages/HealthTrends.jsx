import React from "react";
import {
  TrendingUp,
  Sparkles,
  PieChart as PieIcon,
  BarChart2,
  AlertTriangle,
  ShieldCheck,
  Info,
  Activity,
  ArrowRight
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";
import {
  POPULATION_RISK_DISTRIBUTION,
  CONDITION_PREVALENCE,
  RISK_SCORE_HISTORY
} from "../data/healthData";

export default function HealthTrends() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Risk Detection & Population Analytics
          </h1>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
            Predictive Model v2.4
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Longitudinal trajectory analysis and early warning indicators across the monitored patient population.
        </p>
      </div>

      {/* Highlighted AI Cohort Risk Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-sky-50 via-teal-50/40 to-white dark:from-slate-900 dark:via-sky-950/40 dark:to-slate-900 border border-sky-200 dark:border-sky-900 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-600 text-white shadow-sm shadow-sky-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Early Health Risk Detection Engine
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Automated multi-variate trajectory assessment
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-sm text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              "Potential elevated risk detected due to increasing glucose and blood pressure trends."
            </p>
            Cross-correlation across 128 continuous IoT telemetry feeds reveals a 14.2% acceleration in glycemic variance among patients diagnosed with comorbid hypertension. Early dietary intervention and antihypertensive review recommended.
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Info className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
            <span>AI Predictive Prototype: Designed to augment clinical decision triage. Not a standalone diagnostic device.</span>
          </div>
        </div>

        {/* Risk Score Gauge Metric */}
        <div className="md:col-span-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center shadow-sm">
          <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
            Current Population Risk Score
          </span>
          <div className="my-2 flex items-baseline justify-center gap-1">
            <span className="text-4xl font-black text-rose-600 dark:text-rose-400 tracking-tight">
              72
            </span>
            <span className="text-sm font-semibold text-slate-400">/100</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400">
            <TrendingUp className="w-4 h-4" />
            <span>Trend: Increasing (Prev: 61/100)</span>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            +11 points elevated compared to prior 30-day baseline.
          </p>
        </div>
      </div>

      {/* Two Column Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Risk Distribution (Pie & Breakdown) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-sky-500" />
              Patient Risk Distribution
            </h4>
            <span className="text-xs text-slate-400">128 Patients</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={POPULATION_RISK_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {POPULATION_RISK_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => [`${val} Patients`, "Count"]}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    fontSize: "12px"
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="text-emerald-700 dark:text-emerald-300 font-bold block">Low</span>
              <span className="text-lg font-black text-emerald-800 dark:text-emerald-200">58</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <span className="text-amber-700 dark:text-amber-300 font-bold block">Moderate</span>
              <span className="text-lg font-black text-amber-800 dark:text-amber-200">42</span>
            </div>
            <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800">
              <span className="text-orange-700 dark:text-orange-300 font-bold block">High</span>
              <span className="text-lg font-black text-orange-800 dark:text-orange-200">21</span>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
              <span className="text-rose-700 dark:text-rose-300 font-bold block">Critical</span>
              <span className="text-lg font-black text-rose-800 dark:text-rose-200">07</span>
            </div>
          </div>
        </div>

        {/* Right Column: Risk Score History Trend */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-rose-500" />
              6-Month Composite Risk Trajectory
            </h4>
            <span className="text-xs text-rose-500 font-bold">Increasing Slope</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RISK_SCORE_HISTORY} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis domain={[30, 90]} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip
                  formatter={(val) => [`${val} / 100`, "Risk Score"]}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    fontSize: "12px"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#ef4444" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Composite risk metric incorporates blood glucose moving average, mean arterial pressure divergence, and nocturnal oximetry events.
          </div>
        </div>
      </div>

      {/* Chronic Condition Prevalence Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
          Chronic Disease Surveillance Breakdown
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CONDITION_PREVALENCE.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block truncate">
                {item.condition}
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {item.count}
                </span>
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
                  {item.percentage}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 mt-3 overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: item.percentage }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
