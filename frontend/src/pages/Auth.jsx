import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import SignInForm from "../components/SignIn";
import SignUpForm from "../components/SignUp";

export default function Auth() {
  const [type, setType] = useState("signIn");
  const navigate = useNavigate();

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const handleAuthSuccess = (user, redirectPath) => {
    // Use the redirect path from the API response
    if (redirectPath) {
      navigate(redirectPath);
    } else {
      // Fallback based on user role
      const role = user?.role_type || "staff";
      navigate(`/${role}-dashboard`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f5f7] font-sans p-4 sm:p-0">
      <div className="text-center w-full max-w-[768px] mx-auto">
        <div
          className={`bg-white rounded-xl shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] relative overflow-hidden w-full max-w-full min-h-[600px] sm:min-h-[480px] animate-slideUp ${
            type === "signUp"
              ? "sm:[&_.sign-in-container]:translate-x-full sm:[&_.sign-up-container]:translate-x-full sm:[&_.sign-up-container]:opacity-100 sm:[&_.sign-up-container]:z-[5] sm:[&_.overlay-container]:-translate-x-full sm:[&_.overlay]:translate-x-2/4 sm:[&_.overlay-left]:translate-x-0 sm:[&_.overlay-right]:translate-x-1/5"
              : ""
          }`}
          id="container"
        >
          {/* Mobile View - Simple Toggle */}
          <div className="block sm:hidden w-full p-6">
            <div className="flex justify-center space-x-4 mb-6">
              <button
                className={`px-6 py-2 rounded-full font-bold transition-colors duration-300 ${
                  type === "signIn"
                    ? "bg-[#A0D585] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => setType("signIn")}
              >
                Sign In
              </button>
              <button
                className={`px-6 py-2 rounded-full font-bold transition-colors duration-300 ${
                  type === "signUp"
                    ? "bg-[#A0D585] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => setType("signUp")}
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Forms */}
            {type === "signIn" ? (
              <SignInForm onSuccess={handleAuthSuccess} isMobile={true} />
            ) : (
              <SignUpForm onSuccess={handleAuthSuccess} isMobile={true} />
            )}
          </div>

          {/* Desktop View - Original Sliding Panels */}
          <div className="hidden sm:block h-full">
            <SignUpForm onSuccess={handleAuthSuccess} />
            <SignInForm onSuccess={handleAuthSuccess} />

            {/* Overlay Container */}
            <div className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-[600ms] ease-in-out z-[100] overlay-container">
              <div className="bg-gradient-to-r from-[#A0D585] to-[#A0D585] text-white relative -left-full h-full w-[200%] transition-transform duration-[600ms] ease-in-out overlay">
                {/* Overlay Left */}
                <div className="absolute flex items-center justify-center flex-col px-6 lg:px-10 text-center top-0 h-full w-1/2 transition-transform duration-[600ms] ease-in-out -translate-x-1/5 overlay-left">
                  <h1 className="font-bold text-2xl lg:text-3xl">
                    Welcome Back!
                  </h1>
                  <p className="text-xs lg:text-sm font-light leading-5 tracking-wide my-5 px-4">
                    If you already have an account, please sign in to access
                    your dashboard and manage your egg production efficiently.
                  </p>
                  <button
                    className="cursor-pointer bg-transparent border-2 border-white text-white text-xs font-bold py-3 px-8 lg:px-11 rounded-full uppercase tracking-wide hover:bg-white hover:text-[#A0D585] transition-colors duration-300"
                    id="signIn"
                    onClick={() => handleOnClick("signIn")}
                  >
                    Sign In
                  </button>
                </div>

                {/* Overlay Right */}
                <div className="absolute flex items-center justify-center flex-col px-6 lg:px-10 text-center top-0 h-full w-1/2 transition-transform duration-[600ms] ease-in-out right-0 overlay-right">
                  <h1 className="font-bold text-2xl lg:text-3xl">
                    Hello, Friend!
                  </h1>
                  <p className="text-xs lg:text-sm font-light leading-5 tracking-wide my-5 px-4">
                    If you don't have an account, please sign up with your
                    personal info to start your journey with us.
                  </p>
                  <button
                    className="cursor-pointer bg-transparent border-2 border-white text-white text-xs font-bold py-3 px-8 lg:px-11 rounded-full uppercase tracking-wide hover:bg-white hover:text-[#A0D585] transition-colors duration-300"
                    id="signUp"
                    onClick={() => handleOnClick("signUp")}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
