import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, AlertOctagon, TrendingUp, FileText } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function MobileNavigation() {
  const location = useLocation();
  const { currentUser } = useAuth();
  const role = currentUser?.role || "Healthcare Delegate";

  const getDashboardPath = () => {
    if (role === "Doctor") return "/doctor-dashboard";
    if (role === "Administrator") return "/admin-dashboard";
    return "/dashboard";
  };

  const getPatientsPath = () => {
    if (role === "Doctor") return "/doctor/patients";
    if (role === "Administrator") return "/admin/patients";
    return "/patients";
  };

  const tabs = [
    { label: "Dashboard", path: getDashboardPath(), icon: LayoutDashboard },
    { label: "Patients", path: getPatientsPath(), icon: Users },
    { label: "Alerts", path: "/alerts", icon: AlertOctagon },
    { label: "Trends", path: "/health-trends", icon: TrendingUp },
    { label: "Reports", path: "/reports", icon: FileText }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 lg:hidden px-2 py-1.5 flex items-center justify-around shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex flex-col items-center justify-center p-1.5 rounded-xl text-[10px] font-semibold transition-colors ${
              isActive
                ? "text-sky-600 dark:text-sky-400 font-bold"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Icon className={`w-5 h-5 mb-0.5 ${isActive ? "text-sky-600 dark:text-sky-400" : "text-slate-400"}`} />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
