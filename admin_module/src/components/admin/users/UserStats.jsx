import {
  BadgeCheck,
  Search,
  UserRound,
  UsersRound,
} from "lucide-react";

export default function UserStats({
  users,
  filteredUsers,
}) {
  const activeUsers = users.filter(
    (user) => user.status !== "inactive"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "inactive"
  ).length;

  const cards = [
    {
      label: "Total users",
      value: users.length,
      text: "Registered accounts",
      icon: <UsersRound size={22} />,
      iconClass: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Active users",
      value: activeUsers,
      text: "Currently enabled",
      icon: <BadgeCheck size={22} />,
      iconClass: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Inactive users",
      value: inactiveUsers,
      text: "Currently disabled",
      icon: <UserRound size={22} />,
      iconClass: "bg-red-50 text-red-600",
    },
    {
      label: "Visible results",
      value: filteredUsers.length,
      text: "After applied filters",
      icon: <Search size={22} />,
      iconClass: "bg-cyan-50 text-cyan-600",
    },
  ];

  return (
    <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {card.label}
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {card.value}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {card.text}
              </p>
            </div>

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconClass}`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}