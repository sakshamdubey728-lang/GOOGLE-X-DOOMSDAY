import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, ShoppingBag, Bookmark, ShieldCheck, Truck, RotateCcw, Check, Zap } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor?: string, selectedSize?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onBuyNow: (product: Product, selectedColor?: string, selectedSize?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onBuyNow,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ''
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ''
  );
  const [isSecured, setIsSecured] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'story'>('overview');

  const galleryImages = [
    product.image,
    ...(product.additionalImages || [])
  ].filter((img, index, self) => img && self.indexOf(img) === index);

  const [selectedImage, setSelectedImage] = useState<string>(product.image);

  // Sync selected image if product changes
  React.useEffect(() => {
    setSelectedImage(product.image);
  }, [product]);

  const handleAddToCart = () => {
    setIsSecured(true);
    soundManager.playPowerPulse();
    onAddToCart(product, selectedColor, selectedSize);

    setTimeout(() => {
      setIsSecured(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    soundManager.playPowerPulse();
    onBuyNow(product, selectedColor, selectedSize);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      
      {/* Backdrop Click Close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card Box */}
      <div className="relative z-10 w-full max-w-5xl bg-[#0E1210] border border-[#2D302F] rounded-2xl metallic-card-shadow overflow-hidden my-8">
        
        {/* Header Controls */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#101311] border-b border-[#2D302F]">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#2CF598] animate-pulse" />
            <span className="font-tech text-xs tracking-widest text-[#2CF598] uppercase">
              ARTIFACT EXAMINE // PROTOCOL #{product.id.slice(0, 8)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#101311] border border-[#2D302F] text-[#8D918E] hover:text-white hover:border-[#0D9A5F] transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Modal Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
          
          {/* LEFT: Product Display & Environment */}
          <div className="flex flex-col items-center justify-center bg-[#080A09] rounded-xl border border-[#2D302F] p-8 relative overflow-hidden">
            
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,59,39,0.3)_0%,transparent_70%)] pointer-events-none" />

            {/* Product Badges */}
            {product.badge && (
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-md text-[10px] font-tech tracking-widest font-bold uppercase bg-[#063B27] text-[#2CF598] border border-[#0D9A5F]">
                  {product.badge}
                </span>
              </div>
            )}

            {/* Large Product Image */}
            <div className="relative z-10 w-full aspect-square max-w-md flex items-center justify-center group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] hover:drop-shadow-[0_0_35px_rgba(44,245,152,0.55)] transition-all duration-700 hover:scale-105 cursor-pointer"
              />
            </div>

            {/* Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="relative z-10 flex items-center justify-center space-x-2 mt-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImage(img);
                      soundManager.playMetallicClick();
                    }}
                    className={`w-12 h-12 rounded-lg p-1 border transition-all cursor-pointer overflow-hidden ${
                      selectedImage === img
                        ? 'border-[#2CF598] bg-[#063B27] shadow-[0_0_10px_rgba(44,245,152,0.4)]'
                        : 'border-[#2D302F] bg-[#101311] opacity-60 hover:opacity-100 hover:border-[#0D9A5F]'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Environmental Shadow Base */}
            <div className="w-48 h-4 bg-black/80 blur-md rounded-full mt-2 pointer-events-none" />

            {/* Trust Badges Under Image */}
            <div className="grid grid-cols-3 gap-2 w-full mt-6 pt-4 border-t border-[#2D302F]/60 text-center text-[10px] font-tech text-[#8D918E]">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#2CF598]" />
                <span>LATVERIAN GRADE</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#0D9A5F]" />
                <span>EXPRESS DISPATCH</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-[#B8BAB7]" />
                <span>30-DAY RETURN</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Info & Actions */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Rating & Stock Status */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex text-[#2CF598]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#2CF598]" />
                    ))}
                  </div>
                  <span className="font-tech text-xs text-[#E5E5E0] font-bold">{product.rating}</span>
                  <span className="font-sans text-xs text-[#8D918E]">({product.reviewsCount} reviews)</span>
                </div>

                <span className="font-tech text-xs text-[#2CF598] bg-[#063B27]/50 px-2.5 py-1 rounded border border-[#0D9A5F]">
                  STOCK: {product.stock} UNITS
                </span>
              </div>

              {/* Product Name */}
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-metallic uppercase tracking-tight mb-1">
                {product.name}
              </h1>
              
              {/* Original Google Merch Name */}
              <p className="font-sans text-xs text-[#726C60] mb-4">
                Google Catalog Reference: <span className="text-[#B8BAB7] font-medium">{product.originalName}</span>
              </p>

              {/* Price */}
              <div className="flex items-baseline space-x-3 mb-6">
                <span className="font-tech text-3xl font-extrabold text-[#2CF598]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="font-tech text-sm text-[#726C60] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Tabs Navigation (Overview / Specs / Story) */}
              <div className="flex border-b border-[#2D302F] mb-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2 px-4 font-tech text-xs tracking-wider font-bold transition-all cursor-pointer ${
                    activeTab === 'overview'
                      ? 'text-[#2CF598] border-b-2 border-[#2CF598]'
                      : 'text-[#8D918E] hover:text-white'
                  }`}
                >
                  OVERVIEW
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 px-4 font-tech text-xs tracking-wider font-bold transition-all cursor-pointer ${
                    activeTab === 'specs'
                      ? 'text-[#2CF598] border-b-2 border-[#2CF598]'
                      : 'text-[#8D918E] hover:text-white'
                  }`}
                >
                  TACTICAL SPECS
                </button>
                <button
                  onClick={() => setActiveTab('story')}
                  className={`pb-2 px-4 font-tech text-xs tracking-wider font-bold transition-all cursor-pointer ${
                    activeTab === 'story'
                      ? 'text-[#2CF598] border-b-2 border-[#2CF598]'
                      : 'text-[#8D918E] hover:text-white'
                  }`}
                >
                  SOVEREIGN LOG
                </button>
              </div>

              {/* Tab Content */}
              <div className="mb-6 min-h-[100px]">
                {activeTab === 'overview' && (
                  <p className="font-sans text-sm text-[#B8BAB7] leading-relaxed">
                    {product.description}
                  </p>
                )}

                {activeTab === 'specs' && (
                  <div className="grid grid-cols-2 gap-3 text-xs font-tech">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="bg-[#101311] p-2.5 rounded border border-[#2D302F]">
                        <div className="text-[#8D918E] uppercase">{spec.label}</div>
                        <div className="text-[#2CF598] font-bold mt-0.5">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'story' && (
                  <blockquote className="font-display italic text-sm text-[#C0B7A2] bg-[#101311] p-4 rounded border-l-2 border-[#0D9A5F] leading-relaxed">
                    "{product.storyCopy || product.description}"
                  </blockquote>
                )}
              </div>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <div className="font-tech text-xs tracking-wider text-[#8D918E] uppercase mb-2">
                    FINISH / COLOR: <span className="text-[#2CF598] font-bold">{selectedColor}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                          selectedColor === color.name
                            ? 'border-[#2CF598] scale-110 shadow-[0_0_10px_#2CF598]'
                            : 'border-[#2D302F] hover:border-[#8D918E]'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor === color.name && (
                          <Check className="w-4 h-4 text-white drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector (If Apparel) */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="font-tech text-xs tracking-wider text-[#8D918E] uppercase mb-2">
                    TACTICAL FIT / SIZE
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg font-tech text-xs font-bold transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-[#063B27] text-[#2CF598] border border-[#2CF598] shadow-[0_0_10px_rgba(13,154,95,0.4)]'
                            : 'bg-[#101311] text-[#8D918E] border border-[#2D302F] hover:text-white hover:border-[#0D9A5F]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons: ADD TO CART & BUY NOW */}
            <div className="space-y-3 pt-4 border-t border-[#2D302F]">
              <div className="flex items-center gap-3">
                
                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 rounded-xl font-tech text-xs tracking-[0.2em] font-extrabold uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    isSecured
                      ? 'bg-[#2CF598] text-[#080A09] border border-[#2CF598] shadow-[0_0_20px_#2CF598]'
                      : 'bg-[#063B27] text-[#E5E5E0] border border-[#0D9A5F] hover:bg-[#0A5C3A] hover:border-[#2CF598] emerald-box-shadow'
                  }`}
                >
                  {isSecured ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>ARTIFACT SECURED ✓</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#2CF598]" />
                      <span>CLAIM ARTIFACT</span>
                    </>
                  )}
                </button>

                {/* Wishlist Toggle */}
                <button
                  onClick={() => {
                    soundManager.playMetallicClick();
                    onToggleWishlist(product);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isWishlisted
                      ? 'bg-[#063B27] text-[#2CF598] border-[#0D9A5F]'
                      : 'bg-[#101311] text-[#8D918E] border-[#2D302F] hover:text-white hover:border-[#0D9A5F]'
                  }`}
                  title="Reserve Artifact"
                >
                  <Bookmark className={`w-5 h-5 ${isWishlisted ? 'fill-[#2CF598]' : ''}`} />
                </button>
              </div>

              {/* Instant Buy Now */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-xl bg-[#101311] border border-[#2D302F] text-[#B8BAB7] hover:text-white hover:border-[#2CF598] font-tech text-xs tracking-[0.2em] font-bold uppercase transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-[#2CF598]" />
                <span>IMMEDIATE DEPLOYMENT (BUY NOW)</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
