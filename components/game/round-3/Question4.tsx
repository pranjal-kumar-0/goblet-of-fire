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

export default function Question4() {
    return (
        <div className="max-w-4xl bg-stone-800/60 backdrop-blur-sm p-6 border-r border-amber-900">
            <MagicHeading1>Theme 4: Quidditch</MagicHeading1>
            <MagicParagraph>
                The final challenge takes place on the Quidditch pitch. Your flying skills will be put to the test as you
                navigate a treacherous aerial obstacle course. Speed and agility are your greatest allies.
            </MagicParagraph>
        </div>
    );
}
