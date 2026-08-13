import React from 'react';
import { COLLECTIONS, CollectionItem } from '../data/collections';
import { ChevronRight, Shield, Lock, Globe, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CollectionsSectionProps {
  onSelectCollection: (collectionId: string) => void;
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({
  onSelectCollection,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'armor':
        return <Shield className="w-6 h-6 text-[#2CF598]" />;
      case 'vault':
        return <Lock className="w-6 h-6 text-[#E5E5E0]" />;
      case 'ashes':
        return <Globe className="w-6 h-6 text-[#C0B7A2]" />;
      case 'legacy':
        return <Sparkles className="w-6 h-6 text-[#2CF598]" />;
      default:
        return <Shield className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#2D302F] pb-6">
        <div>
          <div className="font-tech text-xs tracking-[0.3em] text-[#0D9A5F] uppercase mb-2">
            // ARSENAL VAULTS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-metallic uppercase tracking-tight">
            DOOM'S CURATED VAULTS
          </h2>
        </div>
        <p className="font-sans text-sm text-[#8D918E] max-w-md mt-2 sm:mt-0">
          Specialized equipment collections engineered for distinct tactical operational theaters.
        </p>
      </div>

      {/* Collection Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {COLLECTIONS.map((item: CollectionItem) => (
          <div
            key={item.id}
            onClick={() => {
              onSelectCollection(item.id);
              soundManager.playMetallicClick();
            }}
            style={{ background: item.bgGrad }}
            className="group relative rounded-2xl border border-[#2D302F] hover:border-[#0D9A5F] p-8 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer metallic-card-shadow overflow-hidden flex flex-col justify-between min-h-[280px]"
          >
            {/* Ambient Glow Overlay */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#063B27]/40 blur-3xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

            {/* Top Row: Icon & Item Count */}
            <div className="relative z-10 flex items-center justify-between mb-6">
              <div className="p-3 rounded-xl bg-[#080A09]/80 border border-[#2D302F] group-hover:border-[#0D9A5F] transition-colors">
                {getIcon(item.id)}
              </div>
              <span className="font-tech text-xs tracking-widest text-[#8D918E] bg-[#101311] px-3 py-1 rounded-full border border-[#2D302F]">
                {item.itemCount} ARTIFACTS
              </span>
            </div>

            {/* Middle Content */}
            <div className="relative z-10">
              <div className="font-tech text-xs tracking-[0.2em] text-[#2CF598] uppercase mb-1">
                {item.tagline}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-metallic group-hover:text-white transition-colors mb-3 uppercase">
                {item.name}
              </h3>
              <p className="font-sans text-sm text-[#B8BAB7] line-clamp-2 leading-relaxed max-w-lg mb-6">
                {item.description}
              </p>
            </div>

            {/* CTA Footer */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
              <span className="font-tech text-xs tracking-[0.2em] font-bold text-metallic group-hover:text-[#2CF598] transition-colors uppercase">
                {item.ctaText}
              </span>
              <div className="w-8 h-8 rounded-full bg-[#101311] border border-[#2D302F] group-hover:border-[#2CF598] group-hover:bg-[#063B27] flex items-center justify-center transition-all">
                <ChevronRight className="w-4 h-4 text-[#E5E5E0] group-hover:text-[#2CF598] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
