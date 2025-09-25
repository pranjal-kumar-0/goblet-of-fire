'use client';
import React from 'react';

const MagicHeading1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="font-['Cinzel_Decorative'] text-4xl md:text-5xl text-purple-300 drop-shadow-[0_0_15px_rgba(147,51,234,0.8)] tracking-widest mb-6 text-center">
    {children}
  </h1>
);

const MagicParagraph = ({ children, color = 'purple' }: { children: React.ReactNode; color?: string }) => {
  const colorClasses = {
    amber: 'text-amber-100/90',
    yellow: 'text-yellow-100/90',
    orange: 'text-orange-100/90',
    fuchsia: 'text-fuchsia-100/90',
    purple: 'text-purple-100/90',
  };
  return (
    <p className={`text-lg ${colorClasses[color as keyof typeof colorClasses] || colorClasses.purple} leading-relaxed mb-4 font-serif tracking-wide`}>
      {children}
    </p>
  );
};

export default function Instructions() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl bg-gradient-to-br from-black/60 via-stone-900/40 to-black/60 backdrop-blur-md p-8 rounded-2xl border-2 border-amber-500/50 shadow-[0_0_40px_rgba(255,193,7,0.3)] relative">
        <div className="relative z-10">
          <MagicHeading1>General Instructions</MagicHeading1>
          <MagicParagraph>
            Congratulations, champions. You have proven your skill and strength in the trials before, but now you face the final and most mysterious challenge. The path ahead is hidden in layers of enchantments. You will journey through five magical spaces — the forest, the portrait hall, the dungeons, the courtyard, and the library. In each place, a puzzle awaits you.
          </MagicParagraph>
          <MagicParagraph>
            Every puzzle will reveal part of a secret message. Decode each fragment carefully. When you piece them together, they will form a sentence — a single guiding phrase.
          </MagicParagraph>
          <MagicParagraph>
            That phrase will point you toward a very real place in your world. There, the Triwizard Cup has been hidden.
          </MagicParagraph>
          <MagicParagraph>
            Your task:
          </MagicParagraph>
          <MagicParagraph>
            <span className="text-purple-200 font-bold">1. Explore all the other four pages and solve the puzzle.</span><br />
            <span className="text-purple-200 font-bold">2. Collect the decoded phrase fragment.</span><br />
            <span className="text-purple-200 font-bold">3. Assemble all fragments in the right order.</span><br />
            <span className="text-purple-200 font-bold">4. Follow the final message to find the Cup’s location.</span><br />
            <span className="text-purple-200 font-bold">5. The first team to retrieve it and return — wins eternal glory (and this tournament).</span>
          </MagicParagraph>
          <MagicParagraph>
            Remember: magic always rewards the clever, the observant, and the determined. Trust your wits, trust your team, and let the hunt begin.
          </MagicParagraph>
        </div>
      </div>
    </div>
  );
}
