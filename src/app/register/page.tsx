'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import {
  useAuth,
  useUser,
  initiateEmailSignUp,
  useFirestore,
  setDocumentNonBlocking,
} from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { doc } from 'firebase/firestore';
import Image from 'next/image';
import { PlaceHolderImages, defaultImage } from '@/lib/placeholder-images';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const registerImage =
    PlaceHolderImages.find((img) => img.id === 'register-page') || defaultImage;
  const registerBgImage =
    PlaceHolderImages.find((img) => img.id === 'register-background') || defaultImage;

  useEffect(() => {
    if (user && firestore) {
      const userRef = doc(firestore, 'users', user.uid);
      setDocumentNonBlocking(
        userRef,
        { id: user.uid, loginId: user.email },
        { merge: true }
      );
      router.push('/home');
    }
  }, [user, firestore, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast({
        variant: 'destructive',
        title: 'Missing fields',
        description: 'Please fill out all fields.',
      });
      return;
    }
    try {
      await initiateEmailSignUp(auth, email, password);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        toast({
          variant: 'destructive',
          title: 'Registration Failed',
          description: 'This email is already in use. Please try another.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Registration Error',
          description: error.message || 'An unexpected error occurred.',
        });
      }
    }
  };

  if (isUserLoading) {
    return (
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
      <Image
        src={registerBgImage.imageUrl}
        alt={registerBgImage.description}
        fill
        className="object-cover -z-10"
        data-ai-hint={registerBgImage.imageHint}
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm -z-10" />
      <div className="w-full max-w-md">
        <Card className="bg-card/80">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="relative h-24 w-24">
                <Image
                  src={registerImage.imageUrl}
                  alt={registerImage.description}
                  fill
                  className="rounded-full object-cover"
                  data-ai-hint={registerImage.imageHint}
                />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold tracking-tight">
              Create Account
            </CardTitle>
            <CardDescription>
              Join Muse and start your musical journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="placeholder:text-muted-foreground/50 focus:border-accent focus:ring-accent"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="placeholder:text-muted-foreground/50 focus:border-accent focus:ring-accent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    className="placeholder:text-muted-foreground/50 focus:border-accent focus:ring-accent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-semibold glowing-btn"
                >
                  Register
                </Button>
                <Link href="/login" passHref>
                  <Button
                    size="lg"
                    variant="link"
                    className="w-full font-semibold text-accent"
                  >
                    Back to Login
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
