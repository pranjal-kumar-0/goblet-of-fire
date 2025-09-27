"use client";
import Link from "next/link";
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/components/AuthContext";

export default function Game() {
    return (
        <ProtectedRoute>
            <GameContent />
        </ProtectedRoute>
    );
}

function GameContent() {
    const { teamId, logout } = useAuth();
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-red-950 to-black">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-yellow-300 mb-2 font-['Cinzel_Decorative']">Rounds</h1>
                <p className="text-yellow-200">Welcome, Team {teamId}</p>
                <button 
                    onClick={logout}
                    className="mt-2 text-sm text-red-300 hover:text-red-200 underline"
                >
                    Logout
                </button>
            </div>
            <div className="flex space-x-6">
                <Link href={'/game/1'}>
                    <button className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold shadow hover:bg-yellow-300 transition">Round 1</button>
                </Link>
                <Link href={'/game/2'}>
                    <button className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold shadow hover:bg-yellow-300 transition">Round 2 </button>
                </Link>
                <Link href={'/game/3'}>
                    <button className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold shadow hover:bg-yellow-300 transition">Round 3</button>
                </Link>
            </div>
        </div>
    );
}