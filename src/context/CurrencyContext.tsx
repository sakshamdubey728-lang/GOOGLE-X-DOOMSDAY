import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Currency } from '../types';
import { soundManager } from '../utils/audio';

export const CURRENCIES: Currency[] = [
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    rate: 1.0,
    flag: '🇺🇸',
    decimals: 2,
    country: 'United States',
    badge: 'BASE'
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    rate: 0.92,
    flag: '🇪🇺',
    decimals: 2,
    country: 'European Union'
  },
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    rate: 0.79,
    flag: '🇬🇧',
    decimals: 2,
    country: 'United Kingdom'
  },
  {
    code: 'INR',
    name: 'Indian Rupee',
    symbol: '₹',
    rate: 84.0,
    flag: '🇮🇳',
    decimals: 2,
    country: 'India',
    badge: 'POPULAR'
  },
  {
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    rate: 155.0,
    flag: '🇯🇵',
    decimals: 0,
    country: 'Japan'
  },
  {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'CA$',
    rate: 1.37,
    flag: '🇨🇦',
    decimals: 2,
    country: 'Canada'
  },
  {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'A$',
    rate: 1.52,
    flag: '🇦🇺',
    decimals: 2,
    country: 'Australia'
  },
  {
    code: 'CHF',
    name: 'Swiss Franc',
    symbol: 'CHF',
    rate: 0.89,
    flag: '🇨🇭',
    decimals: 2,
    country: 'Switzerland'
  },
  {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'AED ',
    rate: 3.67,
    flag: '🇦🇪',
    decimals: 2,
    country: 'United Arab Emirates'
  },
  {
    code: 'SGD',
    name: 'Singapore Dollar',
    symbol: 'S$',
    rate: 1.35,
    flag: '🇸🇬',
    decimals: 2,
    country: 'Singapore'
  },
  {
    code: 'BRL',
    name: 'Brazilian Real',
    symbol: 'R$',
    rate: 5.45,
    flag: '🇧🇷',
    decimals: 2,
    country: 'Brazil'
  },
  {
    code: 'KRW',
    name: 'South Korean Won',
    symbol: '₩',
    rate: 1380.0,
    flag: '🇰🇷',
    decimals: 0,
    country: 'South Korea'
  },
  {
    code: 'LAT',
    name: 'Latverian Franc',
    symbol: '⚡',
    rate: 2.50,
    flag: '🏰',
    decimals: 2,
    country: 'Latverian Realm',
    badge: 'SOVEREIGN'
  }
];

interface CurrencyContextType {
  currentCurrency: Currency;
  setCurrency: (code: string) => void;
  formatPrice: (amountInUSD: number, showCode?: boolean) => string;
  convertPrice: (amountInUSD: number) => number;
  currencies: Currency[];
  isMeterOpen: boolean;
  openMeter: () => void;
  closeMeter: () => void;
  toggleMeter: () => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const STORAGE_KEY = 'doom_armory_currency';

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentCurrency, setCurrentCurrencyState] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const found = CURRENCIES.find((c) => c.code === saved);
        if (found) return found;
      }
    } catch {
      // Ignore localStorage errors
    }
    return CURRENCIES[0]; // USD default
  });

  const [isMeterOpen, setIsMeterOpen] = useState(false);

  const setCurrency = (code: string) => {
    const target = CURRENCIES.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (target) {
      setCurrentCurrencyState(target);
      try {
        localStorage.setItem(STORAGE_KEY, target.code);
      } catch {
        // Ignore
      }
      soundManager.playPowerPulse();
    }
  };

  const convertPrice = (amountInUSD: number): number => {
    if (isNaN(amountInUSD)) return 0;
    return amountInUSD * currentCurrency.rate;
  };

  const formatPrice = (amountInUSD: number, showCode: boolean = false): string => {
    if (isNaN(amountInUSD)) return `${currentCurrency.symbol}0.00`;
    const converted = amountInUSD * currentCurrency.rate;
    const formatted = converted.toLocaleString(undefined, {
      minimumFractionDigits: currentCurrency.decimals,
      maximumFractionDigits: currentCurrency.decimals,
    });
    return showCode ? `${currentCurrency.symbol}${formatted} ${currentCurrency.code}` : `${currentCurrency.symbol}${formatted}`;
  };

  const openMeter = () => {
    setIsMeterOpen(true);
    soundManager.playMetallicClick();
  };

  const closeMeter = () => {
    setIsMeterOpen(false);
  };

  const toggleMeter = () => {
    setIsMeterOpen((prev) => !prev);
    soundManager.playMetallicClick();
  };

  return (
    <CurrencyContext.Provider
      value={{
        currentCurrency,
        setCurrency,
        formatPrice,
        convertPrice,
        currencies: CURRENCIES,
        isMeterOpen,
        openMeter,
        closeMeter,
        toggleMeter,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
