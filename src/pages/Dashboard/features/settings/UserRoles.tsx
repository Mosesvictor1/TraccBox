import React, { useRef, useState } from "react";
import {
  Shield,
  Users,
  Briefcase,
  Eye,
  Settings,
  SlidersHorizontal,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

const UserFormSection = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhoto(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-8 mb-6">
      <h2 className="text-lg font-semibold mb-4">User Information</h2>
      <div className="grid grid-cols-5 gap-6 items-start">
        {/* Profile Photo */}
        <div className="col-span-1 flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-2 overflow-hidden">
            {photo ? (
              <img
                src={photo}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl text-gray-400">&#128100;</span>
            )}
          </div>
          <button
            type="button"
            className="text-xs border px-2 py-1 rounded mt-2"
            onClick={handlePhotoClick}
          >
            Upload Photo
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
        </div>
        {/* Form Fields */}
        <div className="col-span-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1">Full Name</label>
            <input
              className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Email Address</label>
            <input
              className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Phone Number</label>
            <input
              className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Job Title</label>
            <input
              className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
              placeholder="Enter job title"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs mb-1">Department</label>
            <select className="w-full border rounded px-3 py-2 text-sm bg-gray-50">
              <option value="">Select department</option>
              <option>Sales</option>
              <option>Marketing</option>
              <option>Operations</option>
              <option>Finance</option>
              <option>HR</option>
              <option>IT</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const roleOptions = [
  {
    key: "admin",
    title: "Admin",
    desc: "Full access to all features and settings",
    icon: <Shield className="w-7 h-7 mx-auto mb-2 text-purple-700" />,
  },
  {
    key: "manager",
    title: "Manager",
    desc: "Manage team and operations, limited admin access.",
    icon: <Users className="w-7 h-7 mx-auto mb-2 text-purple-700" />,
  },
  {
    key: "sales",
    title: "Sales Rep",
    desc: "Manage sales, leads, and client interactions.",
    icon: <Briefcase className="w-7 h-7 mx-auto mb-2 text-purple-700" />,
  },
  {
    key: "view",
    title: "View only",
    desc: "Read-only access to dashboards and reports.",
    icon: <Eye className="w-7 h-7 mx-auto mb-2 text-purple-700" />,
  },
  {
    key: "custom",
    title: "Custom Role",
    desc: "Define specific permissions for this user.",
    icon: <Settings className="w-7 h-7 mx-auto mb-2 text-purple-700" />,
  },
];

const permissionGroups = [
  {
    label: "Core Dashboard & Reporting",
    permissions: [
      "View Dashboard",
      "View Sales & Analytics",
      "Export Data",
      "View Reports",
      "Generate/Export Reports",
    ],
  },
  {
    label: "Lead & Client Management",
    permissions: [
      "View Leads",
      "Add/Edit Leads",
      "Assign Leads",
      "View Clients",
      "Add/Edit Clients",
      "Assign Client",
    ],
  },
  {
    label: "Order & Task Management",
    permissions: [
      "View Orders",
      "Create/Edit Orders",
      "Manage Orders",
      "Assign Tasks",
      "Edit Task",
    ],
  },
  {
    label: "User & Role Management",
    permissions: [
      "View Users",
      "Add/Edit Users",
      "Manage Users",
      "Assign Roles",
    ],
  },
  {
    label: "Billing & Subscription",
    permissions: [
      "View Billing",
      "Manage Billing",
      "Access Invoice",
      "Update Payment Method",
    ],
  },
  {
    label: "Integrations & API",
    permissions: ["Access Integration", "Manage API Keys", "Manage Webhooks"],
  },
  {
    label: "Commission Management",
    permissions: ["View Commissions", "Approve Commissions"],
  },
  {
    label: "Notification Management",
    permissions: ["Manage Email Notifications", "Manage SMS Notifications"],
  },
];

const insurancePermissions = [
  "View Policies",
  "Create/Edit Policies",
  "View Claims",
  "Approve Claims",
];

const viewOnlyEnabled = [
  "View Dashboard",
  "View Sales & Analytics",
  "View Reports",
  "Generate/Export Reports",
  "View Clients",
  "View Orders",
];
const managerDisabled = [
  "Add/Edit Users",
  "Manage Billing",
  "Update Payment Method",
  "Manage API Keys",
];

const PermissionsSection = ({ selectedRole }: { selectedRole: string }) => {
  const [permissions, setPermissions] = React.useState(() => {
    // All permissions enabled by default
    const perms: Record<string, boolean> = {};
    permissionGroups.forEach((group) => {
      group.permissions.forEach((perm) => {
        perms[perm] = true;
      });
    });
    return perms;
  });

  const handleToggle = (perm: string) => {
    setPermissions((prev) => ({ ...prev, [perm]: !prev[perm] }));
  };

  // Determine if a switch should be disabled based on role
  const isDisabled = (perm: string) => {
    if (selectedRole === "admin" || selectedRole === "custom") return false;
    if (selectedRole === "sales") return true;
    if (selectedRole === "view") return !viewOnlyEnabled.includes(perm);
    if (selectedRole === "manager") return managerDisabled.includes(perm);
    return false;
  };

  // Determine if a switch should be checked (on)
  const isChecked = (perm: string) => {
    console.log(perm, "==", permissions[perm]);
    if (isDisabled(perm)) return false;
    return permissions[perm];
  };

  return (
    <div className="bg-white rounded-xl shadow p-8 mb-6">
      <div className="flex items-center mb-4">
        <SlidersHorizontal className="text-purple-700 w-6 h-6 mr-2" />
        <h2 className="text-lg font-semibold mr-2">Permissions Management</h2>
        <span className="text-xs text-gray-400 font-normal">
          (Default permissions for admin)
        </span>
      </div>
      <div className="flex flex-col gap-6">
        {permissionGroups.map((group) => (
          <div key={group.label} className="mb-2">
            <div className="font-semibold text-sm mb-2">{group.label}</div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {group.permissions.map((perm) => (
                <div
                  key={perm}
                  className="flex items-center justify-between w-full"
                >
                  <span className="text-sm">{perm}</span>
                  <Switch
                    checked={isChecked(perm)}
                    onCheckedChange={() => handleToggle(perm)}
                    className="data-[state=checked]:bg-purple-700 data-[state=unchecked]:bg-gray-200"
                    // disabled={isDisabled(perm)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* Insurance Permissions (Coming Soon) */}
        <div className="mt-2 rounded-lg bg-gray-50 p-4 border border-gray-200">
          <div className="font-semibold text-sm mb-2 text-gray-400">
            Insurance Permissions (Coming Soon)
          </div>
          <div className="grid grid-cols-4 gap-2">
            {insurancePermissions.map((perm) => (
              <div
                key={perm}
                className="flex items-center justify-between w-full text-gray-400"
              >
                <span className="text-sm">{perm}</span>
                <Switch checked={false} disabled className="bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SecuritySection = () => {
  const [password, setPassword] = React.useState("");
  const [forceChange, setForceChange] = React.useState(true);
  const [twoFactor, setTwoFactor] = React.useState(false);
  const [sendInvite, setSendInvite] = React.useState(true);

  const generatePassword = () => {
    // Simple random password generator
    const chars =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$";
    let pass = "";
    for (let i = 0; i < 12; i++)
      pass += chars[Math.floor(Math.random() * chars.length)];
    setPassword(pass);
  };

  return (
    <div className="bg-white rounded-xl shadow p-8 mb-6">
      <h2 className="text-2xl font-bold mb-6">Security & Login</h2>
      {/* Password Row */}
      <div className="flex items-center gap-4 mb-8 max-w-xl">
        <input
          type="text"
          className="flex-1 border rounded-lg px-4 py-3 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-200"
          placeholder="Generate password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="border font-semibold rounded-lg px-6 py-3 text-base bg-white hover:bg-gray-100 transition"
          onClick={generatePassword}
        >
          Generate
        </button>
      </div>
      {/* Toggles */}
      <div className="flex flex-col gap-6">
        {/* Force password change */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-lg">
              Force password change on first login
            </div>
            <div className="text-gray-500 text-sm">
              User must change password when they first log in
            </div>
          </div>
          <Switch
            checked={forceChange}
            onCheckedChange={setForceChange}
            className="data-[state=checked]:bg-purple-700 data-[state=unchecked]:bg-gray-200"
          />
        </div>
        {/* Two-Factor Auth */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-lg">
              Enable Two-Factor Authentication
            </div>
            <div className="text-gray-500 text-sm">
              Require 2FA for enhanced security
            </div>
          </div>
          <Switch
            checked={twoFactor}
            onCheckedChange={setTwoFactor}
            className="data-[state=checked]:bg-purple-700 data-[state=unchecked]:bg-gray-200"
          />
        </div>
        {/* Send Invite */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-lg">
              Send Invitation Email on Create
            </div>
            <div className="text-gray-500 text-sm">
              Email login credentials to the new user
            </div>
          </div>
          <Switch
            checked={sendInvite}
            onCheckedChange={setSendInvite}
            className="data-[state=checked]:bg-purple-700 data-[state=unchecked]:bg-gray-200"
          />
        </div>
      </div>
    </div>
  );
};

const FooterActions = () => (
  <div className="flex justify-between items-center mt-8">
    <button className="border border-purple-700 text-purple-700 px-8 py-3 rounded-lg font-semibold text-lg">
      Cancel
    </button>
    <button className="bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold text-lg">
      Save & Send Invite
    </button>
  </div>
);

const RoleAssignmentSection = ({
  selectedRole,
  setSelectedRole,
}: {
  selectedRole: string;
  setSelectedRole: (role: string) => void;
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-8 mb-6">
      <h2 className="text-lg font-semibold mb-4">Role Assignment</h2>
      <div className="grid grid-cols-3 gap-4">
        {roleOptions.map((role) => (
          <button
            key={role.key}
            type="button"
            className={`border rounded-lg p-4 text-left transition-all h-full flex flex-col justify-between shadow-sm hover:border-purple-700 focus:outline-none ${
              selectedRole === role.key
                ? "border-purple-700 bg-purple-50"
                : "border-gray-200 bg-white"
            }`}
            onClick={() => setSelectedRole(role.key)}
          >
            <div className="flex flex-row items-start justify-start mb-2">
              <div className="mr-2">{role.icon}</div>
              <div className="font-bold text-base mb-1">{role.title}</div>
            </div>
            <div className="text-xs text-gray-500 mb-1 flex-1">{role.desc}</div>
            {selectedRole === role.key && (
              <div className="mt-2 text-xs text-purple-700 font-semibold">
                Selected
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

const UserRoles: React.FC = () => {
  const [selectedRole, setSelectedRole] = React.useState("admin");
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6 flex items-center gap-2 ml-4">
        <div>
          <h1 className="text-2xl font-bold ">Add New User</h1>
          <p className="text-gray-500 text-sm">
            Onboard a new team member and assign their role and permissions
          </p>
        </div>
      </div>
      <UserFormSection />
      <RoleAssignmentSection
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />
      <PermissionsSection selectedRole={selectedRole} />
      <SecuritySection />
      <FooterActions />
    </div>
  );
};

export default UserRoles;
