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

export default function Question3() {
    return (
        <div className="max-w-4xl bg-stone-800/60 backdrop-blur-sm p-6 border-r border-amber-900">
            <MagicHeading1>Theme 3: Herbology</MagicHeading1>
            <MagicParagraph>
                Venture into the greenhouse for the third task. You must correctly identify and handle several dangerous
                magical plants. Mind the Devil's Snare and wear your dragon-hide gloves.
            </MagicParagraph>
        </div>
    );
}
