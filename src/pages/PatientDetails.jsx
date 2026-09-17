import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Heart,
  Activity,
  Wind,
  Droplet,
  Dna,
  Thermometer,
  CircleGauge,
  PhoneCall,
  Share2,
  FileText,
  Clock,
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  Plus,
  MessageSquare,
  Sparkles
} from "lucide-react";
import VitalCard from "../components/VitalCard";
import HealthChart from "../components/HealthChart";
import RiskBadge from "../components/RiskBadge";
import AIInsightCard from "../components/AIInsightCard";
import AudioReport from "../components/AudioReport";
import Modal from "../components/Modal";
import EmptyState from "../components/EmptyState";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients, alerts, addDoctorNote, generateReportForPatient } = useData();
  const { addToast } = useToast();

  const [activeChart, setActiveChart] = useState("glucose"); // "glucose" | "heartRate" | "spo2" | "bloodPressure"
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const patient = patients.find((p) => p.id === id) || patients[0];

  if (!patient) {
    return (
      <EmptyState
        title="Patient Profile Not Found"
        description="The requested patient telemetry ID does not exist in the active monitoring cohort."
        action={
          <Link
            to="/patients"
            className="px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold"
          >
            Back to Patients
          </Link>
        }
      />
    );
  }

  // Filter alerts for this specific patient
  const patientAlerts = alerts.filter((a) => a.patientId === patient.id);

  const handleContactDoctor = () => {
    addToast(`Urgent tele-consultation dispatch sent to ${patient.doctor || "assigned doctor"}.`, "info");
  };

  const handleShareWithDoctor = () => {
    addToast(`Telemetry snapshot shared with ${patient.doctor}. Access log timestamped.`, "success");
  };

  const handleGenerateReport = () => {
    const rep = generateReportForPatient(patient.id);
    addToast(`Report #${rep.id} created for ${patient.name}.`, "success");
    navigate("/reports");
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    addDoctorNote(patient.id, noteText);
    addToast("Clinical note successfully appended to patient medical chart.", "success");
    setNoteText("");
    setIsNoteModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Top Back Nav & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/patients"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Back to patient directory"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                {patient.id}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Continuous Telemetry Stream
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {patient.name}
            </h1>
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleGenerateReport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </button>

          <button
            onClick={handleShareWithDoctor}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-sky-500" />
            <span>Share with Doctor</span>
          </button>

          <button
            onClick={handleContactDoctor}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Contact Doctor</span>
          </button>
        </div>
      </div>

      {/* Profile Header Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-500 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-sky-500/20 flex-shrink-0">
            {patient.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {patient.name}
              </h2>
              <RiskBadge level={patient.riskLevel} size="md" />
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Monitoring
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span>Age: <strong>{patient.age} yrs</strong></span>
              <span>•</span>
              <span>Gender: <strong>{patient.gender}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {patient.location}
              </span>
              <span>•</span>
              <span>Blood Group: <strong>{patient.medicalInfo?.bloodGroup || "O+"}</strong></span>
            </div>
          </div>
        </div>

        {/* Assigned Doctor & Sync Badge */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
          <div className="text-slate-400">Attending Physician:</div>
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-sky-500" />
            {patient.doctor || "Dr. Arun Kumar"}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Next Visit: {patient.nextAppointment || "25 Sep 2026"}
          </div>
        </div>
      </div>

      {/* Audio Health Report Narration Bar */}
      <AudioReport patient={patient} />

      {/* Current Vitals Section (7 Core Metrics) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Current Vitals Telemetry
          </h3>
          <span className="text-xs text-slate-400">
            Last synced: {patient.lastUpdated}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <VitalCard vitalKey="heartRate" value={patient.heartRate} />
          <VitalCard vitalKey="bloodPressure" value={patient.bloodPressure} />
          <VitalCard vitalKey="spo2" value={patient.spo2} />
          <VitalCard vitalKey="temperature" value={patient.temperature} />
          <VitalCard vitalKey="glucose" value={patient.glucose} />
          <VitalCard vitalKey="hemoglobin" value={patient.hemoglobin} />
          <VitalCard vitalKey="cholesterol" value={patient.cholesterol} />

          {/* Quick Health Index Metric */}
          <div className="bg-gradient-to-br from-sky-600 to-teal-700 text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-sky-100">Telemetry Health Score</span>
              <Sparkles className="w-4 h-4 text-sky-200" />
            </div>
            <div className="my-2">
              <span className="text-3xl font-extrabold">
                {patient.aiInsight?.riskScore ? 100 - patient.aiInsight.riskScore : 65}
              </span>
              <span className="text-xs text-sky-200">/100</span>
            </div>
            <span className="text-[11px] text-sky-100">
              Sensor synchronization fidelity optimal
            </span>
          </div>
        </div>
      </div>

      {/* AI Health Insight Card */}
      <AIInsightCard
        insight={patient.aiInsight}
        patientName={patient.name}
        patientId={patient.id}
        riskLevel={patient.riskLevel}
      />

      {/* Health Trend Charts (Recharts) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Longitudinal Health Trends
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Continuous biometric trajectory visualization across time horizons
            </p>
          </div>

          {/* Metric Selector Tabs */}
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs font-semibold overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveChart("glucose")}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeChart === "glucose"
                  ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Glucose Trend
            </button>
            <button
              onClick={() => setActiveChart("heartRate")}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeChart === "heartRate"
                  ? "bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Heart Rate
            </button>
            <button
              onClick={() => setActiveChart("spo2")}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeChart === "spo2"
                  ? "bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-300 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              SpO₂ (Oxygen)
            </button>
            <button
              onClick={() => setActiveChart("bloodPressure")}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeChart === "bloodPressure"
                  ? "bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Blood Pressure
            </button>
          </div>
        </div>

        {activeChart === "glucose" && (
          <HealthChart type="glucose" title="Blood Glucose Trajectory" unit="mg/dL" color="#8b5cf6" />
        )}
        {activeChart === "heartRate" && (
          <HealthChart type="heartRate" title="Resting Heart Rate" unit="BPM" color="#f43f5e" />
        )}
        {activeChart === "spo2" && (
          <HealthChart type="spo2" title="Blood Oxygen Saturation (SpO₂)" unit="%" color="#14b8a6" />
        )}
        {activeChart === "bloodPressure" && (
          <HealthChart type="bloodPressure" title="Systolic & Diastolic Blood Pressure" unit="mmHg" color="#0284c7" />
        )}
      </div>

      {/* Two Column Section: Clinical Details & Alert History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Medical & Healthcare Information */}
        <div className="lg:col-span-6 space-y-6">
          {/* Medical Information */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              Medical & Clinical Profile
            </h4>

            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-1.5">
                Diagnosed Conditions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {patient.medicalInfo?.conditions?.map((c, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 text-xs font-semibold border border-sky-100 dark:border-sky-900"
                  >
                    {c}
                  </span>
                )) || <span className="text-xs text-slate-400">None recorded</span>}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-1.5">
                Active Medications:
              </span>
              <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {patient.medicalInfo?.medications?.map((m, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-1">
                Known Drug Allergies:
              </span>
              <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
                {patient.medicalInfo?.allergies?.join(", ") || "None recorded"}
              </p>
            </div>
          </div>

          {/* Healthcare Information & Notes */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Physician Notes & Next Steps
              </h4>
              <button
                onClick={() => setIsNoteModalOpen(true)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white mb-1">
                Latest Clinical Directive:
              </p>
              "{patient.doctorNotes || "No specific physician directive recorded."}"
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-400 block">Assigned Doctor</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">
                  {patient.doctor}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-400 block">Next Appointment</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">
                  {patient.nextAppointment}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Alert History Timeline */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Recent Alert History Timeline
            </h4>
            <span className="text-xs text-slate-400">
              {patientAlerts.length} recorded events
            </span>
          </div>

          {patientAlerts.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No recent alerts recorded for this patient.
            </div>
          ) : (
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {patientAlerts.map((a) => (
                <div
                  key={a.id}
                  className={`p-3.5 rounded-2xl border text-xs ${
                    a.type === "CRITICAL"
                      ? "bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60"
                      : a.type === "HIGH"
                      ? "bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60"
                      : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <RiskBadge level={a.type} size="sm" />
                      <span className="font-bold text-slate-900 dark:text-white">
                        {a.metric} Alert
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {a.time}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                    {a.message}
                  </p>

                  <div className="mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-[11px]">
                    <span>Value: <strong>{a.currentValue}</strong> (Limit: {a.threshold})</span>
                    <span className="text-slate-400">Status: {a.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Doctor Note Modal */}
      <Modal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        title="Add Physician Clinical Directive"
        subtitle={`Appends note to ${patient.name}'s permanent chart record`}
      >
        <form onSubmit={handleAddNote} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Physician Note / Clinical Instructions *
            </label>
            <textarea
              required
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g. Advised patient to repeat blood pressure reading after 15 minutes of quiet resting. Titrate beta-blocker if systolic persists > 160 mmHg."
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-sky-500 resize-none text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsNoteModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-sm"
            >
              Save Directive
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
