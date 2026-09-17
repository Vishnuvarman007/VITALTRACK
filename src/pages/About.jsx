import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Heart, Award, Users, CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";

export default function About() {
  const leadership = [
    {
      name: "Dr. Arun Kumar, MD, DM",
      role: "Chief Medical Officer & Co-Founder",
      bio: "Cardiologist with 18+ years in acute care telemetry and clinical decision support systems.",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Sowmya Krishnan",
      role: "Head of Remote Clinical Operations",
      bio: "Specializes in healthcare delegate workflows, community triage, and patient engagement.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Dr. V. Ramanathan",
      role: "Director of Digital Health & Architecture",
      bio: "Senior health informatics engineer specializing in IoT telemetry ingestion pipelines.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            About VITALTRACK
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Our Mission: Empowering Proactive Remote Healthcare
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Pioneering AI-enabled telemetry surveillance to transition healthcare from reactive crisis management to early detection and preservation.
          </p>
        </div>

        {/* Vision & Core Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              The Remote Care Imperative
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Chronic conditions like diabetes, hypertension, and cardiovascular diseases account for over 70% of global healthcare expenditures. Too often, critical physiological decompensation is caught only after emergency hospital admission.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              VITALTRACK bridges the chasm between routine clinical consultations and home reality by tracking continuous vitals and empowering healthcare delegates with automated risk detection.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Clinical Quality & Safety First
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Our automated risk models are strictly calibrated to support, rather than supersede, clinical judgment. Medical delegates and doctors maintain complete control over alert escalation policies, patient care plans, and diagnostic assessments.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Engineered with end-to-end encryption and modular REST API interfaces ready to connect with hospital EHR systems and national health registries.
            </p>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
            Clinical & Engineering Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadership.map((member, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 text-center shadow-sm"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-sky-500/20 mb-4"
                />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {member.name}
                </h4>
                <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 mt-0.5">
                  {member.role}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance & Standards */}
        <div className="p-8 rounded-3xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Adherence to Global Health Data Protocols
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Architected under HIPAA security guidelines, ISO 27799 health informatics standards, and explicit granular consent protocols for patients, caregivers, and attending physicians.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              to="/privacy"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
            >
              <span>View Privacy & Consent Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500">
        VITALTRACK Prototype • AI-Enabled Real-Time Remote Patient Monitoring
      </footer>
    </div>
  );
}
