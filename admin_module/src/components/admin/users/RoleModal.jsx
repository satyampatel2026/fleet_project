// src/components/admin/users/RoleModal.jsx

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";

import {
  Loader2,
  Plus,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

import { roleSchema } from "../../../validations/userValidation";

import {
  getRoles,
  getUserRoles,
  assignUserRole,
  removeUserRole,
} from "../../../services/userService";

export default function RoleModal({
  user,
  onClose,
  onChange,
}) {
  const [roles, setRoles] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  async function loadRoles() {
    try {
      setLoading(true);

      const [allRoles, assignedRoles] =
        await Promise.all([
          getRoles(),
          getUserRoles(user.user_id),
        ]);

      setRoles(allRoles);
      setUserRoles(assignedRoles);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Unable to load roles",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRoles();
  }, [user.user_id]);

  const formik = useFormik({
    initialValues: {
      role_id: "",
    },

    validationSchema: roleSchema,

    onSubmit: async (values, helpers) => {
      try {
        const exists = userRoles.some(
          (role) =>
            String(role.role_id) ===
            String(values.role_id)
        );

        if (exists) {
          helpers.setFieldError(
            "role_id",
            "This role is already assigned"
          );
          return;
        }

        await assignUserRole(
          user.user_id,
          values.role_id
        );

        helpers.resetForm();

        await loadRoles();
        await onChange?.();

        Swal.fire({
          icon: "success",
          title: "Role assigned",
          timer: 1400,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Role not assigned",
          text: error.message,
        });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  async function removeRole(role) {
    const result = await Swal.fire({
      icon: "warning",
      title: "Remove this role?",
      text: `Remove ${role.role_name} from ${user.full_name}?`,
      showCancelButton: true,
      confirmButtonText: "Remove role",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      setRemovingId(role.role_id);

      await removeUserRole(
        user.user_id,
        role.role_id
      );

      await loadRoles();
      await onChange?.();

      Swal.fire({
        icon: "success",
        title: "Role removed",
        timer: 1300,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Role not removed",
        text: error.message,
      });
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget)
          onClose();
      }}
    >
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200/80">
        {/* Compact Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 bg-indigo-50/70 px-5 py-3.5">
          <div>
            <h2 className="text-[25px] font-bold text-slate-900">
              Manage Roles
            </h2>

            <p className="text-[14px] text-slate-500">
              {user.full_name}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-white hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2
                size={26}
                className="animate-spin text-indigo-600"
              />
            </div>
          ) : (
            <>
              {/* Assign Role Form */}
              <form
                onSubmit={formik.handleSubmit}
                className="grid gap-3 sm:grid-cols-[1fr_auto] items-start"
              >
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">
                    Assign a role
                  </label>

                  <select
                    name="role_id"
                    value={formik.values.role_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                  >
                    <option value="">
                      Select role
                    </option>

                    {roles.map((role) => (
                      <option
                        key={role.role_id}
                        value={role.role_id}
                      >
                        {role.role_name}
                      </option>
                    ))}
                  </select>

                  {formik.touched.role_id &&
                    formik.errors.role_id && (
                      <p className="mt-1 text-[11px] text-red-600">
                        {formik.errors.role_id}
                      </p>
                    )}
                </div>

                <div className="flex items-end sm:pt-5">
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-60 cursor-pointer"
                  >
                    {formik.isSubmitting ? (
                      <Loader2
                        size={15}
                        className="animate-spin"
                      />
                    ) : (
                      <Plus size={15} />
                    )}

                    Assign role
                  </button>
                </div>
              </form>

              {/* Assigned Roles List */}
              <div className="mt-5 border-t border-slate-200/80 pt-4">
                <h3 className="text-[11px] font-semibold text-slate-600">
                  Assigned Roles ({userRoles.length})
                </h3>

                <div className="mt-2.5 space-y-2 max-h-48 overflow-y-auto pr-1">
                  {userRoles.length ? (
                    userRoles.map((role) => (
                      <div
                        key={role.role_id}
                        className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2.5 text-xs transition-colors hover:bg-white"
                      >
                        <div className="flex items-center gap-2">
                          <ShieldCheck
                            size={18}
                            className="text-indigo-600"
                          />

                          <span className="font-semibold text-slate-800">
                            {role.role_name}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeRole(role)
                          }
                          disabled={
                            removingId === role.role_id
                          }
                          className="inline-flex items-center gap-1 rounded-lg bg-red-50 border border-red-200/60 px-2.5 py-1 text-[11px] font-semibold text-red-600 transition-colors hover:bg-red-100 disabled:opacity-60 cursor-pointer"
                        >
                          {removingId ===
                          role.role_id ? (
                            <Loader2
                              size={13}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={13} />
                          )}

                          Remove
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-500 bg-slate-50/50">
                      No roles assigned yet
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}