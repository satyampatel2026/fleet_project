// src/components/admin/dashboard/DashboardBottomInfo.jsx

import {
  Activity,
  ArrowUpRight,
} from "lucide-react";

export default function DashboardBottomInfo() {
  return (
    <section className="mt-6 grid gap-5 lg:grid-cols-2">
      {/* Dashboard Insight (Compact & Bold Heading) */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-50 p-2 text-cyan-600">
            <Activity size={18} />
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600">
              System Notice
            </span>
            <h3 className="text-base font-bold tracking-tight text-slate-900">
              Live API Status & Sync Info
            </h3>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Currently, the <span className="font-medium text-slate-900">users and Partners count API</span> is active. 
          vehicle, driver, and workshop counts will sync automatically once their respective endpoint URLs are configured.
        </p>
      </div>

      {/* Administrative Control Center (Non-clickable card) */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-5 text-white shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-block rounded-md bg-indigo-500/20 px-2 py-0.5 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
              Fleet Management
            </span>

            <h3 className="mt-2 text-lg font-bold tracking-tight text-white">
              Administrative Control Center
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Manage platform users, verify access roles, monitor departments, and control fleet operations seamlessly.
            </p>
          </div>

          <div className="hidden rounded-xl bg-white/10 p-3 text-indigo-300 sm:block">
            <ArrowUpRight size={22} />
          </div>
        </div>
      </div>
    </section>
  );
}