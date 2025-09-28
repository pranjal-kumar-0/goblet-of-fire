"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({
    teamName: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post('/api/auth/login', formData, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      // Store team info in localStorage for the game
      localStorage.setItem('teamInfo', JSON.stringify(response.data.team));
      
      // Redirect to game
      router.push('/game');
      
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black flex items-center justify-center px-4 py-8 font-serif">
      <div className="relative max-w-md w-full">
        {/* Magical Glow Effect */}
        <div className="absolute -top-8 -left-8 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-red-700 flex items-center justify-center shadow-[0_0_30px_8px_rgba(255,215,0,0.8)] animate-pulse z-20">
          <span className="text-4xl drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">⚡</span>
        </div>

        <div
          className="w-full rounded-2xl shadow-2xl border-4 border-yellow-700 p-8"
          style={{
            backgroundColor: "#4f2800",
            boxShadow: "0 15px 50px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.5)",
          }}
        >
          <h1 className="font-['Cinzel_Decorative'] text-3xl md:text-4xl text-yellow-200 text-center drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)] tracking-wider mb-2">
            Enter the Tournament
          </h1>
          
          <p className="text-center text-yellow-300 mb-8 text-sm">
            Champions, identify your team to begin the Triwizard Tournament
          </p>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-900/80 border-2 border-red-600 text-red-200 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-yellow-200 font-['Cinzel_Decorative'] mb-3 text-lg pl-3 border-l-4 border-yellow-600">
                Team Name
              </label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                placeholder="e.g., TEAM001"
                className="w-full px-4 py-3 rounded-lg border-2 border-yellow-800 bg-[#3a1d00]/80 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 shadow-inner text-yellow-100 placeholder-yellow-300/50 transition-all duration-300"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-yellow-200 font-['Cinzel_Decorative'] mb-3 text-lg pl-3 border-l-4 border-yellow-600">
                Team Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your magical password"
                className="w-full px-4 py-3 rounded-lg border-2 border-yellow-800 bg-[#3a1d00]/80 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 shadow-inner text-yellow-100 placeholder-yellow-300/50 transition-all duration-300"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-8 py-4 text-xl font-['Cinzel_Decorative'] text-black rounded-full shadow-[0_0_25px_rgba(255,215,0,0.9)] border-2 border-yellow-600/50 transition-all duration-300 ${
                  isLoading 
                    ? "bg-gradient-to-r from-gray-500 to-gray-600 cursor-not-allowed" 
                    : "bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 hover:scale-105 hover:shadow-[0_0_35px_rgba(255,215,0,1)] hover:from-yellow-400 hover:to-yellow-400"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  "Begin the Challenge"
                )}
              </button>
            </div>
          </form>

          {/* Decorative elements */}
          <div className="mt-8 flex justify-center space-x-4 opacity-60">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full shadow-lg"></div>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full shadow-lg"></div>
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-800 rounded-full shadow-lg"></div>
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full shadow-lg"></div>
          </div>
          
          <p className="text-center text-yellow-400/70 text-xs mt-4 font-['Cinzel_Decorative']">
            "The Tournament has begun..."
          </p>
        </div>

        {/* Floating magical particles */}
        <div className="absolute top-1/4 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 left-8 w-1 h-1 bg-red-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-12 w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}