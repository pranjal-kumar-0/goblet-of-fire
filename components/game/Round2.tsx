'use client';
import React from 'react';
import Image from 'next/image';

const MagicHeading1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="font-['Cinzel_Decorative'] text-4xl md:text-5xl text-green-300 drop-shadow-[0_0_15px_rgba(0,255,0,0.8)] tracking-widest text-center mb-6">
    {children}
  </h1>
);

const MagicHeading2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-['Cinzel_Decorative'] text-2xl text-green-200 drop-shadow-[0_0_10px_rgba(0,255,0,0.7)] tracking-wide mb-4 border-b border-green-600/50 pb-2">
    {children}
  </h2>
);

const MagicButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className="group relative px-6 py-3 bg-gradient-to-r from-green-800 to-green-600 hover:from-green-700 hover:to-green-500 
               text-green-100 font-semibold rounded-lg border-2 border-green-500 
               transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,0,0.5)]
               font-['Cinzel'] tracking-wide"
  >
    <span className="relative z-10">{children}</span>
    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-200/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </button>
);

const downloadCard = () => {
  const link = document.createElement('a');
  link.href = '/card.png';
  link.download = 'triwizard-bingo-card.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Round2 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-green-950 to-black text-green-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <MagicHeading1>Round 2: The Bingo Challenge</MagicHeading1>
        
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left side - Instructions */}
          <div className="bg-black/60 backdrop-blur-md rounded-2xl shadow-[0_0_40px_rgba(0,255,0,0.3)] p-8 border border-green-700/40">
            <MagicHeading2>⚡ The Enchanted Bingo Card ⚡</MagicHeading2>
            <div className="space-y-6 text-lg font-serif leading-relaxed">
              <p>
                Welcome, cunning champions! Round 2 is the <strong className="text-green-300">Bingo Challenge</strong>, a devious test of wit and agility conducted in the physical world.
                This is an <em className="text-yellow-300">elimination round</em>, where only the most resourceful shall advance to the final confrontation.
              </p>
              <p>
                You will receive a <strong className="text-green-300">magical Bingo card</strong> inscribed with enigmatic tasks. Your mission is to complete as many as possible within the <strong className="text-red-300">time limit</strong>.
                Each task conquered earns you a mark on your card, bringing you closer to victory.
              </p>
              <p>
                To prove your triumphs, you must <strong className="text-purple-300">capture images</strong> of your team performing each task. These photographs will be examined by the vigilant judges in the Einstein hall to ensure no illusion or deceit.
                Only verified tasks will count towards your serpentine score.
              </p>
              
              <div className="bg-green-900/30 border border-green-600/50 rounded-lg p-4 mt-6">
                <h3 className="font-['Cinzel'] text-xl text-green-200 mb-3 flex items-center">
                  📱 Social Media Magic
                </h3>
                <p className="text-green-100 mb-3">
                  You can share your magical journey with the wizarding world! Upload your bingo card photos to your social media and tag <strong className="text-yellow-300">@wios_vitap</strong> to spread the enchantment!
                </p>
                <p className="text-sm text-green-300 italic">
                  ✨ Let the muggles witness your magical prowess! ✨
                </p>
              </div>
              
              
            </div>
          </div>

          {/* Right side - Bingo Card */}
          <div className="bg-black/60 backdrop-blur-md rounded-2xl shadow-[0_0_40px_rgba(0,255,0,0.3)] p-8 border border-green-700/40">
            <MagicHeading2>🗒️ Your Enchanted Bingo Card 🗒️</MagicHeading2>
            
            <div className="text-center mb-6">
              <div className="relative inline-block group">
                <Image
                  src="/card.png"
                  alt="Triwizard Tournament Bingo Card"
                  width={400}
                  height={400}
                  className="rounded-lg border-4 border-green-600/50 shadow-[0_0_30px_rgba(0,255,0,0.4)] 
                           transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(0,255,0,0.6)] 
                           group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <MagicButton onClick={downloadCard}>
                 Download Your Magical Card
              </MagicButton>
              
             
              
              <p className="text-green-300 text-sm italic">
                "It is our choices that show what we truly are, far more than our abilities." - Dumbledore
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Round2;
