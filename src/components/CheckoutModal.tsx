import React, { useState } from 'react';
import { CartItem, ShippingDetails } from '../types';
import { X, ShieldCheck, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountPercentage: number;
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountPercentage,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');
  const [shipping, setShipping] = useState<ShippingDetails>({
    fullName: 'Sovereign Agent',
    email: 'agent@doom-armory.com',
    address: 'Castle Doom Fortress, Tower 1',
    city: 'Doomstadt',
    postalCode: 'LV-1002',
    country: 'Latveria',
    shippingMethod: 'latverian-teleport',
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * discountPercentage) / 100;
  const grandTotal = subtotal - discountAmount;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playPowerPulse();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playPowerPulse();
    setStep('confirmed');
    onOrderComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      
      {/* Backdrop Click Close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl bg-[#0E1210] border border-[#2D302F] rounded-2xl metallic-card-shadow overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 bg-[#101311] border-b border-[#2D302F] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#2CF598]" />
            <h2 className="font-display text-xl font-bold text-metallic uppercase">
              FINALIZE YOUR ACQUISITION
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#080A09] border border-[#2D302F] text-[#8D918E] hover:text-white hover:border-[#0D9A5F] transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="bg-[#080A09] px-6 py-3 border-b border-[#2D302F] flex items-center justify-around font-tech text-xs tracking-wider">
          <span className={`flex items-center gap-1.5 ${step === 'shipping' ? 'text-[#2CF598] font-bold' : 'text-[#8D918E]'}`}>
            1. RECIPIENT DATA
          </span>
          <span className="text-[#2D302F]">//</span>
          <span className={`flex items-center gap-1.5 ${step === 'payment' ? 'text-[#2CF598] font-bold' : 'text-[#8D918E]'}`}>
            2. PAYMENT PROTOCOL
          </span>
          <span className="text-[#2D302F]">//</span>
          <span className={`flex items-center gap-1.5 ${step === 'confirmed' ? 'text-[#2CF598] font-bold' : 'text-[#8D918E]'}`}>
            3. DEPLOYED
          </span>
        </div>

        {/* Body Form / Content */}
        <div className="p-6">
          
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="space-y-4 font-tech text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8D918E] uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={shipping.fullName}
                    onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                    className="w-full p-3 rounded-lg bg-[#080A09] border border-[#2D302F] text-[#E5E5E0] focus:border-[#0D9A5F] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#8D918E] uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={shipping.email}
                    onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                    className="w-full p-3 rounded-lg bg-[#080A09] border border-[#2D302F] text-[#E5E5E0] focus:border-[#0D9A5F] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8D918E] uppercase mb-1">Deployment Address</label>
                <input
                  type="text"
                  required
                  value={shipping.address}
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                  className="w-full p-3 rounded-lg bg-[#080A09] border border-[#2D302F] text-[#E5E5E0] focus:border-[#0D9A5F] outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#8D918E] uppercase mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    className="w-full p-3 rounded-lg bg-[#080A09] border border-[#2D302F] text-[#E5E5E0] focus:border-[#0D9A5F] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#8D918E] uppercase mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={shipping.postalCode}
                    onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                    className="w-full p-3 rounded-lg bg-[#080A09] border border-[#2D302F] text-[#E5E5E0] focus:border-[#0D9A5F] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#8D918E] uppercase mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={shipping.country}
                    onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                    className="w-full p-3 rounded-lg bg-[#080A09] border border-[#2D302F] text-[#E5E5E0] focus:border-[#0D9A5F] outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#2D302F] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#8D918E]">TOTAL PAYABLE</div>
                  <div className="text-xl font-extrabold text-[#2CF598]">${grandTotal.toFixed(2)}</div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#063B27] border border-[#2CF598] text-[#E5E5E0] font-bold uppercase hover:bg-[#0A5C3A] cursor-pointer flex items-center gap-2 emerald-box-shadow"
                >
                  <span>CONTINUE TO PAYMENT</span>
                  <ArrowRight className="w-4 h-4 text-[#2CF598]" />
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4 font-tech text-xs">
              <div className="p-4 rounded-xl bg-[#080A09] border border-[#2D302F] space-y-3">
                <div className="flex items-center justify-between text-[#2CF598] font-bold">
                  <span>PAYMENT METHOD</span>
                  <Lock className="w-4 h-4" />
                </div>
                
                <div className="p-3 rounded-lg bg-[#101311] border border-[#0D9A5F] flex items-center justify-between cursor-pointer">
                  <span className="text-[#E5E5E0] font-bold">🔒 Google Pay / Latveria Cyber Shield</span>
                  <span className="text-[#2CF598] text-[10px] uppercase">[ SELECTED ]</span>
                </div>
              </div>

              <div>
                <label className="block text-[#8D918E] uppercase mb-1">Card / Account Identifier</label>
                <input
                  type="text"
                  required
                  defaultValue="•••• •••• •••• 8842"
                  className="w-full p-3 rounded-lg bg-[#080A09] border border-[#2D302F] text-[#E5E5E0] focus:border-[#0D9A5F] outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#2D302F] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#8D918E]">TOTAL PAYABLE</div>
                  <div className="text-xl font-extrabold text-[#2CF598]">${grandTotal.toFixed(2)}</div>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-[#063B27] border border-[#2CF598] text-[#E5E5E0] font-bold uppercase hover:bg-[#0A5C3A] cursor-pointer emerald-box-shadow"
                >
                  AUTHORIZE ACQUISITION
                </button>
              </div>
            </form>
          )}

          {step === 'confirmed' && (
            <div className="py-8 flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#063B27] border border-[#2CF598] flex items-center justify-center emerald-box-shadow">
                <CheckCircle2 className="w-10 h-10 text-[#2CF598]" />
              </div>

              <h3 className="font-display text-2xl font-black text-metallic uppercase">
                ACQUISITION CONFIRMED
              </h3>
              
              <p className="font-tech text-xs text-[#2CF598] tracking-widest uppercase">
                ORDER #DOOM-{Math.floor(100000 + Math.random() * 900000)} SECURED
              </p>

              <p className="font-sans text-xs text-[#8D918E] max-w-sm leading-relaxed">
                Your order is forged and dispatched to <span className="text-[#E5E5E0] font-medium">{shipping.address}, {shipping.city}</span>. Confirmation protocol transmitted to <span className="text-[#E5E5E0] font-medium">{shipping.email}</span>.
              </p>

              <button
                onClick={onClose}
                className="mt-6 px-8 py-3 rounded-xl bg-[#101311] border border-[#2D302F] text-[#E5E5E0] font-tech text-xs tracking-widest font-bold uppercase hover:border-[#0D9A5F] cursor-pointer"
              >
                RETURN TO THE ARMORY
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
