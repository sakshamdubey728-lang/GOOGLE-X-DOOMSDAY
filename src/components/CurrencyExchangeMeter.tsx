import React, { useState, useId } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { 
  X, 
  ArrowRightLeft, 
  Activity, 
  Search, 
  Check, 
  Sparkles, 
  Globe, 
  TrendingUp, 
  Zap,
  ShieldCheck
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export const CurrencyExchangeMeter: React.FC = () => {
  const { 
    currentCurrency, 
    setCurrency, 
    currencies, 
    isMeterOpen, 
    closeMeter 
  } = useCurrency();

  const [searchQuery, setSearchQuery] = useState('');
  const [calcAmount, setCalcAmount] = useState<number>(75);
  const [fromCode, setFromCode] = useState<string>('USD');
  const [activeTab, setActiveTab] = useState<'matrix' | 'converter'>('matrix');

  const converterInputId = useId();
  const searchInputId = useId();

  if (!isMeterOpen) return null;

  // Filter currencies
  const filteredCurrencies = currencies.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      c.symbol.toLowerCase().includes(q)
    );
  });

  // Calculate conversion from 'fromCode' to currentCurrency
  const fromCurrency = currencies.find((c) => c.code === fromCode) || currencies[0];
  const amountInUSD = calcAmount / fromCurrency.rate;
  const convertedResult = amountInUSD * currentCurrency.rate;

  const presetAmounts = [25, 55, 75, 120, 200];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={closeMeter} />

      {/* Main Meter Modal Box */}
      <div className="relative z-10 w-full max-w-4xl bg-[#0E1210] border border-[#2D302F] rounded-2xl metallic-card-shadow overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Radar Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#101311] border-b border-[#2D302F]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#063B27] border border-[#0D9A5F] flex items-center justify-center emerald-box-shadow">
              <ArrowRightLeft className="w-4 h-4 text-[#2CF598]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-black text-sm sm:text-base text-metallic uppercase tracking-wider">
                  SOVEREIGN CURRENCY EXCHANGE METER
                </span>
                <span className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-[#063B27] text-[10px] font-tech text-[#2CF598] font-bold border border-[#0D9A5F]">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>MATRIX ONLINE</span>
                </span>
              </div>
              <p className="font-tech text-[10px] tracking-widest text-[#8D918E] uppercase">
                LATVERIA GLOBAL CLEARING // ALL ARTIFACTS CONVERTED IN REAL-TIME
              </p>
            </div>
          </div>

          <button
            onClick={closeMeter}
            className="p-2 rounded-lg bg-[#080A09] border border-[#2D302F] text-[#8D918E] hover:text-white hover:border-[#0D9A5F] transition-all cursor-pointer"
            aria-label="Close Currency Meter"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tactical Meter Gauge Visual Bar */}
        <div className="bg-[#080A09] px-6 py-3 border-b border-[#2D302F] flex flex-wrap items-center justify-between gap-3 font-tech text-xs">
          {/* Active Calibration readout */}
          <div className="flex items-center space-x-2">
            <span className="text-[#8D918E]">CURRENT CALIBRATION:</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#101311] border border-[#0D9A5F] text-[#2CF598] font-bold">
              <span>{currentCurrency.flag}</span>
              <span>{currentCurrency.code}</span>
              <span>({currentCurrency.symbol})</span>
            </span>
            <span className="text-[#565A58] hidden sm:inline">//</span>
            <span className="text-[#8D918E] hidden sm:inline">
              1 USD = {currentCurrency.rate.toFixed(currentCurrency.decimals || 2)} {currentCurrency.code}
            </span>
          </div>

          {/* Animated Frequency Meter Oscilloscope Graphic */}
          <div className="flex items-center space-x-1.5 bg-[#101311] px-3 py-1 rounded-md border border-[#2D302F]">
            <span className="text-[10px] text-[#8D918E] uppercase mr-1">FLUX:</span>
            {[40, 75, 30, 95, 60, 85, 45, 100, 70, 50, 90, 65].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-[#2CF598] rounded-full transition-all duration-500"
                style={{
                  height: `${Math.max(6, Math.round((h * (currentCurrency.rate > 10 ? 1 : 0.8)) / 5))}px`,
                  opacity: 0.3 + (i % 3) * 0.35,
                }}
              />
            ))}
            <span className="text-[10px] text-[#2CF598] font-bold ml-1.5">±0.02%</span>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex border-b border-[#2D302F] bg-[#0E1210] px-6 pt-3">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`pb-3 px-4 font-tech text-xs tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'matrix'
                ? 'text-[#2CF598] border-b-2 border-[#2CF598]'
                : 'text-[#8D918E] hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>SELECT CURRENCY MATRIX ({currencies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('converter')}
            className={`pb-3 px-4 font-tech text-xs tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'converter'
                ? 'text-[#2CF598] border-b-2 border-[#2CF598]'
                : 'text-[#8D918E] hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>LIVE CONVERTER / CALCULATOR</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: CURRENCY MATRIX SELECTION */}
          {activeTab === 'matrix' && (
            <div className="space-y-4">
              
              {/* Search filter input */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#0D9A5F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id={searchInputId}
                  type="text"
                  placeholder="SEARCH CURRENCY BY CODE, COUNTRY OR NAME (e.g. INR, Euro, Yen, India, UK)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#080A09] border border-[#2D302F] text-xs font-tech text-[#E5E5E0] placeholder-[#565A58] focus:border-[#0D9A5F] outline-none transition-all uppercase"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8D918E] hover:text-white"
                  >
                    CLEAR
                  </button>
                )}
              </div>

              {/* Grid of Currencies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredCurrencies.map((c) => {
                  const isSelected = currentCurrency.code === c.code;
                  return (
                    <div
                      key={c.code}
                      onClick={() => {
                        setCurrency(c.code);
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                        isSelected
                          ? 'bg-[#063B27]/40 border-[#2CF598] shadow-[0_0_20px_rgba(44,245,152,0.25)]'
                          : 'bg-[#101311] border-[#2D302F] hover:border-[#0D9A5F] hover:bg-[#151916]'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <span className="text-2xl select-none" role="img" aria-label={c.name}>
                          {c.flag}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="font-tech text-sm font-black text-[#E5E5E0] group-hover:text-[#2CF598] transition-colors">
                              {c.code}
                            </span>
                            <span className="font-tech text-xs text-[#2CF598] font-bold">
                              {c.symbol}
                            </span>
                            {c.badge && (
                              <span className="px-1.5 py-0.2 rounded bg-[#063B27] border border-[#0D9A5F] text-[9px] font-tech text-[#2CF598] font-bold uppercase">
                                {c.badge}
                              </span>
                            )}
                          </div>
                          <p className="font-sans text-[11px] text-[#8D918E] truncate">
                            {c.name} • {c.country}
                          </p>
                          <p className="font-tech text-[10px] text-[#565A58] mt-0.5">
                            1 USD = {c.rate.toFixed(c.decimals || 2)} {c.symbol}
                          </p>
                        </div>
                      </div>

                      {isSelected ? (
                        <div className="w-7 h-7 rounded-full bg-[#063B27] border border-[#2CF598] flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-[#2CF598] stroke-[3]" />
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrency(c.code);
                          }}
                          className="px-2.5 py-1 rounded bg-[#080A09] border border-[#2D302F] text-[10px] font-tech text-[#8D918E] group-hover:text-white group-hover:border-[#0D9A5F] shrink-0 uppercase tracking-wider"
                        >
                          APPLY
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {filteredCurrencies.length === 0 && (
                <div className="py-12 text-center text-[#8D918E] font-tech text-xs uppercase">
                  NO MATCHING SOVEREIGN CURRENCY FOUND FOR &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INTERACTIVE LIVE CONVERTER / CALCULATOR */}
          {activeTab === 'converter' && (
            <div className="space-y-6">
              <div className="bg-[#080A09] border border-[#2D302F] rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-tech text-xs font-bold text-[#2CF598] tracking-widest uppercase flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#2CF598]" />
                    <span>TACTICAL CURRENCY COMPUTATION CORE</span>
                  </div>
                  <span className="font-tech text-[10px] text-[#8D918E] uppercase">
                    AUTO-COMPUTES STORE PRICING
                  </span>
                </div>

                {/* Amount input & From selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={converterInputId} className="block font-tech text-[11px] text-[#8D918E] uppercase mb-1.5">
                      Enter Amount to Convert
                    </label>
                    <div className="relative">
                      <input
                        id={converterInputId}
                        type="number"
                        min="1"
                        max="100000"
                        value={calcAmount}
                        onChange={(e) => setCalcAmount(Math.max(0, Number(e.target.value)))}
                        className="w-full px-4 py-3 rounded-xl bg-[#101311] border border-[#2D302F] text-lg font-tech font-extrabold text-[#E5E5E0] focus:border-[#0D9A5F] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="meter-from-currency-select" className="block font-tech text-[11px] text-[#8D918E] uppercase mb-1.5">
                      Base Currency
                    </label>
                    <select
                      id="meter-from-currency-select"
                      value={fromCode}
                      onChange={(e) => setFromCode(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#101311] border border-[#2D302F] text-sm font-tech font-bold text-[#E5E5E0] focus:border-[#0D9A5F] outline-none cursor-pointer"
                    >
                      {currencies.map((c) => (
                        <option key={c.code} value={c.code} className="bg-[#101311]">
                          {c.flag} {c.code} — {c.name} ({c.symbol})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preset Amount Quick Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="font-tech text-[10px] text-[#8D918E] uppercase mr-1">PRESETS:</span>
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => {
                        setCalcAmount(amt);
                        setFromCode('USD');
                        soundManager.playMetallicClick();
                      }}
                      className={`px-3 py-1 rounded-md font-tech text-xs tracking-wider font-bold transition-all cursor-pointer ${
                        calcAmount === amt && fromCode === 'USD'
                          ? 'bg-[#063B27] text-[#2CF598] border border-[#0D9A5F]'
                          : 'bg-[#101311] text-[#B8BAB7] border border-[#2D302F] hover:text-white'
                      }`}
                    >
                      ${amt} {amt === 75 ? '(FREE DISPATCH)' : ''}
                    </button>
                  ))}
                </div>

                {/* Result Display Box */}
                <div className="p-5 rounded-xl bg-gradient-to-r from-[#063B27]/40 via-[#101311] to-[#080A09] border border-[#0D9A5F] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="font-tech text-xs text-[#8D918E] uppercase">
                      EQUIVALENT IN ACTIVE STORE CURRENCY ({currentCurrency.code})
                    </div>
                    <div className="font-tech text-3xl sm:text-4xl font-black text-[#2CF598] mt-1 tracking-tight">
                      {currentCurrency.symbol}
                      {convertedResult.toLocaleString(undefined, {
                        minimumFractionDigits: currentCurrency.decimals,
                        maximumFractionDigits: currentCurrency.decimals,
                      })}{' '}
                      <span className="text-lg text-white font-tech">{currentCurrency.code}</span>
                    </div>
                    <div className="font-tech text-xs text-[#8D918E] mt-1">
                      Exchange Matrix: 1 {fromCurrency.code} = {(currentCurrency.rate / fromCurrency.rate).toFixed(currentCurrency.decimals || 4)} {currentCurrency.code}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      // Apply target currency to store
                      soundManager.playPowerPulse();
                      closeMeter();
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#063B27] border border-[#2CF598] text-[#E5E5E0] font-tech text-xs tracking-widest font-extrabold uppercase hover:bg-[#0A5C3A] cursor-pointer emerald-box-shadow flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#2CF598]" />
                    <span>CONFIRM & SHOP IN {currentCurrency.code}</span>
                  </button>
                </div>
              </div>

              {/* Sample Catalog Price Comparisons in Selected Currency */}
              <div className="space-y-2">
                <h4 className="font-tech text-xs text-[#8D918E] uppercase tracking-wider">
                  SAMPLE ARSENAL ARTIFACTS IN {currentCurrency.code} ({currentCurrency.symbol})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Tactical Cap', usd: 38.0 },
                    { label: 'Fast Charger', usd: 79.0 },
                    { label: 'Doomsday Backpack', usd: 145.0 },
                    { label: 'Latverian Keyboard', usd: 165.0 },
                  ].map((sample) => (
                    <div key={sample.label} className="p-3 rounded-lg bg-[#101311] border border-[#2D302F]">
                      <span className="font-tech text-[10px] text-[#8D918E] uppercase block truncate">{sample.label}</span>
                      <span className="font-tech text-sm font-extrabold text-[#2CF598] block mt-0.5">
                        {currentCurrency.symbol}
                        {(sample.usd * currentCurrency.rate).toLocaleString(undefined, {
                          minimumFractionDigits: currentCurrency.decimals,
                          maximumFractionDigits: currentCurrency.decimals,
                        })}
                      </span>
                      <span className="font-tech text-[9px] text-[#565A58] block">(${sample.usd} USD)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sovereign Security & Accuracy Note */}
          <div className="flex items-start space-x-3 p-4 rounded-xl bg-[#080A09] border border-[#2D302F]/60 text-[#8D918E]">
            <Sparkles className="w-4 h-4 text-[#2CF598] shrink-0 mt-0.5" />
            <p className="font-sans text-xs leading-relaxed">
              <strong className="text-[#E5E5E0]">Zero Hidden Markups:</strong> All catalog prices, cart balances, and final checkout charges are locked at current market clearing rates. Your local debit or credit institution will process the transaction seamlessly in your preferred sovereign currency.
            </p>
          </div>

        </div>

        {/* Footer Bar */}
        <div className="p-4 bg-[#101311] border-t border-[#2D302F] flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-tech text-[#8D918E]">
            <span className="w-2 h-2 rounded-full bg-[#2CF598] animate-ping" />
            <span>CALIBRATED FOR: <strong className="text-white">{currentCurrency.name} ({currentCurrency.code})</strong></span>
          </div>

          <button
            onClick={() => {
              soundManager.playPowerPulse();
              closeMeter();
            }}
            className="px-6 py-2.5 rounded-xl bg-[#063B27] border border-[#2CF598] text-[#2CF598] hover:bg-[#0A5C3A] font-tech text-xs tracking-wider font-extrabold uppercase transition-all cursor-pointer"
          >
            APPLY TO ARSENAL
          </button>
        </div>

      </div>
    </div>
  );
};
