import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left Illustration */}
      <div className="hidden md:flex w-[44%]  h-full items-center justify-start bg-[#F8FAFC]">
        <img
          src="/assets/login.png"
          alt="Login illustration"
          className="max-w-[100%] w-full h-full"
        />
      </div>
      {/* Right Form */}
      <div className="flex flex-1 h-full w-full   md:w-1/2 items-center justify-center p-4">
        <div className="w-full max-w-xl mx-auto flex flex-col justify-center h-full">
          <div className="flex flex-col items-center mb-8">
            <Link to="/">
              <img
                src="/assets/logo.png"
                alt="TraccBox Logo"
                className="w-fit h-12 mb-2"
              />
            </Link>
            <h1 className="text-3xl font-bold font-outfit text-center mb-1 text-traccbox-500">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-center text-base">
              Log in to your TraccBox account to continue
            </p>
          </div>
          <LoginForm />
          <div className="mt-6 text-center space-y-2">
            <div className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-traccbox-500 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
