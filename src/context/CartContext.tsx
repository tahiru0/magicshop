"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface Product {
  id: string;
  name: string;
  price: string;
  numericPrice: number;
  image: string;
  category: string;
  description: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  mergeWithServerCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  // Load cart from localStorage or user account on mount
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        // If user is logged in, try to load their cart from the server
        try {
          const res = await fetch('/api/cart');
          if (res.ok) {
            const data = await res.json();
            if (data.cart && Array.isArray(data.cart)) {
              setCart(data.cart);
              return;
            }
          }
        } catch (err) {
          console.error('Failed to load user cart', err);
        }
      }
      
      // Fall back to localStorage if no server cart or not logged in
      const savedCart = localStorage.getItem('magicShopCart');
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (error) {
          console.error('Failed to parse saved cart', error);
        }
      }
    };
    
    loadCart();
  }, [user]); // Reload when user changes (login/logout)

  // Save cart to localStorage and server when it changes
  useEffect(() => {
    // Always save to localStorage for quick access
    localStorage.setItem('magicShopCart', JSON.stringify(cart));
    
    // If user is logged in, also save to server
    if (user && cart.length > 0) {
      fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart }),
      }).catch(err => {
        console.error('Failed to save cart to server', err);
      });
    }
  }, [cart, user]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { id: product.id, product, quantity: 1 }];
      }
    });
    setIsOpen(true); // Open cart when adding item
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(prevCart => 
        prevCart.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => {
    setIsOpen(prev => !prev);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  // Merge local cart with server cart after login
  const mergeWithServerCart = async () => {
    if (user && cart.length > 0) {
      try {
        await fetch('/api/cart/merge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart }),
        });
      } catch (err) {
        console.error('Failed to merge cart with server', err);
      }
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      isOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart,
      closeCart,
      mergeWithServerCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
