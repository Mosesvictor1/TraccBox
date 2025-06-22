import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

// List of public routes where you want to redirect authenticated users away from
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify",
];

const GlobalAuthRedirect: React.FC = () => {
  const { user, token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token && PUBLIC_ROUTES.includes(location.pathname)) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, token, location.pathname, navigate]);

  return null;
};

export default GlobalAuthRedirect;
