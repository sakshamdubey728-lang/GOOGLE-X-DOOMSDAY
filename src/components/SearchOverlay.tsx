import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Search, X, Shield, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  useEffect(() => {
    soundManager.playMechanicalHum();
  }, []);

  const SUGGESTIONS = ['Hoodies', 'Cyber Flask', 'Keyboard', 'Backpack', 'Best Sellers', 'New Arrivals'];

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-[#080A09]/95 backdrop-blur-md flex flex-col p-4 sm:p-8 animate-fade-in overflow-y-auto">
      
      {/* Top Close Bar */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-[#2CF598]" />
          <span className="font-tech text-xs tracking-widest text-[#2CF598] uppercase">
            RADAR SCANNER // ARSENAL SEARCH
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-lg bg-[#101311] border border-[#2D302F] text-[#8D918E] hover:text-white hover:border-[#0D9A5F] transition-all cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Search Input Container with Scanning Beam */}
      <div className="max-w-4xl mx-auto w-full relative mb-8">
        <div className="relative flex items-center bg-[#101311] border-2 border-[#0D9A5F] rounded-2xl overflow-hidden emerald-box-shadow">
          <Search className="w-6 h-6 text-[#2CF598] ml-5" />
          
          <input
            type="text"
            autoFocus
            placeholder="SCAN THE ARMORY..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-5 font-tech text-lg text-[#E5E5E0] placeholder-[#565A58] bg-transparent outline-none uppercase tracking-wider"
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              className="mr-5 text-[#8D918E] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Animated Horizontal Scan Beam */}
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#2CF598] to-transparent animate-scan-beam pointer-events-none" />
        </div>

        {/* Quick Tags Suggestions */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="font-tech text-xs text-[#8D918E] mr-2">SUGGESTED SCANS:</span>
          {SUGGESTIONS.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setQuery(tag);
                soundManager.playMetallicClick();
              }}
              className="px-3 py-1 rounded-full bg-[#101311] border border-[#2D302F] text-xs font-tech text-[#B8BAB7] hover:text-[#2CF598] hover:border-[#0D9A5F] transition-all cursor-pointer"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results Display Grid */}
      <div className="max-w-4xl mx-auto w-full flex-1">
        {query.trim() && (
          <div className="mb-4 font-tech text-xs tracking-widest text-[#8D918E] uppercase">
            RADAR DETECTED {filteredProducts.length} MATCHING ARTIFACTS
          </div>
        )}

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                  soundManager.playMetallicClick();
                }}
                className="p-4 rounded-xl bg-[#101311] border border-[#2D302F] hover:border-[#0D9A5F] flex items-center space-x-4 cursor-pointer group transition-all"
              >
                <div className="w-16 h-16 rounded-lg bg-[#080A09] border border-[#2D302F] p-2 shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-bold text-xs text-[#E5E5E0] group-hover:text-[#2CF598] truncate">
                    {product.name}
                  </h4>
                  <div className="font-tech text-xs text-[#2CF598] font-extrabold mt-1">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8D918E] group-hover:text-[#2CF598] group-hover:translate-x-1 transition-transform" />
              </div>
            ))}
          </div>
        ) : query.trim() ? (
          <div className="text-center py-16 text-[#8D918E] font-tech text-sm uppercase">
            NO MATCHING ARTIFACTS DETECTED IN RADAR RANGE.
          </div>
        ) : (
          <div className="text-center py-16 text-[#565A58] font-tech text-xs tracking-widest uppercase">
            ENTER KEYWORDS TO SCAN THE ARMORY DATABASE...
          </div>
        )}
      </div>

    </div>
  );
};
