'use client';

import { useMemoFirebase, useUser, useFirestore, useCollection } from '@/firebase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { collection } from 'firebase/firestore';
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
import { format } from 'date-fns';

type Rental = {
  instrumentName: string;
  issueDate: { seconds: number; nanoseconds: number };
  returnDate: { seconds: number; nanoseconds: number };
};

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const rentalsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'rentals');
  }, [user, firestore]);

  const {
    data: rentals,
    isLoading: areRentalsLoading,
    error,
  } = useCollection<Rental>(rentalsQuery);

  const getInitials = (email: string | null | undefined) => {
    if (!email) return 'U';
    return email.substring(0, 2).toUpperCase();
  };

  const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp.seconds * 1000);
    return format(date, 'PPP');
  };

  const isLoading = isUserLoading || areRentalsLoading;

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
                      alt={user?.displayName || 'User'}
                    />
                    <AvatarFallback className="text-2xl">
                      {getInitials(user?.email)}
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
                        {user?.displayName || 'Music Enthusiast'}
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
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rentals.map((rental) => (
                        <TableRow key={rental.id}>
                          <TableCell className="font-medium">
                            {rental.instrumentName}
                          </TableCell>
                          <TableCell>{formatDate(rental.issueDate)}</TableCell>
                          <TableCell>{formatDate(rental.returnDate)}</TableCell>
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
