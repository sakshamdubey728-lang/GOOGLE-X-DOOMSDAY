import React, { useState } from 'react';
import { Shield, ArrowRight, Check } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenAwakeningIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenAwakeningIntro,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsSubscribed(true);
    soundManager.playPowerPulse();
    setEmailInput('');
  };

  return (
    <footer className="bg-[#050706] border-t border-[#2D302F] text-[#B8BAB7] pt-16 pb-12 relative overflow-hidden">
      
      {/* Top Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0D9A5F] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2D302F]/60">
          
          {/* Column 1: Brand & Intro */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-[#101311] border border-[#0D9A5F] flex items-center justify-center emerald-box-shadow">
                <Shield className="w-5 h-5 text-[#2CF598]" />
              </div>
              <span className="font-display font-extrabold text-xl text-metallic">
                GOOGLE <span className="text-[#0D9A5F]">×</span> DOOM
              </span>
            </div>

            <p className="font-sans text-xs text-[#8D918E] max-w-sm leading-relaxed">
              Official Google Merchandise Store redesigned into Doctor Doom's sovereign armory for the Avengers: Doomsday campaign.
            </p>

            {/* Re-trigger Awakening Intro */}
            <button
              onClick={() => {
                soundManager.playMechanicalHum();
                onOpenAwakeningIntro();
              }}
              className="font-tech text-xs tracking-wider text-[#2CF598] hover:underline cursor-pointer flex items-center gap-1.5 pt-2"
            >
              <span>⚡ RE-ACTIVATE "THE AWAKENING" INTRO</span>
            </button>
          </div>

          {/* Column 2: SHOP / ARSENAL */}
          <div>
            <h4 className="font-tech text-xs tracking-[0.2em] text-[#2CF598] font-bold uppercase mb-4">
              ARSENAL
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-[#8D918E]">
              <li>
                <button
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('apparel')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tactical Apparel
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('tech')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cyber Hardware
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('drinkware')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Titanium Drinkware
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('workspace')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Workspace Gear
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: SUPPORT */}
          <div>
            <h4 className="font-tech text-xs tracking-[0.2em] text-[#2CF598] font-bold uppercase mb-4">
              SUPPORT
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-[#8D918E]">
              <li><a href="#support" className="hover:text-white transition-colors">Tactical Dispatch</a></li>
              <li><a href="#support" className="hover:text-white transition-colors">Return Protocols</a></li>
              <li><a href="#support" className="hover:text-white transition-colors">Latveria Standard Shipping</a></li>
              <li><a href="#support" className="hover:text-white transition-colors">Armory Size Guides</a></li>
              <li><a href="#support" className="hover:text-white transition-colors">FAQ & Intelligence</a></li>
            </ul>
          </div>

          {/* Column 4: NEWSLETTER / TRANSMISSIONS */}
          <div>
            <h4 className="font-tech text-xs tracking-[0.2em] text-[#2CF598] font-bold uppercase mb-4">
              SOVEREIGN TRANSMISSIONS
            </h4>
            <p className="font-sans text-xs text-[#8D918E] mb-3">
              Subscribe to receive classified drop alerts.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="AGENT EMAIL..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#101311] border border-[#2D302F] focus:border-[#0D9A5F] text-xs font-tech text-[#E5E5E0] placeholder-[#565A58] outline-none uppercase"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-[#063B27] text-[#2CF598] hover:bg-[#0A5C3A] cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {isSubscribed && (
                <div className="flex items-center gap-1 text-[10px] font-tech text-[#2CF598]">
                  <Check className="w-3 h-3" />
                  <span>TRANSMISSION PROTOCOL SUBSCRIBED</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Copyright & Final Tagline (PRD Section 32) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="font-sans text-xs text-[#565A58]">
            © {new Date().getFullYear()} Google LLC × Marvel. Designed for Doctor Doom / Avengers: Doomsday Edition.
          </div>

          {/* Final Visual Tagline from PRD Section 32 */}
          <div className="font-display font-extrabold text-sm text-metallic tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2CF598] animate-ping" />
            <span>THE ARMORY NEVER SLEEPS.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
