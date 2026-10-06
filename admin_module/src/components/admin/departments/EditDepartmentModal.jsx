import { useFormik } from "formik";
import Swal from "sweetalert2";

import {
  Building2,
  Edit3,
  Loader2,
  X,
} from "lucide-react";

import {
  departmentValidationSchema,
} from "../../../validations/departmentValidation";

export default function EditDepartmentModal({
  department,
  departments,
  onUpdate,
  onClose,
}) {
  const formik = useFormik({
    initialValues: {
      department_name:
        department.department_name || "",
    },

    validationSchema:
      departmentValidationSchema,

    onSubmit: async (values, helpers) => {
      try {
        const name =
          values.department_name.trim();

        const exists = departments.some(
          (item) =>
            item.department_id !==
              department.department_id &&
            item.department_name
              ?.toLowerCase() ===
              name.toLowerCase()
        );

        if (exists) {
          helpers.setFieldError(
            "department_name",
            "This department already exists"
          );
          return;
        }

        await onUpdate(
          department.department_id,
          name
        );

        await Swal.fire({
          icon: "success",
          title: "Department updated",
          timer: 1600,
          showConfirmButton: false,
        });

        onClose();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Department not updated",
          text: error.message,
        });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  const error =
    formik.touched.department_name &&
    formik.errors.department_name;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600 p-2.5 text-white">
              <Edit3 size={19} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Edit department
              </h2>

              <p className="text-xs text-slate-500">
                Department ID: #
                {
                  department.department_id
                }
              </p>
            </div>
          </div>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="p-6"
        >
          <label className="mb-2 block text-sm font-semibold">
            Department name
          </label>

          <div className="relative">
            <Building2
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              name="department_name"
              autoFocus
              value={
                formik.values
                  .department_name
              }
              onChange={
                formik.handleChange
              }
              onBlur={formik.handleBlur}
              className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:ring-4 ${
                error
                  ? "border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />
          </div>

          {error && (
            <p className="mt-2 text-xs text-red-600">
              {
                formik.errors
                  .department_name
              }
            </p>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-4 py-2.5 text-sm font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                formik.isSubmitting
              }
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              {formik.isSubmitting ? (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <Edit3 size={16} />
              )}

              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}