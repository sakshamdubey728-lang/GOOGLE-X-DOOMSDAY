export interface Product {
  id: string;
  name: string;
  originalName: string;
  price: number;
  originalPrice?: number;
  category: 'apparel' | 'tech' | 'drinkware' | 'accessories' | 'workspace' | 'collectibles';
  collection: 'armor' | 'vault' | 'ashes' | 'legacy';
  badge?: 'NEW' | 'LIMITED' | 'CLASSIFIED' | 'BEST SELLER' | 'LAST UNITS';
  badgeType?: 'emerald' | 'crimson' | 'purple' | 'silver' | 'red';
  rating: number;
  reviewsCount: number;
  image: string;
  additionalImages?: string[];
  description: string;
  storyCopy?: string;
  features: string[];
  specs: { label: string; value: string }[];
  colors: { name: string; hex: string }[];
  sizes?: string[];
  stock: number;
  isClassified?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface FilterState {
  category: string;
  collection: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  badgeFilter: string;
}

export interface CouponCode {
  code: string;
  discountPercentage: number;
  description: string;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  shippingMethod: 'standard' | 'express' | 'latverian-teleport';
}
