import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute: React.FC = () => {
  const { user, token } = useAuth();
  const location = useLocation();

  if (!user || !token) {
    // Not authenticated, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated, render the child route
  return <Outlet />;
};

export default ProtectedRoute;
