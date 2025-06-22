import axios from "axios";
import {
  RegisterRequest,
  RegisterCompanyResponse,
  LoginRequest,
  LoginResponse,
  ResendVerificationRequest,
  VerifyEmailParams,
} from "./types";

const API_BASE = "https://fastapi.tests.com.ng/api/v1";

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
