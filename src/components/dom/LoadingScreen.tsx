import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  // Phase 1: 'text' (Display "Where design meets code." on pitch-black background)
  // Phase 2: 'line' (Draw glowing center line)
  // Phase 3: 'door' (Split double doors open left and right)
  const [phase, setPhase] = useState<'text' | 'line' | 'door'>('text');

  useEffect(() => {
    // Stage 1: Text reveal for 1.4s
    const lineTimer = setTimeout(() => {
      setPhase('line');
    }, 1400);

    // Stage 2: Center line draw for 0.7s, then split door
    const doorTimer = setTimeout(() => {
      setPhase('door');
    }, 2100);

    // Stage 3: Complete door opening
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2900);

    return () => {
      clearTimeout(lineTimer);
      clearTimeout(doorTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const isDoorOpen = phase === 'door';

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden select-none">
      {/* Left Sliding Door Panel (Pitch Black #010206) */}
      <div
        className={`absolute top-0 left-0 bottom-0 w-1/2 bg-[#010206] border-r border-amber-400/20 transition-transform duration-700 ease-in-out flex items-center justify-end pr-1 sm:pr-2.5 ${
          isDoorOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Subtle Ambient Cosmic Glow */}
        <div className="absolute inset-0 bg-radial from-amber-500/5 to-transparent pointer-events-none" />

        <div
          className={`text-right relative z-10 transition-all duration-500 ${
            phase === 'text' || phase === 'line' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <span className="font-serif text-3xl sm:text-5xl lg:text-6xl text-gray-300 tracking-wide font-normal">
            Where&nbsp;
          </span>
          <span className="font-sans font-light text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            des
          </span>
        </div>
      </div>

      {/* Right Sliding Door Panel (Pitch Black #010206) */}
      <div
        className={`absolute top-0 right-0 bottom-0 w-1/2 bg-[#010206] border-l border-amber-400/20 transition-transform duration-700 ease-in-out flex items-center justify-start pl-1 sm:pl-2.5 ${
          isDoorOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Subtle Ambient Cosmic Glow */}
        <div className="absolute inset-0 bg-radial from-cyan-500/5 to-transparent pointer-events-none" />

        <div
          className={`text-left relative z-10 transition-all duration-500 ${
            phase === 'text' || phase === 'line' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <span className="font-sans font-light text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            ign&nbsp;
          </span>
          <span className="font-serif text-3xl sm:text-5xl lg:text-6xl text-amber-300/90 tracking-wide font-normal">
            meets code.
          </span>
        </div>
      </div>

      {/* Glowing Center Laser Line (Draws in Phase 2) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div
          className={`w-[2px] bg-gradient-to-b from-amber-400 via-white to-cyan-400 shadow-[0_0_20px_rgba(251,191,36,0.9)] transition-all duration-700 ease-in-out ${
            phase === 'line'
              ? 'h-full opacity-100'
              : phase === 'door'
              ? 'h-full opacity-0'
              : 'h-0 opacity-0'
          }`}
        />
      </div>

      {/* Monospace Footer Brand Subtext */}
      <div
        className={`absolute bottom-8 left-0 right-0 text-center font-mono text-[11px] text-gray-400 uppercase tracking-widest transition-opacity duration-500 z-20 ${
          isDoorOpen ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="text-amber-400">MS</span> • MAHESH • CREATIVE DEVELOPER
      </div>
    </div>
  );
};
