import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import DashboardLayout from "./DashboardLayout";
import CompanyOnboardingModal from "@/components/auth/CompanyOnboardingModal";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      {/* Only show onboarding modal if company_name is missing */}
      {!user?.company_name && <CompanyOnboardingModal />}
      <Outlet />
    </DashboardLayout>
  );
};

export default Dashboard;
