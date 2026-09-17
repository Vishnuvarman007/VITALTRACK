import React, { useState } from "react";
import { ShieldCheck, Lock, Eye, Download, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function Privacy() {
  const { addToast } = useToast();

  const [consents, setConsents] = useState({
    doctorAccess: true,
    caregiverAccess: true,
    researchAccess: false,
    aiModelTraining: false,
    crossHospitalSync: true
  });

  const handleToggle = (key) => {
    setConsents((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      addToast(`Consent preference updated for ${key}.`, "info");
      return next;
    });
  };

  const handleExportData = () => {
    addToast("Encrypted HIPAA audit log and consent manifest downloaded.", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Privacy & Patient Consent Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Granular access governance for health information, physician oversight, and compliance policies.
        </p>
      </div>

      {/* Primary Statement Banner */}
      <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-sky-600 dark:text-sky-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-sky-900 dark:text-sky-200 leading-relaxed">
          <strong className="block font-bold">Patient Data Sovereignty Principle:</strong>
          "Health information is shared according to user consent. Patients retain full legal authority to grant, revoke, or restrict physician, caregiver, and institutional access at any time."
        </div>
      </div>

      {/* Consent Toggles */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
          Consent Directives
        </h3>

        <div className="space-y-4 text-xs">
          {/* Doctor Access */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="space-y-0.5 pr-4">
              <span className="font-bold text-slate-900 dark:text-white block">
                Attending Doctor Clinical Access
              </span>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Permits primary physicians and consulting specialists to inspect continuous telemetry and write prescription directives.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("doctorAccess")}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                consents.doctorAccess ? "bg-sky-600" : "bg-slate-300 dark:bg-slate-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  consents.doctorAccess ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Caregiver Access */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="space-y-0.5 pr-4">
              <span className="font-bold text-slate-900 dark:text-white block">
                Designated Family / Caregiver Access
              </span>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Sends high-level alerts and daily stability digests to authorized family members.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("caregiverAccess")}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                consents.caregiverAccess ? "bg-sky-600" : "bg-slate-300 dark:bg-slate-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  consents.caregiverAccess ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Research Access */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="space-y-0.5 pr-4">
              <span className="font-bold text-slate-900 dark:text-white block">
                De-Identified Academic Research Cohort
              </span>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Contributes anonymized biometric curves to cardiovascular and diabetic research trials without PII.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("researchAccess")}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                consents.researchAccess ? "bg-sky-600" : "bg-slate-300 dark:bg-slate-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  consents.researchAccess ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Cross Hospital Telemetry Sharing */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="space-y-0.5 pr-4">
              <span className="font-bold text-slate-900 dark:text-white block">
                Emergency Cross-Hospital Network Transfer
              </span>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Allows accredited tertiary ICU hospitals to access real-time vital streams during emergency transit.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("crossHospitalSync")}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                consents.crossHospitalSync ? "bg-sky-600" : "bg-slate-300 dark:bg-slate-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  consents.crossHospitalSync ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Security Architecture Overview & Data Portability */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-sky-500" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Cryptographic Security
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            All physiological data at rest is protected with AES-256 GCM encryption. In-transit telemetry streams utilize TLS 1.3 with mutual certificate pinning.
          </p>
          <div className="pt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>HIPAA & ISO 27799 Compliant Architecture</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-emerald-500" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Patient Data Portability
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
              Download your complete biometric history, alert logs, and clinical directives in FHIR / JSON format.
            </p>
          </div>

          <button
            onClick={handleExportData}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export My Health Telemetry Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}
