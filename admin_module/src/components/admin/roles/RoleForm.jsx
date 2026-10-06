import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Loader2, Plus, ShieldCheck } from "lucide-react";

import { roleValidationSchema } from "../../../validations/roleValidation";

function getRoleName(role) {
  if (!role) return "";

  return typeof role.role_name === "object"
    ? role.role_name?.name || ""
    : role.role_name || "";
}

export default function RoleForm({
  roles,
  onAdd,
}) {
  const formik = useFormik({
    initialValues: {
      role_name: "",
    },

    validationSchema: roleValidationSchema,

    onSubmit: async (values, helpers) => {
      try {
        const name = values.role_name.trim();

        const exists = roles.some(
          (role) =>
            getRoleName(role).toLowerCase() ===
            name.toLowerCase()
        );

        if (exists) {
          helpers.setFieldError(
            "role_name",
            "This role already exists"
          );
          return;
        }

        await onAdd(name);

        helpers.resetForm();

        await Swal.fire({
          icon: "success",
          title: "Role added",
          text: `"${name}" has been added successfully.`,
          timer: 1700,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Role not added",
          text: error.message,
        });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  const error =
    formik.touched.role_name &&
    formik.errors.role_name;

  return (
    <section className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header spacing kam ki gayi hai */}
      <div className="mb-4">
        <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Plus size={20} />
        </div>

        <h3 className="text-base font-bold text-slate-900">
          Add new role
        </h3>

        <p className="mt-0.5 text-xs text-slate-500">
          Enter a unique role name to add it to the system.
        </p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
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
            placeholder="Example: Fleet Manager"
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
          <p className="mt-1.5 text-xs font-medium text-red-600">
            {formik.errors.role_name}
          </p>
        )}

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {formik.isSubmitting ? (
            <>
              <Loader2
                size={17}
                className="animate-spin"
              />
              Adding role...
            </>
          ) : (
            <>
              <Plus size={17} />
              Add role
            </>
          )}
        </button>
      </form>
    </section>
  );
}