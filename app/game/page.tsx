import Link from "next/link";
import GameNavbar from "@/components/GameNavbar";

function GameContent() {
    return (
        <>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-300 mb-4 font-['Cinzel_Decorative'] text-center tracking-wider drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
                Triwizard Tournament
            </h1>
            
            <p className="text-yellow-200 mb-8 text-center font-['Cinzel_Decorative'] text-lg">
                Choose your challenge, Champions
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <Link href={'/game/1'}>
                    <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black font-['Cinzel_Decorative'] text-lg font-semibold shadow-[0_0_20px_rgba(255,215,0,0.7)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,1)] transition-all duration-300 border-2 border-yellow-600/50">
                         Round 1
                    </button>
                </Link>
                <Link href={'/game/2'}>
                    <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black font-['Cinzel_Decorative'] text-lg font-semibold shadow-[0_0_20px_rgba(255,215,0,0.7)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,1)] transition-all duration-300 border-2 border-yellow-600/50">
                        Round 2
                    </button>
                </Link>
                <Link href={'/game/3'}>
                    <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black font-['Cinzel_Decorative'] text-lg font-semibold shadow-[0_0_20px_rgba(255,215,0,0.7)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,1)] transition-all duration-300 border-2 border-yellow-600/50">
                        Round 3
                    </button>
                </Link>
            </div>
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