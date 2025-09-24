// auth/hooks/useAuth.ts
"use client";
import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { AuthService } from "../utils/authService";
import { AuthContextType, AuthUser, MessageType } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string): Promise<void> => {
    await AuthService.signup(email, password);
  };

  const login = async (email: string, password: string): Promise<void> => {
    await AuthService.login(email, password);
  };

  const logout = async (): Promise<void> => {
    await AuthService.logout();
  };

  const deleteAccount = async (): Promise<void> => {
    await AuthService.deleteAccount();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setCurrentUser(user as AuthUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}