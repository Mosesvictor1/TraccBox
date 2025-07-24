import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { registerCompany } from "@/api/auth";
import type { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";

const signupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSuccess?: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (values: SignupFormValues) => {
    setLoading(true);
    setFormError("");
    try {
      const res = await registerCompany({
        email: values.email,
        password: values.password,
      });
      console.log(res);
      toast.success("Account created successfully! Please verify your email.", {
        position: "top-center",
      });
      navigate(
        `/verify?email=${encodeURIComponent(
          values.email
        )}&id=${encodeURIComponent(res.company.id)}`
      );
    } catch (error: unknown) {
      let message = "Failed to create account. Please try again.";
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Business Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="you@company.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Create Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Min, 8 characters"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                    placeholder="Re-enter password"
                    type={showConfirmPassword ? "text" : "password"}
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
        <div className="text-xs text-gray-500">
          By creating an account, you agree to our{" "}
          <a href="#" className="text-traccbox-500 underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-traccbox-500 underline">
            Privacy Policy
          </a>
        </div>
        <Button
          type="submit"
          className="w-full bg-traccbox-500 hover:bg-traccbox-600 text-white"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
        {formError && (
          <div className="text-red-600 text-sm mt-2 text-center">
            {formError}
          </div>
        )}
      </form>
    </Form>
  );
};

export default SignupForm;
