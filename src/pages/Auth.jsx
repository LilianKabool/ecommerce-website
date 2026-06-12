import { useState } from "react";
import { useForm } from "react-hook-form";
import { UseAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
export default function Auth() {
  const [searchParams] = useSearchParams();

const initialMode = searchParams.get("mode") || "signup";
const [mode, setMode] = useState(initialMode);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, login } = UseAuth();
  function onSubmit(data) {
    setError(null);
    let result;
    if (mode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }
    if (result.success) {
      navigate("/home" , { replace: true });
    } else {
      setError(result.error);
    }
  }

 return (
  <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-4">
    
    <div className="w-full max-w-md bg-[#FFF9F5] p-10 rounded-[30px] shadow-2xl border border-[#f1e2d6]">

  
      <h1 className="text-3xl font-bold text-center text-[#cd936c] mb-8 tracking-wide">
        {mode === "signup" ? "Join Lilyra ✨" : "Welcome Back 🌸"}
      </h1>

      {error && (
        <div className="bg-[#fdecec] text-[#a33a3a] p-3 rounded-lg mb-4 border border-[#f5c6cb] text-sm">
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label className="block mb-2 text-sm font-medium text-[#7a5c45]">
            Email
          </label>

          <input
            className={`w-full p-3 rounded-xl border transition focus:outline-none ${
              errors.email
                ? "border-red-400"
                : "border-[#e7d6c8] focus:border-[#cd936c]"
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
          <label className="block mb-2 text-sm font-medium text-[#7a5c45]">
            Password
          </label>

          <input
            className={`w-full p-3 rounded-xl border transition focus:outline-none ${
              errors.password
                ? "border-red-400"
                : "border-[#e7d6c8] focus:border-[#cd936c]"
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
          className="w-full bg-[#cd936c] text-white py-3 rounded-full shadow-md hover:bg-[#b88461] hover:scale-[1.02] transition"
        >
          {mode === "signup" ? "Create Account" : "Login"}
        </button>
      </form>

    
      <div className="mt-6 text-center text-sm text-[#7a5c45]">
        {mode === "signup" ? (
          <p>
            Already have an account?{" "}
            <button
              type="button"
              className="text-[#cd936c] font-medium hover:underline"
              onClick={() => setMode("login")}
            >
              Login
            </button>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <button
              type="button"
              className="text-[#cd936c] font-medium hover:underline"
              onClick={() => setMode("signup")}
            >
              Sign Up
            </button>
          </p>
        )}
      </div>

    </div>
  </div>
);
}