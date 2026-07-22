import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import api from "../api/axios";
import { useNavigate } from "react-router";

import toast from "react-hot-toast";
function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (form.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await api.post("/auth/signup", form);

      toast.success(response.data.message || "Account created successfully!");

      setForm({
        name: "",
        email: "",
        password: "",
      });

      setErrors({});

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl bg-white shadow-lg border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Full Name
            </label>

            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-slate-300"
              }`}
            />

            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-slate-300"
              }`}
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={handleChange}
                className={`w-full rounded-md border px-3 py-2 pr-10 outline-none transition focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-slate-300"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
