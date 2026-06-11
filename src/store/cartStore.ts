import { useState, useEffect } from 'react';
import type { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_KEY = 'domelite_cart';
const FAVORITES_KEY = 'domelite_favorites';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch { return []; }
  });

  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (product: Product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.product.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.product.id === id ? { ...i, quantity } : i));
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const isFavorite = (id: number) => favorites.includes(id);

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return { cart, favorites, addToCart, removeFromCart, updateQuantity, clearCart, toggleFavorite, isFavorite, cartTotal, cartCount };
}
