import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  ShieldCheck,
  UserCheck,
  Cpu,
  AlertOctagon,
  Activity,
  Plus,
  Server,
  ArrowRight,
  Database,
  Radio,
  Clock
} from "lucide-react";
import StatCard from "../components/StatCard";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";

export default function AdminDashboard() {
  const { patients, alerts, doctors, devices } = useData();
  const { addToast } = useToast();

  const connectedDevices = devices.filter((d) => d.connection === "Connected").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Platform Administration
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Fleet Operational
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            System infrastructure, user access control, device telemetry gateways, and audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/devices"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all active:scale-95"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Manage IoT Devices ({devices.length})</span>
          </Link>
        </div>
      </div>

      {/* 6 Metric Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="TOTAL USERS"
          value="48"
          change="+12% MoM"
          isPositive={true}
          icon={Users}
          description="Active accounts"
          accentColor="blue"
        />
        <StatCard
          title="TOTAL PATIENTS"
          value={String(patients.length || 128)}
          change="Cohort size"
          isPositive={true}
          icon={Activity}
          description="Enrolled in telemetry"
          accentColor="emerald"
        />
        <StatCard
          title="DOCTORS"
          value={String(doctors.length || 10)}
          change="Accredited"
          isPositive={true}
          icon={UserCheck}
          description="Medical roster"
          accentColor="purple"
        />
        <StatCard
          title="DELEGATES"
          value="10"
          change="Community tier"
          isPositive={true}
          icon={ShieldCheck}
          description="Active triage"
          accentColor="blue"
        />
        <StatCard
          title="CONNECTED DEVICES"
          value={`${connectedDevices}/${devices.length}`}
          change="Telemetry active"
          isPositive={true}
          icon={Cpu}
          description="IoT Nodes"
          accentColor="emerald"
        />
        <StatCard
          title="CRITICAL ALERTS"
          value={String(alerts.filter((a) => a.type === "CRITICAL").length)}
          change="Active breaches"
          isPositive={false}
          icon={AlertOctagon}
          description="Awaiting resolve"
          accentColor="red"
        />
      </div>

      {/* Administration Hub Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link
          to="/admin/users"
          className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-sky-400 transition-all group"
        >
          <div className="w-10 h-10 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 transition-colors">
            User Access Management
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage roles for healthcare delegates, doctors, and platform supervisors.
          </p>
          <span className="mt-4 text-xs font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1">
            Open Directory →
          </span>
        </Link>

        <Link
          to="/admin/devices"
          className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-sky-400 transition-all group"
        >
          <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-3">
            <Cpu className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
            IoT Telemetry Fleet
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Monitor sensor battery levels, firmware, and wireless connection health.
          </p>
          <span className="mt-4 text-xs font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1">
            Manage Fleet →
          </span>
        </Link>

        <Link
          to="/admin/patients"
          className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-sky-400 transition-all group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <Activity className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
            Patient Master Index
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Central enrollment, medical condition assignments, and hospital links.
          </p>
          <span className="mt-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            View Index →
          </span>
        </Link>

        <Link
          to="/admin/alerts"
          className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-sky-400 transition-all group"
        >
          <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
            Alert Rules Engine
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Configure threshold rules, clinical escalation paths, and telemetry alarms.
          </p>
          <span className="mt-4 text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
            Configure Rules →
          </span>
        </Link>
      </div>

      {/* System Telemetry Activity Log */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-sky-500" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              System Ingestion & Telemetry Audit Log
            </h4>
          </div>
          <span className="text-xs text-slate-400 font-mono">Gateway Node: GW-AP-SOUTH-01</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {[
            { time: "16:42:10", action: "INGEST_BATCH", node: "DEV-GLU-01", msg: "Telemetry packet synced (glucose 198 mg/dL)", status: "OK" },
            { time: "16:40:02", action: "ALERT_DISPATCH", node: "SYS-CORE", msg: "Dispatched critical SMS to Dr. Arun Kumar for Rajesh Kumar", status: "ACK" },
            { time: "16:38:15", action: "DEVICE_HEARTBEAT", node: "DEV-OXI-02", msg: "SpO2 87% recorded with sensor fidelity 99.1%", status: "WARN" },
            { time: "16:35:44", action: "USER_AUTH", node: "AUTH-SVC", msg: "Delegate Sowmya Krishnan authenticated via OAuth token", status: "OK" },
            { time: "16:30:19", action: "AI_INFERENCE", node: "ML-PREDICT", msg: "Recalculated 30-day cohort risk score: 72/100 (+11 pts)", status: "OK" }
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-[11px]">{item.time}</span>
                <span className="font-bold text-sky-600 dark:text-sky-400">{item.action}</span>
                <span className="text-slate-700 dark:text-slate-300 font-sans">{item.msg}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded self-start sm:self-auto ${
                item.status === "OK" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" :
                item.status === "WARN" ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300" :
                "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300"
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
