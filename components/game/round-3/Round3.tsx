'use client';
import React, { useState } from 'react';
import Instructions from './Instructions';
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';
import Question4 from './Question4';

const LumosFont = ({ children }: { children: React.ReactNode }) => (
  <h1 className="font-lumos text-4xl md:text-5xl text-amber-200 tracking-wider text-center">
    {children}
  </h1>
);

const MagicHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-lumos text-2xl text-amber-200 tracking-wider mb-4 border-b-2 border-amber-800 pb-2">
    {children}
  </h2>
);

export default function Round3Page() {
  const [activePage, setActivePage] = useState('landing');

  const pages = [
    { id: 'instructions', name: 'General Instructions', component: <Instructions /> },
    { id: 'theme-1', name: 'Theme 1: Potions', component: <Question1 /> },
    { id: 'theme-2', name: 'Theme 2: Charms', component: <Question2 /> },
    { id: 'theme-3', name: 'Theme 3: Herbology', component: <Question3 /> },
    { id: 'theme-4', name: 'Theme 4: Quidditch', component: <Question4 /> },
  ];

  const renderContent = () => {
    const page = pages.find(p => p.id === activePage);
    return page ? page.component : <Instructions />;
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0f1f] to-[#000000] text-gray-300" style={{
      backgroundImage: 'url(https://www.transparenttextures.com/patterns/dark-leather.png)',
      backgroundAttachment: 'fixed'
    }}>
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-64 lg:w-72 bg-stone-800/60 backdrop-blur-sm p-6 border-r border-amber-900">
          <MagicHeading>The Marauder's Map</MagicHeading>
          <nav>
            <ul>
              {pages.map(page => (
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

        <main className="flex-1 p-6 md:p-10">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
