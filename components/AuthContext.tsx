"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";

interface AuthContextType {
  user: User | null;
  teamId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [teamId, setTeamId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage FIRST on mount
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedTeamId = localStorage.getItem("teamId");
    const storedUserId = localStorage.getItem("userId");
    
    if (storedAuth === "true" && storedTeamId) {
      // Restore authentication state from localStorage
      setTeamId(storedTeamId);
      setIsAuthenticated(true);
      setIsLoading(false);
      
      // For localStorage auth, we don't need a full user object
      // The authentication state is managed by localStorage
      setUser(null);
    }

    // Then listen for Firebase auth changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      
      if (user) {
        // Extract team ID from email
        const email = user.email || "";
        const extractedTeamId = email.replace("@goblet-of-fire.local", "");
        setTeamId(extractedTeamId);
        setIsAuthenticated(true);
        
        // Update localStorage
        localStorage.setItem("teamId", extractedTeamId);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userId", user.uid);
      } else {
        // Only clear if not authenticated via localStorage
        const storedAuth = localStorage.getItem("isAuthenticated");
        if (storedAuth !== "true") {
          setTeamId(null);
          setIsAuthenticated(false);
          localStorage.removeItem("teamId");
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("userId");
        }
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    auth.signOut();
    localStorage.removeItem("teamId");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    setUser(null);
    setTeamId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        teamId,
        isAuthenticated,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

