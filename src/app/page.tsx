import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl shadow-primary/10">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <Music className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-4xl font-bold tracking-tight text-foreground">
              Muse
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to unlock your music world.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <Button size="lg" className="w-full font-semibold shadow-lg shadow-primary/20">
                Log In
              </Button>
              <Button size="lg" variant="secondary" className="w-full font-semibold">
                Registration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
