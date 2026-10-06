import {
  Edit3,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

function getRoleName(role) {
  if (!role) return "";

  return typeof role.role_name === "object"
    ? role.role_name?.name || ""
    : role.role_name || "";
}

export default function RoleList({
  roles,
  searchTerm,
  setSearchTerm,
  loading,
  onEdit,
  onDelete,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header padding py-5 se py-4 kar di hai taaki upar/neeche ki extra space kam ho jaye */}
      <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Role directory
            </h3>

            <p className="mt-0.5 text-xs text-slate-500">
              View, search, edit and delete roles.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search by role name or ID"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-10 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() =>
                  setSearchTerm("")
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-200"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <RoleSkeleton />
      ) : roles.length > 0 ? (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                    No.
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                    Role
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                    Role ID
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {roles.map((role, index) => (
                  <tr
                    key={role.role_id}
                    className="transition hover:bg-indigo-50/40"
                  >
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                          <ShieldCheck size={19} />
                        </div>

                        <div>
                          <p className="font-semibold capitalize text-slate-800">
                            {getRoleName(role)}
                          </p>

                          <p className="text-xs text-slate-400">
                            System access role
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                        #{role.role_id}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Available
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            onEdit(role)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          <Edit3 size={16} />
                        </button>

                        <button
                          onClick={() =>
                            onDelete(role)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-slate-100 md:hidden">
            {roles.map((role, index) => (
              <div
                key={role.role_id}
                className="p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <ShieldCheck size={20} />
                    </div>

                    <div>
                      <p className="font-semibold capitalize text-slate-800">
                        {getRoleName(role)}
                      </p>

                      <p className="text-xs text-slate-500">
                        #{role.role_id} · Role{" "}
                        {index + 1}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Available
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() =>
                      onEdit(role)
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600"
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      onDelete(role)
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          searchTerm={searchTerm}
        />
      )}
    </section>
  );
}

function RoleSkeleton() {
  return (
    <div className="animate-pulse p-6">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="mb-4 flex items-center gap-4"
        >
          <div className="h-10 w-10 rounded-xl bg-slate-200" />

          <div className="flex-1">
            <div className="h-4 w-36 rounded bg-slate-200" />
            <div className="mt-2 h-3 w-24 rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ searchTerm }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <Search
        size={28}
        className="text-slate-300"
      />

      <h3 className="mt-4 font-bold text-slate-800">
        No roles found
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        {searchTerm
          ? `No role matches "${searchTerm}".`
          : "Add your first role."}
      </p>
    </div>
  );
}