import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Activity, ArrowRight, ShieldCheck, UserCheck, Stethoscope } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { DEMO_CREDENTIALS } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("delegate@vitaltrack.com");
  const [password, setPassword] = useState("demo123");
  const [role, setRole] = useState("Healthcare Delegate");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleQuickFill = (roleKey) => {
    const cred = DEMO_CREDENTIALS[roleKey];
    if (cred) {
      setEmail(cred.email);
      setPassword(cred.password);
      setRole(cred.role);
      setError("");
      addToast(`Pre-filled ${cred.role} demo credentials.`, "info");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      const res = login(email, password, role);
      setIsLoading(false);

      if (res.success) {
        addToast(`Welcome back, ${res.user.name}!`, "success");
        navigate(res.user.rolePath || "/dashboard");
      } else {
        setError(res.error || "Authentication failed. Check your credentials.");
        addToast("Authentication failed.", "error");
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 selection:bg-sky-500 selection:text-white">
      <div className="w-full max-w-5xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        {/* Left: VITALTRACK Branding & Healthcare Visualizer */}
        <div className="lg:col-span-6 bg-gradient-to-br from-sky-600 via-sky-700 to-teal-800 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background graphics */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-white text-sky-700 flex items-center justify-center shadow-lg font-bold">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h4.27" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight">VITALTRACK</span>
            </Link>

            <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
              AI-Enabled Real-Time Remote Patient Monitoring
            </h2>
            <p className="text-xs sm:text-sm text-sky-100 mt-3 leading-relaxed">
              Early health risk detection and continuous vital surveillance for chronic disease care. Monitor. Predict. Protect.
            </p>

            {/* Visual Telemetry Mini-Card */}
            <div className="mt-8 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs space-y-3">
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Sensor Network
                </span>
                <span className="text-sky-200">99.9% Uptime</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-xl bg-black/20">
                  <span className="text-sky-200 block">Monitored Cohort</span>
                  <span className="text-base font-bold">128 Patients</span>
                </div>
                <div className="p-2 rounded-xl bg-black/20">
                  <span className="text-sky-200 block">Early Risk Flags</span>
                  <span className="text-base font-bold text-amber-300">07 Critical</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20 flex items-center justify-between text-xs text-sky-200">
            <span>Clinical Prototype Portal</span>
            <Link to="/" className="hover:underline flex items-center gap-1 font-semibold">
              Return Home <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Sign In to Your Workspace
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Select a role and authenticate to access real-time clinical telemetry.
              </p>
            </div>

            {/* Quick Demo Credentials Switcher */}
            <div className="mb-6 p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 block mb-2">
                1-Click Demo Accounts (Fast Access):
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickFill("delegate")}
                  className={`px-2 py-2 rounded-xl text-xs font-semibold transition-all border text-center ${
                    role === "Healthcare Delegate"
                      ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-400"
                  }`}
                >
                  Delegate
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill("doctor")}
                  className={`px-2 py-2 rounded-xl text-xs font-semibold transition-all border text-center ${
                    role === "Doctor"
                      ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-400"
                  }`}
                >
                  Doctor
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill("admin")}
                  className={`px-2 py-2 rounded-xl text-xs font-semibold transition-all border text-center ${
                    role === "Administrator"
                      ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-400"
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Access Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white outline-none focus:border-sky-500"
                >
                  <option value="Healthcare Delegate">Healthcare Delegate (Monitoring & Triage)</option>
                  <option value="Doctor">Doctor (Clinical Care & Prescriptions)</option>
                  <option value="Administrator">Administrator (System & IoT Device Fleet)</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Professional Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="delegate@vitaltrack.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => addToast("Password reset link sent to demo registered email.", "info")}
                    className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  />
                  <span>Remember this device</span>
                </label>
                <span className="text-[10px] text-slate-400">Demo pwd: demo123</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to {role}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-sky-600 dark:text-sky-400 hover:underline">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
