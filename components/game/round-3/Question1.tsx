'use client';
import React from 'react';

const MagicHeading1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="font-['Cinzel_Decorative'] text-4xl md:text-5xl text-fuchsia-300 drop-shadow-[0_0_15px_rgba(255,0,255,0.8)] tracking-widest mb-6 text-center">
    {children}
  </h1>
);

const MagicParagraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg text-fuchsia-100/90 leading-relaxed mb-4 font-serif tracking-wide">
    {children}
  </p>
);

export default function Question1() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-stone-950 to-black flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-fuchsia-700/40 shadow-[0_0_40px_rgba(255,0,255,0.3)]">
        <MagicHeading1>The Forbidden Forest</MagicHeading1>
        <MagicParagraph>
          You find yourself at the edge of the Forbidden Forest, the air colder than the castle halls you left behind. The canopy sways with an otherworldly rhythm, and the trees seem alive, leaning closer with every step. The moonlight pierces through the branches in fractured beams, illuminating carvings on the bark.
        </MagicParagraph>
        <MagicParagraph>
          The symbols are runes you’ve seen in Ancient Studies, not scribbles from mischievous students. They glow faintly, rearranging themselves into repeating patterns. The whisper of leaves almost sounds like words, urging you: “Decode us, young wizard, and the warmth you seek shall reveal itself.”
        </MagicParagraph>
        <div className="mt-6 p-6 border-2 border-fuchsia-600/60 bg-black/90 rounded-lg shadow-[0_0_20px_rgba(255,0,255,0.6)] text-center">
          <p className="text-fuchsia-300 font-mono text-4xl font-bold tracking-widest drop-shadow-[0_0_25px_rgba(255,0,255,1)]">ᛊᛖᛖᚲ ᚦᛖᛊᛖᚲᚱᛖᛏ ᚹᚨᚱᛗᚦ</p>
        </div>
      </div>
    </div>
  );
}
