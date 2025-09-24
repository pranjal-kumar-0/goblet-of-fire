'use client';

import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

interface Round {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'locked';
  icon: string;
}

export function TriwizardTournament() {
  const rounds: Round[] = [
    {
      id: 1,
      title: 'Round 1: Dragons',
      description: 'Face the Hungarian Horntail and retrieve the golden egg',
      status: 'completed',
      icon: 'I'
    },
    {
      id: 2,
      title: 'Round 2: The Lake',
      description: 'Dive into the Black Lake and rescue what was taken',
      status: 'current',
      icon: 'II'
    },
    {
      id: 3,
      title: 'Round 3: The Maze',
      description: 'Navigate the treacherous maze to reach the Triwizard Cup',
      status: 'locked',
      icon: 'III'
    }
  ];

  const [selectedRound, setSelectedRound] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-800/50 border-green-600 text-green-200';
      case 'current':
        return 'bg-yellow-800/50 border-yellow-600 text-yellow-200';
      case 'locked':
        return 'bg-gray-800/50 border-gray-600 text-gray-400';
      default:
        return 'bg-gray-800/50 border-gray-600 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'current':
        return '⚡';
      case 'locked':
        return '✗';
      default:
        return '✗';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black flex flex-col items-center justify-center px-4 py-8 font-serif">
      <div className="relative max-w-7xl w-full">
        {/* Goblet of Fire Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <h1 className="font-['Cinzel_Decorative'] text-4xl sm:text-5xl md:text-6xl text-yellow-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] tracking-wider">
              Triwizard Tournament
            </h1>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-6xl animate-pulse text-red-500">
              ♦
            </div>
          </div>
          <p className="text-yellow-300/80 mt-4 text-lg italic">
            "Three tasks to test the champions' courage, cunning, and magical prowess"
          </p>
        </div>

        {/* Tournament Rounds */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {rounds.map((round) => (
            <div
              key={round.id}
              className={`
                relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 cursor-pointer
                ${getStatusColor(round.status)}
                ${selectedRound === round.id ? 'ring-4 ring-yellow-400/50 scale-[1.02]' : 'hover:scale-[1.01]'}
                ${round.status === 'locked' ? 'cursor-not-allowed opacity-60' : ''}
              `}
              onClick={() => round.status !== 'locked' && setSelectedRound(selectedRound === round.id ? null : round.id)}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-gradient-to-br from-transparent via-yellow-500/5 to-transparent" />
              </div>

              <div className="relative flex flex-col items-center text-center">
                <div className="text-5xl mb-3">{round.icon}</div>
                <h2 className="font-['Cinzel_Decorative'] text-xl font-bold mb-2">
                  {round.title}
                </h2>
                <p className="text-sm opacity-80 mb-3 line-clamp-2">
                  {round.description}
                </p>
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <span className="text-xl">{getStatusIcon(round.status)}</span>
                  <span className="text-xs font-medium capitalize">
                    {round.status === 'current' ? 'In Progress' : round.status}
                  </span>
                </div>
                {round.status !== 'locked' && (
                  <ChevronRightIcon 
                    className={`w-5 h-5 transition-transform duration-300 ${
                      selectedRound === round.id ? 'rotate-90' : ''
                    }`}
                  />
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Expanded Content Modal */}
        {selectedRound && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedRound(null)}>
            <div className="bg-gradient-to-b from-red-950 to-black border-4 border-yellow-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
              {rounds.filter(r => r.id === selectedRound).map((round) => (
                <div key={round.id} className="animate-fadeIn">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">{round.icon}</div>
                    <h2 className="font-['Cinzel_Decorative'] text-3xl font-bold text-yellow-200 mb-2">
                      {round.title}
                    </h2>
                    <p className="text-yellow-300/80">
                      {round.description}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-['Cinzel_Decorative'] text-lg font-semibold mb-3 text-yellow-200">
                        Challenge Details
                      </h3>
                      <div className="space-y-2 text-sm text-yellow-300/90">
                        {round.id === 1 && (
                          <>
                            <p>• Face the Hungarian Horntail dragon</p>
                            <p>• Retrieve the golden egg without getting burned</p>
                            <p>• Time limit: 20 minutes</p>
                            <p>• Points based on speed and style</p>
                          </>
                        )}
                        {round.id === 2 && (
                          <>
                            <p>• Dive into the depths of the Black Lake</p>
                            <p>• Find and rescue your most precious possession</p>
                            <p>• Beware of merpeople and grindylows</p>
                            <p>• You have exactly one hour</p>
                          </>
                        )}
                        {round.id === 3 && (
                          <>
                            <p>• Navigate the ever-changing magical maze</p>
                            <p>• Overcome enchanted obstacles and creatures</p>
                            <p>• Be the first to touch the Triwizard Cup</p>
                            <p>• Beware: the maze fights back</p>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-['Cinzel_Decorative'] text-lg font-semibold mb-3 text-yellow-200">
                        Magical Preparations
                      </h3>
                      <div className="space-y-2 text-sm text-yellow-300/90">
                        {round.id === 1 && (
                          <>
                            <p>Protection charms recommended</p>
                            <p>Fire-resistance spells essential</p>
                            <p>Speed and agility crucial</p>
                            <p>Precision and timing matter</p>
                          </>
                        )}
                        {round.id === 2 && (
                          <>
                            <p>Bubble-Head Charm or gillyweed</p>
                            <p>Swimming prowess required</p>
                            <p>Ability to communicate underwater</p>
                            <p>Defensive spells for lake creatures</p>
                          </>
                        )}
                        {round.id === 3 && (
                          <>
                            <p>Navigation and pathfinding skills</p>
                            <p>Wide range of combat spells</p>
                            <p>Quick thinking under pressure</p>
                            <p>Mental resistance to dark magic</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {round.status === 'current' && (
                    <div className="mt-6 text-center">
                      <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-['Cinzel_Decorative'] px-8 py-3 rounded-lg font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg transform hover:scale-105">
                        Begin Challenge
                      </button>
                    </div>
                  )}

                  {round.status === 'completed' && (
                    <div className="mt-6 p-4 bg-green-900/30 border border-green-600 rounded-lg text-center">
                      <p className="text-green-200 font-semibold">
                        Challenge Completed! Well done, champion.
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-6 text-center">
                    <button 
                      onClick={() => setSelectedRound(null)}
                      className="px-6 py-2 bg-red-800 hover:bg-red-700 text-yellow-200 font-['Cinzel_Decorative'] rounded-lg transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tournament Progress */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 bg-black/50 rounded-full px-6 py-3 border border-yellow-800">
            <span className="text-yellow-200 font-['Cinzel_Decorative']">Progress:</span>
            <div className="flex space-x-2">
              {rounds.map((round) => (
                <div
                  key={round.id}
                  className={`w-3 h-3 rounded-full ${
                    round.status === 'completed' 
                      ? 'bg-green-500' 
                      : round.status === 'current'
                      ? 'bg-yellow-500 animate-pulse'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-yellow-200/80 text-sm">1 of 3 Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
}