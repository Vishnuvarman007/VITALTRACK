import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  AlertOctagon,
  AlertTriangle,
  Radio,
  Activity,
  ArrowRight,
  TrendingUp,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Filter
} from "lucide-react";
import StatCard from "../components/StatCard";
import RiskBadge from "../components/RiskBadge";
import AlertCard from "../components/AlertCard";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";

export default function Dashboard() {
  const { patients, alerts, acknowledgeAlert, resolveAlert } = useData();
  const { addToast } = useToast();

  const criticalAlerts = alerts.filter((a) => a.type === "CRITICAL" && !a.acknowledged);
  const highRiskPatients = patients.filter((p) => p.riskLevel === "CRITICAL" || p.riskLevel === "HIGH");

  return (
    <div className="space-y-8">
      {/* Top Banner with System Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Patient Monitoring Dashboard
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              ● System Online
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time overview of your monitored patients, acute risk triggers, and IoT sensor streams.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <Link
            to="/features"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-xs font-bold text-sky-700 dark:text-sky-300 hover:bg-sky-100 shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Platform Features</span>
          </Link>
          <Link
            to="/patients"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-xs transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-sky-500" />
            <span>All Patients</span>
          </Link>
          <Link
            to="/alerts"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition-all active:scale-95"
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Alerts Triage ({alerts.filter((a) => !a.acknowledged).length})</span>
          </Link>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="TOTAL PATIENTS"
          value="128"
          change="+4.2%"
          isPositive={true}
          icon={Users}
          description="Monitored in cohort"
          accentColor="blue"
        />
        <StatCard
          title="CRITICAL ALERTS"
          value="07"
          change="Urgent triage required"
          isPositive={false}
          icon={AlertOctagon}
          description="Pending review"
          accentColor="red"
        />
        <StatCard
          title="HIGH-RISK PATIENTS"
          value="14"
          change="+2 from yesterday"
          isPositive={false}
          icon={AlertTriangle}
          description="Acuity status elevated"
          accentColor="amber"
        />
        <StatCard
          title="ACTIVE MONITORING"
          value="96"
          change="98.2% sync rate"
          isPositive={true}
          icon={Radio}
          description="Telemetry online"
          accentColor="emerald"
        />
      </div>

      {/* Two Column Layout: Critical Alerts Panel & High-Risk Patient Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Alert Panel */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Critical Alerts Stream
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Prioritized threshold alerts requiring clinical triage
                </p>
              </div>
            </div>

            <Link
              to="/alerts"
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onAcknowledge={acknowledgeAlert}
                onResolve={resolveAlert}
              />
            ))}
          </div>
        </div>

        {/* Right Column: High Risk Watchlist & Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI Clinical Summary Mini Widget */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-sky-50 via-teal-50/40 to-white dark:from-slate-900 dark:via-sky-950/30 dark:to-slate-900 border border-sky-200/80 dark:border-sky-900/60 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                VITALTRACK AI Cohort Alert
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              "System detected an escalating multi-patient hypoxemic pattern in Chennai respiratory group. 3 patients have experienced SpO₂ drops &lt; 90% in the last 4 hours."
            </p>
            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-sky-700 dark:text-sky-300">Composite Risk: 72/100 (Increasing)</span>
              <Link to="/health-trends" className="font-bold text-sky-600 dark:text-sky-400 hover:underline">
                View Risk Trends →
              </Link>
            </div>
          </div>

          {/* High-Risk Patient Watchlist */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                High-Risk Watchlist
              </h4>
              <span className="text-xs text-slate-400">
                {highRiskPatients.length} Patients
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-80 overflow-y-auto">
              {highRiskPatients.slice(0, 5).map((p) => (
                <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      to={`/patients/${p.id}`}
                      className="text-xs font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 truncate block"
                    >
                      {p.name}
                    </Link>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {p.condition}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-600 dark:text-slate-300">
                      <span>HR: <strong>{p.heartRate}</strong></span>
                      <span>•</span>
                      <span>SpO₂: <strong className={p.spo2 < 90 ? "text-rose-600 dark:text-rose-400" : ""}>{p.spo2}%</strong></span>
                      <span>•</span>
                      <span>Glu: <strong>{p.glucose}</strong></span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <RiskBadge level={p.riskLevel} size="sm" />
                    <Link
                      to={`/patients/${p.id}`}
                      className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
