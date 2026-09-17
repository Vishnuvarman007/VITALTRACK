import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ToastProvider } from "./context/ToastContext";
import { DataProvider } from "./context/DataContext";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Delegate Pages
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";
import Alerts from "./pages/Alerts";
import HealthTrends from "./pages/HealthTrends";
import Reports from "./pages/Reports";
import Doctors from "./pages/Doctors";
import Assistant from "./pages/Assistant";

// Doctor Pages
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorPatients from "./pages/DoctorPatients";
import DoctorPatientDetails from "./pages/DoctorPatientDetails";
import Appointments from "./pages/Appointments";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import AdminPatients from "./pages/AdminPatients";
import AdminDoctors from "./pages/AdminDoctors";
import Devices from "./pages/Devices";
import AdminAlerts from "./pages/AdminAlerts";

// Common Pages
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Privacy from "./pages/Privacy";
import Notifications from "./pages/Notifications";

// Components
import Sidebar from "./components/Sidebar";
import TopHeader from "./components/TopHeader";
import MobileNavigation from "./components/MobileNavigation";
import ChatAssistant from "./components/ChatAssistant";

// Layout wrapper for authenticated pages
function AuthenticatedLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen pb-16 lg:pb-0">
        <TopHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          searchQuery={searchQuery}
          onSearchQuery={setSearchQuery}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      <MobileNavigation />
      <ChatAssistant />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <DataProvider>
            <ToastProvider>
              <BrowserRouter>
                <Routes>
                  {/* Public Pages */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Healthcare Delegate Routes */}
                  <Route path="/dashboard" element={<AuthenticatedLayout><Dashboard /></AuthenticatedLayout>} />
                  <Route path="/patients" element={<AuthenticatedLayout><Patients /></AuthenticatedLayout>} />
                  <Route path="/patients/:id" element={<AuthenticatedLayout><PatientDetails /></AuthenticatedLayout>} />
                  <Route path="/alerts" element={<AuthenticatedLayout><Alerts /></AuthenticatedLayout>} />
                  <Route path="/health-trends" element={<AuthenticatedLayout><HealthTrends /></AuthenticatedLayout>} />
                  <Route path="/reports" element={<AuthenticatedLayout><Reports /></AuthenticatedLayout>} />
                  <Route path="/doctors" element={<AuthenticatedLayout><Doctors /></AuthenticatedLayout>} />
                  <Route path="/assistant" element={<AuthenticatedLayout><Assistant /></AuthenticatedLayout>} />

                  {/* Doctor Routes */}
                  <Route path="/doctor-dashboard" element={<AuthenticatedLayout><DoctorDashboard /></AuthenticatedLayout>} />
                  <Route path="/doctor/patients" element={<AuthenticatedLayout><DoctorPatients /></AuthenticatedLayout>} />
                  <Route path="/doctor/patients/:id" element={<AuthenticatedLayout><DoctorPatientDetails /></AuthenticatedLayout>} />
                  <Route path="/doctor/appointments" element={<AuthenticatedLayout><Appointments /></AuthenticatedLayout>} />
                  <Route path="/doctor/alerts" element={<AuthenticatedLayout><Alerts /></AuthenticatedLayout>} />

                  {/* Admin Routes */}
                  <Route path="/admin-dashboard" element={<AuthenticatedLayout><AdminDashboard /></AuthenticatedLayout>} />
                  <Route path="/admin/users" element={<AuthenticatedLayout><Users /></AuthenticatedLayout>} />
                  <Route path="/admin/patients" element={<AuthenticatedLayout><AdminPatients /></AuthenticatedLayout>} />
                  <Route path="/admin/doctors" element={<AuthenticatedLayout><AdminDoctors /></AuthenticatedLayout>} />
                  <Route path="/admin/devices" element={<AuthenticatedLayout><Devices /></AuthenticatedLayout>} />
                  <Route path="/admin/alerts" element={<AuthenticatedLayout><AdminAlerts /></AuthenticatedLayout>} />

                  {/* Common Authenticated Routes */}
                  <Route path="/profile" element={<AuthenticatedLayout><Profile /></AuthenticatedLayout>} />
                  <Route path="/settings" element={<AuthenticatedLayout><Settings /></AuthenticatedLayout>} />
                  <Route path="/privacy" element={<AuthenticatedLayout><Privacy /></AuthenticatedLayout>} />
                  <Route path="/notifications" element={<AuthenticatedLayout><Notifications /></AuthenticatedLayout>} />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </BrowserRouter>
            </ToastProvider>
          </DataProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
