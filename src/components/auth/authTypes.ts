// Types for authentication
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
