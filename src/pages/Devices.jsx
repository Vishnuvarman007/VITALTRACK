import React, { useState } from "react";
import { Cpu, Plus, Search, Wifi, WifiOff, Battery, RefreshCw, CheckCircle2 } from "lucide-react";
import DeviceCard from "../components/DeviceCard";
import Modal from "../components/Modal";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";

export default function Devices() {
  const { devices, patients, addDevice, toggleDeviceConnection, syncDevice } = useData();
  const { addToast } = useToast();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newDevice, setNewDevice] = useState({
    model: "VitalSense BLE Sensor 4K",
    type: "Glucose Monitor",
    patientId: patients[0]?.id || "VT-1024",
    telemetryRate: "5 min interval"
  });

  const filtered = devices.filter((d) => {
    const matchesSearch =
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.type.toLowerCase().includes(search.toLowerCase()) ||
      d.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      d.model.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === "ALL" || d.type.includes(typeFilter);
    const matchesStatus = statusFilter === "ALL" || d.connection === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleRegisterDevice = (e) => {
    e.preventDefault();
    const patient = patients.find((p) => p.id === newDevice.patientId);
    const created = addDevice({
      ...newDevice,
      patientName: patient?.name || "Unassigned"
    });
    addToast(`IoT Node ${created.id} registered and connected.`, "success");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              IoT Telemetry Fleet Monitoring
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
              {devices.filter((d) => d.connection === "Connected").length} Active Nodes
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Wireless continuous glucometers, optical pulse oximeters, smart bands, and oscillometric blood pressure monitors.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Device</span>
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-80 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by device ID, model, or patient..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
          >
            <option value="ALL">All Device Types</option>
            <option value="Glucose">Glucose Monitor</option>
            <option value="Oximeter">Pulse Oximeter</option>
            <option value="Blood Pressure">Blood Pressure Monitor</option>
            <option value="Smart Health Band">Smart Health Band</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="Connected">Connected</option>
            <option value="Disconnected">Disconnected</option>
            <option value="Syncing">Syncing</option>
          </select>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onToggleConnection={toggleDeviceConnection}
            onSync={syncDevice}
          />
        ))}
      </div>

      {/* Register Device Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Provision IoT Health Monitoring Device"
        subtitle="Pair medical hardware node with patient telemetry stream"
      >
        <form onSubmit={handleRegisterDevice} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Device Type *
            </label>
            <select
              value={newDevice.type}
              onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
            >
              <option value="Glucose Monitor">Glucose Monitor (CGM)</option>
              <option value="Pulse Oximeter">Pulse Oximeter (SpO₂)</option>
              <option value="Blood Pressure Monitor">Blood Pressure Monitor (Cuff)</option>
              <option value="Smart Health Band">Smart Health Band (PPG)</option>
              <option value="Smart Thermometer">Smart Thermometer (IR)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Device Model Name *
            </label>
            <input
              type="text"
              required
              value={newDevice.model}
              onChange={(e) => setNewDevice({ ...newDevice, model: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Assign to Patient *
            </label>
            <select
              value={newDevice.patientId}
              onChange={(e) => setNewDevice({ ...newDevice, patientId: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold"
            >
              Register & Connect
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
