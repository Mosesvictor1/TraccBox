import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { login as apiLogin } from "@/api/auth";
import type { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export interface User {
  id: string;
  email: string;
  company_name: string | null;
  company_industry: string | null;
  address: string | null;
  country: string | null;
  created_at: string | null;
  phone_number: string | null;
  profile_pic: string | null;
  subscription: string | null;
  verified_email: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  TOKEN_KEY: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getUserFromToken = (token: string): User | null => {
  try {
    const decoded = jwtDecode<User>(token);
    console.log("Decoded JWT payload:", decoded);
    return {
      id: decoded.id,
      email: decoded.email,
      company_name: decoded.company_name ?? null,
      company_industry: decoded.company_industry ?? null,
      address: decoded.address ?? null,
      country: decoded.country ?? null,
      created_at: decoded.created_at ?? null,
      phone_number: decoded.phone_number ?? null,
      profile_pic: decoded.profile_pic ?? null,
      subscription: decoded.subscription ?? null,
      verified_email: decoded.verified_email ?? false,
    };
  } catch {
    return null;
  }
};

const TOKEN_KEY = "access_token";
const REFRESH_TOKEN = "refresh_token";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    () => Cookies.get(TOKEN_KEY) || null
  );
  const [refreshToken, setRefreshToke] = useState<string | null>(
    () => Cookies.get(REFRESH_TOKEN) || null
  );
  const [user, setUser] = useState<User | null>(() => {
    const storedToken = Cookies.get(TOKEN_KEY);
    return storedToken ? getUserFromToken(storedToken) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token && refreshToken) {
      Cookies.set(TOKEN_KEY, token, { expires: 7 }); // 7 days expiry, adjust as needed
      Cookies.set(REFRESH_TOKEN, refreshToken, { expires: 7 }); // 7 days expiry, adjust as needed
      setUser(getUserFromToken(token));
    } else {
      Cookies.remove(TOKEN_KEY);
      setUser(null);
    }
  }, [token, refreshToken]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiLogin({ email, password });
      setToken(res.access_token);
      setRefreshToke(res.refresh_token);
      setUser(getUserFromToken(res.refresh_token));
      setLoading(false);
      return true;
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail?: string }>;
      setError(axiosError.response?.data?.detail || "Login failed");
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setRefreshToke(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        TOKEN_KEY,
        refreshToken,
        loading,
        error,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
