'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { ScrollArea } from './ui/scroll-area';
import { Trash2 } from 'lucide-react';
import { Separator } from './ui/separator';
import { useUser, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export const CartSheet = ({ children }: { children: React.ReactNode }) => {
  const { cartItems, cartCount, totalPrice, removeFromCart, clearCart } =
    useCart();
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = async () => {
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Not logged in',
        description: 'You must be logged in to checkout.',
      });
      router.push('/login');
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: 'Empty Cart',
        description: 'There are no items in your cart to checkout.',
      });
      return;
    }

    const rentalsRef = collection(firestore, 'users', user.uid, 'rentals');
    const issueDate = new Date();
    const returnDate = new Date();
    returnDate.setMonth(returnDate.getMonth() + 1);

    // Using Promise.all to wait for all writes to be initiated
    await Promise.all(
      cartItems.map((item) => {
        const rentalData = {
          instrumentName: item.name,
          issueDate: issueDate,
          returnDate: returnDate,
        };
        // We are not awaiting each call here, just initiating them.
        // addDocumentNonBlocking will handle the Firestore write.
        return addDocumentNonBlocking(rentalsRef, rentalData);
      })
    );

    clearCart();

    toast({
      title: 'Checkout Successful!',
      description:
        'Your instruments have been rented. Check your profile for details.',
    });

     // Optionally, close the sheet or navigate to profile
    router.push('/profile');
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
            <ScrollArea className="flex-1 -mr-6 pr-4">
              <div className="flex flex-col gap-4 py-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                      <Image
                        src={item.image.imageUrl}
                        alt={item.image.description}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.buyAmount)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto">
              <div className="w-full space-y-4">
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <Button
                  className="w-full glowing-btn"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="text-xl font-semibold">Your cart is empty.</p>
            <p className="mt-2 text-muted-foreground">
              Add some instruments to get started!
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
