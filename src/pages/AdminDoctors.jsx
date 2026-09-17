import React, { useState } from "react";
import { UserCheck, Plus, Search, Star, MapPin, Mail, ShieldCheck } from "lucide-react";
import { useData } from "../context/DataContext";
import Modal from "../components/Modal";
import { useToast } from "../context/ToastContext";

export default function AdminDoctors() {
  const { doctors, addDoctor } = useData();
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({
    name: "",
    specialty: "Cardiologist",
    hospital: "Apollo Hospitals",
    email: "",
    phone: "+91 98401 00000"
  });

  const filtered = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase()) ||
      d.hospital.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newDoc.name || !newDoc.email) return;
    const created = addDoctor(newDoc);
    addToast(`Dr. ${created.name} registered.`, "success");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Doctor Credentialing & Roster
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            System administration of verified attending medical practitioners and specialist registries.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Credential Doctor</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex items-center justify-between">
        <div className="w-full sm:w-80 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roster..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>
        <span className="text-xs text-slate-400 font-semibold">{filtered.length} Doctors</span>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-5">Doctor Name</th>
              <th className="py-3.5 px-3">Specialty</th>
              <th className="py-3.5 px-3">Hospital Link</th>
              <th className="py-3.5 px-3">Contact Email</th>
              <th className="py-3.5 px-3 text-center">Assigned Caseload</th>
              <th className="py-3.5 px-3 text-center">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {filtered.map((d) => (
              <tr key={d.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                <td className="py-3.5 px-5">
                  <span className="font-bold text-slate-900 dark:text-white block">{d.name}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{d.degree}</span>
                </td>
                <td className="py-3.5 px-3 font-semibold text-sky-600 dark:text-sky-400">
                  {d.specialty}
                </td>
                <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400">
                  {d.hospital}
                </td>
                <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400 font-mono">
                  {d.email}
                </td>
                <td className="py-3.5 px-3 text-center font-bold">
                  {d.assignedPatients}
                </td>
                <td className="py-3.5 px-3 text-center">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Verified
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => addToast(`Credential review opened for ${d.name}.`, "info")}
                    className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register Attending Doctor"
        subtitle="Provision clinical portal access"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Physician Full Name *
            </label>
            <input
              type="text"
              required
              value={newDoc.name}
              onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Medical Specialty
              </label>
              <input
                type="text"
                value={newDoc.specialty}
                onChange={(e) => setNewDoc({ ...newDoc, specialty: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Hospital Affiliation
              </label>
              <input
                type="text"
                value={newDoc.hospital}
                onChange={(e) => setNewDoc({ ...newDoc, hospital: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Professional Email *
            </label>
            <input
              type="email"
              required
              value={newDoc.email}
              onChange={(e) => setNewDoc({ ...newDoc, email: e.target.value })}
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
              Verify & Add
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
