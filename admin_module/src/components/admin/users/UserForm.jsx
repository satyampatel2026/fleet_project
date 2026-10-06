import { useState } from "react";
import { useFormik } from "formik";

import {
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Mail,
  Phone,
  Plus,
  UserRound,
} from "lucide-react";

import Swal from "sweetalert2";

import { addUserSchema } from "../../../validations/userValidation";

export default function UserForm({
  users,
  departments,
  onAddUser,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      mobile: "",
      password: "",
      department_id: "",
    },

    validationSchema: addUserSchema,

    onSubmit: async (values, helpers) => {
      try {
        const emailExists = users.some(
          (user) =>
            user.email?.toLowerCase() ===
            values.email.toLowerCase()
        );

        if (emailExists) {
          helpers.setFieldError(
            "email",
            "This email is already registered"
          );
          return;
        }

        const mobileExists = users.some(
          (user) =>
            String(user.mobile || "") ===
            values.mobile
        );

        if (mobileExists) {
          helpers.setFieldError(
            "mobile",
            "This mobile number is already registered"
          );
          return;
        }

        await onAddUser(values);

        helpers.resetForm();
        setShowPassword(false);

        await Swal.fire({
          icon: "success",
          title: "User added",
          text:
            values.full_name +
            " has been added successfully.",
          timer: 1800,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "User not added",
          text: error.message,
          confirmButtonColor: "#4f46e5",
        });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-start gap-3">
        <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
          <Plus size={19} />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900">
            Add new user
          </h3>

          <p className="text-xs text-slate-500">
            Enter account and department information.
          </p>
        </div>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-3"
        noValidate
      >
        <Field
          label="Full name"
          name="full_name"
          placeholder="Enter full name"
          icon={<UserRound size={16} />}
          formik={formik}
        />

        <Field
          label="Email address"
          name="email"
          type="email"
          placeholder="name@example.com"
          icon={<Mail size={16} />}
          formik={formik}
        />

        <Field
          label="Mobile number"
          name="mobile"
          placeholder="10-digit mobile number"
          icon={<Phone size={16} />}
          formik={formik}
          maxLength={10}
        />

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">
            Password
          </label>

          <div className="relative">
            <KeyRound
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Create password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass(
                formik.touched.password &&
                  formik.errors.password,
                "pl-10 pr-10"
              )}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((value) => !value)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400"
            >
              {showPassword ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
        </div>

        <ErrorMessage
          touched={formik.touched.password}
          error={formik.errors.password}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-slate-700">
          Department
        </label>

        <select
          name="department_id"
          value={formik.values.department_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={inputClass(
            formik.touched.department_id &&
              formik.errors.department_id,
            "px-3"
          )}
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
        </select>

        <ErrorMessage
          touched={
            formik.touched.department_id
          }
          error={
            formik.errors.department_id
          }
        />
      </div>

      <div className="flex items-end">
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {formik.isSubmitting ? (
            <>
              <Loader2
                size={16}
                className="animate-spin"
              />
              Adding user...
            </>
          ) : (
            <>
              <Plus size={16} />
              Add user
            </>
          )}
        </button>
      </div>
    </form>
  </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  formik,
  maxLength,
}) {
  const error =
    formik.touched[name] &&
    formik.errors[name];

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>

        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          maxLength={maxLength}
          className={inputClass(
            error,
            "pl-10 pr-3"
          )}
        />
      </div>

      <ErrorMessage
        touched={formik.touched[name]}
        error={formik.errors[name]}
      />
    </div>
  );
}

function ErrorMessage({
  touched,
  error,
}) {
  if (!touched || !error) return null;

  return (
    <p className="mt-1 text-xs font-medium text-red-600">
      {error}
    </p>
  );
}

function inputClass(error, spacing) {
  return `w-full rounded-xl border bg-slate-50 py-2 text-xs outline-none transition focus:bg-white focus:ring-4 ${spacing} ${
    error
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
  }`;
}