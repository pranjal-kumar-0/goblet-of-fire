"use client";
import Link from "next/link";
import { useState } from "react";

export default function Letter() {
    const [selectedHouse, setSelectedHouse] = useState("");

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black flex items-center justify-center px-4 py-8 font-serif">
            <div className="relative max-w-2xl w-full">
                <div className="absolute -top-8 -left-8 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-red-700 flex items-center justify-center shadow-[0_0_25px_5px_rgba(255,215,0,0.9)] animate-pulse z-20">
                    <span className="text-4xl drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]">H</span>
                </div>

                <div
                    className="w-full rounded-2xl shadow-2xl border-4 border-yellow-700 p-8 sm:p-10 text-center"
                    style={{
                        backgroundColor: "#4f2800",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.7), inset 0 0 15px rgba(0,0,0,0.5)",
                    }}
                >

                    <h1 className="font-['Cinzel_Decorative'] text-4xl sm:text-5xl text-yellow-200 text-center drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] tracking-wider mb-8">
                        Hogwarts Enrollment Form
                    </h1>

                    <form className="space-y-6 text-left">
                        <div>
                            <label className="block text-yellow-200 font-['Cinzel_Decorative'] mb-2 text-lg pl-3 border-l-4 border-yellow-600">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Albus Percival Wulfric Brian Dumbledore"
                                className="w-full px-4 py-3 rounded-lg border-2 border-yellow-800 bg-[#3a1d00]/80 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner text-yellow-100 placeholder-yellow-300/50"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-yellow-200 font-['Cinzel_Decorative'] mb-2 text-lg pl-3 border-l-4 border-yellow-600">
                                Magical Blood Status
                            </label>
                            <select className="w-full px-4 py-3 rounded-lg border-2 border-yellow-800 bg-[#3a1d00]/80 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner text-yellow-100">
                                <option value="">Select your magical heritage</option>
                                <option value="pure-blood">Pure-blood</option>
                                <option value="half-blood">Half-blood</option>
                                <option value="muggle-born">Muggle-born</option>
                                <option value="squib">Squib</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-yellow-200 font-['Cinzel_Decorative'] mb-2 text-lg pl-3 border-l-4 border-yellow-600">
                                Preferred House
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
                                {[
                                    { name: "Gryffindor", color: "bg-red-800/80", border: "border-red-500", emblem: "🦁" },
                                    { name: "Hufflepuff", color: "bg-yellow-600/80", border: "border-yellow-300", emblem: "🦡" },
                                    { name: "Ravenclaw", color: "bg-blue-800/80", border: "border-blue-400", emblem: "🦅" },
                                    { name: "Slytherin", color: "bg-green-800/80", border: "border-green-500", emblem: "🐍" },
                                ].map((house) => (
                                    <div
                                        key={house.name}
                                        className={`cursor-pointer p-3 rounded-xl text-center transition-all border-2 ${selectedHouse === house.name
                                                ? `${house.color} ${house.border} text-white scale-105 shadow-lg`
                                                : "bg-[#3a1d00]/70 border-yellow-800 text-yellow-200 hover:bg-black/30"
                                            }`}
                                        onClick={() => setSelectedHouse(house.name)}
                                    >
                                        <div className="text-3xl drop-shadow-lg">{house.emblem}</div>
                                        <div className="text-sm font-medium mt-1">{house.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center pt-6">
                             <Link href={"/enroll"}>
                                <button
                                    type="submit"
                                    className="px-8 py-4 text-xl font-['Cinzel_Decorative'] text-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.8)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,1)] transition-all duration-300 border-2 border-yellow-600/50"
                                >
                                    Send My Acceptance Letter
                                </button>
                             </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

