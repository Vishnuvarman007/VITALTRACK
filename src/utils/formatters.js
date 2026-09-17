export const formatVitalWithUnit = (key, value) => {
  if (value === undefined || value === null) return "--";
  switch (key) {
    case "heartRate":
      return `${value} BPM`;
    case "bloodPressure":
      return `${value} mmHg`;
    case "spo2":
      return `${value}%`;
    case "temperature":
      return `${value}°F`;
    case "glucose":
      return `${value} mg/dL`;
    case "hemoglobin":
      return `${value} g/dL`;
    case "cholesterol":
      return `${value} mg/dL`;
    default:
      return String(value);
  }
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch {
    return dateStr;
  }
};
