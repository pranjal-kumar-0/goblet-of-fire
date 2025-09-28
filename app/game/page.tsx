"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface TeamInfo {
    teamId: string;
    name: string;
    house: string;
}

export default function Game() {
    const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedTeamInfo = localStorage.getItem('teamInfo');
        if (storedTeamInfo) {
            setTeamInfo(JSON.parse(storedTeamInfo));
        } else {
            // Redirect to login if no team info found
            router.push('/auth/login');
        }
        setIsLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('teamInfo');
        router.push('/');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-red-950 to-black">
                <div className="text-yellow-300 font-['Cinzel_Decorative'] text-2xl">Loading...</div>
            </div>
        );
    }

    if (!teamInfo) {
        return null; // Will redirect to login
    }

    const getHouseColor = (house: string) => {
        switch (house?.toLowerCase()) {
            case 'gryffindor': return 'from-red-600 to-red-800';
            case 'slytherin': return 'from-green-600 to-green-800';
            case 'hufflepuff': return 'from-yellow-600 to-yellow-800';
            case 'ravenclaw': return 'from-blue-600 to-blue-800';
            default: return 'from-yellow-600 to-yellow-800';
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-red-950 to-black px-4">
            {/* Team Info Header */}
            <div className="absolute top-6 right-6 flex items-center space-x-4">
                <div className="text-right">
                    <div className="text-yellow-200 font-['Cinzel_Decorative'] text-lg">{teamInfo.name}</div>
                    <div className={`text-sm px-3 py-1 rounded-full bg-gradient-to-r ${getHouseColor(teamInfo.house)} text-white font-semibold`}>
                        {teamInfo.house}
                    </div>
                </div>
                <button 
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm bg-red-800 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                    Logout
                </button>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-300 mb-4 font-['Cinzel_Decorative'] text-center tracking-wider drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
                Triwizard Tournament
            </h1>
            
            <p className="text-yellow-200 mb-8 text-center font-['Cinzel_Decorative'] text-lg">
                Choose your challenge, Champion {teamInfo.name}
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <Link href={'/game/1'}>
                    <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black font-['Cinzel_Decorative'] text-lg font-semibold shadow-[0_0_20px_rgba(255,215,0,0.7)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,1)] transition-all duration-300 border-2 border-yellow-600/50">
                        First Task
                    </button>
                </Link>
                <Link href={'/game/2'}>
                    <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black font-['Cinzel_Decorative'] text-lg font-semibold shadow-[0_0_20px_rgba(255,215,0,0.7)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,1)] transition-all duration-300 border-2 border-yellow-600/50">
                        Second Task
                    </button>
                </Link>
                <Link href={'/game/3'}>
                    <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black font-['Cinzel_Decorative'] text-lg font-semibold shadow-[0_0_20px_rgba(255,215,0,0.7)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,1)] transition-all duration-300 border-2 border-yellow-600/50">
                        Third Task
                    </button>
                </Link>
            </div>
        </div>
    );
}