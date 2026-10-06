// src/components/admin/users/EditUserModal.jsx

import { useFormik } from "formik";
import Swal from "sweetalert2";

import {
  Edit3,
  Loader2,
  Mail,
  UserRound,
  X,
} from "lucide-react";

import {
  editUserSchema,
} from "../../../validations/userValidation";

export default function EditUserModal({
  user,
  users,
  departments,
  onUpdate,
  onClose,
}) {
  const formik = useFormik({
    initialValues: {
      full_name: user.full_name || "",
      email: user.email || "",
      department_id: String(
        user.department_id || ""
      ),
      status:
        user.status === "inactive"
          ? "inactive"
          : "active",
    },

    validationSchema: editUserSchema,

    onSubmit: async (values, helpers) => {
      try {
        const duplicateEmail = users.some(
          (item) =>
            item.user_id !== user.user_id &&
            item.email?.toLowerCase() ===
              values.email.toLowerCase()
        );

        if (duplicateEmail) {
          helpers.setFieldError(
            "email",
            "This email is already registered"
          );
          return;
        }

        await onUpdate(user.user_id, values);

        await Swal.fire({
          icon: "success",
          title: "User updated",
          text: "User details updated successfully.",
          timer: 1700,
          showConfirmButton: false,
        });

        onClose();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "User not updated",
          text: error.message,
        });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <Modal
      title="Edit user"
      subtitle={`User ID #${user.user_id}`}
      onClose={onClose}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-3.5"
      >
        <Field
          label="Full name"
          name="full_name"
          icon={<UserRound size={15} />}
          formik={formik}
        />

        <Field
          label="Email address"
          name="email"
          type="email"
          icon={<Mail size={15} />}
          formik={formik}
        />

        <Select
          label="Department"
          name="department_id"
          formik={formik}
        >
          <option value="">
            Select department
          </option>

          {departments.map((department) => (
            <option
              key={department.department_id}
              value={department.department_id}
            >
              {department.department_name}
            </option>
          ))}
        </Select>

        <Select
          label="Account status"
          name="status"
          formik={formik}
        >
          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>
        </Select>

        <div className="flex justify-end gap-2.5 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-60 cursor-pointer"
          >
            {formik.isSubmitting ? (
              <Loader2
                size={15}
                className="animate-spin"
              />
            ) : (
              <Edit3 size={15} />
            )}

            Save changes
          </button>
        </div>
      </form>
    </Modal>
  );
}

function Modal({
  title,
  subtitle,
  children,
  onClose,
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget)
          onClose();
      }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200/80">
        <div className="flex items-center justify-between border-b border-slate-200/80 bg-indigo-50/70 px-5 py-3.5">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              {title}
            </h2>

            <p className="text-[11px] text-slate-500">
              {subtitle}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-white hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  icon,
  formik,
}) {
  const error =
    formik.touched[name] &&
    formik.errors[name];

  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          {icon}
        </span>

        <input
          name={name}
          type={type}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-9 pr-3 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />
      </div>

      {error && (
        <p className="mt-1 text-[11px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  label,
  name,
  formik,
  children,
}) {
  const error =
    formik.touched[name] &&
    formik.errors[name];

  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-slate-700">
        {label}
      </label>

      <select
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
      >
        {children}
      </select>

      {error && (
        <p className="mt-1 text-[11px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}