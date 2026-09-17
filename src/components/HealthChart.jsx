import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";
import { TREND_DATA_7D, TREND_DATA_30D, TREND_DATA_3M } from "../data/healthData";

export default function HealthChart({ type = "glucose", title, unit, color = "#0284c7" }) {
  const [timeRange, setTimeRange] = useState("7D"); // "7D" | "30D" | "3M"

  const getData = () => {
    switch (timeRange) {
      case "30D":
        return TREND_DATA_30D;
      case "3M":
        return TREND_DATA_3M;
      case "7D":
      default:
        return TREND_DATA_7D;
    }
  };

  const data = getData();

  const renderChart = () => {
    if (type === "bloodPressure") {
      return (
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
          <XAxis dataKey="day" className="text-xs text-slate-400" tick={{ fill: "#94a3b8", fontSize: 11 }} />
          <YAxis domain={[60, 180]} className="text-xs text-slate-400" tick={{ fill: "#94a3b8", fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#fff",
              fontSize: "12px"
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
          <Line
            type="monotone"
            dataKey="systolic"
            name="Systolic (mmHg)"
            stroke="#ef4444"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#ef4444" }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="diastolic"
            name="Diastolic (mmHg)"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#3b82f6" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      );
    }

    const dataKey =
      type === "heartRate"
        ? "heartRate"
        : type === "spo2"
        ? "spo2"
        : "glucose";

    const gradientId = `gradient-${type}`;

    return (
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.4} />
            <stop offset="95%" stopColor={color} stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
        <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 11 }} />
        <YAxis
          domain={type === "spo2" ? [80, 100] : type === "heartRate" ? [50, 130] : [60, 260]}
          tick={{ fill: "#94a3b8", fontSize: 11 }}
        />
        <Tooltip
          formatter={(value) => [`${value} ${unit || ""}`, title]}
          contentStyle={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "#fff",
            fontSize: "12px"
          }}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2.5}
          fillOpacity={1}
          fill={`url(#${gradientId})`}
          dot={{ r: 3, fill: color }}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></span>
            {title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Measured in {unit}
          </p>
        </div>

        {/* Time Filters */}
        <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs font-semibold self-start sm:self-auto">
          {["7D", "30D", "3M"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg transition-all ${
                timeRange === range
                  ? "bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {range === "7D" ? "7 Days" : range === "30D" ? "30 Days" : "3 Months"}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
