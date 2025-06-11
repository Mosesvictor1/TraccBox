import React from "react";
import SignupForm from "@/components/auth/SignupForm";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Illustration */}
      <div className="hidden md:flex w-[48%] items-center justify-center bg-[#F8FAFC]">
        <img
          src="/assets/SignUp.png"
          alt="Sign up illustration"
          className="max-w-[95%] h-auto object-contain"
        />
      </div>
      {/* Right Form */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full  max-w-2xl mx-auto">
          <div className="flex flex-col items-center mb-8">
          <Link to="/">
              <img
                src="/assets/logo.png"
                alt="TraccBox Logo"
                className="w-fit h-12 mb-2"
              />
            </Link>
            <h1 className="text-3xl font-bold font-outfit text-center mb-1 text-traccbox-500">
              Get Started With TraccBox
            </h1>
            <p className="text-gray-500 text-center text-base">
              Create your account to unlock sales performance insights
            </p>
          </div>
          <SignupForm />
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-traccbox-500 font-medium hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
