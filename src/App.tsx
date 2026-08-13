/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CollectionsSection } from './components/CollectionsSection';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchOverlay } from './components/SearchOverlay';
import { ParticleCanvas } from './components/ParticleCanvas';
import { EasterEggs } from './components/EasterEggs';
import { Footer } from './components/Footer';
import { soundManager } from './utils/audio';
import { SlidersHorizontal, ShieldAlert } from 'lucide-react';

export default function App() {
  const [showAwakeningIntro, setShowAwakeningIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCollectionFilter, setSelectedCollectionFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  
  // Cart & Wishlist state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  
  // Modals & Overlays
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Easter egg counter
  const [emblemClickCount, setEmblemClickCount] = useState(0);

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by tab
    if (activeTab === 'new') {
      result = result.filter((p) => p.badge === 'NEW');
    } else if (activeTab === 'bestsellers') {
      result = result.filter((p) => p.badge === 'BEST SELLER');
    } else if (activeTab === 'wishlist') {
      const wishlistIds = wishlist.map((w) => w.id);
      result = result.filter((p) => wishlistIds.includes(p.id));
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by collection
    if (selectedCollectionFilter !== 'all') {
      result = result.filter((p) => p.collection === selectedCollectionFilter);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeTab, selectedCategory, selectedCollectionFilter, sortBy, wishlist]);

  // Cart operations
  const handleAddToCart = (product: Product, selectedColor?: string, selectedSize?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity: 1,
            selectedColor: selectedColor || (product.colors?.[0]?.name ?? ''),
            selectedSize: selectedSize || (product.sizes?.[0] ?? ''),
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#080A09] text-[#E5E5E0] font-sans antialiased relative selection:bg-[#063B27] selection:text-[#2CF598]">
      
      {/* Particle Fog Background Canvas */}
      <ParticleCanvas />

      {/* Loading Screen Intro ("THE AWAKENING") */}
      {showAwakeningIntro && (
        <LoadingScreen
          onComplete={() => setShowAwakeningIntro(false)}
          isMobile={window.innerWidth < 768}
        />
      )}

      {/* Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'shop' && tab !== 'home') {
            setSelectedCategory('all');
            setSelectedCollectionFilter('all');
          }
        }}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onEmblemClick={() => setEmblemClickCount((prev) => prev + 1)}
      />

      {/* App Main Content Container */}
      <main className="relative z-10">
        
        {/* HERO SECTION (Rendered on Home) */}
        {activeTab === 'home' && (
          <Hero
            onExploreClick={() => {
              const el = document.getElementById('catalog-grid');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onNewArrivalsClick={() => {
              setActiveTab('new');
            }}
          />
        )}

        {/* VAULT COLLECTIONS SECTION (Rendered on Home or Collections tab) */}
        {(activeTab === 'home' || activeTab === 'collections') && (
          <CollectionsSection
            onSelectCollection={(collectionId) => {
              setSelectedCollectionFilter(collectionId);
              setActiveTab('shop');
              const el = document.getElementById('catalog-grid');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}

        {/* CATALOG ARSENAL GRID SECTION */}
        <section id="catalog-grid" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          {/* Catalog Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-[#2D302F] pb-6 gap-4">
            <div>
              <div className="font-tech text-xs tracking-[0.3em] text-[#0D9A5F] uppercase mb-1">
                // ARSENAL CATALOG
              </div>
              <h2 className="font-display text-3xl font-black text-metallic uppercase tracking-tight">
                {activeTab === 'wishlist'
                  ? 'RESERVED ARTIFACTS'
                  : activeTab === 'new'
                  ? 'NEW ARTIFACTS'
                  : activeTab === 'bestsellers'
                  ? 'MOST WANTED'
                  : selectedCollectionFilter !== 'all'
                  ? `COLLECTION // ${selectedCollectionFilter.toUpperCase()}`
                  : 'DISCOVER THE ARSENAL'}
              </h2>
            </div>

            {/* Filter Controls Bar */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Filter Pill Buttons */}
              <div className="flex items-center space-x-1 bg-[#101311] border border-[#2D302F] rounded-lg p-1">
                {['all', 'apparel', 'tech', 'drinkware', 'workspace', 'collectibles'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      soundManager.playMetallicClick();
                    }}
                    className={`px-3 py-1.5 rounded-md font-tech text-[11px] tracking-wider font-bold uppercase transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#063B27] text-[#2CF598] border border-[#0D9A5F]'
                        : 'text-[#8D918E] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sorting Dropdown */}
              <div className="flex items-center space-x-2 bg-[#101311] border border-[#2D302F] rounded-lg px-3 py-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#0D9A5F]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-tech text-xs text-[#E5E5E0] outline-none cursor-pointer uppercase"
                >
                  <option value="featured" className="bg-[#101311]">FEATURED</option>
                  <option value="price-asc" className="bg-[#101311]">PRICE: LOW TO HIGH</option>
                  <option value="price-desc" className="bg-[#101311]">PRICE: HIGH TO LOW</option>
                  <option value="rating" className="bg-[#101311]">MOST RATED</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setSelectedProduct(p)}
                  onAddToCart={(p) => handleAddToCart(p)}
                  onToggleWishlist={(p) => handleToggleWishlist(p)}
                  isWishlisted={wishlist.some((w) => w.id === product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center justify-center bg-[#101311] border border-[#2D302F] rounded-2xl p-8">
              <ShieldAlert className="w-12 h-12 text-[#0D9A5F] mb-4" />
              <h3 className="font-display text-xl font-bold text-metallic uppercase mb-2">
                NO ARTIFACTS FOUND
              </h3>
              <p className="font-sans text-xs text-[#8D918E] max-w-sm mb-6">
                No equipment matches your active radar filter settings.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedCollectionFilter('all');
                  setActiveTab('shop');
                }}
                className="px-6 py-2.5 rounded-lg bg-[#063B27] border border-[#2CF598] text-[#2CF598] font-tech text-xs font-bold uppercase hover:bg-[#0A5C3A] cursor-pointer"
              >
                RESET FILTERS
              </button>
            </div>
          )}

        </section>

      </main>

      {/* Footer Component */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveTab('shop');
          const el = document.getElementById('catalog-grid');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAwakeningIntro={() => setShowAwakeningIntro(true)}
      />

      {/* MODALS & OVERLAYS */}
      
      {/* Product Quick Examine Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlist.some((w) => w.id === selectedProduct.id) : false}
        onBuyNow={(product, color, size) => {
          handleAddToCart(product, color, size);
          setSelectedProduct(null);
          setIsCartOpen(true);
        }}
      />

      {/* Armory Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={(discount) => {
          setDiscountPercentage(discount);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExploreClick={() => {
          setActiveTab('shop');
          const el = document.getElementById('catalog-grid');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Checkout Acquisition Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        discountPercentage={discountPercentage}
        onOrderComplete={() => {
          setCart([]);
        }}
      />

      {/* Search Radar Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Hidden Easter Eggs Handler */}
      <EasterEggs
        emblemClickCount={emblemClickCount}
        onResetEmblemClick={() => setEmblemClickCount(0)}
      />

    </div>
  );
}
