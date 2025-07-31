import axios from "axios";
import {
  RegisterRequest,
  RegisterCompanyResponse,
  LoginRequest,
  LoginResponse,
  ResendVerificationRequest,
  VerifyEmailParams,
  StaffCreateRequest,
  StaffAcceptRequest,
  StaffPermissionUpdateRequest,
  StaffDeleteRequest,
} from "./types";
import Cookies from "js-cookie";
const API_BASE = import.meta.env.VITE_API_BASE;

export async function registerCompany(data: RegisterRequest) {
  const res = await axios.post<RegisterCompanyResponse>(
    `${API_BASE}/companies/register`,
    data
  );
  return res.data;
}

export async function login(data: LoginRequest) {
  const res = await axios.post<LoginResponse>(`${API_BASE}/login`, data);
  console.log("Login res==", res);
  return res.data;
}

export async function resendVerification(data: ResendVerificationRequest) {
  const res = await axios.post(`${API_BASE}/resend-verification`, data);
  return res.data;
}

export async function verifyEmail(params: VerifyEmailParams) {
  const res = await axios.post(
    `${API_BASE}/companies/verify_email?id=${params.id}&token=${params.token}`
  );
  return res.data;
}

export async function forgottenPasswordRequest(email: string) {
  const res = await axios.post(
    `${API_BASE}/companies/forgotten_password`,
    null,
    {
      params: { email },
    }
  );
  return res.data;
}

export async function forgottenPasswordUpdate(
  email: string,
  reset_token: string,
  password: string
) {
  const res = await axios.patch(
    `${API_BASE}/companies/forgotten_password`,
    null,
    {
      params: { email, reset_token, password },
    }
  );
  return res.data;
}

export async function updateCompanyInfo(
  company_id: string,
  data: {
    company_name: string;
    company_industry: string;
    phone_number: string;
    address: string;
    country: string;
    logo_url?: string;
  }
) {
  const res = await axios.put(`${API_BASE}/update/${company_id}`, data);
  console.log("reeeeee=====", res);
  return res.data;
}

export async function getNewToken(refresh_token: string) {
  const res = await axios.post(`${API_BASE}/refresh`, {
    refresh_token,
  });
  console.log("res of New token=====", res);
  return res.data;
}

// Staff Management API Functions

// Get authorization header with token
const getAuthHeaders = () => {
  const token = Cookies.get("access_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

// Create new staff member
export async function createStaff(data: StaffCreateRequest) {
  console.log("Data Going to Backend=====", data);
  try {
    const res = await axios.post(
      `${API_BASE}/onboarding/staff`,
      data,
      getAuthHeaders()
    );
    console.log("Create staff response=====", res);
    return res.data;
  } catch (error) {
    console.log("Create staff ERROR response=====", error);
    throw error;
  }
}

// Accept staff invitation
export async function acceptStaffInvitation(data: StaffAcceptRequest) {
  const res = await axios.post(
    `${API_BASE}/onboarding/staff/accept`,
    data,
    getAuthHeaders()
  );
  console.log("Accept invitation response=====", res);
  return res.data;
}

// Update staff permissions
export async function updateStaffPermissions(
  data: StaffPermissionUpdateRequest
) {
  const res = await axios.patch(
    `${API_BASE}/onboarding/staff/permissions`,
    data,
    getAuthHeaders()
  );
  console.log("Update permissions response=====", res);
  return res.data;
}

// Delete staff member
export async function deleteStaff(data: StaffDeleteRequest) {
  const res = await axios.delete(
    `${API_BASE}/api/v1/onboarding/staff/permissions`,
    {
      ...getAuthHeaders(),
      data: data,
    }
  );
  console.log("Delete staff response=====", res);
  return res.data;
}
