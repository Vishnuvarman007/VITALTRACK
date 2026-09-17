import { INITIAL_ALERTS } from "../data/alerts";

const STORAGE_KEY = "vitaltrack_alerts_db";

export const alertService = {
  getAll: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ALERTS));
      return INITIAL_ALERTS;
    } catch {
      return INITIAL_ALERTS;
    }
  },

  acknowledge: (alertId) => {
    const alerts = alertService.getAll();
    const updated = alerts.map((a) =>
      a.id === alertId ? { ...a, acknowledged: true, status: "Read" } : a
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  resolve: (alertId) => {
    const alerts = alertService.getAll();
    const updated = alerts.map((a) =>
      a.id === alertId ? { ...a, type: "RESOLVED", acknowledged: true, status: "Resolved" } : a
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }
};
