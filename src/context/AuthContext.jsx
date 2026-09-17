import React, { createContext, useContext, useState, useEffect } from "react";
import { DEMO_CREDENTIALS, getSavedSession, saveSession, clearSession } from "../utils/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = getSavedSession();
    return saved || DEMO_CREDENTIALS.delegate; // Default to demo delegate for immediate ease of exploration
  });

  const login = (email, password, requestedRole) => {
    // Check credentials against demo users
    const matchedKey = Object.keys(DEMO_CREDENTIALS).find((key) => {
      const demo = DEMO_CREDENTIALS[key];
      return (
        demo.email.toLowerCase() === email.toLowerCase() &&
        demo.password === password
      );
    });

    if (matchedKey) {
      const user = { ...DEMO_CREDENTIALS[matchedKey] };
      if (requestedRole) {
        user.role = requestedRole;
        if (requestedRole === "Doctor") user.rolePath = "/doctor-dashboard";
        else if (requestedRole === "Administrator") user.rolePath = "/admin-dashboard";
        else user.rolePath = "/dashboard";
      }
      setCurrentUser(user);
      saveSession(user);
      return { success: true, user };
    }

    // Allow flexible login for evaluation if password is demo123
    if (password === "demo123" || password === "admin123") {
      const role = requestedRole || "Healthcare Delegate";
      const user = {
        email,
        name: email.split("@")[0].replace(".", " ").toUpperCase(),
        role,
        rolePath: role === "Doctor" ? "/doctor-dashboard" : role === "Administrator" ? "/admin-dashboard" : "/dashboard",
        location: "Regional Telemetry Hub",
        phone: "+91 90000 00000",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      };
      setCurrentUser(user);
      saveSession(user);
      return { success: true, user };
    }

    return { success: false, error: "Invalid credentials. Use demo123 with any demo account." };
  };

  const logout = () => {
    setCurrentUser(null);
    clearSession();
  };

  const switchRole = (roleKey) => {
    if (DEMO_CREDENTIALS[roleKey]) {
      const newUser = { ...DEMO_CREDENTIALS[roleKey] };
      setCurrentUser(newUser);
      saveSession(newUser);
      return newUser;
    }
  };

  const isAuthenticated = () => !!currentUser;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        switchRole,
        isAuthenticated,
        role: currentUser?.role || null
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
