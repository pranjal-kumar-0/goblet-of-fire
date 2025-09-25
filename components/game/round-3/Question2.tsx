'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';

const MagicHeading1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="font-['Cinzel_Decorative'] text-4xl md:text-5xl text-yellow-300 drop-shadow-[0_0_15px_rgba(255,255,150,0.8)] tracking-widest mb-6 text-center">
    {children}
  </h1>
);

const MagicParagraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg text-yellow-100/90 leading-relaxed mb-4 font-serif tracking-wide">
    {children}
  </p>
);

// Simple time formatter
const formatTime = (secs: number) => {
  if (isNaN(secs) || secs === Infinity) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const MagicAudioPlayer: React.FC<{ src: string; title?: string }> = ({ src, title = 'Enchanted Transmission' }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hoverTime, setHoverTime] = useState<number | null>(null);

  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
    } else {
      el.pause();
    }
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTime = () => setCurrentTime(el.currentTime);
    const onLoaded = () => setDuration(el.duration);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('loadedmetadata', onLoaded);
    return () => {
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('loadedmetadata', onLoaded);
    };
  }, []);

  const seek = (clientX: number) => {
    const bar = progressRef.current;
    const audio = audioRef.current;
    if (!bar || !audio) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(Math.max(0, clientX - rect.left), rect.width) / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  const handleProgressClick = (e: React.MouseEvent) => {
    seek(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const bar = progressRef.current;
    const audio = audioRef.current;
    if (!bar || !audio) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width;
    setHoverTime(ratio * audio.duration);
  };

  const handleLeave = () => setHoverTime(null);

  return (
    <div className="mt-6 p-6 rounded-xl border border-yellow-600/40 bg-gradient-to-br from-black/70 via-stone-900/60 to-black/70 shadow-[0_0_20px_rgba(255,215,0,0.3)]">
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="relative group w-16 h-16 rounded-full bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-400 border border-yellow-300/60 flex items-center justify-center text-black font-bold shadow-[0_0_20px_rgba(255,215,0,0.7)] hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,150,0.9)] transition-all duration-300"
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        >
          <span className="font-['Cinzel_Decorative'] text-2xl">{isPlaying ? '❚❚' : '▶'}</span>
        </button>

        <div className="flex-1">
          <h3 className="font-['Cinzel_Decorative'] text-lg text-yellow-300 drop-shadow-[0_0_10px_rgba(255,255,150,0.6)] mb-2">
            {title}
          </h3>
          <div
            ref={progressRef}
            className="relative h-3 bg-yellow-900/40 rounded cursor-pointer group overflow-hidden"
            onClick={handleProgressClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleLeave}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-700/40 to-yellow-400/30 animate-pulse" />
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 shadow-[0_0_10px_rgba(255,255,150,0.8)]"
              style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
            />
            {hoverTime !== null && (
              <div
                className="absolute top-0 -translate-y-full px-2 py-1 mb-1 rounded bg-black/90 text-yellow-200 text-xs border border-yellow-500/50 font-mono"
                style={{ left: `${(hoverTime / (duration || 1)) * 100}%` }}
              >
                {formatTime(hoverTime)}
              </div>
            )}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-yellow-300 border border-yellow-100 shadow-[0_0_10px_rgba(255,255,150,0.9)]"
              style={{ left: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs font-mono text-yellow-200/80">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={src} preload="metadata" className="hidden" />
    </div>
  );
};

export default function Question2() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-stone-950 to-black flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-yellow-700/40 shadow-[0_0_40px_rgba(255,215,0,0.3)]">
        <MagicHeading1>The Fat Lady&apos;s Song</MagicHeading1>
        <MagicParagraph>
          Leaving the forest behind, you wander into a long, torch-lit corridor. At the far end hangs the Fat Lady’s
          portrait, humming merrily in her frame. She sways back and forth as though half-drunk on butterbeer, pausing only
          to wink at you.
        </MagicParagraph>
        <MagicParagraph>
          "Ah, another brave little seeker," she says, her voice lilting. "But secrets are not given, they must be heard. My
          song carries meaning, if only your ears are sharp enough." Then she begins again: a haunting melody of short chirps
          and long hums, pauses breaking the rhythm deliberately.
        </MagicParagraph>
        <MagicParagraph>
          Listen closely. The pattern concealed within her enchanted aria may unlock what you seek next.
        </MagicParagraph>
        <MagicAudioPlayer src="/round-3/morse.wav" title="Portrait Cantus" />
      </div>
    </div>
  );
}
