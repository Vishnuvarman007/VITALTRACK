export const DEMO_CREDENTIALS = {
  delegate: {
    email: "delegate@vitaltrack.com",
    password: "demo123",
    name: "Sowmya Krishnan",
    role: "Healthcare Delegate",
    rolePath: "/dashboard",
    location: "Chennai Command Center",
    phone: "+91 94440 12345"
  },
  doctor: {
    email: "doctor@vitaltrack.com",
    password: "demo123",
    name: "Dr. Arun Kumar",
    role: "Doctor",
    rolePath: "/doctor-dashboard",
    location: "Apollo Heart Centre, Chennai",
    phone: "+91 98401 23456"
  },
  admin: {
    email: "admin@vitaltrack.com",
    password: "demo123",
    name: "Dr. V. Ramanathan",
    role: "Administrator",
    rolePath: "/admin-dashboard",
    location: "VITALTRACK Healthcare Cloud Hub",
    phone: "+91 98840 99999"
  }
};

export const AUTH_STORAGE_KEY = "vitaltrack_auth_session";

export const getSavedSession = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (session && session.avatar) {
      delete session.avatar;
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      } catch (_) {}
    }
    return session;
  } catch (e) {
    console.error("Failed to read session", e);
    return null;
  }
};

export const saveSession = (session) => {
  try {
    const sanitized = session ? { ...session } : null;
    if (sanitized && sanitized.avatar) {
      delete sanitized.avatar;
    }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sanitized));
  } catch (e) {
    console.error("Failed to write session", e);
  }
};

export const clearSession = () => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear session", e);
  }
};
