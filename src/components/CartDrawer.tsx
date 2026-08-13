import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, Shield, Tag, Check } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (discountPercentage: number) => void;
  onExploreClick: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onExploreClick,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LATVERIA10') {
      setDiscount(10);
      setPromoApplied(true);
      soundManager.playPowerPulse();
    } else if (promoCode.trim().toUpperCase() === 'VICTOR') {
      setDiscount(20);
      setPromoApplied(true);
      soundManager.playPowerPulse();
    } else {
      soundManager.playMetallicClick();
    }
  };

  const discountAmount = (subtotal * discount) / 100;
  const grandTotal = subtotal - discountAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0E1210] border-l border-[#2D302F] text-[#E5E5E0] flex flex-col justify-between shadow-2xl relative z-10">
          
          {/* Header */}
          <div className="p-6 bg-[#101311] border-b border-[#2D302F] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-[#2CF598]" />
              <div>
                <h2 className="font-display text-lg font-black text-metallic uppercase tracking-wider">
                  THE ARMORY
                </h2>
                <span className="font-tech text-[10px] text-[#8D918E] tracking-widest uppercase">
                  ACQUISITION LOG // {cartItems.length} ITEMS
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#080A09] border border-[#2D302F] text-[#8D918E] hover:text-white hover:border-[#0D9A5F] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center text-[#8D918E]">
                <Shield className="w-12 h-12 text-[#2D302F] mb-4" />
                <p className="font-display font-bold text-base text-[#B8BAB7] uppercase mb-1">
                  ARMORY IS EMPTY
                </p>
                <p className="font-sans text-xs text-[#565A58] max-w-xs mb-6">
                  No artifacts currently claimed for tactical deployment.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExploreClick();
                  }}
                  className="px-6 py-2.5 rounded-lg bg-[#063B27] border border-[#2CF598] text-[#2CF598] font-tech text-xs font-bold uppercase hover:bg-[#0A5C3A] cursor-pointer"
                >
                  BROWSE ARSENAL
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="p-4 rounded-xl bg-[#101311] border border-[#2D302F] flex items-center space-x-4 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg bg-[#080A09] border border-[#2D302F] p-2 shrink-0 flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-xs text-[#E5E5E0] truncate">
                      {item.product.name}
                    </h4>
                    
                    <div className="font-tech text-[10px] text-[#8D918E] mt-0.5 space-x-2">
                      {item.selectedColor && <span>COLOR: {item.selectedColor}</span>}
                      {item.selectedSize && <span>SIZE: {item.selectedSize}</span>}
                    </div>

                    <div className="font-tech text-sm font-extrabold text-[#2CF598] mt-1">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => {
                          soundManager.playMetallicClick();
                          onUpdateQuantity(item.product.id, -1);
                        }}
                        className="w-6 h-6 rounded bg-[#080A09] border border-[#2D302F] flex items-center justify-center text-[#8D918E] hover:text-white hover:border-[#0D9A5F] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <span className="font-tech text-xs font-bold text-[#E5E5E0] px-2">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => {
                          soundManager.playMetallicClick();
                          onUpdateQuantity(item.product.id, 1);
                        }}
                        className="w-6 h-6 rounded bg-[#080A09] border border-[#2D302F] flex items-center justify-center text-[#8D918E] hover:text-white hover:border-[#0D9A5F] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => {
                      soundManager.playMetallicClick();
                      onRemoveItem(item.product.id);
                    }}
                    className="p-1.5 text-[#565A58] hover:text-[#FF5555] transition-colors cursor-pointer"
                    title="Remove Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#101311] border-t border-[#2D302F] space-y-4">
              
              {/* Promo Code Input Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#8D918E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="SOVEREIGN CODE (LATVERIA10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#080A09] border border-[#2D302F] text-xs font-tech text-[#E5E5E0] placeholder-[#565A58] outline-none uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#063B27] border border-[#0D9A5F] text-[#2CF598] font-tech text-xs font-bold uppercase hover:bg-[#0A5C3A] cursor-pointer"
                >
                  APPLY
                </button>
              </form>

              {promoApplied && (
                <div className="flex items-center gap-1.5 text-xs font-tech text-[#2CF598]">
                  <Check className="w-3.5 h-3.5" />
                  <span>{discount}% SOVEREIGN DISCOUNT APPLIED</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 font-tech text-xs pt-2 border-t border-[#2D302F]/60">
                <div className="flex justify-between text-[#8D918E]">
                  <span>SUBTOTAL</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[#2CF598]">
                    <span>DISCOUNT ({discount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#8D918E]">
                  <span>TACTICAL DISPATCH</span>
                  <span className="text-[#2CF598]">FREE</span>
                </div>

                <div className="flex justify-between text-base font-black text-metallic pt-2 border-t border-[#2D302F]">
                  <span>TOTAL</span>
                  <span className="text-[#2CF598]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  soundManager.playPowerPulse();
                  onCheckout(discount);
                }}
                className="w-full py-4 rounded-xl bg-[#063B27] border border-[#2CF598] text-[#E5E5E0] font-tech text-xs tracking-[0.2em] font-extrabold uppercase hover:bg-[#0A5C3A] transition-all cursor-pointer flex items-center justify-center gap-2 emerald-box-shadow"
              >
                <span>FINALIZE ACQUISITION</span>
                <ArrowRight className="w-4 h-4 text-[#2CF598]" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
