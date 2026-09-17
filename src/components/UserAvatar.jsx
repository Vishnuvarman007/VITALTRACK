import React from "react";
import { User, Stethoscope, ShieldCheck, Activity, Heart, Wind, Droplet } from "lucide-react";

export function getInitials(name) {
  if (!name) return "VT";
  const cleaned = name.replace(/^Dr\.\s*|^Dr\s+/i, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "VT";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function UserAvatar({
  name = "User",
  role = "",
  size = "md",
  showIcon = false,
  className = ""
}) {
  const initials = getInitials(name);
  const lowerRole = (role || "").toLowerCase();
  const lowerName = (name || "").toLowerCase();

  // Specialty / role matching
  const isCardio = lowerRole.includes("cardio");
  const isPulmo = lowerRole.includes("pulmo") || lowerRole.includes("respiratory");
  const isEndo = lowerRole.includes("endo") || lowerRole.includes("diabet");
  const isHemat = lowerRole.includes("hemat") || lowerRole.includes("nephro");
  const isAdmin = lowerRole.includes("admin") || lowerName.includes("admin");
  const isDoctor = lowerRole.includes("doctor") || lowerName.startsWith("dr") || lowerRole.includes("physician") || lowerRole.includes("surgeon");

  let gradientClass = "from-sky-500 via-sky-600 to-indigo-600 text-white shadow-sky-500/20";
  let IconComponent = User;

  if (isAdmin) {
    gradientClass = "from-purple-600 via-indigo-600 to-indigo-700 text-white shadow-purple-500/20";
    IconComponent = ShieldCheck;
  } else if (isCardio) {
    gradientClass = "from-rose-500 via-red-500 to-rose-600 text-white shadow-rose-500/20";
    IconComponent = Heart;
  } else if (isPulmo) {
    gradientClass = "from-cyan-500 via-sky-500 to-blue-600 text-white shadow-cyan-500/20";
    IconComponent = Wind;
  } else if (isEndo) {
    gradientClass = "from-amber-500 via-orange-500 to-emerald-600 text-white shadow-amber-500/20";
    IconComponent = Activity;
  } else if (isHemat) {
    gradientClass = "from-teal-600 via-teal-700 to-emerald-700 text-white shadow-teal-500/20";
    IconComponent = Droplet;
  } else if (isDoctor) {
    gradientClass = "from-teal-600 via-emerald-600 to-teal-700 text-white shadow-teal-500/20";
    IconComponent = Stethoscope;
  }

  const sizeClasses = {
    xs: "w-7 h-7 text-[10px] rounded-lg",
    sm: "w-8 h-8 text-xs rounded-xl",
    md: "w-9 h-9 text-xs rounded-xl",
    lg: "w-14 h-14 text-base rounded-2xl",
    xl: "w-20 h-20 text-xl rounded-3xl"
  };

  const iconSizes = {
    xs: "w-3 h-3 mb-0.5",
    sm: "w-3.5 h-3.5 mb-0.5",
    md: "w-4 h-4 mb-0.5",
    lg: "w-5 h-5 mb-1",
    xl: "w-8 h-8 mb-1"
  };

  const chosenSize = sizeClasses[size] || sizeClasses.md;
  const chosenIconSize = iconSizes[size] || iconSizes.md;

  return (
    <div
      className={`inline-flex flex-col items-center justify-center font-black tracking-wider uppercase font-mono select-none bg-gradient-to-tr ${gradientClass} shadow-md flex-shrink-0 ${chosenSize} ${className}`}
      aria-label={name}
      title={`${name} (${role || "User"})`}
    >
      {showIcon && <IconComponent className={chosenIconSize} />}
      <span>{initials}</span>
    </div>
  );
}
