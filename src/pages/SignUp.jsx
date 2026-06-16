import { useState } from "react";
import { useForm } from "react-hook-form";
import { UseAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const { signUp } = UseAuth();

  function onSubmit(data) {
    setError(null);

    const result = signUp(
      data.email,
      data.password
    );

    if (result.success) {
      navigate("/home", { replace: true });
    } else {
      setError(result.error);
    }
  }

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">

      <div className="w-full max-w-md bg-[var(--card)] p-10 rounded-[30px] shadow-2xl border border-[#f1e2d6]">

        <h1 className="text-3xl font-bold text-center text-[var(--primary)] mb-8 tracking-wide">
          Join Lilyra
        </h1>

        {error && (
          <div className="bg-[#fdecec] text-[#a33a3a] p-3 rounded-lg mb-4 border border-[#f5c6cb] text-sm">
            {error}
          </div>
        )}

        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[var(--text-main)]">
              Email
            </label>

            <input
              type="email"
              className={`w-full p-3 rounded-xl border transition focus:outline-none ${
                errors.email
                  ? "border-red-400"
                  : "border-[#e7d6c8] focus:border-[var(--primary)]"
              } bg-white`}
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[var(--text-main)]">
              Password
            </label>

            <input
              type="password"
              className={`w-full p-3 rounded-xl border transition focus:outline-none ${
                errors.password
                  ? "border-red-400"
                  : "border-[#e7d6c8] focus:border-[var(--primary)]"
              } bg-white`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 12,
                  message: "Password must be less than 12 characters",
                },
              })}
            />

            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[var(--text-main)]">
              Confirm Password
            </label>

            <input
              type="password"
              className={`w-full p-3 rounded-xl border transition focus:outline-none ${
                errors.confirmPassword
                  ? "border-red-400"
                  : "border-[#e7d6c8] focus:border-[var(--primary)]"
              } bg-white`}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password ||
                  "Passwords do not match",
              })}
            />

            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[var(--primary)] text-white py-3 rounded-full shadow-md hover:bg-[var(--primary-dark)] hover:scale-[1.02] transition"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 flex justify-center items-center gap-2 text-sm">
          <span className="text-[var(--text-main)]">
            Already have an account?
          </span>

          <button
            type="button"
            className="text-[var(--primary)] font-semibold hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

      </div>
    </div>
  );
}