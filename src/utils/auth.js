export const DEMO_CREDENTIALS = {
  delegate: {
    email: "delegate@vitaltrack.com",
    password: "demo123",
    name: "Sowmya Krishnan",
    role: "Healthcare Delegate",
    rolePath: "/dashboard",
    location: "Chennai Command Center",
    phone: "+91 94440 12345",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  doctor: {
    email: "doctor@vitaltrack.com",
    password: "demo123",
    name: "Dr. Arun Kumar",
    role: "Doctor",
    rolePath: "/doctor-dashboard",
    location: "Apollo Heart Centre, Chennai",
    phone: "+91 98401 23456",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
  },
  admin: {
    email: "admin@vitaltrack.com",
    password: "demo123",
    name: "Dr. V. Ramanathan",
    role: "Administrator",
    rolePath: "/admin-dashboard",
    location: "VITALTRACK Healthcare Cloud Hub",
    phone: "+91 98840 99999",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  }
};

export const AUTH_STORAGE_KEY = "vitaltrack_auth_session";

export const getSavedSession = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Failed to read session", e);
    return null;
  }
};

export const saveSession = (session) => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
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
