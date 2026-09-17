import React, { createContext, useContext, useState, useEffect } from "react";
import { TRANSLATIONS } from "../data/translations";

const LanguageContext = createContext(null);

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" }
];

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem("vitaltrack_language") || "en";
    } catch {
      return "en";
    }
  });

  const setLanguage = (code) => {
    setLanguageState(code);
    try {
      localStorage.setItem("vitaltrack_language", code);
    } catch (e) {
      console.error(e);
    }
  };

  const t = (key, fallback = "") => {
    const currentDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return currentDict[key] || TRANSLATIONS.en[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, supportedLanguages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
