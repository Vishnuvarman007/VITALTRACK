import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  UserPlus,
  ArrowUpDown,
  X
} from "lucide-react";
import PatientCard from "../components/PatientCard";
import PatientTable from "../components/PatientTable";
import Modal from "../components/Modal";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";

export default function Patients() {
  const { patients, addPatient } = useData();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRisk, setSelectedRisk] = useState("ALL");
  const [selectedCondition, setSelectedCondition] = useState("ALL");
  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const [viewMode, setViewMode] = useState("table"); // "table" | "grid"
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New patient form state
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "Male",
    location: "Chennai, Tamil Nadu",
    condition: "Type 2 Diabetes",
    heartRate: 75,
    bloodPressure: "120/80",
    spo2: 98,
    temperature: 98.6,
    glucose: 110,
    hemoglobin: 13.5,
    cholesterol: 180,
    riskLevel: "LOW",
    doctor: "Dr. Arun Kumar"
  });

  // Extract unique locations and conditions
  const conditions = ["ALL", "Type 2 Diabetes", "Hypertension", "Anemia", "High Cholesterol", "COPD"];
  const locations = ["ALL", "Chennai", "Bangalore", "Mumbai", "Hyderabad", "Kochi", "Kolkata", "Delhi"];

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRisk =
        selectedRisk === "ALL" || p.riskLevel?.toUpperCase() === selectedRisk;

      const matchesCondition =
        selectedCondition === "ALL" ||
        p.condition.toLowerCase().includes(selectedCondition.toLowerCase());

      const matchesLocation =
        selectedLocation === "ALL" ||
        p.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesRisk && matchesCondition && matchesLocation;
    });
  }, [patients, searchQuery, selectedRisk, selectedCondition, selectedLocation]);

  const handleAddPatientSubmit = (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.age) {
      addToast("Please fill in required fields.", "error");
      return;
    }
    const created = addPatient(newPatient);
    addToast(`Patient ${created.name} (${created.id}) registered into monitoring fleet!`, "success");
    setIsAddModalOpen(false);
    setNewPatient({
      name: "",
      age: "",
      gender: "Male",
      location: "Chennai, Tamil Nadu",
      condition: "Type 2 Diabetes",
      heartRate: 75,
      bloodPressure: "120/80",
      spo2: 98,
      temperature: 98.6,
      glucose: 110,
      hemoglobin: 13.5,
      cholesterol: 180,
      riskLevel: "LOW",
      doctor: "Dr. Arun Kumar"
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Patients
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time biometric surveillance cohort ({filteredPatients.length} of {patients.length} patients displayed)
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* View Mode Toggle */}
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "table"
                  ? "bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Patient</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="sm:col-span-2 lg:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient by name, ID or location..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 text-slate-400 hover:text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Risk Filter */}
          <div className="lg:col-span-2">
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 outline-none focus:border-sky-500 font-semibold"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="CRITICAL">Critical Risk</option>
              <option value="HIGH">High Risk</option>
              <option value="MODERATE">Moderate Risk</option>
              <option value="LOW">Low Risk</option>
            </select>
          </div>

          {/* Condition Filter */}
          <div className="lg:col-span-3">
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 outline-none focus:border-sky-500 font-semibold"
            >
              <option value="ALL">All Conditions</option>
              <option value="Diabetes">Type 2 Diabetes</option>
              <option value="Hypertension">Hypertension</option>
              <option value="Anemia">Anemia</option>
              <option value="Cholesterol">High Cholesterol</option>
              <option value="COPD">COPD / Respiratory</option>
            </select>
          </div>

          {/* Location Filter */}
          <div className="lg:col-span-2">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 outline-none focus:border-sky-500 font-semibold"
            >
              <option value="ALL">All Locations</option>
              {locations.filter((l) => l !== "ALL").map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Patient List (Table or Grid View) */}
      {viewMode === "table" ? (
        <PatientTable patients={filteredPatients} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPatients.map((p) => (
            <PatientCard key={p.id} patient={p} />
          ))}
        </div>
      )}

      {/* Add Patient Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Enroll New Patient into Telemetry"
        subtitle="Register patient profile and initialize wireless biometric baseline"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleAddPatientSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                placeholder="e.g. S. Meenakshi"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Age *
              </label>
              <input
                type="number"
                required
                value={newPatient.age}
                onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                placeholder="e.g. 54"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Gender
              </label>
              <select
                value={newPatient.gender}
                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-sky-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Location
              </label>
              <input
                type="text"
                value={newPatient.location}
                onChange={(e) => setNewPatient({ ...newPatient, location: e.target.value })}
                placeholder="City, State"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Primary Condition
              </label>
              <input
                type="text"
                value={newPatient.condition}
                onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
                placeholder="e.g. Type 2 Diabetes"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div>
              <label className="block font-medium text-slate-500 dark:text-slate-400 mb-1">
                Heart Rate (BPM)
              </label>
              <input
                type="number"
                value={newPatient.heartRate}
                onChange={(e) => setNewPatient({ ...newPatient, heartRate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-500 dark:text-slate-400 mb-1">
                Blood Pressure
              </label>
              <input
                type="text"
                value={newPatient.bloodPressure}
                onChange={(e) => setNewPatient({ ...newPatient, bloodPressure: e.target.value })}
                placeholder="120/80"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-500 dark:text-slate-400 mb-1">
                SpO₂ (%)
              </label>
              <input
                type="number"
                value={newPatient.spo2}
                onChange={(e) => setNewPatient({ ...newPatient, spo2: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-500 dark:text-slate-400 mb-1">
                Glucose (mg/dL)
              </label>
              <input
                type="number"
                value={newPatient.glucose}
                onChange={(e) => setNewPatient({ ...newPatient, glucose: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-sm"
            >
              Save & Start Monitoring
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
