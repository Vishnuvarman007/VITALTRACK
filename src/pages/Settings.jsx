import React, { useState } from "react";
import { Settings as SettingsIcon, Bell, Moon, Sun, Globe, Sliders, Volume2, Save } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage, SUPPORTED_LANGUAGES } from "../context/LanguageContext";
import { useToast } from "../context/ToastContext";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { addToast } = useToast();

  const [interval, setInterval] = useState("5 min");
  const [glucoseUnit, setGlucoseUnit] = useState("mg/dL");
  const [tempUnit, setTempUnit] = useState("°F");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [speechRate, setSpeechRate] = useState("1.0x");

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Platform preferences saved.", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          System Preferences & Calibration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize telemetry ingestion intervals, biometric units, accessibility audio, and interface localization.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Localization & Appearance */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Globe className="w-4 h-4 text-sky-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Language & Regional Localization
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Display Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-semibold text-slate-800 dark:text-slate-200"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.native} ({l.label})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Visual Theme
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={theme === "dark" ? toggleTheme : undefined}
                  className={`flex-1 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    theme === "light"
                      ? "bg-sky-50 text-sky-700 border-sky-300 dark:bg-sky-950/40"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-500" />
                  Light Mode
                </button>
                <button
                  type="button"
                  onClick={theme === "light" ? toggleTheme : undefined}
                  className={`flex-1 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    theme === "dark"
                      ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Moon className="w-4 h-4 text-sky-200" />
                  Dark Mode
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Measurement Units */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Sliders className="w-4 h-4 text-teal-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Clinical Telemetry Units & Ingestion
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Blood Glucose Scale
              </label>
              <select
                value={glucoseUnit}
                onChange={(e) => setGlucoseUnit(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              >
                <option value="mg/dL">mg/dL (Standard Indian/US)</option>
                <option value="mmol/L">mmol/L (International SI)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Body Temperature Unit
              </label>
              <select
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              >
                <option value="°F">Fahrenheit (°F)</option>
                <option value="°C">Celsius (°C)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                IoT Stream Ingestion Rate
              </label>
              <select
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              >
                <option value="1 min">High Acuity (1 min interval)</option>
                <option value="5 min">Standard Monitoring (5 min interval)</option>
                <option value="15 min">Battery Saver (15 min interval)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Audio & Alerts */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Volume2 className="w-4 h-4 text-purple-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Audio Accessibility & Speech Synthesis
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  Critical Audio Sirens
                </span>
                <p className="text-[11px] text-slate-500">
                  Play audible tone when SpO₂ drops &lt; 90%
                </p>
              </div>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Speech Report Narration Speed
              </label>
              <select
                value={speechRate}
                onChange={(e) => setSpeechRate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              >
                <option value="0.8x">0.8x (Slower / Clearer)</option>
                <option value="1.0x">1.0x (Normal Pace)</option>
                <option value="1.2x">1.2x (Fast Clinical Review)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
