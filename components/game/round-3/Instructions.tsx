'use client';
import React from 'react';

const MagicHeading1 = ({ children }: { children: React.ReactNode }) => (
    <h1 className="font-lumos text-4xl md:text-5xl text-amber-200 tracking-wider mb-6">
        {children}
    </h1>
);

const MagicParagraph = ({ children }: { children: React.ReactNode }) => (
    <p className="text-lg text-amber-50 leading-relaxed mb-4">
        {children}
    </p>
);

export default function Instructions() {
    return (
        <div className="max-w-4xl bg-stone-800/60 backdrop-blur-sm p-6 border-r border-amber-900">
            <MagicHeading1>General Instructions</MagicHeading1>
            <MagicParagraph>
                Welcome, student, to the final and most challenging round. The tasks ahead will test your courage,
                your wisdom, and your magical ability. Please read these instructions carefully, as failure to
                adhere to them will result in immediate disqualification.
            </MagicParagraph>
            <MagicParagraph>
                Use the navigation on the left—your own personal Marauder's Map—to view the specific rules for each
                of the four themes. Each theme presents a unique challenge that must be overcome.
            </MagicParagraph>
            <MagicParagraph>
                Remember, the clock is ticking. May your spells be true and your potions potent. Good luck.
            </MagicParagraph>
        </div>
    );
}
