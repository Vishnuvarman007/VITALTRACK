import React, { useState } from "react";
import {
  Radio,
  Sparkles,
  Zap,
  AlertOctagon,
  Activity,
  UserCheck,
  LayoutDashboard,
  Clock,
  FileText,
  Bot,
  Globe,
  Volume2,
  ShieldCheck,
  Cpu,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      id: "feat-1",
      title: "Real-Time Monitoring",
      icon: Radio,
      category: "Telemetry",
      color: "sky",
      description: "Continuous ingestion of vital signs including SpO₂, heart rate, blood pressure, and glucose with millisecond edge processing.",
      details: "Our continuous telemetry stream connects via Bluetooth Low Energy (BLE) and Cellular IoT to capture measurements every 5 to 60 seconds depending on clinical acuity. Data is filtered for motion artifacts before storage."
    },
    {
      id: "feat-2",
      title: "AI Health Insights",
      icon: Sparkles,
      category: "Intelligence",
      color: "purple",
      description: "Multi-parameter correlation algorithms identify hidden patterns and trend deviations across 7, 30, and 90-day intervals.",
      details: "VITALTRACK synthesizes glycemic spikes, pulse pressure amplitude, and nocturnal desaturation into an intuitive risk narrative with concrete actionable steps for caregivers."
    },
    {
      id: "feat-3",
      title: "Early Risk Detection",
      icon: Zap,
      category: "Prevention",
      color: "amber",
      description: "Detects physiological instability hours ahead of critical crises, reducing avoidable emergency hospitalizations.",
      details: "By evaluating the velocity and variance of vitals rather than just isolated thresholds, the system flags subtle compounding deterioration in diabetic and hypertensive patients."
    },
    {
      id: "feat-4",
      title: "Emergency Alerts",
      icon: AlertOctagon,
      category: "Critical",
      color: "rose",
      description: "Automated alert prioritization engine categorizing events into Critical, High, Warning, and Resolved.",
      details: "Critical thresholds immediately trigger browser alarms, toast dispatches, and delegate triage notifications with one-click escalation to attending cardiologists or pulmonologists."
    },
    {
      id: "feat-5",
      title: "Chronic Disease Monitoring",
      icon: Activity,
      category: "Clinical",
      color: "teal",
      description: "Targeted disease pathways tailored for Type 2 Diabetes, Hypertension, Anemia, and High Cholesterol.",
      details: "Specialized disease tracking modules maintain condition-specific baseline targets, medication schedules, and clinical protocols defined by medical guidelines."
    },
    {
      id: "feat-6",
      title: "Doctor Connectivity",
      icon: UserCheck,
      category: "Collaboration",
      color: "emerald",
      description: "Direct tele-health referral bridge between community delegates, primary physicians, and hospital specialists.",
      details: "Doctors can view filtered caseloads, write clinical notes, adjust medication regimens, and review alert histories directly from their specialized portal."
    },
    {
      id: "feat-7",
      title: "Healthcare Delegate Dashboard",
      icon: LayoutDashboard,
      category: "Operations",
      color: "blue",
      description: "High-density command center allowing a single delegate to oversee 100+ patients with color-coded risk stratification.",
      details: "Designed for high cognitive clarity with instant vital search, condition filters, batch alert acknowledgements, and rapid patient navigation."
    },
    {
      id: "feat-8",
      title: "Patient Health History",
      icon: Clock,
      category: "Records",
      color: "indigo",
      description: "Longitudinal chronological timeline documenting vital fluctuations, past acute alerts, and physician interactions.",
      details: "Full historical audit logs allow practitioners to trace health trajectories over months and correlate lifestyle adjustments with clinical outcomes."
    },
    {
      id: "feat-9",
      title: "Health Reports",
      icon: FileText,
      category: "Documentation",
      color: "sky",
      description: "One-click automated generation of standardized clinical summaries ready for sharing, printing, or EHR export.",
      details: "Reports compile multi-day averages, Recharts trend graphs, diagnostic narratives, and doctor recommendations in digitally verifiable PDF formats."
    },
    {
      id: "feat-10",
      title: "AI Health Assistant",
      icon: Bot,
      category: "Support",
      color: "purple",
      description: "Context-aware conversational assistant trained to explain medical terminology, answer telemetry queries, and guide triaging.",
      details: "Available throughout authenticated portals with preset diagnostic prompts, typing simulations, and explicit medical disclaimer boundaries."
    },
    {
      id: "feat-11",
      title: "Multilingual Support",
      icon: Globe,
      category: "Accessibility",
      color: "emerald",
      description: "Full UI accessibility in 5 languages: English, Tamil (தமிழ்), Hindi (हिन्दी), Telugu (తెలుగు), and Malayalam (മലയാളം).",
      details: "Enables diverse community healthcare workers and regional delegates across India to operate comfortably in their native language with persistent preferences."
    },
    {
      id: "feat-12",
      title: "Audio Health Reports",
      icon: Volume2,
      category: "Accessibility",
      color: "amber",
      description: "SpeechSynthesis browser narration of patient status, vital levels, and recommended actions for visually impaired staff or hands-free reviews.",
      details: "Transforms dense numerical telemetry into clear spoken summaries with play, pause, resume, and stop playback controls."
    },
    {
      id: "feat-13",
      title: "Privacy & Consent Management",
      icon: ShieldCheck,
      category: "Security",
      color: "teal",
      description: "Granular patient consent switches governing doctor access, caregiver oversight, and anonymized clinical research participation.",
      details: "Ensures compliance with healthcare data protection principles and provides transparent consent governance per patient profile."
    },
    {
      id: "feat-14",
      title: "IoT Device Fleet Integration",
      icon: Cpu,
      category: "Hardware",
      color: "sky",
      description: "Telemetry device fleet manager tracking continuous glucometers, wireless cuff sphygmomanometers, and pulse oximeters.",
      details: "Simulates wireless connection health, battery charge depletion, MAC addresses, firmware versions, and telemetry packet sync frequencies."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Comprehensive Platform Capabilities
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Designed for Modern Remote Clinical Surveillance
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            14 purpose-built healthcare modules engineered to streamline remote patient monitoring, chronic disease management, and emergency response.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-md hover:border-sky-300 dark:hover:border-sky-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      {feat.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setActiveFeature(feat)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                  >
                    <span>Learn more</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Feature Details Modal */}
      {activeFeature && (
        <Modal
          isOpen={!!activeFeature}
          onClose={() => setActiveFeature(null)}
          title={activeFeature.title}
          subtitle={`Platform Feature • ${activeFeature.category}`}
        >
          <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
            <p className="text-sm font-medium text-slate-900 dark:text-white leading-relaxed">
              {activeFeature.description}
            </p>
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 leading-relaxed space-y-2">
              <h5 className="font-bold text-slate-900 dark:text-white text-xs">
                Clinical Technical Architecture
              </h5>
              <p>{activeFeature.details}</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Full prototype implementation available in this release</span>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveFeature(null)}
                className="px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500">
        VITALTRACK Prototype • AI-Enabled Real-Time Remote Patient Monitoring
      </footer>
    </div>
  );
}
