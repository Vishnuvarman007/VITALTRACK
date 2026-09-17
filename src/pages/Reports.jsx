import React, { useState } from "react";
import { FileText, Plus, Search, Filter, Download, Share2 } from "lucide-react";
import ReportCard from "../components/ReportCard";
import Modal from "../components/Modal";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";

export default function Reports() {
  const { reports, patients, generateReportForPatient } = useData();
  const { addToast } = useToast();

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || "VT-1024");
  const [reportType, setReportType] = useState("Comprehensive Clinical Summary");

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.patientName.toLowerCase().includes(search.toLowerCase()) ||
      r.patientId.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase());

    const matchesType = selectedType === "ALL" || r.type.includes(selectedType);

    return matchesSearch && matchesType;
  });

  const handleCreateReport = (e) => {
    e.preventDefault();
    const created = generateReportForPatient(selectedPatientId);
    addToast(`New report #${created.id} generated successfully.`, "success");
    setIsGenerateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Patient Health Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Digitally certified telemetry summaries, multi-vital trend analyses, and physician reports.
          </p>
        </div>

        <button
          onClick={() => setIsGenerateModalOpen(true)}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Generate New Report</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patient name, ID or report..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
          >
            <option value="ALL">All Report Types</option>
            <option value="Comprehensive">Comprehensive Clinical</option>
            <option value="Glycemic">Glycemic & Endocrine</option>
            <option value="Hemodynamic">Hemodynamic & Cardiovascular</option>
            <option value="Hematology">Hematology & Anemia</option>
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>

      {/* Generate Report Modal */}
      <Modal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        title="Generate Clinical Health Report"
        subtitle="Compiles biometric telemetry, trend curves, and AI risk predictions"
      >
        <form onSubmit={handleCreateReport} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Select Patient *
            </label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-sky-500 font-medium"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id}) — {p.condition}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Report Template Type *
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-sky-500 font-medium"
            >
              <option value="Comprehensive Clinical Summary">Comprehensive Clinical Summary</option>
              <option value="Endocrine & Glycemic Curve">Endocrine & Glycemic Curve</option>
              <option value="Hemodynamic Risk Analysis">Hemodynamic Risk Analysis</option>
              <option value="Hematology & Iron Kinetics">Hematology & Iron Kinetics</option>
              <option value="30-Day Monthly Health Audit">30-Day Monthly Health Audit</option>
            </select>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            Generated documents include cryptographic digital checksums, standard deviation plots, and clinical recommendations compliant with ISO 27799.
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsGenerateModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-sm"
            >
              Generate Document
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
