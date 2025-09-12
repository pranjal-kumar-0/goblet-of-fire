import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-black via-red-950 to-black h-screen flex items-center justify-center px-4 ">
      <div className="flex flex-col items-center space-y-3 text-center">
        <p className="font-['Cinzel_Decorative'] text-2xl sm:text-3xl md:text-4xl text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] tracking-widest">
          WiOS Welcomes You To
        </p>

        <p className="font-['Cinzel_Decorative'] text-4xl sm:text-5xl md:text-7xl text-yellow-300 drop-shadow-[0_0_20px_rgba(255,255,0,0.9)] tracking-widest">
          The Goblet of Fire
        </p>

        <div className="mt-4 w-24 sm:w-32 h-1 bg-gradient-to-r from-yellow-500 via-red-600 to-yellow-500 rounded-full shadow-[0_0_15px_rgba(255,0,0,0.7)]" />
        <Link href={"/form"}>
          <button className="mt-6 px-6 py-3 text-lg sm:text-xl font-['Cinzel_Decorative'] text-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-full shadow-[0_0_15px_rgba(255,255,0,0.9)] hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,0,1)] transition-all duration-300">
            Enter the Tournament
          </button>
        </Link>
      </div>
    </div>
  );
}
