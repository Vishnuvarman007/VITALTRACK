import React, { useState } from "react";
import { Calendar, Clock, Video, MapPin, Plus, CheckCircle2, User, Search } from "lucide-react";
import Modal from "../components/Modal";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";

export default function Appointments() {
  const { appointments, patients, addAppointment } = useData();
  const { addToast } = useToast();

  const [filter, setFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppt, setNewAppt] = useState({
    patientId: patients[0]?.id || "VT-1024",
    doctorName: "Dr. Arun Kumar",
    date: new Date().toISOString().split("T")[0],
    time: "10:30 AM",
    type: "Follow-up",
    mode: "Tele-Consultation",
    notes: "Routine telemetry progress review."
  });

  const filtered = appointments.filter(
    (a) => filter === "ALL" || a.status === filter
  );

  const handleCreate = (e) => {
    e.preventDefault();
    const patient = patients.find((p) => p.id === newAppt.patientId);
    const created = addAppointment({
      ...newAppt,
      patientName: patient?.name || "Patient"
    });
    addToast(`Appointment #${created.id} scheduled successfully.`, "success");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Consultation Appointments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Scheduled virtual and physical telemetry follow-ups ({appointments.length} active sessions).
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {["ALL", "Scheduled", "Confirmed", "Completed"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filter === s
                ? "bg-sky-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {s === "ALL" ? "All Appointments" : s}
          </button>
        ))}
      </div>

      {/* Appointment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((a) => (
          <div
            key={a.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                  {a.id}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    a.status === "Confirmed"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
                  }`}
                >
                  {a.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                {a.patientName}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Doctor: {a.doctorName}
              </p>

              <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-sky-500" />
                  <span>{a.date} at {a.time}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Video className="w-3.5 h-3.5 text-teal-500" />
                  <span>{a.mode} • {a.type}</span>
                </div>
              </div>

              {a.notes && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 italic">
                  "{a.notes}"
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => addToast(`Joining tele-consultation room for ${a.patientName}...`, "info")}
                className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Launch Tele-Room</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Appointment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Tele-Consultation"
        subtitle="Book a follow-up or review slot with patient and doctor"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Select Patient *
            </label>
            <select
              value={newAppt.patientId}
              onChange={(e) => setNewAppt({ ...newAppt, patientId: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Date *
              </label>
              <input
                type="date"
                required
                value={newAppt.date}
                onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Time *
              </label>
              <input
                type="text"
                required
                value={newAppt.time}
                onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
                placeholder="10:30 AM"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Consultation Mode
            </label>
            <select
              value={newAppt.mode}
              onChange={(e) => setNewAppt({ ...newAppt, mode: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
            >
              <option value="Tele-Consultation">Tele-Consultation (Video)</option>
              <option value="In-Clinic Visit">In-Clinic Visit</option>
              <option value="Emergency Urgent Review">Emergency Urgent Review</option>
            </select>
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
              Save Schedule
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
