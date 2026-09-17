import React, { useState } from "react";
import { Users as UsersIcon, Plus, Search, ShieldCheck, Mail, Phone, Lock, CheckCircle2 } from "lucide-react";
import Modal from "../components/Modal";
import { useToast } from "../context/ToastContext";

const INITIAL_USERS = [
  { id: "USR-01", name: "Sowmya Krishnan", email: "delegate@vitaltrack.com", role: "Healthcare Delegate", status: "Active", hospital: "Chennai Central Telemetry" },
  { id: "USR-02", name: "Dr. Arun Kumar", email: "doctor@vitaltrack.com", role: "Doctor", status: "Active", hospital: "Apollo Heart Centre" },
  { id: "USR-03", name: "Dr. V. Ramanathan", email: "admin@vitaltrack.com", role: "Administrator", status: "Active", hospital: "VITALTRACK Health Cloud" },
  { id: "USR-04", name: "Dr. Meera Nambiar", email: "dr.meera@vitaltrack.com", role: "Doctor", status: "Active", hospital: "Manipal Hospital, Bangalore" },
  { id: "USR-05", name: "K. Anand", email: "anand.k@vitaltrack.com", role: "Healthcare Delegate", status: "Active", hospital: "Madurai Community Care" },
  { id: "USR-06", name: "Dr. David Varghese", email: "dr.david@vitaltrack.com", role: "Doctor", status: "Active", hospital: "Aster Medcity, Kochi" },
  { id: "USR-07", name: "R. Bhavani", email: "bhavani.r@vitaltrack.com", role: "Healthcare Delegate", status: "Active", hospital: "Hyderabad Care Hub" },
  { id: "USR-08", name: "Dr. Shalini Gupta", email: "dr.shalini@vitaltrack.com", role: "Doctor", status: "Active", hospital: "Yashoda Hospitals" }
];

export default function Users() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Healthcare Delegate",
    hospital: "Apollo Healthcare"
  });

  const { addToast } = useToast();

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.hospital.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    const created = {
      id: `USR-${Math.floor(10 + Math.random() * 90)}`,
      ...newUser,
      status: "Active"
    };
    setUsers([created, ...users]);
    addToast(`User ${created.name} registered successfully.`, "success");
    setIsModalOpen(false);
    setNewUser({ name: "", email: "", role: "Healthcare Delegate", hospital: "Apollo Healthcare" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            User Access Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage authenticated accounts, clinical role permissions, and hospital affiliations.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-80 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or hospital..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
        >
          <option value="ALL">All Roles</option>
          <option value="Healthcare Delegate">Healthcare Delegate</option>
          <option value="Doctor">Doctor</option>
          <option value="Administrator">Administrator</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-5">User</th>
              <th className="py-3.5 px-3">Role</th>
              <th className="py-3.5 px-3">Affiliated Hospital</th>
              <th className="py-3.5 px-3 text-center">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                <td className="py-3.5 px-5">
                  <span className="font-bold text-slate-900 dark:text-white block">{u.name}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{u.email}</span>
                </td>
                <td className="py-3.5 px-3 font-semibold text-slate-700 dark:text-slate-300">
                  {u.role}
                </td>
                <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400">
                  {u.hospital}
                </td>
                <td className="py-3.5 px-3 text-center">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {u.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => addToast(`User permissions updated for ${u.name}.`, "info")}
                    className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    Edit Access
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
        title="Create New User Account"
        subtitle="Provision clinical or administrative credentials"
      >
        <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Full Legal Name *
            </label>
            <input
              type="text"
              required
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Role
              </label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              >
                <option value="Healthcare Delegate">Healthcare Delegate</option>
                <option value="Doctor">Medical Doctor</option>
                <option value="Administrator">Administrator</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Hospital / Organization
              </label>
              <input
                type="text"
                value={newUser.hospital}
                onChange={(e) => setNewUser({ ...newUser, hospital: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>
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
              Provision Account
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
