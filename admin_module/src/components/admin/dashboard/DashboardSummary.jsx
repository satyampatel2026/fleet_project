// src/components/admin/dashboard/DashboardSummary.jsx

import {
  Car,
  ShieldCheck,
  Users,
  Building2,
} from "lucide-react";

export default function DashboardSummary({
  users,
  vehicles,
  partners,
  workshops,
  loading,
}) {
  const total =
    Number(users || 0) +
    Number(vehicles || 0) +
    Number(partners || 0) +
    Number(workshops || 0);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Top Banner / Total Count Section */}
      <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
            Platform Summary
          </span>

          <h2 className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {loading ? "—" : total.toLocaleString("en-IN")}
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Total resources currently tracked across the system
          </p>
        </div>

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/60 shadow-sm">
          <ShieldCheck size={26} />
        </div>
      </div>

      {/* Sub Metrics Grid */}
      <div className="grid border-t border-slate-200/80 bg-slate-50/70 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
        <Metric
          label="Users"
          value={users}
          icon={<Users size={14} className="text-indigo-600" />}
        />

        <Metric
          label="Fleet Assets"
          value={vehicles}
          icon={<Car size={14} className="text-amber-500" />}
        />

        <Metric
          label="Service Network"
          value={Number(partners || 0) + Number(workshops || 0)}
          icon={<Building2 size={14} className="text-emerald-600" />}
        />
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  icon,
}) {
  return (
    <div className="px-4 py-3.5 transition-colors hover:bg-white/60">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        {icon}
        {label}
      </div>

      <p className="mt-1 text-base font-bold tracking-tight text-slate-900 sm:text-lg">
        {Number(value || 0).toLocaleString("en-IN")}
      </p>
    </div>
  );
}