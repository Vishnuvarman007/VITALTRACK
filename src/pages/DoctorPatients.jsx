import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Users, ArrowUpRight, FileText, PhoneCall, Calendar } from "lucide-react";
import RiskBadge from "../components/RiskBadge";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";

export default function DoctorPatients() {
  const { patients } = useData();
  const { currentUser } = useAuth();
  const [search, setSearch] = useState("");

  const doctorName = currentUser?.name || "Dr. Arun Kumar";
  const myPatients = patients.filter((p) => p.doctor === doctorName || p.doctor?.includes("Arun"));

  const filtered = myPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.condition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Patient Caseload
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Clinical management panel for patients under your primary oversight ({filtered.length} active).
          </p>
        </div>

        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search my patients..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500 shadow-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-5">Patient Name</th>
              <th className="py-3.5 px-3">Condition</th>
              <th className="py-3.5 px-3 text-center">Heart Rate</th>
              <th className="py-3.5 px-3 text-center">BP</th>
              <th className="py-3.5 px-3 text-center">SpO₂</th>
              <th className="py-3.5 px-3 text-center">Glucose</th>
              <th className="py-3.5 px-3 text-center">Risk</th>
              <th className="py-3.5 px-4 text-right">Clinical Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-5">
                  <Link to={`/doctor/patients/${p.id}`} className="font-bold text-slate-900 dark:text-white hover:text-sky-600 block">
                    {p.name}
                  </Link>
                  <span className="text-[10px] text-slate-400 font-mono">{p.id} • {p.age}y</span>
                </td>

                <td className="py-3.5 px-3">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {p.condition}
                  </span>
                </td>

                <td className="py-3.5 px-3 text-center font-bold">
                  {p.heartRate} BPM
                </td>

                <td className="py-3.5 px-3 text-center font-semibold">
                  {p.bloodPressure}
                </td>

                <td className="py-3.5 px-3 text-center font-bold">
                  <span className={p.spo2 < 90 ? "text-rose-600 font-extrabold" : ""}>
                    {p.spo2}%
                  </span>
                </td>

                <td className="py-3.5 px-3 text-center font-bold">
                  <span className={p.glucose > 200 ? "text-rose-600 font-extrabold" : ""}>
                    {p.glucose}
                  </span>
                </td>

                <td className="py-3.5 px-3 text-center">
                  <RiskBadge level={p.riskLevel} size="sm" />
                </td>

                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      to={`/doctor/patients/${p.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold transition-colors"
                    >
                      <span>Chart Review</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
