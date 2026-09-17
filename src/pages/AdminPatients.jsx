import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, UserPlus, FileText, ArrowUpRight } from "lucide-react";
import RiskBadge from "../components/RiskBadge";
import { useData } from "../context/DataContext";
import Modal from "../components/Modal";
import { useToast } from "../context/ToastContext";

export default function AdminPatients() {
  const { patients, addPatient } = useData();
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newP, setNewP] = useState({
    name: "",
    age: "",
    gender: "Male",
    location: "Chennai, Tamil Nadu",
    condition: "Type 2 Diabetes & Hypertension",
    doctor: "Dr. Arun Kumar",
    riskLevel: "MODERATE"
  });

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.condition.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newP.name || !newP.age) return;
    const created = addPatient(newP);
    addToast(`Patient ${created.name} registered.`, "success");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Patient Master Index
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            System-wide registry of active patient profiles, chronic care tracks, and telemetry IDs.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all active:scale-95"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Patient</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex items-center justify-between">
        <div className="w-full sm:w-80 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient registry..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>
        <span className="text-xs text-slate-400 font-semibold">{filtered.length} total records</span>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-5">Patient ID</th>
              <th className="py-3.5 px-3">Name</th>
              <th className="py-3.5 px-3">Age/Gender</th>
              <th className="py-3.5 px-3">Condition</th>
              <th className="py-3.5 px-3">Assigned Physician</th>
              <th className="py-3.5 px-3 text-center">Acuity Risk</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                <td className="py-3.5 px-5 font-mono font-bold text-sky-600 dark:text-sky-400">
                  {p.id}
                </td>
                <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-white">
                  {p.name}
                </td>
                <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">
                  {p.age}y / {p.gender}
                </td>
                <td className="py-3.5 px-3 text-slate-700 dark:text-slate-300">
                  {p.condition}
                </td>
                <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400">
                  {p.doctor}
                </td>
                <td className="py-3.5 px-3 text-center">
                  <RiskBadge level={p.riskLevel} size="sm" />
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    to={`/patients/${p.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    <span>View Telemetry</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register Master Patient Record"
        subtitle="Provision central health identifier"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Patient Name *
            </label>
            <input
              type="text"
              required
              value={newP.name}
              onChange={(e) => setNewP({ ...newP, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Age *
              </label>
              <input
                type="number"
                required
                value={newP.age}
                onChange={(e) => setNewP({ ...newP, age: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Gender
              </label>
              <select
                value={newP.gender}
                onChange={(e) => setNewP({ ...newP, gender: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Chronic Condition
            </label>
            <input
              type="text"
              value={newP.condition}
              onChange={(e) => setNewP({ ...newP, condition: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold"
            >
              Enroll Patient
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
