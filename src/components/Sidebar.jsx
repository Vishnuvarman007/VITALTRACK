import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  AlertOctagon,
  TrendingUp,
  FileText,
  UserCheck,
  Bot,
  Bell,
  Settings,
  Shield,
  LogOut,
  Radio,
  Calendar,
  Cpu,
  UserPlus
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import UserAvatar from "./UserAvatar";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { addToast } = useToast();

  const handleLogout = () => {
    logout();
    addToast("You have been signed out.", "info");
    navigate("/login");
  };

  const role = currentUser?.role || "Healthcare Delegate";

  // Navigation sets based on role
  const getNavLinks = () => {
    if (role === "Doctor") {
      return [
        { label: "Dashboard", path: "/doctor-dashboard", icon: LayoutDashboard },
        { label: "My Patients", path: "/doctor/patients", icon: Users },
        { label: "Appointments", path: "/doctor/appointments", icon: Calendar },
        { label: "Clinical Alerts", path: "/doctor/alerts", icon: AlertOctagon, badge: "4" },
        { label: "Health Reports", path: "/reports", icon: FileText },
        { label: "AI Assistant", path: "/assistant", icon: Bot },
        { label: "Notifications", path: "/notifications", icon: Bell },
        { label: "Settings", path: "/settings", icon: Settings }
      ];
    }

    if (role === "Administrator") {
      return [
        { label: "Admin Dashboard", path: "/admin-dashboard", icon: LayoutDashboard },
        { label: "User Management", path: "/admin/users", icon: Users },
        { label: "Patient Directory", path: "/admin/patients", icon: UserPlus },
        { label: "Doctor Roster", path: "/admin/doctors", icon: UserCheck },
        { label: "IoT Telemetry Devices", path: "/admin/devices", icon: Cpu, badge: "16" },
        { label: "System Alerts", path: "/admin/alerts", icon: AlertOctagon },
        { label: "Privacy & Consent", path: "/privacy", icon: Shield },
        { label: "Settings", path: "/settings", icon: Settings }
      ];
    }

    // Default: Healthcare Delegate
    return [
      { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { label: "Patients", path: "/patients", icon: Users },
      { label: "Critical Alerts", path: "/alerts", icon: AlertOctagon, badge: "7" },
      { label: "Health Trends", path: "/health-trends", icon: TrendingUp },
      { label: "Reports", path: "/reports", icon: FileText },
      { label: "Doctors", path: "/doctors", icon: UserCheck },
      { label: "AI Assistant", path: "/assistant", icon: Bot },
      { label: "Notifications", path: "/notifications", icon: Bell },
      { label: "Privacy & Consent", path: "/privacy", icon: Shield },
      { label: "Settings", path: "/settings", icon: Settings }
    ];
  };

  const links = getNavLinks();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Branding */}
        <div>
          <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h4.27" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  VITAL<span className="text-sky-600 dark:text-sky-400">TRACK</span>
                </span>
                <div className="flex items-center gap-1.5 -mt-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    System Online
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-190px)]">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {role} Navigation
            </div>

            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-sky-600 text-white shadow-sm shadow-sky-600/20"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                    <span>{link.label}</span>
                  </div>

                  {link.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Logout Bar */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2 bg-slate-50/50 dark:bg-slate-800/30">
          <Link
            to="/profile"
            onClick={onClose}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <UserAvatar
              name={currentUser?.name || "User"}
              role={role}
              size="md"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {currentUser?.name || "Delegate User"}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                {role}
              </p>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
