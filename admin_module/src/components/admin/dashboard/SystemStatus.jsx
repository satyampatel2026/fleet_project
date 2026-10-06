// src/components/admin/dashboard/SystemStatus.jsx

export default function SystemStatus({
  lastUpdated,
}) {
  const time = lastUpdated
    ? new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(lastUpdated)
    : "Just now";

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
            Health Check
          </span>
          <h4 className="text-sm font-bold tracking-tight text-slate-900 sm:text-base">
            System Status
          </h4>
          <p className="text-[11px] text-slate-500">
            Current dashboard connection
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-200/60">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Online
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <Row
          label="Backend API"
          value="Connected"
          valueColor="text-emerald-600"
        />

        <Row
          label="Dashboard data"
          value="Synchronized"
          valueColor="text-slate-800"
        />

        <Row
          label="Last refresh"
          value={time}
          valueColor="text-slate-800"
        />
      </div>
    </div>
  );
}

function Row({ label, value, valueColor }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 last:border-0 last:pb-0 text-xs">
      <span className="text-slate-500">
        {label}
      </span>

      <span className={`font-semibold ${valueColor}`}>
        {value}
      </span>
    </div>
  );
}