export const CLINICAL_THRESHOLDS = {
  heartRate: { min: 60, max: 100, unit: "BPM", criticalLow: 50, criticalHigh: 115 },
  spo2: { min: 94, max: 100, unit: "%", criticalLow: 90, criticalHigh: 100 },
  glucose: { min: 70, max: 140, unit: "mg/dL", criticalLow: 60, criticalHigh: 220 },
  systolic: { min: 90, max: 130, unit: "mmHg", criticalHigh: 160 },
  diastolic: { min: 60, max: 85, unit: "mmHg", criticalHigh: 100 },
  temperature: { min: 97.0, max: 99.0, unit: "°F", criticalHigh: 101.5 },
  hemoglobin: { min: 11.5, max: 16.5, unit: "g/dL", criticalLow: 9.0 },
  cholesterol: { min: 125, max: 200, unit: "mg/dL", criticalHigh: 250 }
};

export const getRiskColor = (riskLevel) => {
  switch (riskLevel?.toUpperCase()) {
    case "CRITICAL":
      return "#ef4444";
    case "HIGH":
      return "#f97316";
    case "MODERATE":
      return "#f59e0b";
    case "LOW":
    default:
      return "#10b981";
  }
};

export const getRiskBadgeClass = (riskLevel) => {
  switch (riskLevel?.toUpperCase()) {
    case "CRITICAL":
      return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800";
    case "HIGH":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800";
    case "MODERATE":
      return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/50 dark:text-yellow-300 dark:border-yellow-800";
    case "LOW":
    default:
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800";
  }
};

export const evaluateVitalStatus = (vitalKey, value) => {
  const num = typeof value === "string" && value.includes("/") ? parseInt(value.split("/")[0]) : Number(value);
  if (isNaN(num)) return "normal";

  if (vitalKey === "spo2") {
    if (num < 90) return "critical";
    if (num < 94) return "warning";
    return "normal";
  }
  if (vitalKey === "glucose") {
    if (num > 220 || num < 60) return "critical";
    if (num > 150) return "warning";
    return "normal";
  }
  if (vitalKey === "heartRate") {
    if (num > 110 || num < 50) return "critical";
    if (num > 100 || num < 60) return "warning";
    return "normal";
  }
  if (vitalKey === "bloodPressure") {
    const parts = String(value).split("/");
    const sys = parseInt(parts[0]);
    if (sys >= 160) return "critical";
    if (sys >= 135) return "warning";
    return "normal";
  }
  if (vitalKey === "hemoglobin") {
    if (num < 9.0) return "critical";
    if (num < 11.5) return "warning";
    return "normal";
  }
  if (vitalKey === "cholesterol") {
    if (num >= 250) return "critical";
    if (num > 200) return "warning";
    return "normal";
  }
  return "normal";
};
