import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { Building2, RefreshCw } from "lucide-react";
import useDepartments from "../../hooks/useDepartments";
import DepartmentStats from "../../components/admin/departments/DepartmentStats";
import DepartmentForm from "../../components/admin/departments/DepartmentForm";
import DepartmentList from "../../components/admin/departments/DepartmentList";
import EditDepartmentModal from "../../components/admin/departments/EditDepartmentModal";

export default function Department() {
  const {
    departments,
    loading,
    refreshing,
    loadDepartments,
    createDepartment,
    editDepartment,
    removeDepartment,
  } = useDepartments();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const filteredDepartments = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) return departments;

    return departments.filter(
      (department) =>
        department.department_name?.toLowerCase().includes(keyword) ||
        String(department.department_id).includes(keyword)
    );
  }, [departments, searchTerm]);

  async function handleDelete(department) {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete this department?",
      html: `Delete <strong>${department.department_name}</strong>?<br/>This action cannot be undone.`,
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      await removeDepartment(department.department_id);
      await Swal.fire({
        icon: "success",
        title: "Department deleted",
        timer: 1600,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Department not deleted",
        text: error.message,
      });
    }
  }

  return (
    <div className="min-h-screen bg-slate-100/70 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <section className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 px-6 py-6 shadow-sm sm:px-8">
          <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-md">
                <Building2 size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-100">
                  Organization Setup
                </p>
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  Departments
                </h3>
                <p className="text-xs text-blue-100 sm:text-sm">
                  Create and manage departments for your fleet management organization.
                </p>
              </div>
            </div>

            <button
              onClick={() => loadDepartments(true)}
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
        <DepartmentStats
          departments={departments}
          filteredDepartments={filteredDepartments}
          searchTerm={searchTerm}
        />

        {/* Form and List Layout */}
        <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <DepartmentForm
            departments={departments}
            onAdd={createDepartment}
          />

          <DepartmentList
            departments={filteredDepartments}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            loading={loading}
            onEdit={setSelectedDepartment}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Edit Modal */}
      {selectedDepartment && (
        <EditDepartmentModal
          department={selectedDepartment}
          departments={departments}
          onUpdate={editDepartment}
          onClose={() => setSelectedDepartment(null)}
        />
      )}
    </div>
  );
}