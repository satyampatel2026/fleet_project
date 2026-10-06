import {
  Activity,
  BarChart3,
  CalendarDays,
  Loader2,
  RefreshCw,
} from "lucide-react";

export default function DashboardHeader({
  refreshing,
  lastUpdated,
  onRefresh,
}) {
  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());

  const formattedTime = lastUpdated
    ? new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(lastUpdated)
    : "Just now";

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-5 py-4 border border-slate-800 shadow-sm">
      <div className="relative flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-white/10 bg-white/10 p-2 text-indigo-400">
            <BarChart3 size={20} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
                Admin Control Panel
              </span>
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
              Fleet Overview
            </h3>

            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1 rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[14px]">
                <CalendarDays size={12} className="text-slate-400" />
                {formattedDate}
              </span>

              <span className="inline-flex items-center gap-1 rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[14px]">
                <Activity size={12} className="text-indigo-400" />
                Synced: {formattedTime}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-white/20 active:scale-95 disabled:opacity-60 cursor-pointer"
        >
          {refreshing ? (
            <Loader2 size={14} className="animate-spin text-indigo-300" />
          ) : (
            <RefreshCw size={14} className="text-indigo-300" />
          )}
          Refresh Data
        </button>
      </div>
    </section>
  );
}