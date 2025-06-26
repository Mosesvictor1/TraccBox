import React, { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { forgottenPasswordUpdate } from "@/api/auth";
import type { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");
  const reset_token = searchParams.get("reset_token");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    if (!email || !reset_token) {
      toast.error("Invalid reset session");
      return;
    }

    setLoading(true);
    try {
      const res = await forgottenPasswordUpdate(
        email,
        reset_token,
        values.password
      );

      toast.success("Password reset successfully!", { position: "top-center" });
      navigate("/login");
    } catch (error: unknown) {
      let message = "Failed to reset password. Please try again.";
      console.log(error);
      if (
        error &&
        typeof error === "object" &&
        (error as AxiosError).isAxiosError
      ) {
        const axiosError = error as AxiosError<{ detail?: string }>;
        if (axiosError.response?.data?.detail) {
          const detail = axiosError.response.data.detail;
          message = detail.includes(":")
            ? detail.split(":").pop()!.trim()
            : detail;
        }
      }
      toast.error(message, { position: "top-center" });
      if (
        message.toLowerCase().includes("token") ||
        message.trim().toLowerCase() === "reset password failed"
      ) {
        setTimeout(() => navigate("/forgot-password"), 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Invalid Reset Session
          </h1>
          <p className="text-gray-600 mb-4">
            This password reset session is invalid or has expired.
          </p>
          <Link
            to="/forgot-password"
            className="text-traccbox-500 hover:text-traccbox-600 font-medium"
          >
            Request a new reset code
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left Illustration */}
      <div className="hidden md:flex w-[44%] h-full items-center justify-start bg-[#cee0f2]">
        <img
          src="/assets/forgot-password2.png"
          alt="Reset password illustration"
          className="max-w-[100%] w-full h-full"
        />
      </div>

      {/* Right Form */}
      <div className="flex flex-1 h-full w-full md:w-1/2 items-center justify-center p-4">
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
              Reset Password
            </h1>
            <p className="text-gray-500 text-center text-base">
              Enter your new password for {email}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      New Password <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
                          tabIndex={-1}
                          onClick={() => setShowPassword((v) => !v)}
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Confirm Password <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
                          tabIndex={-1}
                          onClick={() => setShowConfirmPassword((v) => !v)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-traccbox-500 hover:bg-traccbox-600 text-white"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-traccbox-500 font-medium hover:underline"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
