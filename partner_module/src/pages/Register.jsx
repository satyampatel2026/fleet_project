import { useState } from "react";
import { registerPartner } from "../services/partnerService";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      partnername: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      partnername: Yup.string()
        .trim()
        .required("Partner Name is required"),

      email: Yup.string()
        .trim()
        .email("Enter a valid email")
        .required("Email is required"),

      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile number is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password")],
          "Passwords do not match"
        )
        .required("Confirm Password is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
  try {
    const partnerData = {
      partnername: values.partnername,
      email: values.email,
      mobile: values.mobile,
      password: values.password,
    };

    console.log("Partner Registration:", partnerData);

    const response = await registerPartner(partnerData);

    console.log("Partner API Response:", response);

    await Swal.fire({
      icon: "success",
      title: "Registration Successful",
      text:
        response?.message ||
        "Your partner account has been created.",
      confirmButtonColor: "#0b5ed7",
    });

    resetForm();

  } catch (error) {
    console.error("Registration Error:", error);

    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text:
        error.message ||
        "Something went wrong. Please try again.",
      confirmButtonColor: "#0b5ed7",
    });
  }
},

  });

  // Only numbers allow
  const handleMobileChange = (e) => {
    const value = e.target.value;

    // Remove anything except numbers
    const onlyNumbers = value.replace(/\D/g, "");

    // Maximum 10 digits
    formik.setFieldValue(
      "mobile",
      onlyNumbers.slice(0, 10)
    );
  };

  return (
    <div className="min-h-screen flex bg-white">

      {/* ================= LEFT SIDE ================= */}
      <div className="hidden lg:flex lg:w-1/2 min-h-screen bg-gradient-to-br from-[#063970] to-[#0b5ed7] text-white px-16 py-12 flex-col">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <div className="w-12 h-12 bg-white text-[#0b5ed7] rounded-xl flex items-center justify-center text-2xl font-bold">
            F
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Fleet<span className="font-normal">Partner</span>
            </h2>

            <p className="text-xs text-white/70">
              Smart Fleet Management System
            </p>
          </div>

        </div>

        {/* Content */}
        <div className="my-auto">

          <h1 className="text-5xl font-bold mb-5">
            Join Our Fleet Platform
          </h1>

          <p className="text-base leading-7 text-white/90 max-w-lg">
            Create your partner account and start managing
            your Business with our powerful management platform.
          </p>

          {/* Features */}
          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                ✓
              </span>
              <span>Manage Your services</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                ✓
              </span>
              <span>Manage Your Employees</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                ✓
              </span>
              <span>Manage Your Expenses</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                ✓
              </span>
              <span>Track Reports & Expenses</span>
            </div>

          </div>

        </div>

        {/* Copyright */}
        <p className="text-xs text-white/60">
          © 2026 Fleet Management System
        </p>

      </div>


      {/* ================= RIGHT SIDE ================= */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-[430px]">

          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-3 mb-10">

            <div className="w-11 h-11 bg-[#0b5ed7] text-white rounded-lg flex items-center justify-center text-xl font-bold">
              F
            </div>

            <h2 className="text-xl font-bold text-[#0b5ed7]">
              FleetPartner
            </h2>

          </div>


          {/* Heading */}
          <h3 className="text-3xl font-bold text-gray-800">
            Create Partner Account
          </h3>

          <p className="text-gray-500 mt-2 mb-7">
            Register your partner account to manage your fleet.
          </p>


          <form onSubmit={formik.handleSubmit}>

            {/* ================= PARTNER NAME ================= */}
            <div className="mb-4">

              <label
                htmlFor="partnername"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Partner Name
              </label>

              <input
                id="partnername"
                type="text"
                name="partnername"
                placeholder="Enter partner name"
                value={formik.values.partnername}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full h-[48px] px-4 border rounded-lg outline-none text-sm focus:ring-1 ${
                  formik.touched.partnername &&
                  formik.errors.partnername
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-[#0b5ed7] focus:ring-[#0b5ed7]"
                }`}
              />

              {formik.touched.partnername &&
                formik.errors.partnername && (
                  <p className="text-red-600 text-xs mt-1">
                    {formik.errors.partnername}
                  </p>
                )}

            </div>


            {/* ================= EMAIL ================= */}
            <div className="mb-4">

              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Partner Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter partner email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full h-[48px] px-4 border rounded-lg outline-none text-sm focus:ring-1 ${
                  formik.touched.email &&
                  formik.errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-[#0b5ed7] focus:ring-[#0b5ed7]"
                }`}
              />

              {formik.touched.email &&
                formik.errors.email && (
                  <p className="text-red-600 text-xs mt-1">
                    {formik.errors.email}
                  </p>
                )}

            </div>


            {/* ================= MOBILE ================= */}
            <div className="mb-4">

              <label
                htmlFor="mobile"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Partner Mobile Number
              </label>

              <input
                id="mobile"
                type="tel"
                name="mobile"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                placeholder="Enter 10 digit mobile number"
                value={formik.values.mobile}
                onChange={handleMobileChange}
                onBlur={formik.handleBlur}
                className={`w-full h-[48px] px-4 border rounded-lg outline-none text-sm focus:ring-1 ${
                  formik.touched.mobile &&
                  formik.errors.mobile
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-[#0b5ed7] focus:ring-[#0b5ed7]"
                }`}
              />

              {formik.touched.mobile &&
                formik.errors.mobile && (
                  <p className="text-red-600 text-xs mt-1">
                    {formik.errors.mobile}
                  </p>
                )}

            </div>


            {/* ================= PASSWORD ================= */}
            <div className="mb-4">

              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full h-[48px] px-4 pr-16 border rounded-lg outline-none text-sm focus:ring-1 ${
                    formik.touched.password &&
                    formik.errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-[#0b5ed7] focus:ring-[#0b5ed7]"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#0b5ed7]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              {formik.touched.password &&
                formik.errors.password && (
                  <p className="text-red-600 text-xs mt-1">
                    {formik.errors.password}
                  </p>
                )}

            </div>


            {/* ================= CONFIRM PASSWORD ================= */}
            <div className="mb-6">

              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Confirm Password
              </label>

              <div className="relative">

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full h-[48px] px-4 pr-16 border rounded-lg outline-none text-sm focus:ring-1 ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-[#0b5ed7] focus:ring-[#0b5ed7]"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#0b5ed7]"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>

              </div>

              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-600 text-xs mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                )}

            </div>


            {/* ================= REGISTER BUTTON ================= */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full h-[50px] bg-[#0b5ed7] hover:bg-[#084db5] disabled:bg-blue-300 text-white rounded-lg font-semibold text-base transition"
            >
              {formik.isSubmitting
                ? "Creating Account..."
                : "Create Partner Account"}
            </button>


            {/* ================= LOGIN ================= */}
            <p className="text-center text-sm text-gray-500 mt-7">
              Already have a partner account?{" "}

              <Link
                to="/login"
                className="text-[#0b5ed7] font-semibold hover:underline"
              >
                Log In
              </Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Register;
