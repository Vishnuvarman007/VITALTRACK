import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, AlertTriangle, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import { useToast } from "../context/ToastContext";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "Clinical Partnership",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast("Please fill in all required fields.", "error");
      return;
    }
    setSubmitted(true);
    addToast("Your inquiry has been routed to the VITALTRACK clinical team.", "success");
    setFormData({ name: "", email: "", department: "Clinical Partnership", message: "" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Emergency Callout */}
        <div className="mb-10 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-rose-800 dark:text-rose-200 leading-relaxed">
            <strong>Emergency Medical Advisory:</strong> If a monitored patient is experiencing acute chest pain, severe hypoxemia (SpO₂ &lt; 85%), or sudden loss of consciousness, immediately contact local emergency services (108 / 112 / 911). Do not wait for contact form triage.
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Connect with VITALTRACK Clinical Support
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Whether inquiring about hospital telemetry deployments, research partnerships, or delegate training programs, our specialized healthcare team is available.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Clinical Telemetry Hubs
              </h3>

              <div className="flex items-start gap-3 text-xs">
                <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Main Clinical Command Center</span>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    IIT Madras Research Park, Taramani, Chennai, Tamil Nadu 600113
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Delegate Operations Line</span>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">+91 (044) 4000-VITAL (8482)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">General Inquiries</span>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">support@vitaltrack.health</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-sky-600 to-teal-700 text-white shadow-lg space-y-2">
              <h4 className="text-sm font-bold">24/7 Platform Uptime</h4>
              <p className="text-xs text-sky-100 leading-relaxed">
                VITALTRACK telemetry cloud operates with a 99.99% service-level objective across all connected healthcare regions.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="md:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Rajesh Sundaram"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@hospital.org"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Department / Reason *
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500 transition-colors"
                >
                  <option value="Clinical Partnership">Clinical Partnership & Hospital Deployment</option>
                  <option value="Delegate Training">Healthcare Delegate Program</option>
                  <option value="Research">Academic Research / Sensor Integration</option>
                  <option value="Technical Support">Technical & IoT Device Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry, patient population size, or hardware integration needs..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Clinical Inquiry</span>
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500">
        VITALTRACK Prototype • AI-Enabled Real-Time Remote Patient Monitoring
      </footer>
    </div>
  );
}
