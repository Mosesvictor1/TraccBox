import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { acceptStaffInvitation } from "@/api/auth";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import { useAuth } from "@/components/auth/AuthProvider";

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { TOKEN_KEY } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [errorMessage, setErrorMessage] = useState('');

  const companyId = searchParams.get('company_id');
  const email = searchParams.get('email');

  useEffect(() => {
    // Validate required parameters
    if (!companyId || !email) {
      setStatus('error');
      setErrorMessage('Invalid invitation link. Missing required parameters.');
    }
  }, [companyId, email]);

  // Helper function to determine navigation path based on role
  const getNavigationPath = (role: string): string => {
    // Convert role to lowercase for case-insensitive comparison
    const normalizedRole = role.toLowerCase().trim();
    
    // Check if the role is sales rep (handle variations)
    if (normalizedRole === "sales rep" || 
        normalizedRole === "sales_rep" || 
        normalizedRole === "salesrep" ||
        normalizedRole === "sales representative") {
      return "/sales-rep-demo"; // Replace with your actual sales rep demo page route
    }
    
    // All other roles go to dashboard
    return "/dashboard";
  };

  const handleAcceptInvitation = async () => {
    if (!companyId || !email) {
      toast({
        title: "Error",
        description: "Invalid invitation link. Missing required parameters.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await acceptStaffInvitation({
        company_id: companyId,
        email: email,
      });

      setStatus('success');
      toast({
        title: "Success",
        description: "Invitation accepted successfully! Redirecting you...",
      });

      // Get user role from response and determine navigation path
      const userRole = response.user?.role || response.role || response.data?.user?.role || response.data?.role || "";
      const navigationPath = getNavigationPath(userRole);
      
      console.log("User role:", userRole, "Navigating to:", navigationPath);

      // Store access token only if going to dashboard (not for sales rep demo)
      if (navigationPath === "/dashboard" && response.access_token) {
        Cookies.set(TOKEN_KEY, response.access_token, { expires: 7 }); // 7 days
        console.log("Access token stored for dashboard user");
      }

      // Redirect based on role after 3 seconds
      setTimeout(() => {
        navigate(navigationPath);
      }, 3000);

    } catch (error) {
      setStatus('error');
      let errorMessage = "Failed to accept invitation. Please try again.";

      if (error?.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      setErrorMessage(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Invitation Error
            </h1>
            <p className="text-gray-600 mb-6">
              {errorMessage}
            </p>
          </div>
          
          <button
            onClick={handleGoToLogin}
            className="w-full bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-800 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Invitation Accepted!
            </h1>
            <p className="text-gray-600 mb-6">
              You have successfully accepted the invitation. You will be redirected based on your role shortly.
            </p>
          </div>
          
          <div className="flex items-center justify-center text-purple-700">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            <span className="text-sm">Redirecting...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-purple-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Staff Invitation
          </h1>
          <p className="text-gray-600">
            You've been invited to join a team on Traccbox
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleAcceptInvitation}
            disabled={loading}
            className="w-full bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Accepting Invitation...
              </>
            ) : (
              'Accept Invitation'
            )}
          </button>
          
          <button
            onClick={handleGoToLogin}
            className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Go to Login
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By accepting this invitation, you agree to join the team and follow their policies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcceptInvitation;