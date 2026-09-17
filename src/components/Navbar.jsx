import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, Menu, X, Sun, Moon, Globe, Shield, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage, SUPPORTED_LANGUAGES } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { isAuthenticated, currentUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("home", "Home"), path: "/" },
    { label: t("howItWorks", "How It Works"), path: "/how-it-works" },
    { label: t("features", "Features"), path: "/features" },
    { label: t("about", "About"), path: "/about" },
    { label: t("contact", "Contact"), path: "/contact" }
  ];

  const getDashboardPath = () => {
    if (!currentUser) return "/dashboard";
    if (currentUser.role === "Doctor") return "/doctor-dashboard";
    if (currentUser.role === "Administrator") return "/admin-dashboard";
    return "/dashboard";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 via-teal-500 to-sky-400 text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              {/* Medical Heart Pulse Icon */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h4.27" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
                  VITAL<span className="text-sky-600 dark:text-sky-400">TRACK</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  AI RPM
                </span>
              </div>
              <p className="text-[10px] font-medium tracking-wide text-slate-500 dark:text-slate-400 -mt-1 hidden sm:block">
                Monitor. Predict. Protect.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-sky-500" />
                <span className="uppercase">{language}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-50 animate-in fade-in">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
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

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Auth CTA */}
            {isAuthenticated() ? (
              <Link
                to={getDashboardPath()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition-all active:scale-95"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {t("login", "Login")}
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition-all active:scale-95"
                >
                  <span>{t("getStarted", "Get Started")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
                  location.pathname === link.path
                    ? "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            {/* Language Selector Mobile */}
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    language === lang.code
                      ? "bg-sky-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {lang.native}
                </button>
              ))}
            </div>

            {isAuthenticated() ? (
              <Link
                to={getDashboardPath()}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center rounded-xl bg-sky-600 text-white font-bold text-sm shadow-md"
              >
                Go to Dashboard
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs"
                >
                  {t("login", "Login")}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl bg-sky-600 text-white font-bold text-xs shadow-md"
                >
                  {t("getStarted", "Get Started")}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
