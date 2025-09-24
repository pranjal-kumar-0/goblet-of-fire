// auth/components/AuthForm.tsx
"use client";
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useMessage } from "../hooks/useMessage";
import { AuthService } from "../utils/authService";
import { Message } from "./Message";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const { signup, login, logout, deleteAccount, currentUser } = useAuth();
  const { message, showMessage, hideMessage } = useMessage();

  const isVitStudent = email.endsWith('@vitapstudent.ac.in');

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleAuth = async (action: 'signup' | 'login') => {
    try {
      await (action === 'signup' ? signup(email, password) : login(email, password));
      showMessage(`${action === 'signup' ? 'Account created' : 'Logged in'} successfully!`, "success");
      clearForm();
    } catch (error: any) {
      showMessage(error.message, "error");
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

  const handlePasswordReset = async () => {
    if (!email) {
      showMessage("Please enter your email address first.", "error");
      return;
    }

    try {
      await AuthService.resetPassword(email);
      showMessage("Password reset email sent! Check your inbox.", "success");
      setShowPasswordReset(false);
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
          {isVitStudent && (
            <div className="p-4 bg-blue-900/60 border-2 border-blue-600 rounded-lg">
              <p className="text-blue-200 font-['Cinzel_Decorative'] text-sm flex items-center">
                🎓 VIT Student detected! If you enrolled through the form, use password reset to access your account.
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
          
          <div>
            <label className="block text-yellow-200 font-['Cinzel_Decorative'] mb-2 text-base sm:text-lg pl-3 border-l-4 border-yellow-600">
              Magical Password
            </label>
            <input 
              type="password"
              placeholder={isVitStudent ? "Use password reset if enrolled via form" : "Enter your magical password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-yellow-800 bg-[#3a1d00]/80 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner text-yellow-100 placeholder-yellow-300/50"
            />
            {isVitStudent && (
              <button
                type="button"
                onClick={() => setShowPasswordReset(!showPasswordReset)}
                className="mt-2 text-sm text-yellow-300 hover:text-yellow-100 underline"
              >
                Need to reset password?
              </button>
            )}
          </div>

          {showPasswordReset && (
            <div className="p-4 bg-[#3a1d00]/60 border-2 border-yellow-800 rounded-lg">
              <p className="text-yellow-200 mb-3 text-sm">Reset your password to access your Hogwarts account:</p>
              <button
                onClick={handlePasswordReset}
                className="w-full px-4 py-2 text-sm font-['Cinzel_Decorative'] text-black bg-gradient-to-r from-orange-500 via-orange-300 to-orange-500 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
              >
                Send Password Reset Email
              </button>
            </div>
          )}
          
          <div className="flex flex-col space-y-3">
            {!isVitStudent && (
              <button 
                onClick={() => handleAuth('signup')}
                className="w-full px-6 py-3 text-lg font-['Cinzel_Decorative'] text-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.8)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,1)] transition-all duration-300 border-2 border-yellow-600/50"
              >
                Join the Order
              </button>
            )}
            <button 
              onClick={() => handleAuth('login')}
              className="w-full px-6 py-3 text-lg font-['Cinzel_Decorative'] text-black bg-gradient-to-r from-green-500 via-green-300 to-green-500 rounded-full shadow-[0_0_20px_rgba(0,255,0,0.6)] hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,0,0.8)] transition-all duration-300 border-2 border-green-600/50"
            >
              Enter the Castle
            </button>
          </div>
          
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