import React from "react";
import { Activity } from "lucide-react";

export default function LoadingSpinner({ message = "Loading clinical telemetry..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-4 border-sky-100 dark:border-slate-800 border-t-sky-600 animate-spin" />
        <Activity className="w-6 h-6 text-sky-600 dark:text-sky-400 absolute animate-pulse" />
      </div>
      <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
        {message}
      </p>
    </div>
  );
}
