
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/firebase";

export default function RootPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading) {
      if (user) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    }
  }, [user, isUserLoading, router]);

  return (
     <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <p>Loading...</p>
    </main>
  );
}
