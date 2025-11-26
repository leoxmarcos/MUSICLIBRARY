"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 40); 

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl shadow-primary/10">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <Music className="h-12 w-12 animate-pulse text-primary" />
            </div>
            <CardTitle className="text-4xl font-bold tracking-tight text-foreground">
              Muse
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Your music library is loading...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Progress value={progress} className="w-full" />
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <Link href="/login" passHref>
                <Button size="lg" className="w-full font-semibold shadow-lg shadow-primary/20" disabled={progress < 100}>
                  Log In
                </Button>
              </Link>
              <Link href="/register" passHref>
                <Button size="lg" variant="secondary" className="w-full font-semibold" disabled={progress < 100}>
                  Registration
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
