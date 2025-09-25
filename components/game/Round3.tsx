'use client';
import React, { useState, ReactNode } from 'react';


const LumosFont = ({ children, className }: { children: ReactNode; className?: string }) => (
  <h1 className={`font-lumos text-4xl md:text-5xl text-amber-200 tracking-wider text-center ${className}`}>
    {children}
  </h1>
);

const MagicHeading1 = ({ children }: { children: ReactNode }) => (
    <h1 className="font-lumos text-4xl md:text-5xl text-amber-200 tracking-wider mb-6">
        {children}
    </h1>
);

const MagicParagraph = ({ children }: { children: ReactNode }) => (
    <p className="text-lg text-amber-50 leading-relaxed mb-4">
        {children}
    </p>
);

const MagicHeading = ({ children }: { children: ReactNode }) => (
    <h2 className="font-lumos text-2xl text-amber-200 tracking-wider mb-4 border-b-2 border-amber-800 pb-2">
        {children}
    </h2>
);

// --- CONTENT PAGES (Treated as components) ---

const GeneralInstructionsPage = () => (
    <div className="max-w-4xl">
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

const Theme1Page = () => (
    <div className="max-w-4xl">
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

const Theme2Page = () => (
    <div className="max-w-4xl">
        <MagicHeading1>Theme 2: Charms</MagicHeading1>
        <MagicParagraph>
            The second task requires mastery of Charms. You will face a series of obstacles that can only be overcome
            with the correct incantation and wand movement. Focus and precision are paramount.
        </MagicParagraph>
    </div>
);
const Theme3Page = () => (
    <div className="max-w-4xl">
        <MagicHeading1>Theme 3: Herbology</MagicHeading1>
        <MagicParagraph>
            Venture into the greenhouse for the third task. You must correctly identify and handle several dangerous
            magical plants. Mind the Devil's Snare and wear your dragon-hide gloves.
        </MagicParagraph>
    </div>
);
const Theme4Page = () => (
    <div className="max-w-4xl">
        <MagicHeading1>Theme 4: Quidditch</MagicHeading1>
        <MagicParagraph>
            The final challenge takes place on the Quidditch pitch. Your flying skills will be put to the test as you
            navigate a treacherous aerial obstacle course. Speed and agility are your greatest allies.
        </MagicParagraph>
    </div>
);


// --- MAIN COMPONENT ---
export default function Round3Page() {
  const [activePage, setActivePage] = useState('landing'); // 'landing', 'instructions', 'theme-1', etc.

  const pages = [
    { id: 'instructions', name: 'General Instructions', component: <GeneralInstructionsPage /> },
    { id: 'theme-1', name: 'Theme 1: Potions', component: <Theme1Page /> },
    { id: 'theme-2', name: 'Theme 2: Charms', component: <Theme2Page /> },
    { id: 'theme-3', name: 'Theme 3: Herbology', component: <Theme3Page /> },
    { id: 'theme-4', name: 'Theme 4: Quidditch', component: <Theme4Page /> },
  ];

  const renderContent = () => {
    const page = pages.find(p => p.id === activePage);
    return page ? page.component : <GeneralInstructionsPage />;
  };

  // View 1: The initial landing page
  if (activePage === 'landing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 p-8" style={{
        backgroundImage: 'url(https://www.transparenttextures.com/patterns/dark-leather.png)',
        backgroundAttachment: 'fixed'
      }}>
        <div className="w-full max-w-2xl mx-auto bg-stone-800/50 backdrop-blur-sm rounded-lg shadow-2xl p-8 border border-amber-800">
          <LumosFont>Welcome to Round 3</LumosFont>
          <p className="text-amber-100 text-center my-6 text-lg">
            The final challenge awaits. Before you proceed, you must read the ancient scrolls of instruction.
            Only the prepared will succeed.
          </p>
          <div className="text-center mt-8">
            <button
              onClick={() => setActivePage('instructions')}
              className="inline-block bg-amber-600 text-stone-900 font-bold py-3 px-8 rounded-md hover:bg-amber-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-900/30"
            >
              Read the Instructions
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // View 2: The instructions layout with sidebar
  return (
    <div className="min-h-screen bg-stone-900 text-gray-300" style={{
        backgroundImage: 'url(https://www.transparenttextures.com/patterns/dark-leather.png)',
        backgroundAttachment: 'fixed'
      }}>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 lg:w-72 bg-stone-800/60 backdrop-blur-sm p-6 border-r border-amber-900">
          <MagicHeading>The Marauder's Map</MagicHeading>
          <nav>
            <ul>
              {pages.map((page) => (
                <li key={page.id} className="mb-2">
                  <button
                    onClick={() => setActivePage(page.id)}
                    className={`block w-full text-left p-3 rounded-md text-amber-100 hover:bg-amber-800/50 transition-colors duration-300 ${activePage === page.id ? 'bg-amber-800/60' : ''}`}
                  >
                    {page.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

