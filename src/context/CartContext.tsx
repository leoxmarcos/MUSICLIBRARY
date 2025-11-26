'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Instrument } from '@/app/catalog/page';
import { useToast } from '@/hooks/use-toast';

interface CartItem extends Instrument {
  quantity: number;
  instrumentQuantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Instrument) => void;
  removeFromCart: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
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

  const addToCart = useCallback((item: Instrument) => {
    let message = '';
    let variant: 'default' | 'destructive' = 'default';
    let title = '';

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      
      if (existingItem) {
        if (existingItem.quantity < item.quantity) {
          title = 'Added to cart';
          message = `${item.name} has been added to your cart.`;
          return prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          variant = 'destructive';
          title = 'Out of Stock';
          message = `No more ${item.name}s are available.`;
          return prevItems;
        }
      }
      
      if (item.quantity > 0) {
        title = 'Added to cart';
        message = `${item.name} has been added to your cart.`;
        return [...prevItems, { ...item, quantity: 1, instrumentQuantity: item.quantity }];
      } else {
        variant = 'destructive';
        title = 'Out of Stock';
        message = `No more ${item.name}s are available.`;
        return prevItems;
      }
    });

    toast({
      variant,
      title,
      description: message,
    });
  }, [toast]);

  const removeFromCart = useCallback((itemId: string) => {
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
  }, [toast]);

  const increaseQuantity = useCallback((itemId: string) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === itemId) {
          if (item.quantity < item.instrumentQuantity) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            toast({
              variant: 'destructive',
              title: 'Stock limit reached',
              description: `You cannot add more ${item.name}s.`,
            });
            return item;
          }
        }
        return item;
      });
    });
  }, [toast]);

  const decreaseQuantity = useCallback((itemId: string) => {
    setCartItems((prevItems) => {
      const itemToUpdate = prevItems.find((item) => item.id === itemId);
      if (itemToUpdate && itemToUpdate.quantity > 1) {
        return prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        // If quantity is 1, remove the item
        return prevItems.filter((item) => item.id !== itemId);
      }
    });
  }, []);

  const clearCart = () => {
    setCartItems([]);
  }

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const totalPrice = cartItems.reduce((total, item) => total + item.buyAmount * item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
