'use client';
import React from 'react';

const MagicHeading1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="font-['Cinzel_Decorative'] text-4xl md:text-5xl text-purple-300 drop-shadow-[0_0_15px_rgba(147,51,234,0.8)] tracking-widest mb-6 text-center">
    {children}
  </h1>
);

const MagicParagraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg text-purple-100/90 leading-relaxed mb-4 font-serif tracking-wide">
    {children}
  </p>
);

export default function Question3() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-stone-950 to-black flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-purple-700/40 shadow-[0_0_40px_rgba(147,51,234,0.3)]">
        <MagicHeading1>The Astrolabe of Worlds</MagicHeading1>
        <MagicParagraph>
          You find yourself in a forgotten chamber deep beneath the castle, a place whispered about only in hushed tones: the Astrolabe of Worlds. In the center of the room, floating above a pedestal of polished obsidian, is a colossal, shimmering map of the known magical world.
        </MagicParagraph>
        <MagicParagraph>
          As you draw closer, drawn by a faint hum of ancient magic, a script of liquid silver flows across the surface of the map, forming a message meant only for you:
        </MagicParagraph>
        <div className="mt-6 p-6 border-2 border-purple-600/60 bg-black/90 rounded-lg shadow-[0_0_20px_rgba(147,51,234,0.6)] text-center">
          <p className="text-purple-200 font-serif text-lg italic leading-relaxed">
            "Behold this grand Orrery, a marvel of enchanted craft. It shows the world in its entirety, yet it is blind. It knows the ley lines of the earth and the passage of the stars, but it does not know the wizard who stands before it. It is a window to everywhere, yet it is bound to this very room.
            <br /><br />
            The final enchantment, the one that holds the true secret, cannot be unlocked by a magic so vast and impersonal. It requires a more intimate bond. The path forward will only reveal itself through a charmed slate you carry—one that knows your touch.
            <br /><br />
            Only when this world is viewed through such a personal glass will the warmth you seek finally reveal its location."
          </p>
        </div>
      </div>
    </div>
  );
}
