import React, { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import countryList from "react-select-country-list";
import { getNewToken, updateCompanyInfo } from "@/api/auth";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EmailVerificationModal from "./EmailVerificationModal";
import Cookies from "js-cookie";

const steps = [
  { label: "Company Details" },
  { label: "Contact Information" },
  { label: "Location & Profile" },
];

const onboardingSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Please select an industry"),
  address: z.string().min(3, "Address is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(
      /^[+]?\d{10,15}$/,
      "Enter a valid phone number (digits only, optional + at start)"
    ),
  country: z.string().min(1, "Please select a country"),
  logo: z.any().optional(),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

const CompanyOnboardingModal: React.FC = () => {
  const [step, setStep] = useState(0);
  const [logo, setLogo] = useState<File | null>(null);
  const [emailJustVerified, setEmailJustVerified] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [loading, setLoading] = useState(false); // Add loading state
  const countryOptions = countryList().getData();
  const { user, setUser, logout, refreshToken, TOKEN_KEY, token } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    mode: "onChange",
  });

  if (user && user.verified_email === false) {
    return (
      <EmailVerificationModal
        open={true}
        email={user.email}
        id={user.id}
        onSuccess={() => {
          toast.success("Email verified! Please log in again to continue.", {
            position: "top-center",
          });
          setTimeout(() => {
            logout();
            navigate("/login");
          }, 2000);
        }}
      />
    );
  }

  const industryOptions = [
    "Technology",
    "Pharmaceutical",
    "Finance",
    "Insurance",
    "Manufacturing",
    "Retail",
    "Education",
    "Real Estate",
    "Consulting",
    "Other",
  ];

  async function uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/decbrtduj/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    if (!res.ok) throw new Error("Failed to upload image");
    const data = await res.json();
    console.log("cloud", data);
    return data.secure_url;
  }

  const onSubmit = async (data: OnboardingFormData) => {
    setLoading(true);
    let logoUrl = "";
    try {
      if (data.logo && data.logo instanceof File) {
        logoUrl = await uploadToCloudinary(data.logo);
      }
      const payload = {
        company_name: data.companyName,
        company_industry: data.industry,
        phone_number: data.phone,
        address: data.address,
        country: data.country,
        logo_url: logoUrl,
      };
      if (user?.id) {
        const response = await updateCompanyInfo(user.id, payload);
        // Axios: response.data is the actual data object
        const resData = response.data || response;
        if (
          response.status === "success" &&
          resData &&
          ((typeof resData.status === "string" &&
            resData.status.toLowerCase() === "success") ||
            (typeof resData.message === "string" &&
              resData.message.toLowerCase().includes("success")))
        ) {
          try {
            const res = await getNewToken(refreshToken);
            Cookies.set(TOKEN_KEY, res.access_token, { expires: 7 }); // 7 days
          } catch (error) {
            console.log("newTokenError:", error);
            alert(error);
          }

          toast.success(
            resData.message || "Company ==)()updated successfully!",
            {
              position: "top-center",
            }
          );
          setUser({ ...user, ...resData.company });
          setModalOpen(false);
        } else {
          toast.error(resData.message || "Failed to update company info.", {
            position: "top-center",
          });
        }
      }
    } catch (error) {
      let message = "Failed to update company info.";
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        error.response.data &&
        typeof error.response.data.detail === "string"
      ) {
        const detail = error.response.data.detail;
        message = detail.includes(":")
          ? detail.split(":").pop()!.trim()
          : detail;
      }
      toast.error(message, { position: "top-center" });
      if (message.toLowerCase().includes("verify")) {
        setTimeout(() => {
          logout();
          navigate("/login");
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    const watchedValues = watch();
    switch (step) {
      case 0:
        return watchedValues.companyName && watchedValues.industry;
      case 1:
        return watchedValues.address && watchedValues.phone;
      case 2:
        return watchedValues.country;
      default:
        return false;
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-8 relative">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/assets/logo.png" alt="TraccBox Logo" className="h-12" />
          </div>
          {/* Stepper */}
          <div className="flex items-center justify-center mb-8">
            {steps.map((s, i) => (
              <React.Fragment key={i}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    i <= step ? "bg-[#3B1CFF]" : "bg-gray-300"
                  }`}
                >
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`h-1 w-16 ${
                      i < step ? "bg-[#3B1CFF]" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Company Details */}
            {step === 0 && (
              <div>
                <h2 className="text-xl font-bold mb-1">Company Details</h2>
                <p className="text-gray-500 mb-6">Basic company information</p>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Company Name *
                  </label>
                  <Input
                    placeholder="Enter your company name"
                    {...register("companyName")}
                  />
                  {errors.companyName && (
                    <span className="text-red-500 text-sm">
                      {errors.companyName.message}
                    </span>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">
                    Industry *
                  </label>
                  <Select
                    onValueChange={(value) => setValue("industry", value)}
                    {...register("industry")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industry && (
                    <span className="text-red-500 text-sm">
                      {errors.industry.message}
                    </span>
                  )}
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepValid()}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-1">Contact Information</h2>
                <p className="text-gray-500 mb-6">Address and phone details</p>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Company Address *
                  </label>
                  <Input
                    placeholder="Enter your company address"
                    {...register("address")}
                  />
                  {errors.address && (
                    <span className="text-red-500 text-sm">
                      {errors.address.message}
                    </span>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">
                    Company Phone Number *
                  </label>
                  <Input
                    placeholder="Enter company phone number"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepValid()}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Location & Profile */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-1">Location & Profile</h2>
                <p className="text-gray-500 mb-6">Country and Company logo</p>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Country *
                  </label>
                  <Select
                    onValueChange={(value) => setValue("country", value)}
                    {...register("country")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryOptions.map((option) => (
                        <SelectItem key={option.label} value={option.label}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && (
                    <span className="text-red-500 text-sm">
                      {errors.country.message}
                    </span>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">
                    Company Logo{" "}
                    <span className="text-gray-400">(Optional)</span>
                  </label>
                  <div className="border rounded-lg p-6 flex flex-col items-center justify-center ">
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setLogo(e.target.files[0]);
                          setValue("logo", e.target.files[0]);
                        } else {
                          setLogo(null);
                          setValue("logo", undefined);
                        }
                      }}
                    />
                    <span className="text-xs text-gray-500 mt-2">
                      PNG, JPG up to 5MB
                    </span>
                    {logo && (
                      <span className="text-xs text-gray-700 mt-1">
                        {logo.name}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="w-1/2"
                    disabled={!isStepValid() || loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Complete Setup"
                    )}
                  </Button>
                </div>
                <div className="text-center text-xs text-gray-500 mt-6">
                  Step 3 of 3 Completed your company profile
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default CompanyOnboardingModal;
