import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  PhoneCall,
  Pill,
  Send,
  Sparkles,
  Activity,
  Heart,
  Wind,
  Droplet
} from "lucide-react";
import VitalCard from "../components/VitalCard";
import HealthChart from "../components/HealthChart";
import RiskBadge from "../components/RiskBadge";
import AudioReport from "../components/AudioReport";
import AIInsightCard from "../components/AIInsightCard";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";

export default function DoctorPatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients, addDoctorNote, addAppointment } = useData();
  const { addToast } = useToast();

  const patient = patients.find((p) => p.id === id) || patients[0];

  const [prescriptionNote, setPrescriptionNote] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("2026-09-30");
  const [appointmentMode, setAppointmentMode] = useState("Tele-Consultation");

  if (!patient) {
    return <div className="p-8 text-center">Patient not found</div>;
  }

  const handlePrescriptionSave = (e) => {
    e.preventDefault();
    if (!prescriptionNote.trim()) return;
    addDoctorNote(patient.id, `Rx Modification: ${prescriptionNote}`);
    addToast("Medication adjustments and clinical order saved.", "success");
    setPrescriptionNote("");
  };

  const handleScheduleAppointment = (e) => {
    e.preventDefault();
    addAppointment({
      patientId: patient.id,
      patientName: patient.name,
      doctorName: patient.doctor || "Dr. Arun Kumar",
      date: appointmentDate,
      time: "11:00 AM",
      type: "Doctor Follow-up",
      mode: appointmentMode,
      notes: "Follow-up consultation scheduled by attending physician."
    });
    addToast(`Follow-up appointment booked for ${patient.name} on ${appointmentDate}.`, "success");
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/doctor/patients"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
              Doctor Clinical Chart Review • {patient.id}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {patient.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <RiskBadge level={patient.riskLevel} size="lg" />
        </div>
      </div>

      {/* Audio Health Report */}
      <AudioReport patient={patient} />

      {/* Vitals Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <VitalCard vitalKey="heartRate" value={patient.heartRate} />
        <VitalCard vitalKey="bloodPressure" value={patient.bloodPressure} />
        <VitalCard vitalKey="spo2" value={patient.spo2} />
        <VitalCard vitalKey="glucose" value={patient.glucose} />
      </div>

      {/* AI Risk Assessment */}
      <AIInsightCard
        insight={patient.aiInsight}
        patientName={patient.name}
        patientId={patient.id}
        riskLevel={patient.riskLevel}
      />

      {/* Two Column Layout: Clinical Orders & Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Clinical Notes & Prescriptions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-sky-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Physician Orders & Medication Adjustment
              </h3>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs">
              <span className="font-semibold text-slate-400 block mb-1">Active Prescriptions:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                {patient.medicalInfo?.medications?.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>

            <form onSubmit={handlePrescriptionSave} className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Write Clinical Order / Dose Titration:
              </label>
              <textarea
                required
                rows={3}
                value={prescriptionNote}
                onChange={(e) => setPrescriptionNote(e.target.value)}
                placeholder="e.g. Increase Metformin to 1000mg BID. Advise home blood glucose check morning and post-dinner."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500 resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm"
                >
                  Save Physician Order
                </button>
              </div>
            </form>
          </div>

          {/* Longitudinal Trend Chart */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              7-Day Glycemic & Blood Pressure Trend
            </h3>
            <HealthChart type="bloodPressure" title="Blood Pressure Trend" unit="mmHg" color="#0284c7" />
          </div>
        </div>

        {/* Right Column: Schedule Follow-up Appointment */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Schedule Follow-Up Consultation
            </h3>
          </div>

          <form onSubmit={handleScheduleAppointment} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Consultation Date
              </label>
              <input
                type="date"
                required
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Consultation Mode
              </label>
              <select
                value={appointmentMode}
                onChange={(e) => setAppointmentMode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              >
                <option value="Tele-Consultation">Video Tele-Consultation (Remote)</option>
                <option value="In-Clinic Visit">In-Clinic Comprehensive Visit</option>
                <option value="Emergency Urgent Review">Emergency Urgent Review</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Confirm Appointment Slot
            </button>
          </form>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 leading-relaxed">
            Automated notifications will be sent to the patient and assigned community healthcare delegate.
          </div>
        </div>
      </div>
    </div>
  );
}
