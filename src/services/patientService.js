import { INITIAL_PATIENTS } from "../data/patients";

const STORAGE_KEY = "vitaltrack_patients_db";

export const patientService = {
  getAll: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PATIENTS));
      return INITIAL_PATIENTS;
    } catch {
      return INITIAL_PATIENTS;
    }
  },

  getById: (id) => {
    const list = patientService.getAll();
    return list.find((p) => p.id === id) || null;
  },

  update: (id, updates) => {
    const list = patientService.getAll();
    const updatedList = list.map((p) => (p.id === id ? { ...p, ...updates } : p));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    return updatedList.find((p) => p.id === id);
  },

  add: (newPatient) => {
    const list = patientService.getAll();
    const created = {
      ...newPatient,
      id: newPatient.id || `VT-${Math.floor(1000 + Math.random() * 9000)}`,
      lastUpdated: "Just now",
      monitoringStatus: "Active"
    };
    const updated = [created, ...list];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return created;
  }
};
