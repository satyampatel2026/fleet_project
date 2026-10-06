import {
  Car,
  Handshake,
  UserCircle,
  Users,
  Wrench,
} from "lucide-react";

export default function DashboardStats({
  users,
  partners,
  vehicles,
  drivers,
  workshops,
  loading,
}) {
  const cards = [
    { label: "Total Users", value: users, icon: Users, iconBg: "bg-indigo-600 text-white" },
    { label: "Workshop Partners", value: partners, icon: Handshake, iconBg: "bg-emerald-600 text-white" },
    { label: "Total Vehicles", value: vehicles, icon: Car, iconBg: "bg-amber-500 text-white" },
    { label: "Total Drivers", value: drivers, icon: UserCircle, iconBg: "bg-rose-500 text-white" },
    { label: "Workshops", value: workshops, icon: Wrench, iconBg: "bg-violet-600 text-white" },
  ];

  if (loading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-28 animate-pulse rounded-xl border border-slate-200/80 bg-slate-50 p-4" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg shadow-sm ${card.iconBg}`}>
                <Icon size={18} />
              </div>
              <p className="text-xl font-bold tracking-tight text-slate-900">
                {Number(card.value || 0).toLocaleString("en-IN")}
              </p>
            </div>

            <p className="mt-3 text-xs font-medium tracking-wide text-slate-500 uppercase">
              {card.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}