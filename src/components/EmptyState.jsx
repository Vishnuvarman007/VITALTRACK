import React from "react";
import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "No data found",
  description = "There are currently no items matching your criteria.",
  icon: Icon = Inbox,
  action
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 mb-3">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">{title}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-4">
        {description}
      </p>
      {action}
    </div>
  );
}
