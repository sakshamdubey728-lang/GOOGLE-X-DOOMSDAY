import React from 'react';
import { Flame, XCircle } from 'lucide-react';

interface ThermalVisionHUDProps {
  isActive: boolean;
  timeLeft: number;
  totalDuration?: number;
  onDisengage: () => void;
}

export const ThermalVisionHUD: React.FC<ThermalVisionHUDProps> = ({
  isActive,
  timeLeft,
  totalDuration = 15,
  onDisengage,
}) => {
  const progressPercent = Math.max(0, Math.min(100, (timeLeft / totalDuration) * 100));

  return (
    <>
      {/* Hidden SVG Filter Definition for the Entire App */}
      <svg
        id="thermal-svg-defs"
        className="sr-only"
        style={{ position: 'fixed', top: 0, left: 0, width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <defs>
          <filter id="thermal-vision-filter" colorInterpolationFilters="sRGB" x="-10%" y="-10%" width="120%" height="120%">
            {/* Convert colors to luminance grayscale */}
            <feColorMatrix
              type="matrix"
              values="0.299 0.587 0.114 0 0
                      0.299 0.587 0.114 0 0
                      0.299 0.587 0.114 0 0
                      0     0     0     1 0"
              result="gray"
            />
            {/* High-Contrast Heat Map Transfer:
                Luminance 0.0 -> Deep Purple/Indigo
                Luminance 0.2 -> Intense Royal Violet
                Luminance 0.4 -> Radiant Magenta / Hot Fuchsia
                Luminance 0.6 -> Fiery Thermal Orange
                Luminance 0.8 -> Electric Radiant Yellow
                Luminance 1.0 -> White-Hot Peak Highlight
            */}
            <feComponentTransfer in="gray" result="thermalHeat">
              <feFuncR type="table" tableValues="0.10 0.38 0.88 1.00 1.00 1.00" />
              <feFuncG type="table" tableValues="0.00 0.00 0.05 0.38 0.90 1.00" />
              <feFuncB type="table" tableValues="0.32 0.72 0.65 0.05 0.12 1.00" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {/* Active Thermal HUD Overlays & Telemetry */}
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-[99990] flex flex-col justify-between p-3 sm:p-6 select-none animate-fade-in">
          {/* Subtle CRT Scanlines */}
          <div className="absolute inset-0 thermal-scanlines opacity-40 pointer-events-none" />

          {/* Top HUD Bar */}
          <div className="relative z-10 flex items-center justify-between w-full">
            {/* Top-Left Telemetry */}
            <div className="hidden sm:flex flex-col font-tech text-[10px] tracking-widest text-[#FF8C00] bg-[#10041C]/85 border border-[#FF4500]/40 px-3 py-1.5 rounded backdrop-blur-sm shadow-[0_0_15px_rgba(255,69,0,0.3)]">
              <div className="flex items-center gap-2 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-ping" />
                <span>FLIR SPECTRUM // CALIBRATION ACTIVE</span>
              </div>
              <span className="text-[#FFD700] text-[9px]">RANGE: 400nm - 14µm // GAIN: +18dB</span>
            </div>

            {/* Top-Center Main Countdown Control (Clickable Disengage) */}
            <div className="pointer-events-auto mx-auto flex flex-col items-center">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#1A0033]/90 border border-[#FFD700]/70 backdrop-blur-md shadow-[0_0_25px_rgba(255,69,0,0.5)]">
                <Flame className="w-4 h-4 text-[#FF4500] animate-bounce" />
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-tech text-xs font-black tracking-widest text-[#FFD700] uppercase">
                      THERMAL SPECTRUM ONLINE
                    </span>
                    <span className="font-tech text-xs font-bold text-white bg-[#FF4500] px-1.5 py-0.2 rounded">
                      {timeLeft}s
                    </span>
                  </div>
                  {/* Countdown Progress Bar */}
                  <div className="w-full bg-[#35143F] h-1.5 rounded-full overflow-hidden mt-1 border border-[#FFD700]/40">
                    <div
                      className="h-full bg-gradient-to-r from-[#9400D3] via-[#FF4500] to-[#FFD700] transition-all duration-1000 ease-linear"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={onDisengage}
                  title="Disengage Thermal Vision"
                  className="ml-2 flex items-center gap-1 px-2.5 py-1 rounded bg-[#FF4500]/20 hover:bg-[#FF4500] border border-[#FF4500] text-[#FFD700] hover:text-white font-tech text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer"
                >
                  <XCircle className="w-3 h-3" />
                  <span>OFF</span>
                </button>
              </div>
            </div>

            {/* Top-Right Telemetry */}
            <div className="hidden sm:flex flex-col items-end font-tech text-[10px] tracking-widest text-[#FF8C00] bg-[#10041C]/85 border border-[#FF4500]/40 px-3 py-1.5 rounded backdrop-blur-sm shadow-[0_0_15px_rgba(255,69,0,0.3)]">
              <span className="text-[#FFD700] font-bold">LATVERIA TACTICAL FLIR</span>
              <span className="text-[9px] text-[#FF8C00]">HEAT SIGNATURE RATIO: 98.4%</span>
            </div>
          </div>

          {/* Center Tactical Crosshair */}
          <div className="relative z-10 flex items-center justify-center my-auto pointer-events-none opacity-25">
            <div className="w-24 h-24 border border-dashed border-[#FFD700] rounded-full flex items-center justify-center">
              <div className="w-3 h-3 border-t-2 border-l-2 border-[#FF4500]" />
            </div>
          </div>

          {/* Bottom HUD Bar: FLIR Heat Legend Palette */}
          <div className="relative z-10 flex items-center justify-center w-full pb-2">
            <div className="flex flex-col sm:flex-row items-center gap-2 px-4 py-1.5 rounded-xl bg-[#10041C]/90 border border-[#FF4500]/40 backdrop-blur-md text-[10px] font-tech text-[#FFD700] tracking-wider shadow-[0_0_20px_rgba(148,0,211,0.4)]">
              <span className="text-[#C084FC] font-semibold text-[9px] sm:text-[10px]">[COLD / 0°C]</span>
              
              {/* Heat Color Ramp */}
              <div className="w-44 sm:w-64 h-3 rounded-full overflow-hidden border border-white/20 flex shadow-inner">
                <div className="flex-1 bg-[#1A0033]" title="Deep Violet/Purple" />
                <div className="flex-1 bg-[#4B0082]" title="Royal Violet" />
                <div className="flex-1 bg-[#9400D3]" title="Electric Magenta" />
                <div className="flex-1 bg-[#FF1493]" title="Hot Pink" />
                <div className="flex-1 bg-[#FF4500]" title="Blazing Orange" />
                <div className="flex-1 bg-[#FFA500]" title="Amber Orange" />
                <div className="flex-1 bg-[#FFD700]" title="Radiant Yellow" />
                <div className="flex-1 bg-[#FFFFFF]" title="White-Hot Highlight" />
              </div>

              <span className="text-[#FF4500] font-bold text-[9px] sm:text-[10px]">[PEAK HEAT / 1200°C]</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
