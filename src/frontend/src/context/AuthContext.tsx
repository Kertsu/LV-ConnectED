import { ResponseType } from "@/api/authService";
import { API_URL } from "@/api/axiosConfig";
import ky from "ky";
import React, { createContext, useEffect, useState } from "react";

interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "student" | "provider" | "admin";
  avatarUrl: string | null;
  bannerUrl: string | null;
}

// Define the shape of the AuthContext
export interface AuthContextType {
  token: string | null;
  data: any | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] = useState<UserSession | null>(null);

  // Effect to load token from localStorage and decode it
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      try {
        ky.post<ResponseType>("@self", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          prefixUrl: API_URL,
        })
          .json()
          .then((response) => {
            setData(response.data.user as UserSession);
          });
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  // Login function to save token
  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    try {
      ky.post<ResponseType>("@self", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        prefixUrl: API_URL,
      })
        .json()
        .then((response) => {
          setData(response.data.user as UserSession);
        });
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  };

  // Logout function to clear token
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setData(null);
  };

  // Check if the user is authenticated based on token presence
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, data, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
