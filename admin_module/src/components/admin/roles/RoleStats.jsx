// src/components/admin/roles/RoleStats.jsx

import {
  Search,
  Sparkles,
  UsersRound,
} from "lucide-react";

function getRoleName(role) {
  if (!role) return "";

  return typeof role.role_name === "object"
    ? role.role_name?.name || ""
    : role.role_name || "";
}

export default function RoleStats({
  roles,
  filteredRoles,
  searchTerm,
}) {
  const latestRole =
    roles.length > 0
      ? getRoleName(roles[roles.length - 1])
      : "No role";

  const cards = [
    {
      label: "Total roles",
      value: roles.length,
      text: "Roles available in system",
      icon: <UsersRound size={18} />,
      className:
        "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Search results",
      value: filteredRoles.length,
      text: searchTerm
        ? "Matching current search"
        : "All roles visible",
      icon: <Search size={18} />,
      className:
        "bg-cyan-50 text-cyan-600",
    },
    {
      label: "Latest role",
      value: latestRole,
      text: "Most recently added",
      icon: <Sparkles size={18} />,
      className:
        "bg-amber-50 text-amber-600",
      isText: true,
    },
  ];

  return (
    // Grid columns ko adjust kiya hai taaki cards bahut zyada stretch na ho
    <section className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          // max-w aur proper spacing se cards professional aur structured lagenge
          className="w-full rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm transition hover:border-slate-300"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {card.label}
              </p>

              <p
                className={`mt-1 truncate font-bold text-slate-900 ${
                  card.isText
                    ? "text-base capitalize"
                    : "text-2xl"
                }`}
              >
                {card.value}
              </p>

              <p className="mt-0.5 text-[11px] text-slate-500">
                {card.text}
              </p>
            </div>

            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${card.className}`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}