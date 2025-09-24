"use client";
import Link from "next/link";
import React from "react";
export default function Game() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-red-950 to-black">
            <h1 className="text-3xl font-bold text-yellow-300 mb-8 font-['Cinzel_Decorative']">Rounds</h1>
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