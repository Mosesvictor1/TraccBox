import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Verification from "./pages/Verification";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AcceptInvitation from "./pages/AcceptInvitation";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import GlobalAuthRedirect from "@/components/auth/GlobalAuthRedirect";
import GeneralSettings from "./pages/Dashboard/features/settings/GeneralSettings";
import UserRoles from "./pages/Dashboard/features/settings/UserRoles";
import TeamManagment from "./pages/Dashboard/features/settings/TeamManagment";

// Dashboard home content as a component
const DashboardHome = () => (
  <>
    <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
    <p className="text-lg mb-2">
      Hello, <span className="font-semibold">Welcome!</span>
    </p>
    <div className="mt-6 text-gray-500">
      <p>dashboard Still on Progress......</p>
    </div>
  </>
);

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <GlobalAuthRedirect />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/accept-invitation" element={<AcceptInvitation />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<DashboardHome />} />
                <Route path="settings/general" element={<GeneralSettings />} />
                <Route path="settings/roles" element={<UserRoles />} />
                <Route path="settings/team" element={<TeamManagment/>} />
              </Route>
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
