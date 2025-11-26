import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const PianoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18.5 8c-1.5 0-2.8-1.4-3-3 .1-1.6 1.5-3 3-3 1.7 0 3 1.3 3 3 .1 1.6-1.2 3-3 3Z" />
    <path d="M12 11.5v-2" />
    <path d="M12 22V10" />
    <path d="M5 22V10" />
    <path d="M19 13.3V22" />
    <path d="M2 10h20" />
  </svg>
);


export default function RegisterPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 bg-gradient-to-br from-background via-purple-900/10 to-background">
      <div className="w-full max-w-md">
        <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-2xl shadow-primary/10">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
                <PianoIcon className="h-16 w-16 text-foreground drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
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
                <Label htmlFor="name" className="text-foreground/80">Name</Label>
                <Input id="name" type="text" placeholder="John Doe" required className="placeholder:text-muted-foreground/50 focus:border-accent focus:ring-accent" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/80">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="placeholder:text-muted-foreground/50 focus:border-accent focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground/80">Password</Label>
                <Input id="password" type="password" required className="placeholder:text-muted-foreground/50 focus:border-accent focus:ring-accent" />
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <Button size="lg" className="w-full font-semibold shadow-lg bg-gradient-to-r from-primary to-accent text-primary-foreground transition-all hover:brightness-110 hover:shadow-accent/40">
                Register
              </Button>
              <Link href="/login" passHref>
                <Button size="lg" variant="link" className="w-full font-semibold text-secondary hover:text-secondary/90">
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
