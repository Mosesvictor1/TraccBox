import axios from "axios";
import {
  RegisterRequest,
  RegisterCompanyResponse,
  LoginRequest,
  LoginResponse,
  ResendVerificationRequest,
  VerifyEmailParams,
} from "./types";

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
