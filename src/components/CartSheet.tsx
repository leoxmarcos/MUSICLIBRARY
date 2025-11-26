'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { ScrollArea } from './ui/scroll-area';
import { Trash2 } from 'lucide-react';
import { Separator } from './ui/separator';

export const CartSheet = ({ children }: { children: React.ReactNode }) => {
  const { cartItems, cartCount, totalPrice, removeFromCart } = useCart();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>My Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        {cartCount > 0 ? (
          <>
            <ScrollArea className="flex-1 pr-4 -mr-6">
              <div className="flex flex-col gap-4 py-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden">
                       <Image
                        src={item.image.imageUrl}
                        alt={item.image.description}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {formatPrice(item.buyAmount)}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4 text-destructive"/>
                        <span className="sr-only">Remove item</span>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto">
              <div className="w-full space-y-4">
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                </div>
                 <Button className="w-full glowing-btn" size="lg">Checkout</Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-xl font-semibold">Your cart is empty.</p>
            <p className="text-muted-foreground mt-2">Add some instruments to get started!</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
