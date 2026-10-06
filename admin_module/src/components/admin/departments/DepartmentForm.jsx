import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Building2, Loader2, Plus } from "lucide-react";
import { departmentValidationSchema } from "../../../validations/departmentValidation";

export default function DepartmentForm({ departments, onAdd }) {
  const formik = useFormik({
    initialValues: {
      department_name: "",
    },
    validationSchema: departmentValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const name = values.department_name.trim();

        const exists = departments.some(
          (department) =>
            department.department_name?.toLowerCase() === name.toLowerCase()
        );

        if (exists) {
          helpers.setFieldError(
            "department_name",
            "This department already exists"
          );
          return;
        }

        await onAdd(name);
        helpers.resetForm();

        await Swal.fire({
          icon: "success",
          title: "Department added",
          text: `"${name}" has been added successfully.`,
          timer: 1700,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Department not added",
          text: error.message,
        });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  const hasError = formik.touched.department_name && formik.errors.department_name;

  return (
    <section className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Plus size={22} />
        </div>

        <h3 className="text-lg font-bold text-slate-900">Add department</h3>

        <p className="mt-1 text-sm text-slate-500">
          Add a unique department to your organization.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} noValidate>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Department name
        </label>

        <div className="relative">
          <Building2
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            name="department_name"
            placeholder="Example: Operations"
            value={formik.values.department_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:ring-4 ${
              hasError
                ? "border-red-400 focus:ring-red-100"
                : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />
        </div>

        {hasError && (
          <p className="mt-2 text-xs font-medium text-red-600">
            {formik.errors.department_name}
          </p>
        )}

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {formik.isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Adding department...
            </>
          ) : (
            <>
              <Plus size={18} />
              Add department
            </>
          )}
        </button>
      </form>
    </section>
  );
}