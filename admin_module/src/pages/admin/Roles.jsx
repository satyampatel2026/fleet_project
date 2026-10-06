import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { RefreshCw, ShieldCheck } from "lucide-react";
import useRoles from "../../hooks/useRoles";
import RoleStats from "../../components/admin/roles/RoleStats";
import RoleForm from "../../components/admin/roles/RoleForm";
import RoleList from "../../components/admin/roles/RoleList";
import EditRoleModal from "../../components/admin/roles/EditRoleModal";

function getRoleName(role) {
  if (!role) return "";
  return typeof role.role_name === "object"
    ? role.role_name?.name || ""
    : role.role_name || "";
}

export default function Roles() {
  const {
    roles,
    loading,
    refreshing,
    loadRoles,
    createRole,
    editRole,
    removeRole,
  } = useRoles();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  const filteredRoles = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) return roles;

    return roles.filter((role) => {
      const name = getRoleName(role).toLowerCase();
      const id = String(role.role_id || "");
      return name.includes(keyword) || id.includes(keyword);
    });
  }, [roles, searchTerm]);

  async function handleDelete(role) {
    const roleName = getRoleName(role);

    const result = await Swal.fire({
      icon: "warning",
      title: "Delete this role?",
      html: `Delete <strong>${roleName}</strong>?<br/>This action cannot be undone.`,
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      await removeRole(role.role_id);
      await Swal.fire({
        icon: "success",
        title: "Role deleted",
        timer: 1600,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Role not deleted",
        text: error.message,
      });
    }
  }

  return (
    <div className="min-h-screen bg-slate-100/70 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <section className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 px-6 py-6 shadow-sm sm:px-8">
          <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-md">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-100">
                  Access Control
                </p>
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  Roles
                </h3>
                <p className="text-xs text-indigo-100 sm:text-sm">
                  Create and manage system roles used across your fleet management platform.
                </p>
              </div>
            </div>

            <button
              onClick={() => loadRoles(true)}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/25 disabled:opacity-60"
            >
              <RefreshCw
                size={16}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>
        </section>

        {/* Stats Component */}
        <RoleStats
          roles={roles}
          filteredRoles={filteredRoles}
          searchTerm={searchTerm}
        />

        {/* Form and List Layout */}
        <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <RoleForm
            roles={roles}
            onAdd={createRole}
          />

          <RoleList
            roles={filteredRoles}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            loading={loading}
            onEdit={setSelectedRole}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Edit Modal */}
      {selectedRole && (
        <EditRoleModal
          role={selectedRole}
          roles={roles}
          onUpdate={editRole}
          onClose={() => setSelectedRole(null)}
        />
      )}
    </div>
  );
}