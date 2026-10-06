import { Layers3, Search, Sparkles } from "lucide-react";

export default function DepartmentStats({
  departments,
  filteredDepartments,
  searchTerm,
}) {
  const latestDepartment =
    departments.length > 0
      ? departments[departments.length - 1].department_name
      : "No department";

  const cards = [
    {
      label: "Total departments",
      value: departments.length,
      description: "Active system entries",
      icon: <Layers3 size={20} />,
      iconClass: "bg-blue-50 text-blue-600",
    },
    {
      label: "Search results",
      value: filteredDepartments.length,
      description: searchTerm ? "Matching search query" : "All departments shown",
      icon: <Search size={20} />,
      iconClass: "bg-cyan-50 text-cyan-600",
    },
    {
      label: "Latest department",
      value: latestDepartment,
      description: "Recently added entry",
      icon: <Sparkles size={20} />,
      iconClass: "bg-amber-50 text-amber-600",
      isText: true,
    },
  ];

  return (
    <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md sm:p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {card.label}
              </p>

              <p
                className={`mt-1 truncate font-bold text-slate-900 ${
                  card.isText ? "text-lg capitalize" : "text-2xl"
                }`}
              >
                {card.value}
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                {card.description}
              </p>
            </div>

            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${card.iconClass}`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}