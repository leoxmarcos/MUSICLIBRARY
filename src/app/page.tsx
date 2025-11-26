import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-8 font-body text-center">
      <div className="flex flex-col items-center space-y-10">
        <div className="relative flex h-48 w-48 items-center justify-center">
          {/* Spinning progress ring */}
          <div className="absolute h-full w-full animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
          {/* Central Logo */}
          <Music className="h-28 w-28 text-primary" />
        </div>
        
        <div>
            <h1 className="text-5xl font-bold tracking-tight text-foreground font-headline">
            Music Library
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
            Sign in or register to access your collection.
            </p>
        </div>

        <div className="flex w-full max-w-xs flex-col gap-4 sm:flex-row">
            <Button size="lg" className="w-full shadow-lg shadow-primary/20">Login</Button>
            <Button size="lg" variant="secondary" className="w-full">Registration</Button>
        </div>
      </div>
    </main>
  );
}
