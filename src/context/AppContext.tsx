import React, { createContext, useContext } from 'react';
import { useCart } from '@/store/cartStore';
import type { CartItem } from '@/store/cartStore';
import type { Product } from '@/data/products';

interface AppContextType {
  cart: CartItem[];
  favorites: number[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  cartTotal: number;
  cartCount: number;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const cartData = useCart();
  return <AppContext.Provider value={cartData}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
