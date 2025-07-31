import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { acceptStaffInvitation } from "@/api/auth";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
      await acceptStaffInvitation({
        company_id: companyId,
        email: email,
      });

      setStatus('success');
      toast({
        title: "Success",
        description: "Invitation accepted successfully! You can now log in to your account.",
      });

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/login');
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
              You have successfully accepted the invitation. You will be redirected to the login page shortly.
            </p>
          </div>
          
          <div className="flex items-center justify-center text-purple-700">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            <span className="text-sm">Redirecting to login...</span>
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

        {/* <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-600 mb-2">Invitation Details:</div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span className="font-medium">{email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Company ID:</span>
              <span className="font-mono text-xs">{companyId}</span>
            </div>
          </div>
        </div> */}

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