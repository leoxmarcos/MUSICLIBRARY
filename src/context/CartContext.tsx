'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Instrument } from '@/app/catalog/page';
import { useToast } from '@/hooks/use-toast';

interface CartItem extends Instrument {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Instrument) => void;
  removeFromCart: (itemId: string) => void;
  cartCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (item: Instrument) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // For simplicity, we just notify it's already there. 
        // A real implementation might increase quantity.
        toast({
          title: 'Already in cart',
          description: `${item.name} is already in your cart.`,
        });
        return prevItems;
      }
      toast({
        title: 'Added to cart',
        description: `${item.name} has been added to your cart.`,
      });
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((i) => i.id === itemId);
      if(itemToRemove) {
        toast({
            variant: 'destructive',
            title: 'Removed from cart',
            description: `${itemToRemove.name} has been removed.`,
        });
      }
      return prevItems.filter((item) => item.id !== itemId);
    });
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // For this example, we'll use the 'buyAmount' for the total price calculation.
  // A real app would need logic to handle rent vs. buy selection.
  const totalPrice = cartItems.reduce((total, item) => total + item.buyAmount * item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    cartCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
