import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";

const industries = [
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
const timezones = ["Africa/Lagos (WAT)", "Africa/Accra (GMT)"];
const currencies = ["Nigerian Naira (NGN)", "US Dollar (USD)"];

const GeneralSettings: React.FC = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  // Map user fields to company info fields
  const initialCompany = {
    logo: user?.profile_pic || "",
    name: user?.company_name || "",
    industry: user?.company_industry || "",
    email: user?.email || "",
    phone: user?.phone_number || "",
    address: user?.address || "",
    city: "", // Not in user object
    state: user?.country || "", // Use country for State/Region
    zip: "", // Not in user object
    timezone: "Africa/Lagos (WAT)", // Default
    currency: "Nigerian Naira (NGN)", // Default
  };
  const [company, setCompany] = useState(initialCompany);
  const [editCompany, setEditCompany] = useState(initialCompany);

  // Update form if user changes (e.g., after login or update)
  useEffect(() => {
    const updated = {
      logo: user?.profile_pic || "",
      name: user?.company_name || "",
      industry: user?.company_industry || "",
      email: user?.email || "",
      phone: user?.phone_number || "",
      address: user?.address || "",
      city: "",
      state: user?.country || "",
      zip: "",
      timezone: "Africa/Lagos (WAT)",
      currency: "Nigerian Naira (NGN)",
    };
    setCompany(updated);
    setEditCompany(updated);
  }, [user]);

  const handleEdit = () => {
    setEditCompany(company);
    setEditMode(true);
  };
  const handleCancel = () => {
    setEditMode(false);
    setEditCompany(company);
  };
  const handleSave = () => {
    setCompany(editCompany);
    setEditMode(false);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditCompany((prev) => ({ ...prev, [name]: value }));
  };
  const data = editMode ? editCompany : company;

  // Dynamically include the user's industry if not in the list
  const industriesList =
    industries.includes(user?.company_industry || "") && user?.company_industry
      ? industries
      : user?.company_industry
      ? [
          user.company_industry,
          ...industries.filter((i) => i !== user.company_industry),
        ]
      : industries;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2 ml-4">
        <div>
          <h1 className="text-2xl font-bold ">General Settings</h1>
          <p className="text-gray-500 text-sm">
            Manage your organization&apos;s details and preferences
          </p>
        </div>
      </div>
      {/* Card */}
      <div className="bg-white rounded-xl shadow p-8 relative">
        <div className="flex items-center mb-6">
          <span className="text-lg font-semibold flex items-center gap-2">
            <span className="text-blue-500 text-2xl">&#128203;</span> Company
            Information
          </span>
          {!editMode && (
            <button
              className="ml-auto flex items-center gap-1 border border-gray-300 rounded px-3 py-1.5 text-sm hover:bg-gray-50"
              onClick={handleEdit}
            >
              <span className="material-icons text-base">edit</span> Edit
            </button>
          )}
        </div>
        {/* Logo and fields */}
        <div className="flex gap-8 mb-6">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center mb-2">
              {/* Placeholder icon */}
              <span className="text-4xl text-gray-400">&#128196;</span>
            </div>
            <span className="text-xs text-gray-500">Company Logo</span>
          </div>
          {/* Fields */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1">Company Name</label>
              <input
                className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
                name="name"
                value={data.name}
                readOnly={!editMode}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Industry</label>
              <select
                className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
                name="industry"
                value={data.industry}
                disabled={!editMode}
                onChange={handleChange}
              >
                {industriesList.map((ind) => (
                  <option key={ind}>{ind}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1">Company Email</label>
              <input
                className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
                name="email"
                value={data.email}
                readOnly={!editMode}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Company Phone</label>
              <input
                className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
                name="phone"
                value={data.phone}
                readOnly={!editMode}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        {/* Address Section */}
        <div className="mb-2 font-semibold text-sm">Company Address</div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-span-2">
            <label className="block text-xs mb-1">Street Address</label>
            <input
              className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
              name="address"
              value={data.address}
              readOnly={!editMode}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-xs mb-1">City</label>
            <input
              className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
              name="city"
              value={data.city}
              readOnly={!editMode}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-xs mb-1">State/Region</label>
            <input
              className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
              name="state"
              value={data.state}
              readOnly={!editMode}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Zip Code</label>
            <input
              className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
              name="zip"
              value={data.zip}
              readOnly={!editMode}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Timezone</label>
            <select
              className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
              name="timezone"
              value={data.timezone}
              disabled={!editMode}
              onChange={handleChange}
            >
              {timezones.map((tz) => (
                <option key={tz}>{tz}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1">Currency</label>
            <select
              className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
              name="currency"
              value={data.currency}
              disabled={!editMode}
              onChange={handleChange}
            >
              {currencies.map((cur) => (
                <option key={cur}>{cur}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Save/Cancel buttons in edit mode */}
        {editMode && (
          <div className="flex gap-2 mt-4 justify-end">
            <button
              className="px-4 py-2 rounded bg-gray-100 text-gray-700 border"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-blue-600 text-white"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralSettings;
