import React, { useState } from 'react';
import { Product } from '../types';
import { Star, ShoppingBag, Bookmark, Eye, Check } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdded(true);
    soundManager.playPowerPulse();
    onAddToCart(product);

    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  const getBadgeStyle = () => {
    switch (product.badge) {
      case 'NEW':
        return 'bg-[#063B27] text-[#2CF598] border-[#0D9A5F]';
      case 'LIMITED':
        return 'bg-[#641719] text-[#E5E5E0] border-[#8A2022]';
      case 'CLASSIFIED':
        return 'bg-[#35143F] text-[#2CF598] border-[#4D1C58]';
      case 'BEST SELLER':
        return 'bg-[#2D302F] text-[#E5E5E0] border-[#B8BAB7]';
      case 'LAST UNITS':
        return 'bg-[#3A0C0E] text-[#FF5555] border-[#641719] animate-pulse';
      default:
        return 'bg-[#101311] text-[#B8BAB7] border-[#2D302F]';
    }
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-[#111512] rounded-xl border border-[#2D302F] hover:border-[#0D9A5F] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer overflow-hidden metallic-card-shadow flex flex-col justify-between"
    >
      {/* Top Hover Emerald Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#063B27]/0 via-[#063B27]/0 to-[#063B27]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Top Action Bar (Badge + Wishlist) */}
      <div className="relative z-10 p-4 flex items-center justify-between">
        {product.badge ? (
          <span
            className={`px-2.5 py-1 rounded-md text-[10px] font-tech tracking-widest font-bold uppercase border ${getBadgeStyle()}`}
          >
            {product.badge}
          </span>
        ) : (
          <span className="text-[10px] font-tech text-[#565A58]">AR-390</span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            soundManager.playMetallicClick();
            onToggleWishlist(product);
          }}
          title={isWishlisted ? 'Remove from Reserved' : 'Reserve Artifact'}
          className={`p-2 rounded-lg border transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-[#063B27] text-[#2CF598] border-[#0D9A5F]'
              : 'bg-[#101311]/80 text-[#8D918E] border-[#2D302F] hover:text-white hover:border-[#0D9A5F]'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#2CF598]' : ''}`} />
        </button>
      </div>

      {/* Product Image Container */}
      <div className="relative w-full aspect-square p-6 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-all duration-700 ease-out group-hover:scale-110 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)] group-hover:drop-shadow-[0_0_30px_rgba(44,245,152,0.5)]"
        />

        {/* Tactical Scan Beam Effect on Hover */}
        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#2CF598] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300 pointer-events-none top-1/2 -translate-y-1/2 shadow-[0_0_12px_#2CF598]" />

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 bg-[#080A09]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-4 py-2 rounded-lg bg-[#101311] border border-[#B8BAB7] text-[#E5E5E0] font-tech text-xs tracking-wider font-bold hover:bg-[#063B27] hover:border-[#2CF598] transition-all flex items-center gap-2"
          >
            <Eye className="w-3.5 h-3.5 text-[#2CF598]" />
            <span>EXAMINE</span>
          </button>
        </div>
      </div>

      {/* Product Details Content */}
      <div className="relative z-10 p-5 pt-2 flex flex-col flex-grow justify-between border-t border-[#2D302F]/40 bg-[#0E1210]/60">
        <div>
          {/* Rating */}
          <div className="flex items-center space-x-1.5 mb-1.5">
            <Star className="w-3 h-3 text-[#2CF598] fill-[#2CF598]" />
            <span className="font-tech text-xs text-[#E5E5E0] font-bold">{product.rating}</span>
            <span className="font-sans text-[11px] text-[#8D918E]">({product.reviewsCount})</span>
          </div>

          {/* Product Title */}
          <h3 className="font-display font-bold text-sm text-[#E5E5E0] group-hover:text-[#2CF598] transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Original Google Name Subtitle */}
          <p className="font-sans text-[11px] text-[#726C60] line-clamp-1 mb-3">
            Base: {product.originalName}
          </p>
        </div>

        {/* Footer: Price & Quick Add Button */}
        <div className="flex items-center justify-between pt-3 border-t border-[#2D302F]/40">
          <div>
            <div className="font-tech font-extrabold text-base text-metallic">
              ${product.price.toFixed(2)}
            </div>
            {product.originalPrice && (
              <div className="font-tech text-[10px] text-[#726C60] line-through">
                ${product.originalPrice.toFixed(2)}
              </div>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`px-3.5 py-2 rounded-lg font-tech text-xs tracking-wider font-bold uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              isAdded
                ? 'bg-[#2CF598] text-[#080A09] border border-[#2CF598]'
                : 'bg-[#063B27] text-[#E5E5E0] border border-[#0D9A5F] hover:bg-[#0A5C3A] hover:border-[#2CF598] emerald-box-shadow'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>SECURED</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#2CF598]" />
                <span>CLAIM</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
