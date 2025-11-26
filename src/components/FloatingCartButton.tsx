'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartSheet } from './CartSheet';
import { Button } from './ui/button';

export const FloatingCartButton = () => {
  const { cartCount } = useCart();

  return (
    <CartSheet>
      <Button
        variant="destructive"
        className="fixed bottom-8 right-8 z-50 h-16 w-16 rounded-full shadow-lg transition-transform hover:scale-110"
        aria-label="Open cart"
      >
        <ShoppingCart className="h-7 w-7" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            {cartCount}
          </span>
        )}
        <span className="sr-only">Open Cart</span>
      </Button>
    </CartSheet>
  );
};
