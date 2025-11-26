import Link from 'next/link';
import { Music } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/home" className="flex items-center gap-2" prefetch={false}>
          <Music className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">Muse</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/home"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary hover:underline underline-offset-4"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary hover:underline underline-offset-4"
            prefetch={false}
          >
            Catalog
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary hover:underline underline-offset-4"
            prefetch={false}
          >
            My Profile
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
