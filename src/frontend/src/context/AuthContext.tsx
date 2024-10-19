import { getCurrentUser } from "@/api/authService";
import { User } from "@/types/model";
import React, { createContext, useEffect, useState } from "react";

export interface AuthContextType {
  token: string | null;
  data: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] = useState<User | null>(null);

  // Effect to load token from localStorage and decode it
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      try {
        getCurrentUser().then((result) => {
          setData(result.data as User);
        });
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    try {
      getCurrentUser().then((result) => {
        setData(result.data as User);
      });
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setData(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, data, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
