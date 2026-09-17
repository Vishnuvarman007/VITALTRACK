import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  AlertOctagon,
  Calendar,
  Clock,
  ArrowRight,
  FileText,
  PhoneCall,
  CheckCircle2,
  Stethoscope,
  Activity,
  Plus
} from "lucide-react";
import StatCard from "../components/StatCard";
import RiskBadge from "../components/RiskBadge";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function DoctorDashboard() {
  const { patients, alerts, appointments } = useData();
  const { currentUser } = useAuth();
  const { addToast } = useToast();

  const doctorName = currentUser?.name || "Dr. Arun Kumar";
  // Filter patients assigned to this doctor, or default to all if none match
  const myPatients = patients.filter((p) => p.doctor === doctorName || p.doctor?.includes("Arun"));
  const criticalPatients = myPatients.filter((p) => p.riskLevel === "CRITICAL" || p.riskLevel === "HIGH");
  const doctorAlerts = alerts.filter((a) => myPatients.some((p) => p.id === a.patientId));

  const handleSignOff = (alertId) => {
    addToast(`Clinical sign-off recorded for alert #${alertId}.`, "success");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Doctor Command Center
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              Cardiology / Internal Medicine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Welcome back, {doctorName}. Real-time clinical telemetry and consultation queue.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/doctor/appointments"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Today's Schedule</span>
          </Link>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="ASSIGNED PATIENTS"
          value={String(myPatients.length || 28)}
          change="+3 new this month"
          isPositive={true}
          icon={Users}
          description="In primary roster"
          accentColor="blue"
        />
        <StatCard
          title="CRITICAL PATIENTS"
          value={String(criticalPatients.length || 3)}
          change="Requires attention"
          isPositive={false}
          icon={AlertOctagon}
          description="Acuity elevated"
          accentColor="red"
        />
        <StatCard
          title="TODAY'S APPOINTMENTS"
          value={String(appointments.length || 5)}
          change="2 Tele-consultations"
          isPositive={true}
          icon={Calendar}
          description="Schedule loaded"
          accentColor="emerald"
        />
        <StatCard
          title="PENDING REVIEWS"
          value="04"
          change="Telemetry reports"
          isPositive={false}
          icon={FileText}
          description="Awaiting sign-off"
          accentColor="amber"
        />
      </div>

      {/* Two Column Section: Assigned Patients & Alerts requiring Sign-off */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Assigned Patients Telemetry Table */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                My Patients Panel
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct clinical oversight and vital telemetry
              </p>
            </div>
            <Link
              to="/doctor/patients"
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-96 overflow-y-auto">
            {myPatients.slice(0, 6).map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <Link
                    to={`/doctor/patients/${p.id}`}
                    className="text-xs font-bold text-slate-900 dark:text-white hover:text-sky-600 truncate block"
                  >
                    {p.name}
                  </Link>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {p.condition} • {p.age}y
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-600 dark:text-slate-300">
                    <span>HR: <strong>{p.heartRate}</strong></span>
                    <span>•</span>
                    <span>BP: <strong>{p.bloodPressure}</strong></span>
                    <span>•</span>
                    <span className={p.spo2 < 90 ? "text-rose-600 font-bold" : ""}>
                      SpO₂: {p.spo2}%
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <RiskBadge level={p.riskLevel} size="sm" />
                  <Link
                    to={`/doctor/patients/${p.id}`}
                    className="text-xs font-semibold text-sky-600 hover:underline"
                  >
                    Clinical Review →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Alerts Requiring Sign-off & Appointments */}
        <div className="lg:col-span-5 space-y-6">
          {/* Urgent Alerts */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-rose-500" />
                Urgent Telemetry Queue
              </h4>
              <span className="text-xs text-rose-500 font-bold">
                {doctorAlerts.slice(0, 3).length} Actionable
              </span>
            </div>

            <div className="space-y-3">
              {doctorAlerts.slice(0, 3).map((a) => (
                <div
                  key={a.id}
                  className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {a.patientName}
                    </span>
                    <span className="text-[10px] text-slate-400">{a.time}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                    {a.message}
                  </p>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="font-bold text-rose-600">
                      {a.metric}: {a.currentValue}
                    </span>
                    <button
                      onClick={() => handleSignOff(a.id)}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100"
                    >
                      Sign Off
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Appointments Mini-card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-500" />
                Today's Consultations
              </h4>
              <Link to="/doctor/appointments" className="text-xs font-semibold text-sky-600 hover:underline">
                Schedule →
              </Link>
            </div>

            <div className="space-y-2 text-xs">
              {appointments.slice(0, 3).map((appt) => (
                <div key={appt.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">
                      {appt.patientName}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {appt.type} • {appt.mode}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                    {appt.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
