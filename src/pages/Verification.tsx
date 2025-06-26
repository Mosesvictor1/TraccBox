import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { verifyEmail, resendVerification } from "@/api/auth";
import type { AxiosError } from "axios";

const Verification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");
  const id = searchParams.get("id");
  const [formError, setFormError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");
    try {
      const otpString = otp.join("");
      if (!id) throw new Error("Missing verification id.");
      const res = await verifyEmail({ id, token: otpString });
      console.log("res==", res);
      toast.success("Email verified successfully!", { position: "top-center" });
      navigate("/login");
    } catch (error: unknown) {
      let message = "Invalid verification code. Please try again.";
      console.log("error==", error);
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
      setFormError(message);
      toast.error(message, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email || resendCooldown > 0) return;
    setLoading(true);
    setFormError("");
    try {
      const res = await resendVerification({ email });
      setResendCooldown(30); // 30 seconds cooldown
      setOtp(["", "", "", ""]); // Reset OTP inputs
      toast.success("Verification code resent successfully!", {
        position: "top-center",
      });
    } catch (error: unknown) {
      let message = "Failed to resend verification code. Please try again.";
      console.log("error==", error);
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
      setFormError(message);
      toast.error(message, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a verification code to{" "}
            <span className="font-medium text-traccbox-500">{email}</span>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
          {formError && (
            <div className="text-red-600 text-sm mt-2 text-center">
              {formError}
            </div>
          )}
          <div>
            <Button
              type="submit"
              className="w-full bg-traccbox-500 hover:bg-traccbox-600 text-white"
              disabled={loading || otp.some((digit) => !digit)}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </Button>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={handleResendCode}
              className="text-sm text-traccbox-500 hover:text-traccbox-600"
              disabled={loading || resendCooldown > 0}
            >
              {resendCooldown > 0
                ? `Resend available in ${resendCooldown}s`
                : "Didn't receive the code? Resend"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verification;
