import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "sonner";
import { verifyEmail, resendVerification } from "@/api/auth";
import type { AxiosError } from "axios";

interface EmailVerificationModalProps {
  email: string;
  id: string;
  open: boolean;
  onSuccess: () => void;
}

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  email,
  id,
  open,
  onSuccess,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

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
      console.log("reeeeee==", res)
      toast.success("Email verified successfully!", { position: "top-center" });
      onSuccess();
    } catch (error: unknown) {
        console.log(error)
      let message = "Invalid verification code. Please try again.";
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
      await resendVerification({ email });
      setResendCooldown(30); // 30 seconds cooldown
      setOtp(["", "", "", ""]); // Reset OTP inputs
      toast.success("Verification code resent successfully!", {
        position: "top-center",
      });
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
      setFormError(message);
      toast.error(message, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Verify your email
          </h2>
          <p className="text-gray-600 text-center mb-6">
            We've sent a verification code to{" "}
            <span className="font-medium text-traccbox-500">{email}</span>
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
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
            <Button
              type="submit"
              className="w-full bg-traccbox-500 hover:bg-traccbox-600 text-white"
              disabled={loading || otp.some((digit) => !digit)}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </Button>
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
    </Dialog>
  );
};

export default EmailVerificationModal;
