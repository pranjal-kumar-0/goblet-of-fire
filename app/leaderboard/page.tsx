"use client"
import React, { useEffect, useState } from 'react'

interface User {
    id: string;
    userScore: number;
    timestamp: { _seconds: number; _nanoseconds: number };
    uid: string;
    email: string;
    score: number;
}

const page = () => {
    const [leaderboard, setLeaderboard] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            const res = await fetch("/api/leaderboard");
            if (!res.ok) { throw new Error("Failed to fetch leaderboard") }
            const data = await res.json();
            const sortedUsers = data.usersWithScore.sort((a: User, b: User) => b.score - a.score);
            setLeaderboard(sortedUsers);
            setLoading(false);
        }
        fetchLeaderboard()
    }, [])

    const getNameFromEmail = (email: string) => {
        return email.split('@')[0].split('.')[0];
    }

    const formatDate = (timestamp: { _seconds: number; _nanoseconds: number }) => {
        const date = new Date(timestamp._seconds * 1000);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }

    return (
        <div className="bg-gradient-to-b from-black via-red-950 to-black h-screen flex flex-col">
            {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                    <img src="/wand.png" alt="Wand" className="w-16 h-16 animate-spin" />
                    <p className="font-['Cinzel_Decorative'] text-2xl text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">
                        Accio Leaderboard!
                    </p>
                </div>
            ) : (
                <>
                    <div className="flex flex-col items-center space-y-6 text-center py-8">
                        <p className="font-['Cinzel_Decorative'] text-3xl sm:text-4xl md:text-5xl text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] tracking-widest">
                            Leaderboard
                        </p>
                        <div className="w-32 sm:w-40 h-1 bg-gradient-to-r from-yellow-500 via-red-600 to-yellow-500 rounded-full shadow-[0_0_15px_rgba(255,0,0,0.7)]" />
                    </div>
                    <div className="flex-1 overflow-y-auto px-4">
                        <div className="w-full max-w-4xl mx-auto space-y-4">
                            {leaderboard.slice(0, 3).map((user, index) => (
                                <div key={user.id} className={`p-6 rounded-lg border-2 ${index === 0 ? 'bg-gradient-to-r from-yellow-900 to-yellow-800 border-yellow-400 text-yellow-100' : index === 1 ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-gray-400 text-gray-100' : 'bg-gradient-to-r from-amber-900 to-amber-800 border-amber-600 text-amber-100'} shadow-lg`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className={`font-['Cinzel_Decorative'] text-3xl ${index === 0 ? 'text-yellow-300' : index === 1 ? 'text-gray-300' : 'text-amber-300'}`}>
                                                #{index + 1}
                                            </div>
                                            <div>
                                                <p className="font-['Cinzel_Decorative'] text-2xl capitalize">
                                                    {getNameFromEmail(user.id)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`font-['Cinzel_Decorative'] text-4xl ${index === 0 ? 'text-yellow-200' : index === 1 ? 'text-gray-200' : 'text-amber-200'}`}>
                                            {user.score}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {leaderboard.slice(3).map((user, index) => (
                                <div key={user.id} className="flex justify-between items-center text-yellow-200 font-['Cinzel_Decorative'] text-lg sm:text-xl px-4 py-2 border-b border-yellow-500/30">
                                    <span>#{index + 4} {getNameFromEmail(user.id)}</span>
                                    <span>{user.score} points</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default page
