import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl shadow-primary/20">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <Music className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-4xl font-bold tracking-tight text-foreground">
              Create Account
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Join Muse and start your musical journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="John Doe" required className="focus:border-accent focus:ring-accent" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="focus:border-accent focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required className="focus:border-accent focus:ring-accent" />
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <Button size="lg" className="w-full font-semibold shadow-lg bg-gradient-to-r from-primary to-accent text-primary-foreground transition-all hover:from-primary/90 hover:to-accent/90">
                Register
              </Button>
              <Link href="/login" passHref>
                <Button size="lg" variant="secondary" className="w-full font-semibold">
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
