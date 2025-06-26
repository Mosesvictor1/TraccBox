import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { forgottenPasswordRequest } from "@/api/auth";
import type { AxiosError } from "axios";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [email, setEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const navigate = useNavigate();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
      if (nextInput instanceof HTMLElement) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name=otp-${index - 1}]`);
      if (prevInput instanceof HTMLElement) {
        prevInput.focus();
      }
    }
  };

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setLoading(true);
    try {
      const res = await forgottenPasswordRequest(values.email);
      setEmail(values.email);
      setOtpSent(true);
      console.log("forgot ===", res);
      toast.success("Verification code sent to your email!", {
        position: "top-center",
      });
    } catch (error: unknown) {
      let message = "Failed to send verification code. Please try again.";
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
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    // No API call, just navigate with email and otp as reset_token
    const otpString = otp.join("");
    navigate(
      `/reset-password?email=${encodeURIComponent(
        email
      )}&reset_token=${encodeURIComponent(otpString)}`
    );
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const res = await forgottenPasswordRequest(email);
      console.log(res);
      toast.success("Verification code resent successfully!", {
        position: "top-center",
      });
      setOtp(["", "", "", ""]);
      setResendCooldown(30); // 30 seconds cooldown
    } catch (error: unknown) {
      let message = "Failed to resend verification code. Please try again.";
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left Illustration */}
      <div className="hidden md:flex w-[44%] h-full items-center justify-start bg-[#cee0f2]">
        <img
          src="/assets/forgot-password2.png"
          alt="Forgot password illustration"
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
              {otpSent ? "Enter Verification Code" : "Forgot Password?"}
            </h1>
            <p className="text-gray-500 text-center text-base">
              {otpSent
                ? `Enter the 4-digit code sent to ${email}`
                : "Enter your email address and we'll send you a verification code"}
            </p>
          </div>

          {!otpSent ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email Address <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@company.com"
                          type="email"
                          {...field}
                        />
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
                  {loading ? "Sending..." : "Send Verification Code"}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    name={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-semibold"
                  />
                ))}
              </div>

              <Button
                onClick={handleVerifyOTP}
                className="w-full bg-traccbox-500 hover:bg-traccbox-600 text-white"
                disabled={loading || otp.some((digit) => !digit)}
              >
                {loading ? "Verifying..." : "Verify Code"}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-sm text-traccbox-500 hover:text-traccbox-600"
                  disabled={loading || resendCooldown > 0}
                >
                  {resendCooldown > 0
                    ? `Resend available in ${resendCooldown}s`
                    : "Didn't receive the code? Resend"}
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-traccbox-500 font-medium hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
