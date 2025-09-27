"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { AuthService } from "@/lib/authService";

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
    // Check localStorage first for fallback authentication
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedTeamId = localStorage.getItem("teamId");
    const authMethod = localStorage.getItem("authMethod");
    
    if (storedAuth === "true" && storedTeamId) {
      setTeamId(storedTeamId);
      setIsAuthenticated(true);
      
      // If using fallback auth, we don't need Firebase
      if (authMethod === 'fallback') {
        setIsLoading(false);
        return;
      }
    }

    // Try Firebase authentication
    const checkFirebase = async () => {
      try {
        const isFirebaseAvailable = await AuthService.isFirebaseAvailable();
        if (!isFirebaseAvailable) {
          console.log('Firebase unavailable, using fallback authentication');
          setIsLoading(false);
          return;
        }

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
            localStorage.setItem("authMethod", "firebase");
          } else {
            // Only clear if not using fallback auth
            if (authMethod !== 'fallback') {
              setTeamId(null);
              setIsAuthenticated(false);
              localStorage.removeItem("teamId");
              localStorage.removeItem("isAuthenticated");
              localStorage.removeItem("userId");
            }
          }
          
          setIsLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.log('Firebase auth failed, using fallback');
        setIsLoading(false);
      }
    };

    checkFirebase();
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

