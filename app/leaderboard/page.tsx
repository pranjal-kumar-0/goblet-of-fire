"use client";
import React from "react";
import { AuthProvider } from "../../auth";
import { Leaderboard } from "../../auth/components/Leaderboard";

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black flex items-center justify-center px-4 py-8 font-serif">
      <div className="relative max-w-4xl w-full">
        {/* Magical Wax Seal */}
        <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-red-700 flex items-center justify-center shadow-[0_0_25px_5px_rgba(255,215,0,0.9)] animate-pulse z-20">
          <span className="text-3xl sm:text-4xl drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]">🏆</span>
        </div>

        <div className="w-full rounded-2xl border-4 border-yellow-700 p-6 sm:p-10 bg-gradient-to-b from-[#2a1600]/90 via-[#3a1d00]/90 to-[#2a1600]/90 backdrop-blur-sm shadow-[0_0_40px_rgba(255,215,0,0.3)]">
          {/* Main Title */}
          <div className="text-center mb-8">
            <h1 className="font-['Cinzel_Decorative'] text-4xl sm:text-5xl md:text-6xl text-yellow-200 drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] tracking-wider mb-4">
              Triwizard Tournament
            </h1>
            <p className="text-yellow-300 text-lg sm:text-xl font-['Cinzel_Decorative'] drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
              Champions of Magical Excellence
            </p>
          </div>

          {/* Leaderboard Component */}
          <AuthProvider>
            <Leaderboard />
          </AuthProvider>

          {/* Footer with magical quote */}
          <div className="mt-8 text-center">
            <p className="text-yellow-300/70 italic font-serif text-sm sm:text-base">
              &ldquo;Fame is a fickle friend, Harry. Celebrity is as celebrity does.&rdquo;
            </p>
            <p className="text-yellow-300/50 text-xs mt-2">- Gilderoy Lockhart</p>
          </div>
        </div>
      </div>
    </div>
  );
}