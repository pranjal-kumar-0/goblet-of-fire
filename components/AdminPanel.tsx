"use client";
import React, { useState, useEffect } from 'react';
import { tournamentTimer } from '@/lib/TournamentTimer';

export default function AdminPanel() {
  const [tournamentState, setTournamentState] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [roundDuration, setRoundDuration] = useState(60); // Default 60 minutes
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await tournamentTimer.initialize();
      setTournamentState(tournamentTimer.getTournamentState());
      setIsInitialized(true);
    };
    initialize();
  }, []);

  const handleStartTournament = async () => {
    setIsStarting(true);
    try {
      const durationMs = roundDuration * 60 * 1000; // Convert minutes to milliseconds
      const success = await tournamentTimer.startTournament(durationMs);
      if (success) {
        setTournamentState(tournamentTimer.getTournamentState());
        alert('Tournament started successfully!');
      } else {
        alert('Failed to start tournament');
      }
    } catch (error) {
      alert('Error starting tournament');
    } finally {
      setIsStarting(false);
    }
  };

  const handleStopTournament = async () => {
    setIsStopping(true);
    try {
      const success = await tournamentTimer.stopTournament();
      if (success) {
        setTournamentState(null);
        alert('Tournament stopped successfully!');
      } else {
        alert('Failed to stop tournament');
      }
    } catch (error) {
      alert('Error stopping tournament');
    } finally {
      setIsStopping(false);
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getTimeUntilRoundEnd = (roundNumber: number) => {
    if (!tournamentState) return 0;
    const now = tournamentTimer.getSynchronizedTime();
    const roundStartTime = tournamentState.roundStartTime + 
                          ((roundNumber - 1) * tournamentState.roundDuration);
    const roundEndTime = roundStartTime + tournamentState.roundDuration;
    return Math.max(0, roundEndTime - now);
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-red-950 to-black">
        <div className="text-yellow-300 font-['Cinzel_Decorative'] text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-300 mb-8 font-['Cinzel_Decorative'] text-center tracking-wider drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
          Tournament Admin Panel
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tournament Controls */}
          <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-600/50 rounded-lg p-6 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
            <h2 className="text-2xl font-['Cinzel_Decorative'] text-yellow-300 mb-6">
              Tournament Controls
            </h2>

            {!tournamentState ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-yellow-200 font-['Cinzel_Decorative'] mb-2">
                    Round Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={roundDuration}
                    onChange={(e) => setRoundDuration(parseInt(e.target.value) || 60)}
                    min="1"
                    max="180"
                    className="w-full px-4 py-2 rounded-lg border-2 border-yellow-800 bg-[#3a1d00]/80 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400"
                  />
                </div>
                <button
                  onClick={handleStartTournament}
                  disabled={isStarting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-['Cinzel_Decorative'] text-lg font-semibold rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.7)] hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isStarting ? 'Starting Tournament...' : 'Start Tournament'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-yellow-200">
                  <p><strong>Status:</strong> <span className="text-green-300">Active</span></p>
                  <p><strong>Started:</strong> {formatTime(tournamentState.roundStartTime)}</p>
                  <p><strong>Round Duration:</strong> {Math.round(tournamentState.roundDuration / (60 * 1000))} minutes</p>
                  <p><strong>Current Round:</strong> {tournamentState.currentRound}</p>
                </div>
                <button
                  onClick={handleStopTournament}
                  disabled={isStopping}
                  className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-['Cinzel_Decorative'] text-lg font-semibold rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.7)] hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isStopping ? 'Stopping Tournament...' : 'Stop Tournament'}
                </button>
              </div>
            )}
          </div>

          {/* Round Status */}
          <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-600/50 rounded-lg p-6 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
            <h2 className="text-2xl font-['Cinzel_Decorative'] text-yellow-300 mb-6">
              Round Status
            </h2>

            {tournamentState ? (
              <div className="space-y-4">
                {[1, 2, 3].map(roundNumber => {
                  const timeLeft = getTimeUntilRoundEnd(roundNumber);
                  const roundStartTime = tournamentState.roundStartTime + 
                                        ((roundNumber - 1) * tournamentState.roundDuration);
                  const roundEndTime = roundStartTime + tournamentState.roundDuration;
                  const now = tournamentTimer.getSynchronizedTime();
                  
                  let status = 'Waiting';
                  let statusColor = 'text-yellow-300';
                  
                  if (now >= roundStartTime && now < roundEndTime) {
                    status = 'Active';
                    statusColor = 'text-green-300';
                  } else if (now >= roundEndTime) {
                    status = 'Completed';
                    statusColor = 'text-blue-300';
                  }

                  return (
                    <div key={roundNumber} className="border border-yellow-600/30 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-['Cinzel_Decorative'] text-yellow-200">
                          Round {roundNumber}
                        </h3>
                        <span className={`font-bold ${statusColor}`}>{status}</span>
                      </div>
                      <div className="text-sm text-yellow-200/80">
                        <p>Starts: {formatTime(roundStartTime)}</p>
                        <p>Ends: {formatTime(roundEndTime)}</p>
                        {timeLeft > 0 && (
                          <p>Time Left: {Math.floor(timeLeft / (60 * 1000))}m {Math.floor((timeLeft % (60 * 1000)) / 1000)}s</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-yellow-200 text-center">
                No tournament active
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-gradient-to-r from-yellow-900/20 to-yellow-800/20 border border-yellow-600/30 rounded-lg p-6">
          <h3 className="text-xl font-['Cinzel_Decorative'] text-yellow-300 mb-4">
            Admin Instructions
          </h3>
          <div className="text-yellow-200 space-y-2">
            <p>• Set the round duration before starting the tournament</p>
            <p>• All teams will start Round 1 simultaneously when you click "Start Tournament"</p>
            <p>• Rounds 2 and 3 will automatically unlock based on timing and completion</p>
            <p>• Teams can only access the next round after completing the previous one</p>
            <p>• Use "Stop Tournament" to end the tournament early if needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}


