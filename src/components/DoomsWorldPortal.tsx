import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  RotateCcw, 
  AlertTriangle, 
  Crosshair, 
  Radio, 
  Flame, 
  Activity, 
  Compass, 
  Eye, 
  ShieldAlert,
  Clock,
  Sparkles
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import abandonedRuinImg from '../assets/images/doom_abandoned_ruin_1788975342523.jpg';

interface DoomsWorldPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ScanTarget {
  id: string;
  name: string;
  xPercent: number;
  yPercent: number;
  status: string;
  description: string;
  hazardLevel: 'EXTREME' | 'CRITICAL' | 'DORMANT' | 'BREACHED';
}

const RUIN_ANOMALIES: ScanTarget[] = [
  {
    id: 'throne-sanctum',
    name: 'CITADEL THRONE SANCTUM',
    xPercent: 48,
    yPercent: 38,
    status: 'COLLAPSED & DESERTED',
    description: 'The monumental spire of Victor Von Doom has fractured. Smashed gothic arches and structural devastation from the final temporal war.',
    hazardLevel: 'CRITICAL',
  },
  {
    id: 'vault-gate',
    name: 'VIBRANIUM VAULT GATES',
    xPercent: 24,
    yPercent: 62,
    status: 'SEVERED // HEAVILY DAMAGED',
    description: 'High-tensile blast doors melted by cosmic energy blasts. The inner sanctum relics have been stripped by time anomalies.',
    hazardLevel: 'BREACHED',
  },
  {
    id: 'energy-conduit',
    name: 'EMERALD POWER RELAY',
    xPercent: 78,
    yPercent: 54,
    status: 'LEAKING VOLATILE PLASMA',
    description: 'Severed conduits still discharge unstable gamma-emerald arcs into the acid-drenched atmosphere.',
    hazardLevel: 'EXTREME',
  },
  {
    id: 'monolith-mask',
    name: 'GIANT CEREMONIAL DOOM MASK',
    xPercent: 56,
    yPercent: 74,
    status: 'CORRODED IN RUBBLE',
    description: 'A 40-ton titanium mask emblem shattered among the masonry bricks. Symbolizes the fall of Latveria in 3099 A.D.',
    hazardLevel: 'DORMANT',
  },
];

export const DoomsWorldPortal: React.FC<DoomsWorldPortalProps> = ({ isOpen, onClose }) => {
  // Portal phases: 'idle' -> 'warp-travel' (2.8s) -> 'arrived' -> 'warp-return' (1.2s) -> closed
  const [phase, setPhase] = useState<'idle' | 'warp-travel' | 'arrived' | 'warp-return'>('idle');
  const [warpYear, setWarpYear] = useState<number>(2026);
  const [warpProgress, setWarpProgress] = useState<number>(0);
  const [scanActive, setScanActive] = useState<boolean>(true);
  const [selectedAnomaly, setSelectedAnomaly] = useState<ScanTarget | null>(null);
  const warpCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger warp travel when modal opens
  useEffect(() => {
    if (isOpen) {
      setPhase('warp-travel');
      setWarpYear(2026);
      setWarpProgress(0);
      setSelectedAnomaly(null);
      soundManager.playTimeTravelWarp();

      // Timeline acceleration counter
      const startTime = performance.now();
      const duration = 2800; // 2.8s warp jump

      const interval = setInterval(() => {
        const elapsed = performance.now() - startTime;
        const p = Math.min(1, elapsed / duration);
        setWarpProgress(Math.round(p * 100));

        // Year jumps from 2026 to 3099
        const targetYear = Math.floor(2026 + p * (3099 - 2026));
        setWarpYear(targetYear);

        if (p >= 1) {
          clearInterval(interval);
          setPhase('arrived');
          soundManager.playTimeTravelArrival();
        }
      }, 50);

      return () => clearInterval(interval);
    } else {
      setPhase('idle');
    }
  }, [isOpen]);

  // Hyperspace / Chronal Rift Canvas Effect during warp-travel or warp-return
  useEffect(() => {
    if (phase !== 'warp-travel' && phase !== 'warp-return') return;

    const canvas = warpCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    // Generate radial warp lines
    const lineCount = 140;
    const lines = Array.from({ length: lineCount }, () => ({
      angle: Math.random() * Math.PI * 2,
      distance: Math.random() * Math.max(cx, cy) * 1.4 + 20,
      speed: Math.random() * 18 + 14,
      length: Math.random() * 80 + 30,
      color: Math.random() > 0.35 ? '#2CF598' : Math.random() > 0.5 ? '#A855F7' : '#FFFFFF',
      width: Math.random() * 2.5 + 1,
    }));

    let rotation = 0;

    const renderWarp = () => {
      ctx.fillStyle = 'rgba(4, 8, 6, 0.28)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      rotation += 0.025;

      for (let i = 0; i < lines.length; i++) {
        const l = lines[i];
        l.distance += l.speed;
        if (l.distance > Math.max(cx, cy) * 1.5) {
          l.distance = 10;
          l.angle = Math.random() * Math.PI * 2;
        }

        const effectiveAngle = l.angle + rotation;
        const x1 = cx + Math.cos(effectiveAngle) * l.distance;
        const y1 = cy + Math.sin(effectiveAngle) * l.distance;
        const x2 = cx + Math.cos(effectiveAngle) * (l.distance + l.length);
        const y2 = cy + Math.sin(effectiveAngle) * (l.distance + l.length);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = l.color;
        ctx.lineWidth = l.width;
        ctx.shadowBlur = 10;
        ctx.shadowColor = l.color;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();
      }

      // Central gravitational singularity pulse
      ctx.save();
      const pulseSize = 25 + Math.sin(Date.now() * 0.015) * 10;
      const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, pulseSize * 3);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.3, '#2CF598');
      grad.addColorStop(0.7, 'rgba(168, 85, 247, 0.4)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseSize * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(renderWarp);
    };

    renderWarp();

    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // Handle return to present day
  const handleReturnToPresent = () => {
    soundManager.playTimeTravelReturn();
    setPhase('warp-return');
    setTimeout(() => {
      onClose();
      setPhase('idle');
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div
      id="dooms-world-container"
      className="fixed inset-0 z-[99995] flex items-center justify-center bg-black overflow-hidden select-none font-sans"
      role="dialog"
      aria-modal="true"
      aria-label="Doom's World Time Travel Portal"
    >
      {/* ------------------------------------------------------------- */}
      {/* PHASE 1 & 4: HYPERSPACE TIME TRAVEL VORTEX                    */}
      {/* ------------------------------------------------------------- */}
      {(phase === 'warp-travel' || phase === 'warp-return') && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#050B08]">
          <canvas ref={warpCanvasRef} className="absolute inset-0 w-full h-full" />

          {/* Temporal Readout Telemetry */}
          <div className="relative z-10 text-center px-4 max-w-xl mx-auto flex flex-col items-center">
            <div className="flex items-center space-x-2 px-4 py-1 rounded-full bg-[#063B27]/80 border border-[#2CF598] text-[#2CF598] font-tech text-xs tracking-widest uppercase mb-4 animate-pulse">
              <Clock className="w-3.5 h-3.5" />
              <span>{phase === 'warp-travel' ? 'CHRONO-DISPLACEMENT IN PROGRESS' : 'REVERTING TO PRESENT TIMELINE'}</span>
            </div>

            {/* Giant Year Counter */}
            <div className="font-tech text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-[#2CF598] to-[#0D9A5F] tracking-tighter drop-shadow-[0_0_40px_rgba(44,245,152,0.8)]">
              {phase === 'warp-travel' ? warpYear : '2026'}
            </div>

            <div className="font-tech text-sm tracking-[0.3em] font-bold text-[#A855F7] uppercase mt-2">
              {phase === 'warp-travel' ? 'DESTINATION: YEAR 3099 // ERA OF RUIN' : 'RETURNING TO EARTH-616 // 2026 A.D.'}
            </div>

            {/* Quantum Tunnel Dilation Bar */}
            <div className="w-64 sm:w-80 h-2 bg-[#101311] border border-[#2D302F] rounded-full overflow-hidden mt-6 shadow-[0_0_20px_rgba(44,245,152,0.4)]">
              <div
                className="h-full bg-gradient-to-r from-[#063B27] via-[#2CF598] to-white transition-all duration-75"
                style={{ width: `${phase === 'warp-travel' ? warpProgress : 100}%` }}
              />
            </div>

            <p className="font-tech text-xs text-[#8D918E] tracking-widest uppercase mt-4 animate-pulse">
              {phase === 'warp-travel'
                ? 'PENETRATING TEMPORAL ANOMALY BARRIER...'
                : 'COLLAPSING QUANTUM SINGULARITY...'}
            </p>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* PHASE 2: ARRIVAL AT DOOM'S WORLD (ABANDONED & DAMAGED RUINS)   */}
      {/* ------------------------------------------------------------- */}
      {phase === 'arrived' && (
        <div className="relative w-full h-full flex flex-col justify-between overflow-hidden animate-fade-in">
          {/* Fullscreen Abandoned Damaged Building Background */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={abandonedRuinImg}
              alt="Abandoned and Damaged Building in Doom's World"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite] filter brightness-95 contrast-115"
            />

            {/* Apocalyptic Atmosphere Shading Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
            
            {/* Toxic Emerald Cosmic Atmosphere Tint */}
            <div className="absolute inset-0 bg-[#063B27]/15 mix-blend-color-dodge pointer-events-none" />
          </div>

          {/* Drifting Embers / Toxic Dust Particle Overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-70">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[#2CF598] blur-[1px] animate-pulse"
                style={{
                  top: `${(i * 19) % 100}%`,
                  left: `${(i * 37) % 100}%`,
                  width: `${(i % 3) + 2}px`,
                  height: `${(i % 3) + 2}px`,
                  opacity: (i % 5 + 3) / 10,
                }}
              />
            ))}
          </div>

          {/* ================= TOP TACTICAL HUD ================= */}
          <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/60 to-transparent border-b border-[#2CF598]/20 backdrop-blur-sm gap-3">
            {/* Citadel Status Badge */}
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-[#063B27]/80 border border-[#2CF598] text-[#2CF598] shadow-[0_0_15px_rgba(44,245,152,0.4)]">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-tech text-base font-black tracking-widest text-white uppercase">
                    DOOM'S RUINED WORLD
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-tech font-extrabold tracking-widest uppercase bg-[#FF3B30]/30 text-[#FF5555] border border-[#FF3B30]/60">
                    SECTOR ABANDONED
                  </span>
                </div>
                <div className="font-tech text-xs tracking-wider text-[#8D918E] flex items-center gap-2 mt-0.5">
                  <span className="text-[#2CF598] font-bold">ERA: 3099 A.D.</span>
                  <span>//</span>
                  <span>CITADEL MONASTERY COMPLEX</span>
                  <span>//</span>
                  <span className="text-[#FFB800]">STRUCTURAL DAMAGE: 91.4%</span>
                </div>
              </div>
            </div>

            {/* Action Controls */}
            <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-end">
              {/* Toggle Scanner Button */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playMetallicClick();
                  setScanActive((prev) => !prev);
                }}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl font-tech text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  scanActive
                    ? 'bg-[#063B27] border border-[#2CF598] text-[#2CF598] shadow-[0_0_15px_rgba(44,245,152,0.3)]'
                    : 'bg-[#101311] border border-[#2D302F] text-[#8D918E] hover:text-white'
                }`}
              >
                <Crosshair className="w-4 h-4" />
                <span>{scanActive ? 'SCANNER: ACTIVE' : 'SCANNER: OFF'}</span>
              </button>

              {/* Time Travel Return to Present Button */}
              <button
                type="button"
                onClick={handleReturnToPresent}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#063B27] via-[#0D9A5F] to-[#2CF598] hover:brightness-110 text-white font-tech text-xs font-extrabold uppercase tracking-widest shadow-[0_0_20px_rgba(44,245,152,0.5)] transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RETURN TO PRESENT (2026)</span>
              </button>

              {/* Quick Close */}
              <button
                type="button"
                onClick={handleReturnToPresent}
                aria-label="Exit Doom's World"
                className="p-2 rounded-xl bg-[#101311] border border-[#2D302F] text-[#8D918E] hover:text-white hover:border-[#FF5555] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ================= INTERACTIVE RUIN SCAN TARGETS ================= */}
          {scanActive && (
            <div className="absolute inset-0 z-20 pointer-events-none">
              {RUIN_ANOMALIES.map((anomaly) => {
                const isSelected = selectedAnomaly?.id === anomaly.id;

                return (
                  <div
                    key={anomaly.id}
                    style={{ top: `${anomaly.yPercent}%`, left: `${anomaly.xPercent}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto group cursor-pointer"
                    onClick={() => {
                      soundManager.playMetallicClick();
                      setSelectedAnomaly(anomaly);
                    }}
                  >
                    {/* Targeting Reticle Ping */}
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-8 h-8 rounded-full border border-[#2CF598] animate-ping opacity-60" />
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#2CF598] border-white text-black shadow-[0_0_25px_rgba(44,245,152,0.9)] scale-125'
                            : 'bg-[#080A09]/80 border-[#2CF598] text-[#2CF598] hover:scale-115 shadow-[0_0_15px_rgba(44,245,152,0.5)]'
                        }`}
                      >
                        <Crosshair className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Compact Label */}
                    <div className="mt-1 px-2.5 py-0.5 rounded bg-[#080A09]/90 border border-[#2CF598]/60 text-[#E5E5E0] font-tech text-[10px] tracking-wider uppercase whitespace-nowrap shadow-lg group-hover:border-[#2CF598]">
                      {anomaly.name}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ================= BOTTOM PANELS & ANOMALY DETAIL ================= */}
          <div className="relative z-20 p-4 sm:p-6 bg-gradient-to-t from-black via-black/85 to-transparent border-t border-[#2CF598]/20 flex flex-col md:flex-row items-end justify-between gap-4">
            {/* Left Box: Citadel Cataclysm Lore & Telemetry */}
            <div className="max-w-md bg-[#080A09]/90 border border-[#2D302F] p-4 rounded-2xl backdrop-blur-md shadow-2xl">
              <div className="flex items-center space-x-2 text-[#2CF598] font-tech text-xs font-bold tracking-widest uppercase mb-1">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>ARCHIVAL SATELLITE TELEMETRY // LATVERIA 3099</span>
              </div>
              <p className="text-xs text-[#B8BAB7] leading-relaxed">
                You have traversed into the post-cataclysm timeline of Doom's World. The once-glorious titanium fortress lies abandoned and broken under radioactive emerald storms. The throne has fallen, yet the dark mystic resonance remains indestructible.
              </p>
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#2D302F]/60 text-[10px] font-tech text-[#8D918E]">
                <div>
                  <span className="block text-[#565A58]">SURVIVORS</span>
                  <span className="text-white font-bold">0 DETECTED</span>
                </div>
                <div>
                  <span className="block text-[#565A58]">ATMOSPHERE</span>
                  <span className="text-[#FFB800] font-bold">TOXIC PLASMA</span>
                </div>
                <div>
                  <span className="block text-[#565A58]">TEMPORAL RIFT</span>
                  <span className="text-[#2CF598] font-bold">STABLE (READY)</span>
                </div>
              </div>
            </div>

            {/* Right Box: Selected Ruin Inspection Dialog (if target clicked) */}
            {selectedAnomaly ? (
              <div className="w-full md:w-96 bg-[#0E1410]/95 border border-[#2CF598] p-4 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(44,245,152,0.25)] animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1.5">
                    <Activity className="w-4 h-4 text-[#2CF598]" />
                    <span className="font-tech text-xs font-black tracking-widest text-[#2CF598] uppercase">
                      RUIN DAMAGE ANALYSIS
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedAnomaly(null)}
                    className="text-[#8D918E] hover:text-white text-xs font-tech cursor-pointer"
                  >
                    CLOSE [×]
                  </button>
                </div>
                <h4 className="font-tech text-sm font-bold text-white uppercase tracking-wider mb-1">
                  {selectedAnomaly.name}
                </h4>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-tech font-extrabold uppercase ${
                      selectedAnomaly.hazardLevel === 'EXTREME'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : selectedAnomaly.hazardLevel === 'CRITICAL'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : selectedAnomaly.hazardLevel === 'BREACHED'
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}
                  >
                    HAZARD: {selectedAnomaly.hazardLevel}
                  </span>
                  <span className="text-[10px] font-tech text-[#8D918E] font-bold">
                    STATUS: {selectedAnomaly.status}
                  </span>
                </div>
                <p className="text-xs text-[#E5E5E0] leading-relaxed">
                  {selectedAnomaly.description}
                </p>
              </div>
            ) : (
              /* Hint to click ruin scan points */
              <div className="hidden sm:flex items-center space-x-2 text-xs font-tech text-[#8D918E] bg-[#080A09]/70 px-4 py-2.5 rounded-xl border border-[#2D302F]">
                <Sparkles className="w-4 h-4 text-[#2CF598] animate-pulse" />
                <span>CLICK ANY SCAN RETICLE ON THE RUINED BUILDING TO EXAMINE DAMAGE</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
