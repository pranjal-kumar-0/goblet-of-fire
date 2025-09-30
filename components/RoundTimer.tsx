"use client";
import React, { useState, useEffect } from 'react';
import { tournamentTimer } from '@/lib/TournamentTimer';

interface RoundTimerProps {
  roundNumber: number;
  onStatusChange?: (status: 'waiting' | 'active' | 'completed' | 'locked') => void;
}

export default function RoundTimer({ roundNumber, onStatusChange }: RoundTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [status, setStatus] = useState<'waiting' | 'active' | 'completed' | 'locked'>('locked');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeTimer = async () => {
      await tournamentTimer.initialize();
      setIsInitialized(true);
    };
    
    initializeTimer();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const updateTimer = () => {
      const currentStatus = tournamentTimer.getRoundStatus(roundNumber);
      setStatus(currentStatus);
      
      if (onStatusChange && currentStatus !== status) {
        onStatusChange(currentStatus);
      }

      if (currentStatus === 'waiting') {
        setTimeLeft(tournamentTimer.getTimeUntilRoundStart(roundNumber));
      } else if (currentStatus === 'active') {
        setTimeLeft(tournamentTimer.getTimeUntilRoundEnd(roundNumber));
      } else {
        setTimeLeft(0);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isInitialized, roundNumber, onStatusChange, status]);

  const formatTime = (milliseconds: number): string => {
    if (milliseconds <= 0) return '0:00';
    
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'waiting': return 'text-yellow-300';
      case 'active': return 'text-green-300';
      case 'completed': return 'text-blue-300';
      case 'locked': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'waiting': return 'Waiting';
      case 'active': return 'Active';
      case 'completed': return 'Completed';
      case 'locked': return 'Locked';
      default: return 'Unknown';
    }
  };

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-yellow-300 font-['Cinzel_Decorative']">Loading timer...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-600/50 rounded-lg p-4 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
      <div className="text-center">
        <h3 className="text-lg font-['Cinzel_Decorative'] text-yellow-300 mb-2">
          Round {roundNumber} Status
        </h3>
        
        <div className={`text-xl font-bold mb-2 ${getStatusColor(status)}`}>
          {getStatusText(status)}
        </div>

        {status === 'waiting' && (
          <div className="text-yellow-200">
            <div className="text-sm mb-1">Starts in:</div>
            <div className="text-2xl font-mono font-bold text-yellow-300">
              {formatTime(timeLeft)}
            </div>
          </div>
        )}

        {status === 'active' && (
          <div className="text-green-200">
            <div className="text-sm mb-1">Time remaining:</div>
            <div className="text-2xl font-mono font-bold text-green-300 animate-pulse">
              {formatTime(timeLeft)}
            </div>
          </div>
        )}

        {status === 'completed' && (
          <div className="text-blue-200">
            <div className="text-sm">Round {roundNumber} has ended</div>
          </div>
        )}

        {status === 'locked' && (
          <div className="text-gray-400">
            <div className="text-sm">Complete previous rounds first</div>
          </div>
        )}
      </div>
    </div>
  );
}


