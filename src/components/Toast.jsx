import React from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

export default function Toast({ id, type, message, onClose }) {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-500 flex-shrink-0" />
  };

  const borders = {
    success: "border-emerald-500/30 bg-white dark:bg-slate-900 shadow-emerald-500/10",
    error: "border-rose-500/30 bg-white dark:bg-slate-900 shadow-rose-500/10",
    warning: "border-amber-500/30 bg-white dark:bg-slate-900 shadow-amber-500/10",
    info: "border-sky-500/30 bg-white dark:bg-slate-900 shadow-sky-500/10"
  };

  return (
    <div
      className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-lg transition-all duration-200 animate-in fade-in slide-in-from-bottom-3 ${
        borders[type] || borders.info
      }`}
    >
      <div className="flex items-center gap-3">
        {icons[type] || icons.info}
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
