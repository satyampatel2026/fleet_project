import DashboardHeader from "../../components/admin/dashboard/DashboardHeader";
import DashboardSummary from "../../components/admin/dashboard/DashboardSummary";
import DashboardStats from "../../components/admin/dashboard/DashboardStats";
import SystemStatus from "../../components/admin/dashboard/SystemStatus";
import DashboardBottomInfo from "../../components/admin/dashboard/DashboardBottomInfo";

import useDashboard from "../../hooks/useDashboard";

export default function AdminDashboard() {
  const {
    users,
    partners,
    vehicles,
    drivers,
    workshops,
    loading,
    refreshing,
    lastUpdated,
    loadDashboard,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-4 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-4">
        
        {/* Header */}
        <DashboardHeader
          refreshing={refreshing}
          lastUpdated={lastUpdated}
          onRefresh={() => loadDashboard(true)}
        />

        {/* Summary & System Status */}
        <section className="grid gap-4 lg:grid-cols-[2fr_1fr] items-start">
          <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-4 sm:p-5">
            <DashboardSummary
              users={users}
              vehicles={vehicles}
              partners={partners}
              workshops={workshops}
              loading={loading}
            />
          </div>

          <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-4 sm:p-5">
            <SystemStatus
              lastUpdated={lastUpdated}
            />
          </div>
        </section>

        {/* Platform Statistics */}
        <section className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold tracking-tight text-slate-900">
              Platform Statistics
            </h2>
            <p className="text-xs text-slate-500">
              Key operational metrics and real-time performance indicators for the fleet management system.
            </p>
          </div>

          <DashboardStats
            users={users}
            partners={partners}
            vehicles={vehicles}
            drivers={drivers}
            workshops={workshops}
            loading={loading}
          />

          <div className="pt-2">
            <DashboardBottomInfo />
          </div>
        </section>
        
      </div>
    </div>
  );
}