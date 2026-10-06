import { Search, X } from "lucide-react";

export default function UserFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  departmentFilter,
  setDepartmentFilter,
  departments,
}) {
  return (
    <div className="border-b border-slate-200 p-5 sm:p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900">
          User directory
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Search, filter, edit, delete and assign roles.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search name, email, mobile or ID"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-200"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <select
          value={departmentFilter}
          onChange={(event) =>
            setDepartmentFilter(event.target.value)
          }
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        >
          <option value="all">
            All departments
          </option>

          {departments.map((department) => (
            <option
              key={department.department_id}
              value={department.department_id}
            >
              {department.department_name}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        >
          <option value="all">
            All statuses
          </option>

          <option value="active">
            Active users
          </option>

          <option value="inactive">
            Inactive users
          </option>
        </select>
      </div>
    </div>
  );
}