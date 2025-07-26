// Authentication API Types

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterCompanyResponse {
  status: string;
  message: string;
  company: {
    id: string;
    email: string;
    created_at: string | null;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  status: "success";
}

export interface ResendVerificationRequest {
  email: string;
}

export interface VerifyEmailParams {
  id: string;
  token: string;
}
