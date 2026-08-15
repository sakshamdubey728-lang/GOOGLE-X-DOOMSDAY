import React from 'react';
import { Sparkles, ChevronRight, Shield, Cpu } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeroProps {
  onExploreClick: () => void;
  onNewArrivalsClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onNewArrivalsClick,
}) => {
  return (
    <section className="relative min-h-[85vh] pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#080A09]">
      
      {/* Ambient Hero Radial Background & Emerald Fog */}
      <div className="absolute inset-0 bg-hero-radial pointer-events-none" />
      
      {/* Tech Grid & Ruined Fortress Silhouette */}
      <div className="absolute inset-0 bg-[radial-gradient(#063B27_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Glowing Center Energy Pulse Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#063B27]/40 rounded-full blur-[120px] animate-emerald-pulse pointer-events-none" />

      {/* Hero Visual Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center" />

      {/* Bottom Frame Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0D9A5F] to-transparent opacity-60" />
    </section>
  );
};
