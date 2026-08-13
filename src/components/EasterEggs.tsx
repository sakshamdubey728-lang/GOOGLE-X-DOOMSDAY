import React, { useEffect, useState } from 'react';
import { DoomMaskSvg } from './DoomMaskSvg';
import { ShieldAlert, Sparkles, X } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface EasterEggsProps {
  emblemClickCount: number;
  onResetEmblemClick: () => void;
}

export const EasterEggs: React.FC<EasterEggsProps> = ({
  emblemClickCount,
  onResetEmblemClick,
}) => {
  const [showNoticeBanner, setShowNoticeBanner] = useState(false);
  const [showInactivityMask, setShowInactivityMask] = useState(false);

  // Easter Egg 1: Emblem clicked 5 times
  useEffect(() => {
    if (emblemClickCount >= 5) {
      setShowNoticeBanner(true);
      soundManager.playPowerPulse();
      onResetEmblemClick();
    }
  }, [emblemClickCount, onResetEmblemClick]);

  // Easter Egg 2: Inactivity for 15 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      setShowInactivityMask(false);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setShowInactivityMask(true);
        soundManager.playMechanicalHum();
        setTimeout(() => setShowInactivityMask(false), 5000);
      }, 15000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, []);

  return (
    <>
      {/* Easter Egg 1 Modal: DOOM HAS NOTICED YOU */}
      {showNoticeBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative z-10 w-full max-w-md bg-[#0E1210] border-2 border-[#2CF598] rounded-2xl p-6 text-center emerald-box-shadow-lg">
            <button
              onClick={() => setShowNoticeBanner(false)}
              className="absolute top-4 right-4 text-[#8D918E] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-[#063B27] border border-[#2CF598] mx-auto flex items-center justify-center mb-4 emerald-box-shadow">
              <ShieldAlert className="w-8 h-8 text-[#2CF598] animate-bounce" />
            </div>

            <h3 className="font-display text-2xl font-black text-metallic uppercase mb-2">
              DOOM HAS NOTICED YOU.
            </h3>

            <p className="font-sans text-xs text-[#B8BAB7] mb-6 leading-relaxed">
              "Your persistence is recognized. You have unlocked sovereign Latverian access."
            </p>

            <div className="bg-[#101311] border border-[#0D9A5F] p-3 rounded-lg text-xs font-tech mb-6 text-center">
              <span className="text-[#8D918E]">SOVEREIGN REWARD CODE:</span>
              <div className="text-xl font-extrabold text-[#2CF598] tracking-widest mt-1">
                VICTOR
              </div>
              <span className="text-[10px] text-[#2CF598]">(20% OFF AT CHECKOUT)</span>
            </div>

            <button
              onClick={() => setShowNoticeBanner(false)}
              className="w-full py-3 rounded-xl bg-[#063B27] border border-[#2CF598] text-[#E5E5E0] font-tech text-xs tracking-widest font-bold uppercase hover:bg-[#0A5C3A] cursor-pointer"
            >
              ACCEPT REWARD
            </button>
          </div>
        </div>
      )}

      {/* Easter Egg 2: Ghost Mask Appears After Inactivity */}
      {showInactivityMask && (
        <div className="fixed bottom-10 right-10 z-30 pointer-events-none opacity-60 animate-pulse flex flex-col items-center">
          <DoomMaskSvg className="w-28 h-28" glowIntensity={0.8} />
          <div className="font-tech text-[10px] tracking-widest text-[#2CF598] bg-[#080A09] px-2 py-0.5 rounded border border-[#0D9A5F] mt-2 uppercase">
            DOOM IS WATCHING
          </div>
        </div>
      )}
    </>
  );
};
