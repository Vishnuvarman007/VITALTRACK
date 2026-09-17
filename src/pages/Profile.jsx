import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Shield, Key, LogOut, CheckCircle2, Save } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState(currentUser?.name || "Sowmya Krishnan");
  const [email, setEmail] = useState(currentUser?.email || "delegate@vitaltrack.com");
  const [phone, setPhone] = useState(currentUser?.phone || "+91 94440 12345");
  const [location, setLocation] = useState(currentUser?.location || "Chennai Command Center");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    addToast("Profile details updated successfully.", "success");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    addToast("Security credentials updated successfully.", "success");
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          User Profile & Credentials
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal information, security authentication keys, and role assignments.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <img
          src={currentUser?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover border-4 border-sky-500/20 shadow-md"
        />
        <div className="text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{name}</h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              {currentUser?.role || "Healthcare Delegate"}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {email} • {location}
          </p>
          <div className="pt-2 flex items-center justify-center sm:justify-start gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Biometric Multi-Factor Authentication Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Edit Information Form */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <User className="w-4 h-4 text-sky-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Personal Information
            </h3>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Primary Telemetry Hub / Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-sky-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Key className="w-4 h-4 text-emerald-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Security Credentials
            </h3>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 8 characters"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-sky-500"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              Password must include at least one uppercase character, one numeric symbol, and one special character.
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-white dark:text-slate-900 font-bold text-xs shadow-sm transition-colors"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
