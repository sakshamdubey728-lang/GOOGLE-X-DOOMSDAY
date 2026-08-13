import React, { useEffect, useState } from 'react';
import { DoomMaskSvg } from './DoomMaskSvg';
import { soundManager } from '../utils/audio';

interface LoadingScreenProps {
  onComplete: () => void;
  isMobile?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  isMobile = false,
}) => {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [progress, setProgress] = useState(0);
  const [splitDist, setSplitDist] = useState(0);

  useEffect(() => {
    const speedFactor = isMobile ? 0.6 : 1;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40 * speedFactor);

    const t1 = setTimeout(() => {
      setPhase(2);
      soundManager.playMechanicalHum();
    }, 1000 * speedFactor);

    const t2 = setTimeout(() => {
      setPhase(3);
    }, 2000 * speedFactor);

    const t3 = setTimeout(() => {
      setPhase(4);
      setSplitDist(22);
      soundManager.playPowerPulse();
    }, 3500 * speedFactor);

    const t4 = setTimeout(() => {
      setPhase(5);
    }, 4800 * speedFactor);

    const t5 = setTimeout(() => {
      onComplete();
    }, 5400 * speedFactor);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete, isMobile]);

  const totalBlocks = 16;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);
  const progressBarString = `[${'█'.repeat(filledBlocks)}${'░'.repeat(
    totalBlocks - filledBlocks
  )}] ${progress}%`;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080A09] text-[#E5E5E0] transition-opacity duration-700 ${
        phase === 5 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Ambient Fog & Particle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#063B27]/30 via-[#080A09]/90 to-[#080A09] pointer-events-none" />
      
      {/* Subtle Tech Crosshair Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#101311_1px,transparent_1px),linear-gradient(to_bottom,#101311_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Centered Doctor Doom Awakening Mask */}
      <div className="relative z-10 mb-8 flex flex-col items-center">
        <div
          className={`transition-all duration-1000 transform ${
            phase === 1
              ? 'scale-90 opacity-20'
              : phase === 2
              ? 'scale-95 opacity-60 filter brightness-90'
              : phase === 3
              ? 'scale-100 opacity-90'
              : phase === 4
              ? 'scale-105 opacity-100'
              : 'scale-110 opacity-0'
          }`}
        >
          <DoomMaskSvg
            className="w-64 h-64 sm:w-80 sm:h-80"
            splitDistance={splitDist}
            glowIntensity={phase >= 3 ? 1 : 0.3}
          />
        </div>

        {/* Emerald Energy Ring Glow */}
        <div
          className={`absolute inset-0 rounded-full bg-[#063B27] blur-3xl transition-opacity duration-1000 -z-10 ${
            phase >= 3 ? 'opacity-40' : 'opacity-10'
          }`}
        />
      </div>

      {/* Loading Status & Text */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md">
        <h2 className="font-display tracking-[0.25em] text-2xl sm:text-3xl text-metallic font-bold mb-2 uppercase">
          THE ARMORY IS AWAKENING
        </h2>
        <p className="font-tech text-xs tracking-widest text-[#0D9A5F] mb-6 uppercase">
          {phase < 4 ? 'PREPARING THE COLLECTION...' : 'DEPLOYING LATVERIAN ARSENAL...'}
        </p>

        {/* Mechanical Text Progress Bar */}
        <div className="w-full bg-[#101311] border border-[#2D302F] p-3 rounded-lg metallic-card-shadow">
          <div className="font-mono text-sm tracking-widest text-[#2CF598] mb-2 font-bold">
            {progressBarString}
          </div>
          {/* Shimmer Progress Track */}
          <div className="w-full bg-[#080A09] h-2 rounded-full overflow-hidden border border-[#1A1D1C]">
            <div
              className="bg-gradient-to-r from-[#063B27] via-[#0D9A5F] to-[#2CF598] h-full transition-all duration-300 shadow-[0_0_12px_#2CF598]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Skip Transition Button for Fast Access */}
        <button
          onClick={onComplete}
          className="mt-6 font-tech text-xs tracking-widest text-[#8D918E] hover:text-[#2CF598] transition-colors cursor-pointer underline underline-offset-4"
        >
          [ SKIP INTRO ]
        </button>
      </div>

      {/* Top Right Latveria Tech Stamp */}
      <div className="absolute top-6 right-8 font-tech text-[10px] tracking-widest text-[#565A58] uppercase hidden sm:block">
        SECURE PROTOCOL v4.9 // LATVERIA
      </div>
    </div>
  );
};
