import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import { loginPartner } from "../services/partnerService";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Email ID is required"),

      password: Yup.string()
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        setLoading(true);

        // Existing api.js se login API call
        const data = await loginPartner({
          email: values.email.trim(),
          password: values.password,
        });

        console.log("Login response:", data);

        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome ${
            data.partner?.partner_name || "Partner"
          }`,
          confirmButtonColor: "#0b5ed7",timer: 1000,
          timerProgressBar: true,showConfirmButton: false
        });
       setTimeout(() => {
    navigate("/dashboard", { replace: true });
}, 1000);

      } catch (error) {
        console.error("Login error:", error);

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message || "Invalid email or password",
          confirmButtonColor: "#0b5ed7",
        });

      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex bg-white">

      {/* LEFT SIDE */}
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

        {/* Welcome */}
        <div className="my-auto">
          <h1 className="text-5xl font-bold mb-5">
            Manage Your Services
          </h1>

          <p className="text-base leading-7 text-white/90 max-w-lg">
            Manage employees, bookings, services
            and expenses from one powerful platform.
          </p>

          {/* Features */}
          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                ✓
              </span>
              <span>Service Management</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                ✓
              </span>
              <span>Employee Management</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                ✓
              </span>
              <span>Expenses</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                ✓
              </span>
              <span>Reports & Analytics</span>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs text-white/60">
          © 2026 Fleet Management System
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-[430px]">

          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-3 mb-12">

            <div className="w-11 h-11 bg-[#0b5ed7] text-white rounded-lg flex items-center justify-center text-xl font-bold">
              F
            </div>

            <h2 className="text-xl font-bold text-[#0b5ed7]">
              FleetManager
            </h2>

          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back!
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Please enter your details to sign in.
          </p>

          <form onSubmit={formik.handleSubmit}>

            {/* EMAIL */}
            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email ID
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your Email ID"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loading}
                className="w-full h-[50px] px-4 border border-gray-300 rounded-lg outline-none text-sm focus:border-[#0b5ed7] focus:ring-1 focus:ring-[#0b5ed7] disabled:bg-gray-100"
              />

              {formik.touched.email && formik.errors.email && (
                <p className="text-red-600 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}

            </div>

            {/* PASSWORD */}
            <div className="mb-4">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                  className="w-full h-[50px] px-4 pr-16 border border-gray-300 rounded-lg outline-none text-sm focus:border-[#0b5ed7] focus:ring-1 focus:ring-[#0b5ed7] disabled:bg-gray-100"
                />

                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#0b5ed7]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              {formik.touched.password && formik.errors.password && (
                <p className="text-red-600 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}

            </div>

            {/* FORGOT PASSWORD */}
            <div className="text-right mb-6">

              <Link
                to="/forgot-password"
                className="text-sm text-[#0b5ed7] hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[50px] bg-[#0b5ed7] hover:bg-[#084db5] disabled:bg-gray-400 text-white rounded-lg font-semibold text-base transition"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            {/* OR */}
            <div className="flex items-center gap-4 my-6">

              <div className="flex-1 h-px bg-gray-200"></div>

              <span className="text-xs text-gray-400">
                OR
              </span>

              <div className="flex-1 h-px bg-gray-200"></div>

            </div>

            {/* OTP */}
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                Swal.fire({
                  icon: "info",
                  title: "OTP Login",
                  text: "OTP login feature will be available soon.",
                  confirmButtonColor: "#0b5ed7",
                });
              }}
              className="w-full h-[50px] border border-[#0b5ed7] text-[#0b5ed7] hover:bg-blue-50 rounded-lg font-semibold text-sm transition"
            >
              Log In With OTP
            </button>

            {/* SIGN UP */}
            <p className="text-center text-sm text-gray-500 mt-7">
              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-[#0b5ed7] font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>

          </form>

        </div>
      </div>

    </div>
  );
};

export default Login;
