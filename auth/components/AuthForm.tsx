// auth/components/AuthForm.tsx
"use client";
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useMessage } from "../hooks/useMessage";
import { AuthService } from "../utils/authService";
import { EnrollmentAuthService } from "../utils/enrollmentAuth";
import { Message } from "./Message";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { logout, deleteAccount, currentUser } = useAuth();
  const { message, showMessage, hideMessage } = useMessage();

  const isVitStudent = email.endsWith('@vitapstudent.ac.in');

  const clearForm = () => {
    setEmail("");
  };

  const handleMagicAuth = async () => {
    if (!email.trim()) {
      showMessage("Please enter your email address.", "error");
      return;
    }

    setLoading(true);
    try {
      const result = await EnrollmentAuthService.sendMagicalSignInLink(email);
      
      if (result.success) {
        showMessage("🪄 Magical sign-in link sent to your email! Check your inbox.", "success");
        clearForm();
      } else {
        showMessage(result.error || "Failed to send magic link", "error");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      showMessage(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      showMessage("Logged out successfully!", "success");
    } catch (error: any) {
      showMessage(error.message, "error");
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure? This will delete your account and all your scores.")) return;
    
    try {
      await deleteAccount();
      showMessage("Account and scores deleted successfully.", "success");
    } catch (error: any) {
      showMessage(error.message, "error");
    }
  };



  return (
    <div className="w-full">
      {/* Message */}
      <div className="mb-4">
        <Message message={message} onClose={hideMessage} />
      </div>

      {/* User Info */}
      {currentUser && (
        <div className="mb-6 p-4 bg-[#3a1d00]/80 rounded-lg border-2 border-yellow-800">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
            <span className="text-yellow-200 font-['Cinzel_Decorative']">
              Wizard: {currentUser.email}
            </span>
            <div className="flex space-x-3">
              <button 
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm text-white shadow-lg transition-all"
              >
                Logout
              </button>
              <button 
                onClick={handleDeleteAccount}
                className="px-3 py-1 bg-red-800 hover:bg-red-900 rounded-lg text-sm text-white shadow-lg transition-all"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Form */}
      {!currentUser && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-['Cinzel_Decorative'] text-yellow-300 mb-2">
              ✨ Magic Authentication
            </h2>
            <p className="text-yellow-200/80 font-['Cinzel_Decorative'] text-sm">
              Enter your email to receive a magical sign-in link
            </p>
          </div>

          {isVitStudent && (
            <div className="p-4 bg-blue-900/60 border-2 border-blue-600 rounded-lg">
              <p className="text-blue-200 font-['Cinzel_Decorative'] text-sm flex items-center">
                🎓 VIT Student detected! If you enrolled through the form, a magic link will be sent to access your account.
              </p>
            </div>
          )}
          
          <div>
            <label className="block text-yellow-200 font-['Cinzel_Decorative'] mb-2 text-base sm:text-lg pl-3 border-l-4 border-yellow-600">
              Wizard Email
            </label>
            <input 
              type="email"
              placeholder={isVitStudent ? "firstname.regnumber@vitapstudent.ac.in" : "your.email@hogwarts.edu"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-yellow-800 bg-[#3a1d00]/80 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner text-yellow-100 placeholder-yellow-300/50"
            />
          </div>
          
          <button
            type="button"
            onClick={handleMagicAuth}
            disabled={loading || !email.trim()}
            className={`w-full px-6 py-3 text-lg font-['Cinzel_Decorative'] ${
              loading || !email.trim()
                ? 'bg-gray-600 cursor-not-allowed text-gray-400' 
                : 'text-black bg-gradient-to-r from-purple-500 via-purple-300 to-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.8)] hover:scale-105 hover:shadow-[0_0_30px_rgba(147,51,234,1)]'
            } rounded-full transition-all duration-300 border-2 border-purple-600/50`}
          >
            {loading ? '🪄 Casting spell...' : '✨ Send Magic Link'}
          </button>
          
          {!isVitStudent && (
            <div className="text-center pt-4">
              <p className="text-yellow-300/70 text-sm font-['Cinzel_Decorative']">
                VIT Students: Please use the enrollment form to create your account automatically
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}