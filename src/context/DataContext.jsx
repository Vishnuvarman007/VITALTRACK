import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_PATIENTS } from "../data/patients";
import { INITIAL_ALERTS } from "../data/alerts";
import { INITIAL_DOCTORS } from "../data/doctors";
import { INITIAL_DEVICES } from "../data/devices";
import { INITIAL_APPOINTMENTS, INITIAL_REPORTS } from "../data/healthData";

const DataContext = createContext(null);

const STORAGE_KEYS = {
  patients: "vitaltrack_patients",
  alerts: "vitaltrack_alerts",
  doctors: "vitaltrack_doctors",
  devices: "vitaltrack_devices",
  appointments: "vitaltrack_appointments",
  reports: "vitaltrack_reports"
};

export const DataProvider = ({ children }) => {
  const [patients, setPatients] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.patients);
      return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
    } catch {
      return INITIAL_PATIENTS;
    }
  });

  const [alerts, setAlerts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.alerts);
      return saved ? JSON.parse(saved) : INITIAL_ALERTS;
    } catch {
      return INITIAL_ALERTS;
    }
  });

  const [doctors, setDoctors] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.doctors);
      return saved ? JSON.parse(saved) : INITIAL_DOCTORS;
    } catch {
      return INITIAL_DOCTORS;
    }
  });

  const [devices, setDevices] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.devices);
      return saved ? JSON.parse(saved) : INITIAL_DEVICES;
    } catch {
      return INITIAL_DEVICES;
    }
  });

  const [appointments, setAppointments] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.appointments);
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.reports);
      return saved ? JSON.parse(saved) : INITIAL_REPORTS;
    } catch {
      return INITIAL_REPORTS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.patients, JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.alerts, JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.doctors, JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.devices, JSON.stringify(devices));
  }, [devices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.appointments, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.reports, JSON.stringify(reports));
  }, [reports]);

  // Mutations
  const acknowledgeAlert = (alertId) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true, status: "Read" } : a))
    );
  };

  const resolveAlert = (alertId) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === alertId
          ? { ...a, type: "RESOLVED", acknowledged: true, status: "Resolved" }
          : a
      )
    );
  };

  const addPatient = (newPatientData) => {
    const id = `VT-${Math.floor(1040 + Math.random() * 500)}`;
    const created = {
      id,
      ...newPatientData,
      monitoringStatus: "Active",
      lastUpdated: "Just now",
      heartRate: Number(newPatientData.heartRate) || 75,
      spo2: Number(newPatientData.spo2) || 98,
      temperature: Number(newPatientData.temperature) || 98.6,
      glucose: Number(newPatientData.glucose) || 110,
      hemoglobin: Number(newPatientData.hemoglobin) || 13.5,
      cholesterol: Number(newPatientData.cholesterol) || 180,
      bloodPressure: newPatientData.bloodPressure || "120/80",
      riskLevel: newPatientData.riskLevel || "LOW",
      medicalInfo: {
        conditions: newPatientData.condition ? [newPatientData.condition] : ["Hypertension"],
        medications: ["Prescription ongoing"],
        allergies: ["None"],
        bloodGroup: newPatientData.bloodGroup || "O+"
      },
      doctorNotes: "Initial telemetry baseline established.",
      aiInsight: {
        headline: "Initial Baseline Telemetry Active",
        description: "Continuous telemetry stream initiated with normal boundary thresholds.",
        trend: "Stable",
        riskScore: newPatientData.riskLevel === "CRITICAL" ? 85 : newPatientData.riskLevel === "HIGH" ? 70 : 35,
        recommendedAction: "Review initial 24-hour telemetry curve at next clinical huddle."
      }
    };
    setPatients((prev) => [created, ...prev]);
    return created;
  };

  const updatePatient = (patientId, updates) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === patientId ? { ...p, ...updates } : p))
    );
  };

  const addDoctor = (docData) => {
    const id = `DOC-${Math.floor(111 + Math.random() * 800)}`;
    const created = {
      id,
      ...docData,
      assignedPatients: Number(docData.assignedPatients) || 0,
      criticalCount: 0,
      rating: 5.0,
      experienceYears: Number(docData.experienceYears) || 5,
      status: "Available",
      avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80"
    };
    setDoctors((prev) => [created, ...prev]);
    return created;
  };

  const addDevice = (devData) => {
    const id = `DEV-${Math.floor(100 + Math.random() * 900)}`;
    const created = {
      id,
      ...devData,
      battery: 100,
      connection: "Connected",
      signalStrength: "Strong",
      lastSync: "Just now",
      firmware: "v5.1.0"
    };
    setDevices((prev) => [created, ...prev]);
    return created;
  };

  const toggleDeviceConnection = (deviceId) => {
    setDevices((prev) =>
      prev.map((d) => {
        if (d.id === deviceId) {
          const next = d.connection === "Connected" ? "Disconnected" : "Connected";
          return { ...d, connection: next, lastSync: next === "Connected" ? "Just now" : d.lastSync };
        }
        return d;
      })
    );
  };

  const syncDevice = (deviceId) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === deviceId ? { ...d, connection: "Connected", lastSync: "Just now" } : d
      )
    );
  };

  const addDoctorNote = (patientId, note) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patientId
          ? {
              ...p,
              doctorNotes: `${note} (Added on ${new Date().toLocaleDateString()})`
            }
          : p
      )
    );
  };

  const addAppointment = (apptData) => {
    const id = `APT-${Math.floor(206 + Math.random() * 500)}`;
    const created = { id, ...apptData, status: "Scheduled" };
    setAppointments((prev) => [created, ...prev]);
    return created;
  };

  const generateReportForPatient = (patientId) => {
    const patient = patients.find((p) => p.id === patientId) || { name: "Patient", id: patientId, riskLevel: "LOW" };
    const id = `REP-${Math.floor(500 + Math.random() * 500)}`;
    const newRep = {
      id,
      patientId,
      patientName: patient.name,
      type: "AI Telemetry & Risk Summary",
      generatedDate: new Date().toISOString().split("T")[0],
      status: "Ready",
      riskLevel: patient.riskLevel || "MODERATE",
      format: "PDF (Digital Signed)",
      summary: `Automated AI risk trajectory and multi-vital analysis for ${patient.name}.`,
      author: "VITALTRACK Automated Engine",
      size: "1.9 MB"
    };
    setReports((prev) => [newRep, ...prev]);
    return newRep;
  };

  return (
    <DataContext.Provider
      value={{
        patients,
        alerts,
        doctors,
        devices,
        appointments,
        reports,
        acknowledgeAlert,
        resolveAlert,
        addPatient,
        updatePatient,
        addDoctor,
        addDevice,
        toggleDeviceConnection,
        syncDevice,
        addDoctorNote,
        addAppointment,
        generateReportForPatient
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
