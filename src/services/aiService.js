/**
 * VITALTRACK AI Service
 * Simulates clinical NLP and predictive health risk score algorithms.
 * Note: Educational and decision-support prototype only.
 */

export const aiService = {
  getPredefinedAnswers: (query, activePatient) => {
    const q = (query || "").toLowerCase().trim();

    if (q.includes("current status") || q.includes("how is this patient")) {
      if (activePatient) {
        return `Patient ${activePatient.name} (ID: ${activePatient.id}) is currently monitored with Risk Level: ${activePatient.riskLevel}. Latest vitals: Heart Rate ${activePatient.heartRate} BPM, Blood Pressure ${activePatient.bloodPressure} mmHg, SpO₂ ${activePatient.spo2}%, and Blood Glucose ${activePatient.glucose} mg/dL. Primary condition: ${activePatient.condition}.`;
      }
      return "Current system status: 128 active patients monitored. 7 critical alerts pending clinical triage, primarily involving SpO₂ desaturations and stage 2 hypertensive spikes.";
    }

    if (q.includes("glucose trend") || q.includes("sugar")) {
      return "Glycemic Trend Analysis: In diabetic cohorts, 7-day post-prandial averages have risen by 14.8%. For patient Rajesh Kumar, glucose peaked at 198 mg/dL today, exhibiting a steep upward slope over the past 48 hours without nocturnal dip.";
    }

    if (q.includes("why is this patient high risk") || q.includes("high risk")) {
      return "Risk Factor Decomposition: Multi-parameter divergence detected. The combination of sustained hypoxemia (SpO₂ 87%), high resting systolic blood pressure (138 mmHg), and glycemic volatility raises the composite 30-day cardiovascular and metabolic risk score to 88/100.";
    }

    if (q.includes("spo2") || q.includes("oxygen")) {
      return "SpO₂ (Peripheral Oxygen Saturation): An estimation of blood oxygen percentage. Normal clinical values range between 95% and 100%. Levels below 90% are considered hypoxemic emergencies requiring prompt airway evaluation and supplemental oxygen administration.";
    }

    if (q.includes("critical alert") || q.includes("alerts today")) {
      return "Active Critical Alerts Today: 1) Rajesh Kumar (VT-1024) - SpO₂ dropped to 87%; 2) Priya Sharma (VT-1025) - Glucose surge 245 mg/dL; 3) Arunachalam Pillai (VT-1026) - BP elevated at 168/104 mmHg; 4) Gopalakrishnan Raman (VT-1035) - Tachycardia 114 BPM.";
    }

    if (q.includes("hypertension") || q.includes("blood pressure")) {
      return "Hypertension Surveillance: Target systolic BP for high-risk patients with diabetes is < 130/80 mmHg. Current telemetry identifies 3 patients with stage 2 hypertension (> 140/90 mmHg) requiring prompt medication titration.";
    }

    // Default intelligent response
    return `Based on real-time telemetry across VITALTRACK's monitored population, multi-sensor cross-correlation indicates stabilized trends in 82% of patients, with early warnings concentrated in glycemic variance and nocturnal oxygen desaturation. Please consult the attending physician for clinical intervention.`;
  }
};
