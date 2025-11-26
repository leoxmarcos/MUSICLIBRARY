'use client';

import { useMemo, useState } from 'react';
import { useUser, useFirestore, useCollection, useDoc, useMemoFirebase } from '@/firebase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type Rental = {
  instrumentName: string;
  issueDate: { seconds: number; nanoseconds: number };
  returnDate: { seconds: number; nanoseconds: number };
};

type UserProfile = {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [submitted, setSubmitted] = useState<string[]>([]);

  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  const rentalsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'rentals');
  }, [user, firestore]);

  const {
    data: rentals,
    isLoading: areRentalsLoading,
    error,
  } = useCollection<Rental>(rentalsQuery);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
  };

  const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp.seconds * 1000);
    return format(date, 'PPP');
  };

  const handleReturn = async (rentalId: string) => {
    if (!user || !firestore) return;
    setSubmitted((prev) => [...prev, rentalId]);
    setTimeout(async () => {
      if (!user) return;
      const rentalDocRef = doc(firestore, 'users', user.uid, 'rentals', rentalId);
      await deleteDoc(rentalDocRef);
    }, 500); // Delay removal to show submitted state
  };

  const isLoading = isUserLoading || areRentalsLoading || isProfileLoading;
  const displayName = userProfile?.name || user?.displayName || 'Music Enthusiast';

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background/80 p-8 pt-24">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                {isLoading ? (
                  <Skeleton className="h-20 w-20 rounded-full" />
                ) : (
                  <Avatar className="h-20 w-20 border-2 border-primary">
                    <AvatarImage
                      src={user?.photoURL || ''}
                      alt={displayName}
                    />
                    <AvatarFallback className="text-2xl">
                      {getInitials(displayName)}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="space-y-1">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-7 w-48" />
                      <Skeleton className="h-5 w-64" />
                    </>
                  ) : (
                    <>
                      <CardTitle className="text-3xl">
                        {displayName}
                      </CardTitle>
                      <p className="text-muted-foreground">{user?.email}</p>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                My Rented Instruments
              </h2>
              {isLoading && (
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              )}
              {!isLoading && error && (
                <div className="text-destructive">
                  <p>
                    Error loading rentals: You may not have permission to view
                    this data.
                  </p>
                </div>
              )}
              {!isLoading && !error && rentals && rentals.length > 0 && (
                <div className="overflow-hidden rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Instrument</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Return Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rentals.map((rental) => (
                        <TableRow
                          key={rental.id}
                          className={cn(
                            'transition-opacity duration-500',
                            submitted.includes(rental.id) ? 'opacity-0' : 'opacity-100'
                          )}
                        >
                          <TableCell className="font-medium">
                            {rental.instrumentName}
                          </TableCell>
                          <TableCell>{formatDate(rental.issueDate)}</TableCell>
                          <TableCell>{formatDate(rental.returnDate)}</TableCell>
                          <TableCell className="text-right">
                             <Button
                                size="sm"
                                variant={submitted.includes(rental.id) ? 'outline' : 'default'}
                                className={cn(
                                'transition-all duration-300 w-28',
                                submitted.includes(rental.id)
                                    ? 'bg-white text-green-600 border-green-600'
                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                )}
                                onClick={() => handleReturn(rental.id)}
                                disabled={submitted.includes(rental.id)}
                            >
                                {submitted.includes(rental.id) ? 'Submitted' : 'Submit'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
               {!isLoading && !error && (!rentals || rentals.length === 0) && (
                 <div className="flex flex-col items-center justify-center rounded-md border border-dashed py-12 text-center">
                    <p className="text-lg font-medium text-muted-foreground">You have no rented instruments.</p>
                    <p className="text-sm text-muted-foreground mt-1">Visit the catalog to rent your first one!</p>
                 </div>
               )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
