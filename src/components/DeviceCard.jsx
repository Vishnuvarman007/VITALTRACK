import React from "react";
import {
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  BatteryLow,
  RefreshCw,
  Cpu,
  CheckCircle2
} from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function DeviceCard({ device, onToggleConnection, onSync }) {
  const { addToast } = useToast();

  const handleSync = () => {
    if (onSync) onSync(device.id);
    addToast(`Device ${device.id} synchronized telemetry packet.`, "success");
  };

  const handleToggle = () => {
    if (onToggleConnection) onToggleConnection(device.id);
    const newStatus = device.connection === "Connected" ? "Disconnected" : "Connected";
    addToast(`Device ${device.id} status changed to ${newStatus}.`, "info");
  };

  const getBatteryIcon = (pct) => {
    if (pct < 20) return <BatteryLow className="w-4 h-4 text-rose-500" />;
    return <Battery className="w-4 h-4 text-emerald-500" />;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {device.type}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {device.id}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${
              device.connection === "Connected"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                : device.connection === "Syncing"
                ? "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800"
                : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800"
            }`}
          >
            {device.connection === "Connected" ? (
              <Wifi className="w-3 h-3 text-emerald-500" />
            ) : (
              <WifiOff className="w-3 h-3 text-rose-500" />
            )}
            {device.connection}
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-3">
          {device.model}
        </p>

        {/* Assigned patient & Telemetry metadata */}
        <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Assigned Patient:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {device.patientName} ({device.patientId})
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Battery:</span>
            <span className="font-semibold flex items-center gap-1 text-slate-800 dark:text-slate-200">
              {getBatteryIcon(device.battery)}
              {device.battery}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Last Synced:</span>
            <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
              {device.lastSync}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <button
          onClick={handleToggle}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
            device.connection === "Connected"
              ? "border-rose-300 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
              : "border-emerald-300 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
          }`}
        >
          {device.connection === "Connected" ? "Disconnect" : "Connect"}
        </button>

        <button
          onClick={handleSync}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Sync Data</span>
        </button>
      </div>
    </div>
  );
}
