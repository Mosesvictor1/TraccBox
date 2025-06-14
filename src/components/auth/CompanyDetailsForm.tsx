import React, { useMemo } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Selects from "react-select";
import countryList from "react-select-country-list";

// Company types for dropdown
export const companyTypes = [
  "Logistics",
  "Real estate",
  "Retail",
  "FMCG",
  "Pharmaceutical",
  "Insurance",
  "Financial services/Fintech",
  "Telecommunication",
  "Security agencies",
  "Oil and Gas distribution",
  "Other",
];

// Schema for company details
export const companyDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().min(1, "Company name is required"),
  companyType: z.string().min(1, "Company type is required"),
  businessAddress: z.string().min(1, "Business address is required"),
  country: z.string().min(1, "Country is required"),
});

export type CompanyDetailsFormValues = z.infer<typeof companyDetailsSchema>;

interface CompanyDetailsFormProps {
  onSubmit: (values: CompanyDetailsFormValues) => void;
  defaultValues?: Partial<CompanyDetailsFormValues>;
  loading?: boolean;
}

const CompanyDetailsForm: React.FC<CompanyDetailsFormProps> = ({
  onSubmit,
  defaultValues = {},
  loading = false,
}) => {
  const options = useMemo(() => countryList().getData(), []);

  const form = useForm<CompanyDetailsFormValues>({
    resolver: zodResolver(companyDetailsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      companyType: "",
      businessAddress: "",
      country: "",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>
                  First Name<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>
                  Last Name<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Company Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Company Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Company Type/Industry <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {companyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Business Address <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter business address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Country / Region <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Selects
                  options={options}
                  value={options.find((opt) => opt.label === field.value)}
                  onChange={(val) => field.onChange(val?.label ?? "")}
                  classNamePrefix="react-select"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CompanyDetailsForm;
