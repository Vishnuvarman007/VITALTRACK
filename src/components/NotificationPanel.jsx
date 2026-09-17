import React, { useState, useRef, useEffect } from "react";
import { Bell, CheckCheck, AlertCircle, FileText, WifiOff, Activity, Check } from "lucide-react";
import { Link } from "react-router-dom";

const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Critical Alert: Rajesh Kumar",
    description: "SpO₂ dropped to 87% (threshold < 90%). Emergency protocol triggered.",
    time: "2 mins ago",
    unread: true,
    type: "critical",
    link: "/patients/VT-1024"
  },
  {
    id: "notif-2",
    title: "New Doctor Clinical Note Added",
    description: "Dr. Arun Kumar added notes regarding Stage 2 Hypertensive crisis.",
    time: "15 mins ago",
    unread: true,
    type: "note",
    link: "/patients/VT-1026"
  },
  {
    id: "notif-3",
    title: "Patient Report Generated",
    description: "Comprehensive Clinical Summary for Priya Sharma is ready for review.",
    time: "1 hour ago",
    unread: true,
    type: "report",
    link: "/reports"
  },
  {
    id: "notif-4",
    title: "IoT Device Disconnected",
    description: "Pulse Oximeter DEV-OXI-16 for Lakshmi Narayanan reported zero signal.",
    time: "3 hours ago",
    unread: false,
    type: "device",
    link: "/admin/devices"
  },
  {
    id: "notif-5",
    title: "Batch Telemetry Ingested",
    description: "16 IoT wearable telemetry streams synced successfully.",
    time: "5 hours ago",
    unread: false,
    type: "system",
    link: "/health-trends"
  }
];

export default function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const panelRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markItemRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
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
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Open notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Notifications
              </h4>
              {unreadCount > 0 && (
                <span className="text-[11px] font-bold px-1.5 py-0.2 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
            {notifications.map((n) => (
              <Link
                key={n.id}
                to={n.link}
                onClick={() => {
                  markItemRead(n.id);
                  setIsOpen(false);
                }}
                className={`p-3.5 block transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                  n.unread ? "bg-sky-50/40 dark:bg-sky-950/20" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 flex-shrink-0 mt-0.5">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {n.title}
                      </h5>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                      {n.description}
                    </p>
                  </div>
                  {n.unread && (
                    <span className="w-2 h-2 rounded-full bg-sky-500 mt-1 flex-shrink-0" />
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 text-center">
            <Link
              to="/notifications"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              View all notification history →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
