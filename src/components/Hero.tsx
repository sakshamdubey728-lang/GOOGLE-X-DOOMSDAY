import React, { useState } from 'react';
import { Sparkles, ChevronRight, Shield, ShoppingBag, Eye, Copy, Check, Zap, Flame } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { useCurrency } from '../context/CurrencyContext';
import bannerImage from '../assets/images/premium_hoodie_banner_1788943621746.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onNewArrivalsClick: () => void;
  onInspectHoodie?: () => void;
  onAddToCart?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onNewArrivalsClick,
  onInspectHoodie,
  onAddToCart,
}) => {
  const { formatPrice } = useCurrency();
  const [copiedCode, setCopiedCode] = useState(false);
  const [claimedCount] = useState(31);
  const totalSlots = 39;
  const remainingSlots = totalSlots - claimedCount;
  const regularPrice = 98.0;
  const discountedPrice = regularPrice * 0.85;

  const handleCopyPromo = () => {
    navigator.clipboard.writeText('FIRST39');
    setCopiedCode(true);
    soundManager.playPowerPulse();
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <section className="relative min-h-[85vh] pt-24 pb-16 flex items-center justify-center overflow-hidden bg-[#080A09]">
      
      {/* Ambient Hero Radial Background & Emerald Fog */}
      <div className="absolute inset-0 bg-hero-radial pointer-events-none" />
      
      {/* Tech Grid & Ruined Fortress Silhouette */}
      <div className="absolute inset-0 bg-[radial-gradient(#063B27_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Glowing Center Energy Pulse Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#063B27]/40 rounded-full blur-[140px] animate-emerald-pulse pointer-events-none" />

      {/* Hero Visual Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Ticker / Operational Callout */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#101311]/90 border border-[#2D302F] text-[11px] font-tech text-[#8D918E]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2CF598] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2CF598]" />
            </span>
            <span className="text-[#2CF598] font-bold tracking-wider">// CITADEL LIMITED RUN</span>
            <span className="text-[#4F5350]">|</span>
            <span>RESTRICTED FIRST 39 ALLOCATION</span>
          </div>

          {/* Allocation Progress Bar */}
          <div className="flex items-center space-x-3 bg-[#101311]/90 px-3.5 py-1 rounded-full border border-[#2D302F] text-xs font-tech">
            <Flame className="w-3.5 h-3.5 text-[#2CF598] animate-pulse" />
            <span className="text-[#8D918E]">
              CLAIMED: <strong className="text-white font-bold">{claimedCount}</strong>/{totalSlots}
            </span>
            <div className="w-20 sm:w-28 h-2 bg-[#1A201C] rounded-full overflow-hidden border border-[#2D302F]">
              <div
                className="h-full bg-gradient-to-r from-[#0D9A5F] to-[#2CF598] rounded-full"
                style={{ width: `${(claimedCount / totalSlots) * 100}%` }}
              />
            </div>
            <span className="text-[#2CF598] font-bold uppercase text-[10px] tracking-wider">
              {remainingSlots} LEFT
            </span>
          </div>
        </div>

        {/* Main Banner Visual Container */}
        <div className="relative rounded-2xl md:rounded-3xl border border-[#2D302F] hover:border-[#0D9A5F]/70 bg-[#0C100E] shadow-[0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 group">
          
          {/* Tactical Corner Brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#2CF598] z-20 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#2CF598] z-20 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#2CF598] z-20 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#2CF598] z-20 pointer-events-none" />

          {/* Banner Graphic Showcase */}
          <div className="relative w-full aspect-[16/9] max-h-[560px] bg-[#072217] overflow-hidden flex items-center justify-center">
            <img
              src={bannerImage}
              alt="Premium Hoodie 15% OFF For First 39 Customers"
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 select-none"
              loading="eager"
            />
            
            {/* Subtle Gradient Vignette Over Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080A09] via-transparent to-transparent opacity-80 md:opacity-40 pointer-events-none" />

            {/* Floating Quick Action Overlay on Banner (Desktop) */}
            <div className="absolute bottom-4 right-4 z-20 hidden md:flex items-center space-x-3">
              {onInspectHoodie && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playMetallicClick();
                    onInspectHoodie();
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#080A09]/85 hover:bg-[#101311] backdrop-blur-md border border-[#2D302F] hover:border-[#2CF598] text-[#E5E5E0] hover:text-[#2CF598] text-xs font-tech font-bold uppercase transition-all shadow-lg cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#2CF598]" />
                  <span>360° EXAMINE</span>
                </button>
              )}
              {onAddToCart && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playPowerPulse();
                    onAddToCart();
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#063B27]/90 hover:bg-[#0A5C3A] backdrop-blur-md border border-[#2CF598] text-[#2CF598] text-xs font-tech font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>QUICK ACQUIRE</span>
                </button>
              )}
            </div>
          </div>

          {/* Banner Interactive HUD Control Bar Below Banner Image */}
          <div className="p-5 sm:p-6 lg:p-8 bg-[#0C100E] border-t border-[#2D302F] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Left Info: Title, Specs & Price */}
            <div className="space-y-2 max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-tech text-xs tracking-[0.25em] text-[#0D9A5F] uppercase font-bold">
                  LATVERIA TACTICAL HOODIE // 001
                </span>
                <span className="px-2 py-0.5 rounded bg-[#063B27] border border-[#2CF598]/40 text-[#2CF598] font-tech text-[10px] font-bold uppercase">
                  15% ALLOCATION ACTIVE
                </span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                PREMIUM HEAVYWEIGHT DOOMSDAY ANORAK
              </h1>

              <p className="font-sans text-xs sm:text-sm text-[#8D918E] leading-relaxed">
                Engineered with 480GSM Latverian fleece, metallic Google "G" chest badge, 4-color Google sleeve bands, dual silver Doctor Doom crests on cuffs, and reinforced kangaroo armor seams.
              </p>

              {/* Price Calculation */}
              <div className="flex items-baseline space-x-3 pt-1">
                <span className="font-tech text-2xl font-black text-[#2CF598]">
                  {formatPrice(discountedPrice)}
                </span>
                <span className="font-tech text-sm text-[#726C60] line-through">
                  {formatPrice(regularPrice)}
                </span>
                <span className="font-tech text-xs text-[#0D9A5F] font-bold">
                  (SAVE {formatPrice(regularPrice - discountedPrice)})
                </span>
              </div>
            </div>

            {/* Right Controls: Coupon Code & Direct CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              
              {/* Promo Code Copy Box */}
              <div className="flex items-center justify-between sm:justify-start space-x-2 bg-[#101311] border border-[#2D302F] hover:border-[#0D9A5F] rounded-xl px-3.5 py-2.5 transition-all">
                <div className="text-left">
                  <div className="text-[9px] font-tech text-[#8D918E] uppercase tracking-wider">
                    CLAIM 15% COUPON
                  </div>
                  <div className="font-tech text-sm font-bold text-white tracking-widest">
                    FIRST39
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPromo}
                  className="p-1.5 rounded-lg bg-[#063B27] hover:bg-[#0A5C3A] text-[#2CF598] transition-colors cursor-pointer"
                  title="Copy Promo Code FIRST39"
                >
                  {copiedCode ? (
                    <Check className="w-4 h-4 text-[#2CF598]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Primary Action Button */}
              {onInspectHoodie && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playMetallicClick();
                    onInspectHoodie();
                  }}
                  className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#063B27] to-[#0D9A5F] hover:from-[#0A5C3A] hover:to-[#2CF598] text-white font-tech text-xs font-extrabold uppercase tracking-wider shadow-[0_0_20px_rgba(13,154,95,0.3)] transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#2CF598]" />
                  <span>CLAIM & INSPECT</span>
                </button>
              )}

              {/* Browse Catalog Secondary Button */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playMetallicClick();
                  onExploreClick();
                }}
                className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-[#101311] hover:bg-[#181D1B] border border-[#2D302F] hover:border-[#8D918E] text-[#E5E5E0] font-tech text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                <span>EXPLORE ALL</span>
                <ChevronRight className="w-4 h-4 text-[#8D918E]" />
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Frame Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0D9A5F] to-transparent opacity-60" />
    </section>
  );
};

