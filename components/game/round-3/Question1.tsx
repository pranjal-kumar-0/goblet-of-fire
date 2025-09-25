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

export default function Question1() {
    return (
        <div className="max-w-4xl bg-stone-800/60 backdrop-blur-sm p-6 border-r border-amber-900">
            <MagicHeading1>Theme 1: The Art of Potions</MagicHeading1>
            <MagicParagraph>
                In this task, you will be required to brew a potion of considerable complexity. You will be provided
                with all the necessary ingredients, from powdered Bicorn horn to shredded Boomslang skin.
            </MagicParagraph>
            <MagicParagraph>
                Your instructions are to be followed precisely. One wrong stir could turn your Draught of Peace
                into a Potion of Perpetual Panic. Your work will be judged on color, consistency, and magical potency.
                Do not deviate from the recipe.
            </MagicParagraph>
        </div>
    );
}
