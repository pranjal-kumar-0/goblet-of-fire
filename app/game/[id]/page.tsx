"use client";
import Round1 from "@/components/game/Round1";
import Round2 from "@/components/game/Round2";
import Round3 from "@/components/game/round-3/Round3";
import GameNavbar from "@/components/GameNavbar";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const roundId = Number(id);

  const renderRound = () => {
    switch (roundId) {
      case 1: return <Round1 />;
      case 2: return <Round2 />;
      case 3: return <Round3 />;
      default: 
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-['Cinzel_Decorative'] text-red-400 mb-4">Invalid Round</h1>
              <p className="text-yellow-300 mb-6">The requested tournament round does not exist.</p>
              <button 
                onClick={() => router.push('/game')}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black font-['Cinzel_Decorative'] text-lg font-semibold rounded-lg shadow-[0_0_20px_rgba(255,215,0,0.7)] hover:scale-105 transition-all duration-300"
              >
                Return to Tournament
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <GameNavbar className="relative min-h-screen">
      {renderRound()}
    </GameNavbar>
  );
}