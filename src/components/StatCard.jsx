import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  description,
  accentColor = "blue",
  onClick
}) {
  const colorMap = {
    blue: "text-sky-600 bg-sky-50 dark:bg-sky-950/50 dark:text-sky-400 border-sky-100 dark:border-sky-900/50",
    red: "text-rose-600 bg-rose-50 dark:bg-rose-950/50 dark:text-rose-400 border-rose-100 dark:border-rose-900/50",
    amber: "text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400 border-amber-100 dark:border-amber-900/50",
    emerald: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50",
    purple: "text-purple-600 bg-purple-50 dark:bg-purple-950/50 dark:text-purple-400 border-purple-100 dark:border-purple-900/50"
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all duration-200 ${
        onClick ? "cursor-pointer hover:border-sky-300 dark:hover:border-sky-700" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2 tracking-tight">
            {value}
          </h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border ${colorMap[accentColor] || colorMap.blue}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60 text-xs">
        {change && (
          <span
            className={`inline-flex items-center gap-1 font-semibold ${
              isPositive
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            {change}
          </span>
        )}
        <span className="text-slate-500 dark:text-slate-400 ml-auto">{description}</span>
      </div>
    </div>
  );
}
