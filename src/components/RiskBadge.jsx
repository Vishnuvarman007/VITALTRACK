import React from "react";
import { AlertTriangle, ShieldCheck, AlertOctagon, Info } from "lucide-react";

export default function RiskBadge({ level, size = "md", showIcon = true }) {
  const norm = (level || "LOW").toUpperCase();

  const styles = {
    LOW: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
    MODERATE: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
    HIGH: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800",
    CRITICAL: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800"
  };

  const icons = {
    LOW: <ShieldCheck className="w-3.5 h-3.5" />,
    MODERATE: <Info className="w-3.5 h-3.5" />,
    HIGH: <AlertTriangle className="w-3.5 h-3.5" />,
    CRITICAL: <AlertOctagon className="w-3.5 h-3.5 animate-pulse" />
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-semibold",
    md: "px-2.5 py-1 text-xs font-semibold",
    lg: "px-3.5 py-1.5 text-sm font-bold tracking-wide"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border shadow-sm transition-all ${
        styles[norm] || styles.LOW
      } ${sizeClasses[size] || sizeClasses.md}`}
    >
      {norm === "CRITICAL" && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
        </span>
      )}
      {showIcon && icons[norm]}
      <span>{norm}</span>
    </span>
  );
}
