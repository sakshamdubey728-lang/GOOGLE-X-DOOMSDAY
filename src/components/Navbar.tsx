import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Bookmark, Volume2, VolumeX, Menu, X, Shield } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onEmblemClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  onEmblemClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.getIsMuted());

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = soundManager.toggleSound();
    setIsMuted(!muted);
  };

  const navItems = [
    { id: 'home', label: 'HOME', code: 'HQ' },
    { id: 'shop', label: 'ARSENAL', sublabel: 'Shop All', code: '01' },
    { id: 'collections', label: 'VAULT', sublabel: 'Collections', code: '02' },
    { id: 'new', label: 'NEW ARTIFACTS', sublabel: 'New Arrivals', code: '03' },
    { id: 'bestsellers', label: 'MOST WANTED', sublabel: 'Best Sellers', code: '04' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080A09]/95 backdrop-blur-md border-b border-[#2D302F] shadow-[0_4px_30px_rgba(6,59,39,0.3)]'
          : 'bg-gradient-to-b from-[#080A09] via-[#080A09]/80 to-transparent border-b border-white/5'
      }`}
    >
      {/* Top Announcement Bar */}
      <div className="bg-[#063B27] text-[#E5E5E0] px-4 py-1.5 text-xs font-tech tracking-widest text-center flex items-center justify-center gap-2 border-b border-[#0D9A5F]/30 overflow-hidden">
        <span className="w-2 h-2 rounded-full bg-[#2CF598] animate-pulse" />
        <span className="font-semibold uppercase tracking-wider">
          SOVEREIGN DECREE: FREE TACTICAL SHIPPING ON ARTIFACTS OVER $75 // CODE: <span className="text-[#2CF598] font-bold">LATVERIA10</span>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LEFT: Brand Emblem (Google Merch x DOOM) */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={onEmblemClick}>
            <div className="relative w-10 h-10 rounded-lg bg-[#101311] border border-[#2D302F] group-hover:border-[#0D9A5F] transition-all flex items-center justify-center emerald-box-shadow">
              <Shield className="w-5 h-5 text-[#2CF598] transition-transform group-hover:scale-110" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#2CF598] animate-ping" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg tracking-wider text-metallic group-hover:text-white transition-colors">
                GOOGLE <span className="text-[#0D9A5F]">X</span> DOOMSDAY
              </span>
              <span className="font-tech text-[10px] tracking-[0.2em] text-[#8D918E] group-hover:text-[#2CF598] transition-colors">
                ARMORY MERCHANDISE
              </span>
            </div>
          </div>

          {/* CENTER: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 border border-[#2D302F]/60 bg-[#101311]/80 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    soundManager.playMetallicClick();
                  }}
                  className={`relative px-4 py-2 rounded-full text-xs font-tech tracking-widest transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#2CF598] bg-[#063B27]/60 border border-[#0D9A5F] shadow-[0_0_15px_rgba(13,154,95,0.4)]'
                      : 'text-[#B8BAB7] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#2CF598] rounded-full shadow-[0_0_8px_#2CF598]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Action Icons (Search, Sound, Wishlist, Cart) */}
          <div className="flex items-center space-x-3">
            
            {/* Sound Toggle Button */}
            <button
              onClick={handleSoundToggle}
              title={isMuted ? 'Enable Mechanical Audio' : 'Mute Sound'}
              className="p-2.5 rounded-lg bg-[#101311] border border-[#2D302F] text-[#B8BAB7] hover:text-[#2CF598] hover:border-[#0D9A5F] transition-all cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#2CF598] animate-pulse" />}
            </button>

            {/* Search Button ("SCAN ARSENAL") */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-[#101311] border border-[#2D302F] text-[#B8BAB7] hover:text-white hover:border-[#0D9A5F] transition-all cursor-pointer group"
            >
              <Search className="w-4 h-4 text-[#0D9A5F] group-hover:text-[#2CF598]" />
              <span className="font-tech text-xs tracking-wider hidden sm:inline-block">SCAN ARSENAL</span>
            </button>

            {/* Wishlist Button ("RESERVED") */}
            <button
              onClick={() => {
                setActiveTab('wishlist');
                soundManager.playMetallicClick();
              }}
              className="relative p-2.5 rounded-lg bg-[#101311] border border-[#2D302F] text-[#B8BAB7] hover:text-[#2CF598] hover:border-[#0D9A5F] transition-all cursor-pointer"
              title="Reserved Artifacts"
            >
              <Bookmark className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#35143F] text-[#E5E5E0] border border-[#2CF598] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-tech">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button ("ARMORY") */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-[#063B27] border border-[#0D9A5F] text-[#E5E5E0] hover:bg-[#0A5C3A] hover:border-[#2CF598] transition-all cursor-pointer emerald-box-shadow"
            >
              <ShoppingBag className="w-4 h-4 text-[#2CF598]" />
              <span className="font-tech text-xs tracking-wider font-bold hidden sm:inline-block">ARMORY</span>
              {cartCount > 0 && (
                <span className="ml-1 bg-[#2CF598] text-[#080A09] font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-tech">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-lg bg-[#101311] border border-[#2D302F] text-[#B8BAB7] hover:text-white lg:hidden cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE FULLSCREEN ARMORY PANEL MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#080A09] border-b border-[#2D302F] px-4 pt-4 pb-6 space-y-3">
          <div className="font-tech text-[10px] tracking-widest text-[#0D9A5F] uppercase mb-2">
            // ARMORY NAVIGATION PROTOCOL
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
                soundManager.playMetallicClick();
              }}
              className={`w-full text-left px-4 py-3 rounded-lg font-tech text-sm tracking-wider flex items-center justify-between cursor-pointer ${
                activeTab === item.id
                  ? 'bg-[#063B27] text-[#2CF598] border border-[#0D9A5F]'
                  : 'bg-[#101311] text-[#B8BAB7] border border-[#2D302F]'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-xs text-[#565A58]">[{item.code}]</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
