// auth/components/AuthDashboard.tsx
"use client";
import React, { useState, useEffect } from "react";
import { signInWithEmailLink, isSignInWithEmailLink } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { AuthProvider } from "../hooks/useAuth";
import { AuthForm } from "./AuthForm";
import styles from "./AuthDashboard.module.css";

function AuthDashboardContent() {
  const [emailLinkMessage, setEmailLinkMessage] = useState<string>('');
  const [isProcessingLink, setIsProcessingLink] = useState(false);

  useEffect(() => {
    // Check if user is signing in with email link
    if (isSignInWithEmailLink(auth, window.location.href)) {
      handleEmailLinkSignIn();
    }
  }, []);

  const handleEmailLinkSignIn = async () => {
    setIsProcessingLink(true);
    try {
      // Get the email from localStorage
      let email = window.localStorage.getItem('emailForSignIn');
      
      if (!email) {
        // Ask user to provide the email if not found in localStorage
        email = window.prompt('Please provide your email for confirmation:');
      }

      if (email) {
        // Sign in with email link
        const result = await signInWithEmailLink(auth, email, window.location.href);
        
        // Clear email from localStorage
        window.localStorage.removeItem('emailForSignIn');
        
        setEmailLinkMessage('🎉 Welcome to Hogwarts! You have been successfully authenticated.');
        
        // Clear the URL to remove the email link parameters
        window.history.replaceState({}, document.title, "/auth");
      }
    } catch (error: any) {
      console.error('Error signing in with email link:', error);
      setEmailLinkMessage('❌ Failed to sign in. The magical link may have expired or been used already.');
    } finally {
      setIsProcessingLink(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black flex flex-col items-center justify-center px-4 py-8 font-serif">
      <div className="relative max-w-2xl w-full">
        {/* Wax Seal */}
        <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-red-700 flex items-center justify-center shadow-[0_0_25px_5px_rgba(255,215,0,0.9)] animate-pulse z-20">
          <span className="text-3xl sm:text-4xl drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]">A</span>
        </div>

        <div className={`w-full rounded-2xl border-4 border-yellow-700 p-6 sm:p-10 ${styles.authContainer}`}>
          <h1 className="font-['Cinzel_Decorative'] text-3xl sm:text-4xl md:text-5xl text-yellow-200 text-center drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] tracking-wider mb-8">
            Magical Authentication
          </h1>

          {/* Email Link Processing Message */}
          {isProcessingLink && (
            <div className="mb-6 p-4 bg-blue-900/50 border border-blue-400 rounded-lg text-center">
              <div className="animate-spin inline-block w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full mr-2"></div>
              <span className="text-yellow-200">Processing your magical authentication link...</span>
            </div>
          )}
          
          {emailLinkMessage && (
            <div className={`mb-6 p-4 border rounded-lg text-center ${
              emailLinkMessage.includes('❌') 
                ? 'bg-red-900/50 border-red-400 text-red-200' 
                : 'bg-green-900/50 border-green-400 text-green-200'
            }`}>
              {emailLinkMessage}
            </div>
          )}

          {/* Authentication Content */}
          <div className="min-h-[400px]">
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AuthDashboard() {
  return (
    <AuthProvider>
      <AuthDashboardContent />
    </AuthProvider>
  );
}