"use client";
import Link from "next/link";
import GameNavbar from "@/components/GameNavbar";
import Image from "next/image";
import { useEffect, useState } from "react";

interface GameStatus {
    Round1: boolean;
    Round2: boolean;
    Round3: boolean;
    lastUpdated: string | null;
}

function GameContent() {
    const [gameStatus, setGameStatus] = useState<GameStatus>({
        Round1: false,
        Round2: false,
        Round3: false,
        lastUpdated: null
    });
    const [loading, setLoading] = useState(true);    useEffect(() => {
        const fetchGameStatus = async () => {
            try {
                const response = await fetch('/api/gameStatus');
                const data = await response.json();
                setGameStatus(data);
            } catch (error) {
                console.error('Failed to fetch game status:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGameStatus();

        // Poll every 30 seconds to check for updates
        const interval = setInterval(fetchGameStatus, 30000);

        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-300 mb-4 font-['Cinzel_Decorative'] text-center tracking-wider drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
                Triwizard Tournament
            </h1>
              <p className="text-yellow-200 mb-8 text-center font-['Cinzel_Decorative'] text-lg">
                Choose your challenge, Champions
            </p>

            {loading ? (
                <div className="flex justify-center items-center py-8">
                    <div className="text-yellow-200 font-['Cinzel_Decorative'] text-lg">
                        Loading Tournament Status...
                    </div>
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Round 1 Button */}
                {gameStatus.Round1 ? (
                    <Link href={'/game/trivia-time'}>
                        <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black font-['Cinzel_Decorative'] text-lg font-semibold shadow-[0_0_20px_rgba(255,215,0,0.7)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,1)] transition-all duration-300 border-2 border-yellow-600/50">
                             Round 1
                        </button>
                    </Link>
                ) : (
                    <button 
                        disabled 
                        className="px-8 py-4 rounded-lg bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 text-gray-600 font-['Cinzel_Decorative'] text-lg font-semibold opacity-50 cursor-not-allowed transition-all duration-300 border-2 border-gray-600/50"
                    >
                        Round 1 
                    </button>
                )}

                {/* Round 2 Button */}
                {gameStatus.Round2 ? (
                    <Link href={'/game/bingo-time'}>
                        <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black font-['Cinzel_Decorative'] text-lg font-semibold shadow-[0_0_20px_rgba(255,215,0,0.7)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,1)] transition-all duration-300 border-2 border-yellow-600/50">
                            Round 2
                        </button>
                    </Link>
                ) : (
                    <button 
                        disabled 
                        className="px-8 py-4 rounded-lg bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 text-gray-600 font-['Cinzel_Decorative'] text-lg font-semibold opacity-50 cursor-not-allowed transition-all duration-300 border-2 border-gray-600/50"
                    >
                        Round 2 
                    </button>
                )}

                {/* Round 3 Button */}
                {gameStatus.Round3 ? (
                    <Link href={'/game/find-the-trophy'}>
                        <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black font-['Cinzel_Decorative'] text-lg font-semibold shadow-[0_0_20px_rgba(255,215,0,0.7)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,1)] transition-all duration-300 border-2 border-yellow-600/50">
                            Round 3
                        </button>
                    </Link>
                ) : (
                    <button 
                        disabled 
                        className="px-8 py-4 rounded-lg bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 text-gray-600 font-['Cinzel_Decorative'] text-lg font-semibold opacity-50 cursor-not-allowed transition-all duration-300 border-2 border-gray-600/50"
                    >
                        Round 3 
                    </button>                )}
            </div>
            )}

            <Link href="/leaderboard" className="fixed bottom-8 right-8">
                <div className="w-16 h-16 rounded-full bg-yellow-400/30 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.7)] hover:scale-110 hover:shadow-[0_0_30px_rgba(255,215,0,1)] transition-all duration-300 border-2 border-yellow-600/50">
                    <span className="text-4xl" role="img" aria-label="Leaderboard">🏆</span>
                </div>
            </Link>
        </>
    );
}

export default function Game() {
    return (
        <GameNavbar>
            <GameContent />
        </GameNavbar>
    );
}