// Historical trends generator for patient detail charts
export const TREND_DATA_7D = [
  { day: "Day 1", heartRate: 72, glucose: 142, spo2: 97, systolic: 124, diastolic: 80 },
  { day: "Day 2", heartRate: 74, glucose: 156, spo2: 96, systolic: 126, diastolic: 82 },
  { day: "Day 3", heartRate: 75, glucose: 168, spo2: 95, systolic: 130, diastolic: 84 },
  { day: "Day 4", heartRate: 78, glucose: 182, spo2: 93, systolic: 132, diastolic: 85 },
  { day: "Day 5", heartRate: 80, glucose: 178, spo2: 92, systolic: 135, diastolic: 86 },
  { day: "Day 6", heartRate: 77, glucose: 190, spo2: 90, systolic: 136, diastolic: 87 },
  { day: "Day 7", heartRate: 78, glucose: 198, spo2: 87, systolic: 138, diastolic: 88 }
];

export const TREND_DATA_30D = [
  { day: "Wk 1", heartRate: 71, glucose: 138, spo2: 98, systolic: 122, diastolic: 78 },
  { day: "Wk 2", heartRate: 73, glucose: 152, spo2: 97, systolic: 125, diastolic: 81 },
  { day: "Wk 3", heartRate: 76, glucose: 174, spo2: 94, systolic: 131, diastolic: 84 },
  { day: "Wk 4", heartRate: 79, glucose: 195, spo2: 89, systolic: 137, diastolic: 87 }
];

export const TREND_DATA_3M = [
  { day: "Month 1", heartRate: 70, glucose: 130, spo2: 98, systolic: 120, diastolic: 76 },
  { day: "Month 2", heartRate: 74, glucose: 162, spo2: 96, systolic: 128, diastolic: 82 },
  { day: "Month 3", heartRate: 78, glucose: 192, spo2: 88, systolic: 138, diastolic: 88 }
];

export const POPULATION_RISK_DISTRIBUTION = [
  { name: "Low Risk", value: 58, color: "#10b981" },
  { name: "Moderate Risk", value: 42, color: "#f59e0b" },
  { name: "High Risk", value: 21, color: "#f97316" },
  { name: "Critical Risk", value: 7, color: "#ef4444" }
];

export const CONDITION_PREVALENCE = [
  { condition: "Type 2 Diabetes", count: 64, percentage: "50%" },
  { condition: "Hypertension", count: 72, percentage: "56%" },
  { condition: "Anemia", count: 28, percentage: "22%" },
  { condition: "High Cholesterol", count: 48, percentage: "38%" },
  { condition: "Respiratory (COPD/Asthma)", count: 18, percentage: "14%" }
];

export const RISK_SCORE_HISTORY = [
  { month: "Apr", score: 48 },
  { month: "May", score: 52 },
  { month: "Jun", score: 55 },
  { month: "Jul", score: 58 },
  { month: "Aug", score: 61 },
  { month: "Sep", score: 72 } // Current Risk: 72/100, Previous: 61/100, Increasing
];

export const INITIAL_APPOINTMENTS = [
  {
    id: "APT-201",
    patientId: "VT-1024",
    patientName: "Rajesh Kumar",
    doctorName: "Dr. Arun Kumar",
    date: "2026-09-25",
    time: "10:30 AM",
    type: "Urgent Review",
    mode: "Tele-Consultation",
    status: "Scheduled",
    notes: "Review critical SpO2 desaturation and glycemic elevation."
  },
  {
    id: "APT-202",
    patientId: "VT-1026",
    patientName: "Arunachalam Pillai",
    doctorName: "Dr. Arun Kumar",
    date: "2026-09-22",
    time: "02:00 PM",
    type: "Follow-up",
    mode: "In-Clinic",
    status: "Confirmed",
    notes: "BP medication evaluation and cardiac auscultation."
  },
  {
    id: "APT-203",
    patientId: "VT-1025",
    patientName: "Priya Sharma",
    doctorName: "Dr. Meera Nambiar",
    date: "2026-09-28",
    time: "11:15 AM",
    type: "Endocrine Review",
    mode: "Tele-Consultation",
    status: "Scheduled",
    notes: "Continuous Glucose Monitoring (CGM) curve interpretation."
  },
  {
    id: "APT-204",
    patientId: "VT-1027",
    patientName: "Kavitha Sundaram",
    doctorName: "Dr. Shalini Gupta",
    date: "2026-09-24",
    time: "09:45 AM",
    type: "Infusion Session",
    mode: "Daycare Infusion",
    status: "Scheduled",
    notes: "Dose 2 IV Iron Sucrose administration."
  },
  {
    id: "APT-205",
    patientId: "VT-1035",
    patientName: "Gopalakrishnan Raman",
    doctorName: "Dr. Arun Kumar",
    date: "2026-09-23",
    time: "04:30 PM",
    type: "ECG Review",
    mode: "Tele-Consultation",
    status: "Confirmed",
    notes: "Holter rhythm check and anticoagulation check."
  }
];

export const INITIAL_REPORTS = [
  {
    id: "REP-401",
    patientId: "VT-1024",
    patientName: "Rajesh Kumar",
    type: "Comprehensive Clinical Summary",
    generatedDate: "2026-09-17",
    status: "Ready",
    riskLevel: "CRITICAL",
    format: "PDF (Digital Signed)",
    summary: "Hypoxemic SpO2 drop (87%) and chronic glycemic trend review.",
    author: "Dr. Arun Kumar",
    size: "2.4 MB"
  },
  {
    id: "REP-402",
    patientId: "VT-1025",
    patientName: "Priya Sharma",
    type: "Endocrine & Glycemic Curve",
    generatedDate: "2026-09-16",
    status: "Ready",
    riskLevel: "HIGH",
    format: "PDF (Digital Signed)",
    summary: "Postprandial spikes above 240 mg/dL across 72 hours.",
    author: "Dr. Meera Nambiar",
    size: "1.8 MB"
  },
  {
    id: "REP-403",
    patientId: "VT-1026",
    patientName: "Arunachalam Pillai",
    type: "Hemodynamic Risk Analysis",
    generatedDate: "2026-09-15",
    status: "Ready",
    riskLevel: "CRITICAL",
    format: "PDF (Digital Signed)",
    summary: "Stage 2 Hypertensive elevation episode log & mean arterial pressure.",
    author: "Dr. Arun Kumar",
    size: "3.1 MB"
  },
  {
    id: "REP-404",
    patientId: "VT-1027",
    patientName: "Kavitha Sundaram",
    type: "Hematology & Iron Kinetics",
    generatedDate: "2026-09-14",
    status: "Ready",
    riskLevel: "HIGH",
    format: "PDF (Digital Signed)",
    summary: "Serum ferritin, transferrin saturation, and reticulocyte counts.",
    author: "Dr. Shalini Gupta",
    size: "1.5 MB"
  },
  {
    id: "REP-405",
    patientId: "VT-1028",
    patientName: "Mohammed Farooq",
    type: "Lipid & ASCVD 10-Yr Risk",
    generatedDate: "2026-09-12",
    status: "Ready",
    riskLevel: "MODERATE",
    format: "PDF (Digital Signed)",
    summary: "Lipoprotein fractions and cardiovascular risk stratification.",
    author: "Dr. David Varghese",
    size: "1.9 MB"
  }
];
