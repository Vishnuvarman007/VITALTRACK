import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Sun,
  Moon,
  Globe,
  User,
  Shield,
  LogOut,
  ChevronDown,
  Activity,
  Layers
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage, SUPPORTED_LANGUAGES } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import NotificationPanel from "./NotificationPanel";
import { useToast } from "../context/ToastContext";

export default function TopHeader({ onToggleSidebar, onSearchQuery, searchQuery }) {
  const [langDropdown, setLangDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [roleSwitchOpen, setRoleSwitchOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { currentUser, switchRole, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleRoleSelect = (roleKey) => {
    const newUser = switchRole(roleKey);
    setRoleSwitchOpen(false);
    addToast(`Switched active view to ${newUser.role}.`, "info");
    navigate(newUser.rolePath);
  };

  const handleLogout = () => {
    logout();
    addToast("Logged out successfully.", "info");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Sidebar Toggle & Quick Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative hidden sm:block w-64 md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery || ""}
            onChange={(e) => onSearchQuery && onSearchQuery(e.target.value)}
            placeholder={t("searchPlaceholder", "Search patient by name, ID or location...")}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-sky-500 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 outline-none transition-all"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Switcher (Convenient demo tool for review) */}
        <div className="relative">
          <button
            onClick={() => setRoleSwitchOpen(!roleSwitchOpen)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs font-semibold text-sky-700 dark:text-sky-300 hover:bg-sky-100 transition-colors"
            title="Switch Demo Role"
          >
            <Layers className="w-3.5 h-3.5 text-sky-500" />
            <span>Role: {currentUser?.role}</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {roleSwitchOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-1.5 z-50 animate-in fade-in">
              <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Switch Demo Perspective
              </div>
              <button
                onClick={() => handleRoleSelect("delegate")}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-between"
              >
                <span>Healthcare Delegate</span>
                {currentUser?.role === "Healthcare Delegate" && <span className="text-sky-500 font-bold">✓</span>}
              </button>
              <button
                onClick={() => handleRoleSelect("doctor")}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-between"
              >
                <span>Medical Doctor</span>
                {currentUser?.role === "Doctor" && <span className="text-sky-500 font-bold">✓</span>}
              </button>
              <button
                onClick={() => handleRoleSelect("admin")}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-between"
              >
                <span>Administrator</span>
                {currentUser?.role === "Administrator" && <span className="text-sky-500 font-bold">✓</span>}
              </button>
            </div>
          )}
        </div>

        {/* Multilingual Selector */}
        <div className="relative">
          <button
            onClick={() => setLangDropdown(!langDropdown)}
            className="flex items-center gap-1 p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Language options"
          >
            <Globe className="w-4 h-4 text-sky-500" />
            <span className="text-xs font-bold uppercase hidden sm:inline">{language}</span>
          </button>

          {langDropdown && (
            <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-50 animate-in fade-in">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setLangDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 ${
                    language === lang.code ? "font-bold text-sky-600 dark:text-sky-400" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <span>{lang.native}</span>
                  <span className="text-[10px] text-slate-400 uppercase">{lang.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Notifications Popover */}
        <NotificationPanel />

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdown(!profileDropdown)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <img
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            />
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {profileDropdown && (
            <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {currentUser?.name || "Delegate User"}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {currentUser?.email}
                </p>
              </div>

              <div className="py-1 space-y-0.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                <Link
                  to="/profile"
                  onClick={() => setProfileDropdown(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>My Profile</span>
                </Link>
                <Link
                  to="/privacy"
                  onClick={() => setProfileDropdown(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Shield className="w-4 h-4 text-slate-400" />
                  <span>Privacy & Consent</span>
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setProfileDropdown(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Activity className="w-4 h-4 text-slate-400" />
                  <span>Preferences</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
