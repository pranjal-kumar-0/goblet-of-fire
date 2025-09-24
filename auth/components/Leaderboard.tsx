// auth/components/Leaderboard.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useMessage } from "../hooks/useMessage";
import { AuthService } from "../utils/authService";
import { Score } from "../types";
import { Message } from "./Message";

const getRankBadge = (index: number) => {
  const badges = ['👑', '🥈', '🥉'];
  return badges[index] || `#${index + 1}`;
};

const getRankStyle = (index: number) => {
  const styles = [
    'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-[0_0_15px_rgba(255,215,0,0.8)]',
    'bg-gradient-to-r from-gray-300 to-gray-500 text-black shadow-[0_0_10px_rgba(192,192,192,0.6)]',
    'bg-gradient-to-r from-amber-500 to-amber-700 text-white shadow-[0_0_10px_rgba(217,119,6,0.6)]'
  ];
  return styles[index] || 'bg-[#2a1600] text-yellow-200 border-2 border-yellow-800';
};

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const { message, showMessage, hideMessage } = useMessage();

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const scores = await AuthService.getLeaderboard();
      setLeaderboard(scores);
    } catch (error) {
      showMessage("Failed to load leaderboard.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadLeaderboard(); }, []);

  return (
    <div className="w-full">
      <div className="mb-4">
        <Message message={message} onClose={hideMessage} />
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <h2 className="font-['Cinzel_Decorative'] text-2xl sm:text-3xl text-yellow-200 mb-2">
            🏆 Tournament Champions 🏆
          </h2>
          <button 
            onClick={loadLeaderboard}
            className="px-6 py-2 text-sm font-['Cinzel_Decorative'] text-yellow-200 bg-[#3a1d00]/80 border-2 border-yellow-800 rounded-lg hover:bg-yellow-900/30 transition-all duration-300"
          >
            Refresh Rankings
          </button>
        </div>

        <div className="bg-[#3a1d00]/60 rounded-lg border-2 border-yellow-800 overflow-hidden">
          {loading ? (
            <div className="py-8 px-4 text-center text-yellow-300/70 font-['Cinzel_Decorative']">
              <div className="animate-spin inline-block w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full mr-2" />
              Consulting the magical records...
            </div>
          ) : leaderboard.length > 0 ? (
            <div className="divide-y divide-yellow-800/50">
              {leaderboard.map((entry, index) => (
                <div key={index} className="py-4 px-6 flex justify-between items-center hover:bg-yellow-900/20 transition-colors">
                  <div className="flex items-center">
                    <span className={`mr-4 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getRankStyle(index)}`}>
                      {getRankBadge(index)}
                    </span>
                    <span className="text-yellow-100 font-['Cinzel_Decorative'] text-lg">{entry.email}</span>
                  </div>
                  <span className="font-bold text-yellow-300 text-xl">{entry.score} pts</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 px-4 text-center text-yellow-300/70 font-['Cinzel_Decorative']">
              🏆 No champions yet... The tournament awaits brave souls! 🏆
            </div>
          )}
        </div>
      </div>
    </div>
  );
}