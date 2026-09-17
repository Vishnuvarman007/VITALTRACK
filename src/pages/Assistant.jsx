import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Sparkles, AlertCircle, HelpCircle, ShieldAlert } from "lucide-react";
import { aiService } from "../services/aiService";
import { useData } from "../context/DataContext";

export default function Assistant() {
  const { patients } = useData();
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || "VT-1024");
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "bot",
      text: "Welcome to the VITALTRACK AI Clinical Workspace. Select an active patient to contextualize biometric prompts, or ask population-level telemetry surveillance questions.",
      time: "Just now"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  const activePatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  const suggestedQuestions = [
    "What is this patient's current status?",
    "Show glucose trend.",
    "Why is this patient high risk?",
    "What does SpO₂ mean?",
    "Show today's critical alerts."
  ];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (queryText) => {
    const text = queryText || input;
    if (!text.trim() || isTyping) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = aiService.getPredefinedAnswers(text, activePatient);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              AI Health Assistant Workspace
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              NLP Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Conversational triage, telemetry inquiry, and chronic risk interpretation.
          </p>
        </div>

        {/* Context Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Context:</span>
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.id})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Workspace Card */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col h-[650px] overflow-hidden">
        {/* Prompts Bar */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 flex-shrink-0">
            <HelpCircle className="w-3.5 h-3.5 text-sky-500" /> Clinical Prompts:
          </span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-xs font-semibold whitespace-nowrap px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-sky-500 hover:text-sky-600 transition-colors flex-shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.sender === "bot" && (
                <div className="w-8 h-8 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed ${
                  m.sender === "user"
                    ? "bg-sky-600 text-white rounded-br-none shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200/80 dark:border-slate-700/80"
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`block text-[10px] mt-1.5 ${
                    m.sender === "user" ? "text-sky-200 text-right" : "text-slate-400"
                  }`}
                >
                  {m.time}
                </span>
              </div>

              {m.sender === "user" && (
                <div className="w-8 h-8 rounded-2xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl rounded-bl-none bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Medical Disclaimer Banner */}
        <div className="px-4 py-2 bg-amber-50 dark:bg-amber-950/40 border-t border-amber-200 dark:border-amber-900 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            <strong>Clinical Safety Disclaimer:</strong> This assistant provides informational support based on simulated algorithmic models. It does not replace independent professional medical judgment.
          </span>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your telemetry or clinical trend inquiry..."
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-sky-500 text-xs text-slate-900 dark:text-white outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white font-bold text-xs shadow-md shadow-sky-600/20 flex items-center gap-2 transition-all active:scale-95"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
