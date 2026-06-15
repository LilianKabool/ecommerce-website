import { useState } from "react";
import { useForm } from "react-hook-form";
import { UseAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = UseAuth();
  function onSubmit(data) {
    setError(null);

    const result = login(data.email, data.password);
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
          Welcome Back
        </h1>

        {error && (
          <div className="bg-[#fdecec] text-[#a33a3a] p-3 rounded-lg mb-4 border border-[#f5c6cb] text-sm">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-2 text-sm font-medium text-[var(--text-main)]">
              Email
            </label>

            <input
              className={`w-full p-3 rounded-xl border transition focus:outline-none ${
                errors.email
                  ? "border-red-400"
                  : "border-[#e7d6c8] focus:border-[var(--primary)]"
              } bg-white`}
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
            />

            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-[var(--text-main)]">
              Password
            </label>

            <input
              className={`w-full p-3 rounded-xl border transition focus:outline-none ${
                errors.password
                  ? "border-red-400"
                  : "border-[#e7d6c8] focus:border-[var(--primary)]"
              } bg-white`}
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
                maxLength: { value: 12, message: "Max 12 characters" },
              })}
            />

            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--primary)] text-white py-3 rounded-full shadow-md hover:bg-[var(--primary-dark)] hover:scale-[1.02] transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 flex justify-center items-center gap-3">
          <span className="text-[var(--text-main)]">
            Don't have an account?
          </span>

          <button
            type="button"
            className="text-[var(--primary)] font-semibold hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
