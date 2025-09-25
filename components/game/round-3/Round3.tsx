'use client';
import React, { useState } from 'react';
import Instructions from './Instructions';
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';
import Question4 from './Question4';

const MagicHeading1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="font-['Cinzel_Decorative'] text-4xl md:text-5xl text-yellow-300 drop-shadow-[0_0_15px_rgba(255,255,150,0.8)] tracking-widest text-center mb-6">
    {children}
  </h1>
);

const MagicHeading2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-['Cinzel_Decorative'] text-2xl text-yellow-200 drop-shadow-[0_0_10px_rgba(255,255,150,0.7)] tracking-wide mb-4 border-b border-yellow-600/50 pb-2">
    {children}
  </h2>
);

export default function Round3Page() {
  const [activePage, setActivePage] = useState('landing');

  const pages = [
    { id: 'instructions', name: 'Instructions', component: <Instructions /> },
    { id: 'theme-1', name: 'The Forest', component: <Question1 /> },
    { id: 'theme-2', name: 'The Song', component: <Question2 /> },
    { id: 'theme-3', name: 'The Worlds', component: <Question3 /> },
    { id: 'theme-4', name: 'The Fountain', component: <Question4 /> },
  ];

  const renderContent = () => {
    const page = pages.find(p => p.id === activePage);
    return page ? page.component : <Instructions />;
  };

  // Landing page
  if (activePage === 'landing') {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-gradient-to-b from-black via-stone-950 to-black"
      >
        <div className="w-full max-w-2xl mx-auto bg-black/60 backdrop-blur-md rounded-2xl shadow-[0_0_40px_rgba(255,215,0,0.3)] p-10 border border-yellow-700/40">
          <MagicHeading1>Welcome to Round 3</MagicHeading1>
          <p className="text-yellow-100/90 text-center my-6 text-lg font-serif leading-relaxed">
            The final challenge awaits. Before you proceed, you must read the ancient scrolls of instruction.
            Only the prepared will succeed.
          </p>
          <div className="text-center mt-8">
            <button
              onClick={() => setActivePage('instructions')}
              className="inline-block bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-400 text-black font-bold py-3 px-8 rounded-lg border border-yellow-300/60 shadow-[0_0_20px_rgba(255,215,0,0.6)] hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,150,0.9)] transition-all duration-300"
            >
              Read the Instructions
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main layout
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-black via-stone-950 to-black text-yellow-100"
    >
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 lg:w-72 h-screen bg-black/60 backdrop-blur-md p-6 border-r border-yellow-700/40 shadow-[0_0_30px_rgba(255,215,0,0.2)]">
          <MagicHeading2>The Marauder&apos;s Map</MagicHeading2>
          <nav>
            <ul>
              {pages.map(page => (
                <li key={page.id} className="mb-6">
                  <button
                    onClick={() => setActivePage(page.id)}
                    className={`block w-full text-left p-3 rounded-md font-serif transition-colors duration-300 ${
                      activePage === page.id
                        ? 'bg-yellow-700/40 text-yellow-200 shadow-[0_0_15px_rgba(255,255,150,0.5)]'
                        : 'text-yellow-100 hover:bg-yellow-800/30'
                    }`}
                  >
                    {page.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
