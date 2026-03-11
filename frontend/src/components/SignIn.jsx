import React, { useState } from "react";
import { useAuth } from "../context/AuthContextProvider";
import { authAPI } from "../api/api";

function SignInForm({ onSuccess, isMobile = false }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (evt) => {
    const value = evt.target.value;
    setFormData({
      ...formData,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authAPI.login(
        formData.username,
        formData.password
      );
      login(response.data.token, response.data.user);
      onSuccess();
    } catch (error) {
      setError(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Mobile version classes
  const containerClasses = isMobile
    ? "w-full relative opacity-100 z-[2]"
    : "absolute top-0 left-0 w-1/2 h-full transition-all duration-[600ms] ease-in-out z-[2] sign-in-container";

  const formClasses = isMobile
    ? "bg-white flex items-center justify-center flex-col px-6 py-8 w-full rounded-lg"
    : "bg-white flex items-center justify-center flex-col px-8 lg:px-12 h-full text-center w-full";

  const inputClasses =
    "bg-[#eee] border-none p-3 my-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-[#A0D585] text-sm sm:text-base";

  const buttonClasses =
    "cursor-pointer rounded-3xl border border-[#A0D585] bg-[#A0D585] text-white text-xs font-bold py-3 sm:py-4 px-16 sm:px-25 mt-4 tracking-wide uppercase transition-transform duration-[80ms] hover:bg-[#A0D585]/90 active:scale-95 focus:outline-none disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed w-full sm:w-auto";

  return (
    <div className={containerClasses}>
      <form onSubmit={handleOnSubmit} className={formClasses}>
        <h1 className="font-bold text-2xl sm:text-3xl mb-2 text-[#A0D585]">
          Sign in
        </h1>
        <span className="font-light text-sm sm:text-base leading-6 mb-4 text-[#A0D585]">
          Use your account credentials
        </span>

        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className={inputClasses}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className={inputClasses}
        />

        {error && (
          <div className="text-[#ff4b2b] text-xs my-1 text-center w-full">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} className={buttonClasses}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
