
'use client';

import Link from 'next/link';
import { User as UserIcon } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { MusicBookLogo } from './GuitarLogo';

const Navbar = () => {
  const auth = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
    router.push('/login');
  };

  const getInitials = (email: string | null | undefined) => {
    if (!email) return 'U';
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/home" className="flex items-center gap-2" prefetch={false}>
          <MusicBookLogo className="h-10 w-auto" />
          <span className="sr-only">Music Library Home</span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 md:flex">
             <Link
              href="/home"
              className="text-sm font-medium text-destructive transition-colors hover:text-destructive/80 hover:underline underline-offset-4"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/catalog"
              className="text-sm font-medium text-destructive transition-colors hover:text-destructive/80 hover:underline underline-offset-4"
              prefetch={false}
            >
              Instruments
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-destructive transition-colors hover:text-destructive/80 hover:underline underline-offset-4"
              prefetch={false}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-destructive transition-colors hover:text-destructive/80 hover:underline underline-offset-4"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user.photoURL || undefined}
                      alt={user.displayName || 'User'}
                    />
                    <AvatarFallback>
                      {getInitials(user.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.displayName || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              onClick={() => router.push('/login')}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
