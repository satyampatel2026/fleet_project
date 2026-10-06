import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Edit3, Loader2, ShieldCheck, X } from "lucide-react";
import { roleValidationSchema } from "../../../validations/roleValidation";

function getRoleName(role) {
  if (!role) return "";
  return typeof role.role_name === "object"
    ? role.role_name?.name || ""
    : role.role_name || "";
}

export default function EditRoleModal({
  role,
  roles,
  onUpdate,
  onClose,
}) {
  const formik = useFormik({
    initialValues: {
      role_name: getRoleName(role),
    },
    validationSchema: roleValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const name = values.role_name.trim();

        const exists = roles.some(
          (item) =>
            item.role_id !== role.role_id &&
            getRoleName(item).toLowerCase() === name.toLowerCase()
        );

        if (exists) {
          helpers.setFieldError(
            "role_name",
            "This role already exists"
          );
          return;
        }

        await onUpdate(role.role_id, name);

        await Swal.fire({
          icon: "success",
          title: "Role updated",
          timer: 1600,
          showConfirmButton: false,
        });

        onClose();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Role not updated",
          text: error.message,
        });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  const error = formik.touched.role_name && formik.errors.role_name;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header - Py-4 karke vertical space kam kiya */}
        <div className="flex items-center justify-between border-b bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-600 p-2 text-white">
              <Edit3 size={18} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Edit role</h2>
              <p className="text-xs text-slate-500">
                Role ID: #{role.role_id}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form - p-5 karke inner spacing balance ki */}
        <form
          onSubmit={formik.handleSubmit}
          className="p-5"
          noValidate
        >
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">
            Role name
          </label>

          <div className="relative">
            <ShieldCheck
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              name="role_name"
              autoFocus
              value={formik.values.role_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full rounded-xl border bg-slate-50 py-2.5 pl-11 pr-4 text-sm outline-none focus:ring-4 ${
                error
                  ? "border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            />
          </div>

          {error && (
            <p className="mt-1.5 text-xs text-red-600">
              {formik.errors.role_name}
            </p>
          )}

          {/* Footer buttons margin mt-5 kiya */}
          <div className="mt-5 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {formik.isSubmitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Edit3 size={15} />
              )}
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}