"use client";
import React from "react";

export default function Game() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black flex items-center justify-center px-4 py-8 font-serif">
            <div className="relative max-w-2xl w-full">
                <div className="absolute -top-8 -left-8 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-red-700 flex items-center justify-center shadow-[0_0_25px_5px_rgba(255,215,0,0.9)] animate-pulse z-20">
                    <span className="text-4xl drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]">G</span>
                </div>

                <div
                    className="w-full rounded-2xl shadow-2xl border-4 border-yellow-700 p-8 sm:p-10 text-center"
                    style={{
                        backgroundColor: "#1a2c5a", // A mysterious blue
                        boxShadow: "0 10px 40px rgba(0,0,0,0.7), inset 0 0 15px rgba(0,0,0,0.5)",
                    }}
                >
                    <h1 className="font-['Cinzel_Decorative'] text-4xl sm:text-5xl text-yellow-200 text-center drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] tracking-wider mb-12">
                        Round 1: The Magical Games
                    </h1>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        {/* Game 1 Button */}
                        <a href={"/game/1"}>
                            <button
                                className="px-8 py-4 text-xl font-['Cinzel_Decorative'] text-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.8)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,1)] transition-all duration-300 border-2 border-yellow-600/50 w-48"
                            >
                                Game 1
                            </button>
                        </a>

                        {/* Game 2 Button */}
                        <a href={"/game/2"}>
                             <button
                                className="px-8 py-4 text-xl font-['Cinzel_Decorative'] text-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.8)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,1)] transition-all duration-300 border-2 border-yellow-600/50 w-48"
                            >
                                Game 2
                            </button>
                        </a>

                        {/* Game 3 Button */}
                        <a href={"/game/3"}>
                             <button
                                className="px-8 py-4 text-xl font-['Cinzel_Decorative'] text-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.8)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,1)] transition-all duration-300 border-2 border-yellow-600/50 w-48"
                            >
                                Game 3
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

