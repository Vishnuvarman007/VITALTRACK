import React, { useState } from "react";
import { FileText, Download, Share2, Eye, Calendar, User, CheckCircle2 } from "lucide-react";
import RiskBadge from "./RiskBadge";
import Modal from "./Modal";
import { useToast } from "../context/ToastContext";

export default function ReportCard({ report }) {
  const [showPreview, setShowPreview] = useState(false);
  const { addToast } = useToast();

  const handleShare = () => {
    addToast(`Report #${report.id} secure link copied to clipboard and emailed to attending doctor.`, "success");
  };

  const handleDownload = () => {
    addToast(`Downloading ${report.type} (${report.id})...`, "info");
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {report.type}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {report.id}
                </p>
              </div>
            </div>

            <RiskBadge level={report.riskLevel} size="sm" />
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> Patient:
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {report.patientName} ({report.patientId})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Generated:
              </span>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {report.generatedDate}
              </span>
            </div>
            <div className="text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-700/60 leading-relaxed text-[11px]">
              {report.summary}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
          <button
            onClick={() => setShowPreview(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Share report"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Report Preview Modal */}
      <Modal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title={report.type}
        subtitle={`Document ID: ${report.id} • Patient: ${report.patientName}`}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50/50 dark:bg-sky-950/30 flex items-center justify-between">
            <div>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                VITALTRACK Clinical Telemetry Summary
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                Author: {report.author || "Automated Platform Engine"} • {report.generatedDate}
              </p>
            </div>
            <span className="text-[11px] font-mono px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              {report.format || "PDF"} ({report.size || "1.8 MB"})
            </span>
          </div>

          <div className="space-y-2 leading-relaxed">
            <h5 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
              1. Executive Summary
            </h5>
            <p>
              This formal telemetry report compiles synchronized biometric streams from continuous IoT sensors assigned to {report.patientName}. Telemetry adherence during the reporting period was recorded at 98.6%. Multi-vital correlation algorithms flagged risk level as <strong>{report.riskLevel}</strong>.
            </p>
          </div>

          <div className="space-y-2 leading-relaxed">
            <h5 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
              2. Key Clinical Observations
            </h5>
            <ul className="list-disc list-inside space-y-1">
              <li>{report.summary}</li>
              <li>Baseline circadian rhythm shows moderate preservation with morning glycemic peaks.</li>
              <li>No critical telemetry packet drops detected in continuous oximetry.</li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            Certified by VITALTRACK Digital Health Security Framework. Compliant with HIPAA remote patient telemetry storage standards.
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handleShare}
              className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share Link
            </button>
            <button
              onClick={() => {
                handleDownload();
                setShowPreview(false);
              }}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Download Report
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
