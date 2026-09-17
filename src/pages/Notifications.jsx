import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, CheckCheck, AlertCircle, Activity, FileText, WifiOff, Check } from "lucide-react";
import { useToast } from "../context/ToastContext";

const INITIAL_ITEMS = [
  { id: "1", type: "critical", title: "Critical SpO₂ Alert: Rajesh Kumar (VT-1024)", desc: "Oxygen dropped to 87%. Threshold breach alarm triggered.", time: "2 mins ago", unread: true, link: "/patients/VT-1024" },
  { id: "2", type: "critical", title: "Hypertensive Crisis: Arunachalam Pillai (VT-1026)", desc: "Blood pressure spike 168/104 mmHg. Telemetry alerted on-call physician.", time: "14 mins ago", unread: true, link: "/patients/VT-1026" },
  { id: "3", type: "note", title: "Doctor Note Appended: Priya Sharma (VT-1025)", desc: "Dr. Meera Nambiar recorded insulin titration order.", time: "45 mins ago", unread: true, link: "/patients/VT-1025" },
  { id: "4", type: "report", title: "Report Generated: Comprehensive Clinical Summary", desc: "Report #REP-401 for Rajesh Kumar is signed and ready.", time: "2 hours ago", unread: false, link: "/reports" },
  { id: "5", type: "device", title: "IoT Device Disconnected: DEV-OXI-16", desc: "Pulse Oximeter for Lakshmi Narayanan reported zero signal.", time: "3 hours ago", unread: false, link: "/admin/devices" },
  { id: "6", type: "system", title: "System Batch Sync Completed", desc: "16 IoT wearable telemetry streams synced successfully.", time: "6 hours ago", unread: false, link: "/health-trends" }
];

export default function Notifications() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [category, setCategory] = useState("ALL");
  const { addToast } = useToast();

  const filtered = items.filter((i) => {
    if (category === "ALL") return true;
    if (category === "UNREAD") return i.unread;
    return i.type === category;
  });

  const markAllRead = () => {
    setItems(items.map((i) => ({ ...i, unread: false })));
    addToast("All notifications marked as read.", "success");
  };

  const getIcon = (type) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="w-4 h-4 text-rose-500" />;
      case "note":
        return <Activity className="w-4 h-4 text-sky-500" />;
      case "report":
        return <FileText className="w-4 h-4 text-emerald-500" />;
      case "device":
        return <WifiOff className="w-4 h-4 text-amber-500" />;
      default:
        return <Check className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Notification Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time audit alerts, clinician communications, and telemetry events.
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
        >
          <CheckCheck className="w-4 h-4 text-sky-500" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: "ALL", label: "All Events" },
          { id: "UNREAD", label: "Unread" },
          { id: "critical", label: "Critical Alerts" },
          { id: "note", label: "Clinical Notes" },
          { id: "report", label: "Reports" },
          { id: "device", label: "IoT Hardware" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCategory(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              category === tab.id
                ? "bg-sky-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800/80 overflow-hidden">
        {filtered.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className={`p-4 sm:p-5 flex items-start gap-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
              item.unread ? "bg-sky-50/40 dark:bg-sky-950/20" : ""
            }`}
          >
            <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 flex-shrink-0 mt-0.5">
              {getIcon(item.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {item.title}
                </h4>
                <span className="text-[11px] text-slate-400 flex-shrink-0">{item.time}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>

            {item.unread && (
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
