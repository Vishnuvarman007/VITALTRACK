import React, { useState } from "react";
import { UserCheck, Search, Phone, Mail, Star, MapPin, Calendar, MessageSquare, Plus } from "lucide-react";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";
import Modal from "../components/Modal";
import UserAvatar from "../components/UserAvatar";

export default function Doctors() {
  const { doctors, addDoctor } = useData();
  const { addToast } = useToast();

  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "Cardiologist",
    hospital: "Apollo Hospitals",
    email: "",
    phone: "+91 98400 00000",
    experienceYears: 10,
    assignedPatients: 15
  });

  const specialties = ["ALL", "Cardiologist", "Endocrinologist", "Pulmonologist", "Hematologist", "Internal Medicine", "Nephrologist"];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(search.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === "ALL" || doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());

    return matchesSearch && matchesSpecialty;
  });

  const handleMessageDoctor = (doc) => {
    addToast(`Secure communication line opened with ${doc.name}.`, "info");
  };

  const handleAddDoctorSubmit = (e) => {
    e.preventDefault();
    if (!newDoctor.name || !newDoctor.email) {
      addToast("Please fill in required fields.", "error");
      return;
    }
    const created = addDoctor(newDoctor);
    addToast(`Dr. ${created.name} registered into clinical provider network!`, "success");
    setIsAddModalOpen(false);
    setNewDoctor({
      name: "",
      specialty: "Cardiologist",
      hospital: "Apollo Hospitals",
      email: "",
      phone: "+91 98400 00000",
      experienceYears: 10,
      assignedPatients: 15
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Medical Doctor Network
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Certified attending physicians, clinical specialists, and tele-consultation coordinators.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Doctor</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-80 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doctor by name, specialty or hospital..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
          >
            {specialties.map((s) => (
              <option key={s} value={s}>{s === "ALL" ? "All Specialties" : s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <UserAvatar
                    name={doc.name}
                    role={doc.specialty}
                    size="lg"
                    showIcon={true}
                    className="border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 mt-0.5">
                      {doc.specialty}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {doc.degree}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {doc.rating}
                </span>
              </div>

              <div className="mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
                <p className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{doc.hospital}</span>
                </p>
                <p className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{doc.email}</span>
                </p>
              </div>

              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                {doc.bio}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <span className="text-[10px] text-slate-400 block">Monitored Patients</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{doc.assignedPatients}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <span className="text-[10px] text-slate-400 block">Experience</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{doc.experienceYears} Years</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => handleMessageDoctor(doc)}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Message Doctor</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Doctor Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Credential New Medical Doctor"
        subtitle="Enrolls physician into the VITALTRACK tele-consultation panel"
      >
        <form onSubmit={handleAddDoctorSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Physician Name *
            </label>
            <input
              type="text"
              required
              value={newDoctor.name}
              onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
              placeholder="e.g. Dr. K. Radhakrishnan"
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Specialty
              </label>
              <select
                value={newDoctor.specialty}
                onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              >
                <option value="Cardiologist">Cardiologist</option>
                <option value="Endocrinologist">Endocrinologist</option>
                <option value="Pulmonologist">Pulmonologist</option>
                <option value="Hematologist">Hematologist</option>
                <option value="Internal Medicine">Internal Medicine</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Hospital / Institution
              </label>
              <input
                type="text"
                value={newDoctor.hospital}
                onChange={(e) => setNewDoctor({ ...newDoctor, hospital: e.target.value })}
                placeholder="Hospital Name"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Official Email Address *
            </label>
            <input
              type="email"
              required
              value={newDoctor.email}
              onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
              placeholder="doctor@hospital.org"
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-sky-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold"
            >
              Save Doctor
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
