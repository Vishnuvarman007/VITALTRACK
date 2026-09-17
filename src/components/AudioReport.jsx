import React, { useState, useEffect, useRef } from "react";
import { Volume2, Play, Pause, Square, VolumeX } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function AudioReport({ patient }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const utteranceRef = useRef(null);
  const { addToast } = useToast();

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setSpeechSupported(false);
    }

    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const buildSpokenText = () => {
    if (!patient) return "No patient data available for audio synthesis.";
    return `Patient ${patient.name}. Age ${patient.age}. Location: ${patient.location}. Primary condition: ${patient.condition}. Heart rate is ${patient.heartRate} beats per minute. Blood pressure is ${patient.bloodPressure} millimeters of mercury. Oxygen saturation is ${patient.spo2} percent. Blood glucose is ${patient.glucose} milligrams per deciliter. Current clinical risk level is ${patient.riskLevel}. Doctor notes: ${patient.doctorNotes || "None recorded"}. AI Recommendation: ${patient.aiInsight?.recommendedAction || "Routine monitoring advised"}.`;
  };

  const handlePlay = () => {
    if (!speechSupported) {
      addToast("Speech synthesis is not supported on this browser.", "warning");
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const text = buildSpokenText();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
    addToast("Audio health report playback started.", "info");
  };

  const handlePause = () => {
    if ("speechSynthesis" in window && isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      addToast("Audio report stopped.", "info");
    }
  };

  return (
    <div className="rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-gradient-to-r from-sky-500/10 via-teal-500/5 to-transparent dark:from-sky-950/40 dark:via-slate-900 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-sky-600 text-white shadow-md shadow-sky-600/20">
            <Volume2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Audio Health Report
              {(isPlaying || isPaused) && (
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-3 bg-sky-500 animate-pulse rounded-full" />
                  <span className="w-1.5 h-5 bg-teal-500 animate-pulse rounded-full" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-2.5 bg-sky-400 animate-pulse rounded-full" style={{ animationDelay: "300ms" }} />
                </span>
              )}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Natural voice narration of patient vitals, telemetry alerts, and clinical actions
            </p>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {!isPlaying ? (
            <button
              onClick={handlePlay}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isPaused ? "Resume Audio" : "Listen to Health Report"}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Pause className="w-4 h-4 fill-white" />
              <span>Pause</span>
            </button>
          )}

          {(isPlaying || isPaused) && (
            <button
              onClick={handleStop}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
              title="Stop audio playback"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
