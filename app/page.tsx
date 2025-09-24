'use client';

import Link from "next/link";
import { useAuth, AuthProvider } from "../auth/hooks/useAuth";

const buttonClass = "px-6 py-3 text-lg sm:text-xl font-['Cinzel_Decorative'] rounded-full hover:scale-105 transition-all duration-300";

function HomeContent() {
  const { currentUser } = useAuth();

  const buttons = [
    ...(!currentUser ? [{
      href: "/form",
      text: "🏆 Enter the Tournament", 
      className: `${buttonClass} text-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 shadow-[0_0_15px_rgba(255,255,0,0.9)] hover:shadow-[0_0_25px_rgba(255,255,0,1)]`
    }] : [{
      href: "/auth",
      text: "✨ Champion Selected",
      className: `${buttonClass} text-black bg-gradient-to-r from-green-400 via-green-300 to-green-500 shadow-[0_0_15px_rgba(0,255,0,0.9)] hover:shadow-[0_0_25px_rgba(0,255,0,1)]`
    }]),
    {
      href: "/tournament", 
      text: "🔥 Tournament Tasks",
      className: `${buttonClass} text-yellow-200 bg-gradient-to-r from-red-800 via-red-700 to-red-800 border-2 border-yellow-600 shadow-[0_0_15px_rgba(255,0,0,0.7)] hover:shadow-[0_0_25px_rgba(255,0,0,1)]`
    },
    {
      href: "/leaderboard",
      text: "🏛️ Champions Hall", 
      className: `${buttonClass} text-yellow-200 bg-gradient-to-r from-purple-800 via-purple-700 to-purple-800 border-2 border-yellow-600 shadow-[0_0_15px_rgba(128,0,128,0.7)] hover:shadow-[0_0_25px_rgba(128,0,128,1)]`
    }
  ];

  return (
    <div className="bg-gradient-to-b from-black via-red-950 to-black h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center space-y-3 text-center">
        <p className="font-['Cinzel_Decorative'] text-2xl sm:text-3xl md:text-4xl text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] tracking-widest">
          WiOS Welcomes You To
        </p>
        <p className="font-['Cinzel_Decorative'] text-4xl sm:text-5xl md:text-7xl text-yellow-300 drop-shadow-[0_0_20px_rgba(255,255,0,0.9)] tracking-widest">
          The Goblet of Fire
        </p>
        <div className="mt-4 w-24 sm:w-32 h-1 bg-gradient-to-r from-yellow-500 via-red-600 to-yellow-500 rounded-full shadow-[0_0_15px_rgba(255,0,0,0.7)]" />
        
        <div className="mt-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {buttons.map((button, index) => (
            <Link key={index} href={button.href}>
              <button className={button.className}>{button.text}</button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  );
}
