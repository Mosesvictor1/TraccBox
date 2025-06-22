import React from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import DashboardLayout from "./DashboardLayout";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="text-lg mb-2">
        Hello, <span className="font-semibold">{user?.email}</span>
      </p>
      {user?.company_name && (
        <p className="text-base mb-2">
          Company: <span className="font-semibold">{user.company_name}</span>
        </p>
      )}
      <div className="mt-6 text-gray-500">
        <p>dashboard Still on Progress......</p>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
