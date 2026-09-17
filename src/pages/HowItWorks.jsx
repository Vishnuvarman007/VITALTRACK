import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Radio,
  Wifi,
  BarChart3,
  BrainCircuit,
  BellRing,
  ArrowRight,
  CheckCircle,
  Play,
  RotateCcw
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Monitor",
      subtitle: "Collect Patient Health Measurements",
      icon: Radio,
      summary: "Non-invasive wireless medical devices continuously sample vital signs at calibrated intervals.",
      bullets: [
        "Continuous glucose monitors (CGM) sample interstitial fluid every 5 minutes.",
        "Wireless optical pulse oximeters measure arterial hemoglobin oxygen saturation (SpO₂).",
        "Automated oscillometric cuffs track resting blood pressure and mean arterial pressure.",
        "Digital health bands monitor 24/7 resting heart rate and photoplethysmogram (PPG)."
      ]
    },
    {
      num: "02",
      title: "Connect",
      subtitle: "Transmit Health Data to VITALTRACK Gateway",
      icon: Wifi,
      summary: "Biometric streams are compressed, encrypted, and relayed via Bluetooth Low Energy or 4G/5G gateways.",
      bullets: [
        "AES-256 encrypted payload transmission to VITALTRACK IoT Ingestion Gateway.",
        "Local device cache ensures no data packet loss during intermittent rural cellular drops.",
        "Edge pre-filtering cleans out motion artifacts and aberrant sensor detachment spikes.",
        "Automatic device battery and signal telemetry dispatched alongside vital packets."
      ]
    },
    {
      num: "03",
      title: "Analyze",
      subtitle: "Analyze Health Metrics & Historical Trends",
      icon: BarChart3,
      summary: "Cloud analytics engines normalize the stream and benchmark against personalized patient baselines.",
      bullets: [
        "Dynamic comparison with patient's baseline 7-day, 30-day, and 90-day moving averages.",
        "Cross-vital correlation: pairing sudden tachycardia with oxygen desaturation for cardiac alerts.",
        "Time-in-Range (TIR) metrics computed for Type 2 diabetic cohorts.",
        "Diurnal nocturnal dipping analysis for hypertensive risk detection."
      ]
    },
    {
      num: "04",
      title: "Predict",
      subtitle: "Identify Potential Health Risks Using AI",
      icon: BrainCircuit,
      summary: "Automated anomaly pattern models predict acute decompensation trajectories before overt crises.",
      bullets: [
        "Multi-parameter risk scoring yields a dynamic clinical score from 0 to 100.",
        "Classification into Low, Moderate, High, and Critical clinical acuity strata.",
        "Longitudinal trajectory forecasting: predicting sustained glycemic rises or hypertensive crisis.",
        "Generates concise clinical narrative and recommended follow-up actions for delegates."
      ]
    },
    {
      num: "05",
      title: "Alert",
      subtitle: "Notify Doctors and Healthcare Professionals",
      icon: BellRing,
      summary: "Prioritized alerts reach attending healthcare delegates and physicians within seconds.",
      bullets: [
        "Critical hypoxemia or stage 2 hypertensive surges trigger immediate high-priority audio & visual alarms.",
        "Healthcare delegates can acknowledge, review recent trend graphs, and triage within 60 seconds.",
        "One-click tele-consultation referral and automated clinical summary dispatch to doctors.",
        "Full audit trail logging time of notification, review, and physician sign-off."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Architectural Workflow
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How VITALTRACK Operates
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            A continuous loop uniting patient IoT sensors, AI risk prediction algorithms, and dedicated clinical triage.
          </p>
        </div>

        {/* Step Navigation Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-10">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-sky-500 shadow-md ring-2 ring-sky-500/20"
                    : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                    STEP {s.num}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? "text-sky-600 dark:text-sky-400" : "text-slate-400"}`} />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {s.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep Dive Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
          {(() => {
            const cur = steps[activeStep];
            const Icon = cur.icon;
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                        PHASE {cur.num} OF 05
                      </span>
                      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        {cur.title}: {cur.subtitle}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium pt-1">
                    {cur.summary}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {cur.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-3">
                    <button
                      onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition-all"
                    >
                      <span>Next Phase</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setActiveStep(0)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restart</span>
                    </button>
                  </div>
                </div>

                {/* Visual Flow diagram for the phase */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Telemetry Flow Diagram
                  </span>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <span className="text-slate-700 dark:text-slate-300">1. Wearable Sensor</span>
                      <span className="text-emerald-500 font-bold">● Active</span>
                    </div>
                    <div className="text-center text-slate-400 text-xs">↓ BLE Packet (5s)</div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <span className="text-slate-700 dark:text-slate-300">2. IoT Cloud Gateway</span>
                      <span className="text-sky-500 font-bold">● Ingested</span>
                    </div>
                    <div className="text-center text-slate-400 text-xs">↓ REST API / Stream</div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <span className="text-slate-700 dark:text-slate-300">3. AI Risk Scoring Engine</span>
                      <span className="text-purple-500 font-bold">● Score: 72/100</span>
                    </div>
                    <div className="text-center text-slate-400 text-xs">↓ Triage Protocol</div>
                    <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 flex items-center justify-between">
                      <span className="text-sky-800 dark:text-sky-300 font-bold">4. Delegate & Doctor Alert</span>
                      <span className="text-rose-500 font-bold animate-pulse">● Urgent</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500">
        VITALTRACK Prototype • AI-Enabled Real-Time Remote Patient Monitoring
      </footer>
    </div>
  );
}
