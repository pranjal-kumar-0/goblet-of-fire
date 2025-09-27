"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";

interface AuthProps {
  onAuthSuccess: (teamId: string) => void;
}

export default function Auth({ onAuthSuccess }: AuthProps) {
  const [teamId, setTeamId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Create email format: teamId@goblet-of-fire.local
      const email = `${teamId}@goblet-of-fire.local`;
      
      // Try Firebase Auth first
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Store team info in localStorage
      localStorage.setItem("teamId", teamId);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userId", userCredential.user.uid);
      
      onAuthSuccess(teamId);
    } catch (firebaseError: any) {
      console.error("Firebase authentication failed:", firebaseError);
      
      // FALLBACK: Check against JSON backup
      try {
        const teamData = await import('@/team-credentials-backup.json');
        const team = teamData.teams.find((t: any) => t.teamId === teamId);
        
        if (team && team.password === password) {
          // Manual authentication success using JSON fallback
          localStorage.setItem("teamId", teamId);
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userId", `local_${teamId}`);
          localStorage.setItem("teamName", team.name);
          localStorage.setItem("teamHouse", team.house);
          
          console.log(`✅ Fallback authentication successful for ${teamId}`);
          onAuthSuccess(teamId);
        } else {
          setError("Invalid Team ID or Password. Please try again.");
        }
      } catch (jsonError) {
        console.error("JSON fallback failed:", jsonError);
        setError("Authentication service unavailable. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black flex items-center justify-center px-4">
      <div className="relative max-w-md w-full">
        {/* Hogwarts Crest */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-red-700 flex items-center justify-center shadow-[0_0_25px_5px_rgba(255,215,0,0.9)] animate-pulse z-20">
          <span className="text-3xl drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]">H</span>
        </div>

        <div
          className="w-full rounded-2xl shadow-2xl border-4 border-yellow-700 p-8 mt-8"
          style={{
            backgroundColor: "#4f2800",
            boxShadow: "0 10px 40px rgba(0,0,0,0.7), inset 0 0 15px rgba(0,0,0,0.5)",
          }}
        >
          <h1 className="font-['Cinzel_Decorative'] text-3xl text-yellow-200 text-center drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] tracking-wider mb-6">
            Team Authentication
          </h1>

          <p className="text-center text-yellow-300 mb-8 text-sm">
            Enter your team credentials to access the Goblet of Fire Challenge
          </p>

          {error && (
            <div className="mb-6 p-3 bg-red-900/50 border border-red-600 rounded-lg text-red-200 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-yellow-200 font-['Cinzel_Decorative'] mb-2 text-base pl-3 border-l-4 border-yellow-600">
                Team ID
              </label>
              <input
                type="text"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                placeholder="e.g., TEAM001"
                className="w-full px-4 py-3 rounded-lg border-2 border-yellow-800 bg-[#3a1d00]/80 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner text-yellow-100 placeholder-yellow-300/50"
                required
              />
            </div>

            <div>
              <label className="block text-yellow-200 font-['Cinzel_Decorative'] mb-2 text-base pl-3 border-l-4 border-yellow-600">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your team password"
                className="w-full px-4 py-3 rounded-lg border-2 border-yellow-800 bg-[#3a1d00]/80 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner text-yellow-100 placeholder-yellow-300/50"
                required
              />
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 text-lg font-['Cinzel_Decorative'] text-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.8)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,1)] transition-all duration-300 border-2 border-yellow-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Authenticating..." : "Enter the Challenge"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-yellow-300/70 text-xs">
              Only registered teams can participate in the Goblet of Fire
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

