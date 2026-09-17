import React from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Heart,
  Wind,
  Droplet,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Stethoscope,
  Cpu,
  Eye,
  Radio,
  Clock,
  Sparkles
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function Home() {
  const trustItems = [
    { title: "Real-Time Monitoring", desc: "Sub-second IoT telemetry ingestion with continuous vital threshold checks.", icon: Radio },
    { title: "AI-Powered Insights", desc: "Multi-parameter risk scoring and longitudinal trajectory anomaly prediction.", icon: Sparkles },
    { title: "Early Risk Detection", desc: "Identifies glycemic volatility and hypoxemia hours before clinical crisis.", icon: Zap },
    { title: "Secure Health Data", desc: "Engineered under strict HIPAA and GDPR patient consent architecture.", icon: ShieldCheck }
  ];

  const monitoredMetrics = [
    { label: "Heart Rate", value: "78", unit: "BPM", target: "60-100", icon: Heart, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/40" },
    { label: "Blood Pressure", value: "122/80", unit: "mmHg", target: "< 120/80", icon: Activity, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-950/40" },
    { label: "SpO₂ (Oxygen)", value: "98%", unit: "", target: "95-100%", icon: Wind, color: "text-teal-500", bg: "bg-teal-50 dark:bg-teal-950/40" },
    { label: "Temperature", value: "98.4", unit: "°F", target: "97.0-99.0", icon: Stethoscope, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/40" },
    { label: "Blood Glucose", value: "108", unit: "mg/dL", target: "70-140", icon: Droplet, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/40" },
    { label: "Hemoglobin", value: "13.4", unit: "g/dL", target: "12.0-16.0", icon: Cpu, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
    { label: "Cholesterol", value: "168", unit: "mg/dL", target: "< 200", icon: TrendingUp, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-950/40" }
  ];

  const steps = [
    { step: "01", title: "Monitor", desc: "Collect continuous patient health measurements via wireless IoT medical devices." },
    { step: "02", title: "Connect", desc: "Securely transmit real-time telemetry stream to VITALTRACK cloud gateway." },
    { step: "03", title: "Analyze", desc: "Cross-correlate historical baselines with active biometric fluctuations." },
    { step: "04", title: "Predict", desc: "Identify potential acute risk trajectories using AI pattern models." },
    { step: "05", title: "Alert", desc: "Dispatch urgent notifications to doctors and delegates for immediate triage." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Soft background aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-400/10 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Live Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100/80 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>● Live Monitoring Telemetry</span>
                <span className="text-slate-400">•</span>
                <span>AI Clinical Triaging</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Smarter Remote Healthcare. <br />
                <span className="bg-gradient-to-r from-sky-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
                  Earlier Risk Detection.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                VITALTRACK combines real-time patient monitoring, intelligent health analytics, and automated alerts to help healthcare professionals identify potential health risks earlier.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link
                  to="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-xl shadow-sky-600/25 hover:shadow-sky-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm shadow-sm transition-all"
                >
                  <Eye className="w-4 h-4 text-sky-500" />
                  <span>Explore Platform</span>
                </Link>
              </div>

              {/* Key Clinical Focus Pills */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span className="text-slate-400 font-normal">Surveillance Focus:</span>
                <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">Diabetes</span>
                <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">Hypertension</span>
                <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">Anemia</span>
                <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">High Cholesterol</span>
              </div>
            </div>

            {/* Right Healthcare Visualizer Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl p-6 overflow-hidden">
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-sky-600 font-bold text-sm">
                        RK
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Rajesh Kumar
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        VT-1024 • Age 52 • Chennai
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                    CRITICAL RISK
                  </span>
                </div>

                {/* Simulated Live ECG Wave */}
                <div className="mt-4 p-3 rounded-2xl bg-slate-950 text-sky-400 font-mono text-xs overflow-hidden relative border border-slate-800">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1">
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-emerald-400" /> LEAD II ECG
                    </span>
                    <span className="text-emerald-400">78 BPM</span>
                  </div>
                  <svg className="w-full h-12 stroke-sky-400 fill-none" viewBox="0 0 300 50">
                    <path
                      className="animate-ecg"
                      strokeWidth="2"
                      d="M0,25 L30,25 L35,10 L40,40 L45,25 L80,25 L85,5 L90,45 L95,25 L140,25 L145,15 L150,35 L155,25 L200,25 L205,8 L210,42 L215,25 L260,25 L265,12 L270,38 L275,25 L300,25"
                    />
                  </svg>
                </div>

                {/* Monitored Metrics Quad Grid */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] text-slate-400 block font-medium">Heart Rate</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl font-black text-slate-900 dark:text-white">78</span>
                      <span className="text-[10px] font-semibold text-slate-400">BPM</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold">● Normal</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] text-slate-400 block font-medium">Blood Pressure</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl font-black text-slate-900 dark:text-white">138/88</span>
                      <span className="text-[10px] font-semibold text-slate-400">mmHg</span>
                    </div>
                    <span className="text-[10px] text-amber-600 font-semibold">● Borderline</span>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
                    <span className="text-[11px] text-rose-500 block font-medium">Oxygen (SpO₂)</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl font-black text-rose-600 dark:text-rose-400">87%</span>
                    </div>
                    <span className="text-[10px] text-rose-600 font-bold">▲ Hypoxemia</span>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
                    <span className="text-[11px] text-amber-600 block font-medium">Glucose</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl font-black text-amber-700 dark:text-amber-400">198</span>
                      <span className="text-[10px] font-semibold text-slate-400">mg/dL</span>
                    </div>
                    <span className="text-[10px] text-amber-600 font-semibold">▲ High Postprandial</span>
                  </div>
                </div>

                {/* AI Predictive Alert Snippet */}
                <div className="mt-4 p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-sky-900 dark:text-sky-300">
                    <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                    <span>AI Risk Prediction</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mt-1 text-[11px] leading-relaxed">
                    SpO₂ dropped below 90% threshold for 18 consecutive minutes. Prompt clinical follow-up suggested.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 border-y border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Health Metrics Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Precision Biometric Telemetry
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Monitored Health Metrics
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Continuous remote ingestion from calibrated clinical sensors, automatically validated against standardized physiological normal ranges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {monitoredMetrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2.5 rounded-xl ${m.bg}`}>
                      <Icon className={`w-5 h-5 ${m.color}`} />
                    </div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {m.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                    Healthy
                  </span>
                </div>

                <div className="mt-5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {m.value}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {m.unit}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Target Range:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{m.target}</span>
                </div>
              </div>
            );
          })}

          {/* Callout Card */}
          <div className="rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-gradient-to-br from-sky-600 to-teal-700 text-white p-6 shadow-md flex flex-col justify-between">
            <div>
              <Sparkles className="w-6 h-6 text-sky-200 mb-2" />
              <h4 className="text-lg font-bold">24/7 Anomaly Flagging</h4>
              <p className="text-xs text-sky-100 mt-2 leading-relaxed">
                Biometrics are cross-analyzed using multi-parameter temporal models to detect acute distress earlier.
              </p>
            </div>
            <Link
              to="/features"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-white hover:underline"
            >
              <span>Explore full feature set</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5-Step Process Section */}
      <section className="py-20 bg-slate-100/70 dark:bg-slate-900/50 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              End-to-End Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              How VITALTRACK Works
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              From continuous sensor telemetry to clinical intervention in 5 automated phases.
            </p>
          </div>

          {/* Desktop Horizontal / Mobile Vertical Workflow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded">
                      STEP {s.step}
                    </span>
                    {idx < steps.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-700 hidden md:block" />
                    )}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {s.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-xs text-slate-800 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            >
              <span>View Interactive Architectural Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl bg-gradient-to-r from-sky-600 via-sky-700 to-teal-700 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
              Transforming Remote Patient Care
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to experience modern AI-driven remote monitoring?
            </h3>
            <p className="text-sm text-sky-100 leading-relaxed">
              Explore our live prototype with pre-populated clinical patient scenarios for delegates, doctors, and administrators.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl bg-white text-sky-700 hover:bg-sky-50 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              Launch Demo Dashboard
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl border border-white/30 hover:bg-white/10 text-white font-bold text-xs transition-colors"
            >
              Request Partnership
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 py-10 bg-white dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">VITALTRACK</span>
            <span>•</span>
            <span>AI-Enabled Real-Time Remote Patient Monitoring and Early Health Risk Detection System</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/features" className="hover:underline">Features</Link>
            <Link to="/privacy" className="hover:underline">Privacy & Consent</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
