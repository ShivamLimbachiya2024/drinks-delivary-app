"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, signupUser, getCurrentUser, type User } from '@/lib/auth';
import { decodeToken } from '@/lib/jwt';

interface AuthContextType {
  user: Omit<User, 'password'> | null;
  token: string | null;
  role: 'admin' | 'vendor' | 'customer' | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (data: { name: string; email: string; password: string; phone: string; address: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isVendor: boolean;
  isCustomer: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<'admin' | 'vendor' | 'customer' | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const payload = decodeToken(storedToken);
      if (payload) {
        const currentUser = getCurrentUser(storedToken);
        if (currentUser) {
          setUser(currentUser);
          setToken(storedToken);
          setRole(payload.role);
        } else {
          localStorage.removeItem('token');
        }
      } else {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = loginUser(email, password);

    if (response.success && response.user && response.token) {
      setUser(response.user);
      setToken(response.token);
      setRole(response.user.role);
      localStorage.setItem('token', response.token);
      return { success: true };
    }

    return { success: false, message: response.message };
  };

  const signup = async (data: { name: string; email: string; password: string; phone: string; address: string }) => {
    const response = signupUser(data);

    if (response.success && response.user && response.token) {
      setUser(response.user);
      setToken(response.token);
      setRole(response.user.role);
      localStorage.setItem('token', response.token);
      return { success: true };
    }

    return { success: false, message: response.message };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
  };

  const value: AuthContextType = {
    user,
    token,
    role,
    login,
    signup,
    logout,
    isAuthenticated: !!user && !!token,
    isAdmin: role === 'admin',
    isVendor: role === 'vendor',
    isCustomer: role === 'customer',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
