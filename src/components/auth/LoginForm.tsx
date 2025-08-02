import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Users, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

// Schema for Admin login
const adminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

// Schema for Staff login
const staffLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;
type StaffLoginFormValues = z.infer<typeof staffLoginSchema>;

type UserType = "admin" | "staff";

const LoginForm: React.FC = () => {
  const [userType, setUserType] = useState<UserType>("admin");
  const [showPassword, setShowPassword] = useState(false);
  
  const adminForm = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const staffForm = useForm<StaffLoginFormValues>({
    resolver: zodResolver(staffLoginSchema),
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();
  const { login, staffLogin, loading, error } = useAuth(); 

  const onAdminSubmit = async (values: AdminLoginFormValues) => {
    const success = await login(values.email, values.password);
    if (success) {
      navigate("/dashboard");
    }
  };

  const onStaffSubmit = async (values: StaffLoginFormValues) => {
    const success = await staffLogin(values.email); // Staff login with email only
    if (success) {
      navigate("/staff-dashboard"); // Different dashboard for staff
    }
  };

  const UserTypeSelector = () => (
    <div className="mb-6 flex justify-end">
      <div className="relative">
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value as UserType)}
          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-traccbox-500 focus:outline-none focus:ring-2 focus:ring-traccbox-500 focus:border-traccbox-500 cursor-pointer"
        >
          <option value="admin">👤 Admin Login</option>
          <option value="staff">👥 Staff Login</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );

  const AdminForm = () => (
    <Form {...adminForm}>
      <form onSubmit={adminForm.handleSubmit(onAdminSubmit)} className="space-y-6">
        
        {/* Email */}
        <FormField
          control={adminForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email Address <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="admin@company.com"
                  type="email"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={adminForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                    className="w-full pr-10"
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

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm text-center font-medium">
            {error}
          </div>
        )}

        {/* Remember + Forgot Password */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <FormField
            control={adminForm.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="remember"
                  />
                </FormControl>
                <FormLabel
                  htmlFor="remember"
                  className="text-sm font-normal cursor-pointer select-none"
                >
                  Remember me
                </FormLabel>
              </FormItem>
            )}
          />
          <Link
            to="/forgot-password"
            className="text-traccbox-500 text-sm font-medium hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-traccbox-500 hover:bg-traccbox-600 text-white text-base font-medium py-2.5"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In as Admin"}
        </Button>
      </form>
    </Form>
  );

  const StaffForm = () => (
    <Form {...staffForm}>
      <form onSubmit={staffForm.handleSubmit(onStaffSubmit)} className="space-y-6">
        {/* Email */}
        <FormField
          control={staffForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Staff Email Address <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="staff@company.com"
                  type="email"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Info Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-blue-700 text-sm">
            <span className="font-medium">Staff Login:</span> Enter your registered email address. 
            No password required for staff access.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm text-center font-medium">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-traccbox-500 hover:bg-traccbox-600 text-white text-base font-medium py-2.5"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In as Staff"}
        </Button>
      </form>
    </Form>
  );

  return (
    <div>
      <UserTypeSelector />
      {userType === "admin" ? <AdminForm /> : <StaffForm />}
    </div>
  );
};

export default LoginForm;