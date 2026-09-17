import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  AlertCircle,
  HelpCircle,
  ChevronDown
} from "lucide-react";
import { aiService } from "../services/aiService";
import { useLocation } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "init-1",
      sender: "bot",
      text: "Hello, I am VITALTRACK AI Assistant. I can summarize patient telemetry, analyze vital trends, and explain risk thresholds. How can I assist you?",
      time: "Just now"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const location = useLocation();
  const { patients } = useData();

  // Infer active patient if user is viewing /patients/:id
  const pathParts = location.pathname.split("/");
  const patientIdFromPath = pathParts[1] === "patients" && pathParts[2] ? pathParts[2] : null;
  const activePatient = patientIdFromPath ? patients.find((p) => p.id === patientIdFromPath) : patients[0];

  const suggestedQuestions = [
    "What is this patient's current status?",
    "Show glucose trend.",
    "Why is this patient high risk?",
    "What does SpO₂ mean?",
    "Show today's critical alerts."
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay & typing
    setTimeout(() => {
      const reply = aiService.getPredefinedAnswers(query, activePatient);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-sky-600 to-teal-600 text-white font-semibold text-sm shadow-xl shadow-sky-600/30 hover:shadow-sky-600/40 hover:scale-105 active:scale-95 transition-all duration-200 border border-sky-400/30"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="hidden sm:inline">Ask VITALTRACK AI</span>
            <span className="sm:hidden">AI</span>
          </button>
        ) : null}
      </div>

      {/* Chat Window Container */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md h-[560px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-sky-600 via-sky-700 to-teal-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm">
                <Bot className="w-5 h-5 text-sky-200" />
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  VITALTRACK AI Assistant
                  <span className="text-[10px] bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-1.5 py-0.2 rounded font-mono">
                    ONLINE
                  </span>
                </h4>
                <p className="text-[11px] text-sky-200">
                  {activePatient ? `Context: ${activePatient.name} (${activePatient.id})` : "General Clinical Surveillance"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 flex-shrink-0">
              <HelpCircle className="w-3 h-3" /> Prompts:
            </span>
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex-shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3 leading-relaxed ${
                    m.sender === "user"
                      ? "bg-sky-600 text-white rounded-br-none shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200/60 dark:border-slate-700/60"
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1 ${
                      m.sender === "user" ? "text-sky-200 text-right" : "text-slate-400"
                    }`}
                  >
                    {m.time}
                  </span>
                </div>

                {m.sender === "user" && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl rounded-bl-none bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Mandatory Medical Disclaimer Notice */}
          <div className="px-3 py-1.5 bg-amber-50/80 dark:bg-amber-950/40 border-t border-amber-200 dark:border-amber-900 text-[10px] text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
            <AlertCircle className="w-3 h-3 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <span>Prototype notice: For informational telemetry support only. Does not replace clinical diagnosis.</span>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about vitals, alerts, or trends..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-sky-500 text-xs text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white transition-all shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
