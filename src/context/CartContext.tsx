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
  clearCart: () => void;
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
    let itemExists = false;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        itemExists = true;
        return prevItems;
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });

    if (itemExists) {
      toast({
        title: 'Already in cart',
        description: `${item.name} is already in your cart.`,
      });
    } else {
      toast({
        title: 'Added to cart',
        description: `${item.name} has been added to your cart.`,
      });
    }
  };

  const removeFromCart = (itemId: string) => {
    let removedItemName: string | undefined;
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((i) => i.id === itemId);
      if(itemToRemove) {
        removedItemName = itemToRemove.name;
      }
      return prevItems.filter((item) => item.id !== itemId);
    });

    if(removedItemName) {
      toast({
          variant: 'destructive',
          title: 'Removed from cart',
          description: `${removedItemName} has been removed.`,
      });
    }
  };

  const clearCart = () => {
    setCartItems([]);
  }

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // For this example, we'll use the 'buyAmount' for the total price calculation.
  // A real app would need logic to handle rent vs. buy selection.
  const totalPrice = cartItems.reduce((total, item) => total + item.buyAmount * item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
