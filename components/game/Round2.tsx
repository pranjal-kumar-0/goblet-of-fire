'use client';
import React from 'react';

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

const Round2 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-green-950 to-black text-green-100 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <MagicHeading1>Round 2: The Bingo Challenge</MagicHeading1>
        <div className='flex items-center justify-center h-full'>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div className="bg-black/60 backdrop-blur-md rounded-2xl shadow-[0_0_40px_rgba(0,255,0,0.3)] p-10 border border-green-700/40">
          <MagicHeading2>The Enchanted Bingo Card</MagicHeading2>
          <div className="space-y-6 text-lg font-serif leading-relaxed">
            <p>
              Welcome, cunning champions! Round 2 is the <strong>Bingo Challenge</strong>, a devious test of wit and agility conducted in the physical world.
              This is an <em>elimination round</em>, where only the most resourceful shall slither forward to the final confrontation.
            </p>
            <p>
              You will be provided with a <strong>magical Bingo card</strong> inscribed with enigmatic tasks. Your mission is to complete as many as possible within the <strong>time limit</strong>.
              Each task conquered earns you a mark on your card, bringing you closer to victory.
            </p>
            <p>
              To prove your triumphs, you must <strong>capture images</strong> of your team performing each task. These photographs will be examined by the vigilant judges to ensure no illusion or deceit.
              Only verified tasks will count towards your serpentine score.
            </p>
            <p>
              Remember, champions: cunning, speed, and teamwork are your greatest allies. The Chamber of Secrets hides many riddles, but the ambitious shall prevail!
              May your ambitions be fulfilled and your wands unwavering.
            </p>
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Round2;
