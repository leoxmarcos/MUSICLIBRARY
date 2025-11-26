'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useUser } from '@/firebase';
import { GuitarLogo } from '@/components/GuitarLogo';

export default function HomePage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center p-8 pt-24 text-center">
        <GuitarLogo className="h-24 w-auto mb-4" />
        <h1 className="text-5xl font-bold tracking-tight text-foreground">
          Welcome to your Music Library
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Discover, organize, and immerse yourself in the world of music. You are logged in as {user.email}.
        </p>
      </main>
    </div>
  );
}
