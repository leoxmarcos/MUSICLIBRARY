import Navbar from '@/components/Navbar';

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Navbar />
      <main className="flex-1 p-8 pt-24">
        <h1 className="text-4xl font-bold">Welcome to Muse</h1>
        <p className="mt-2 text-muted-foreground">This is your hero page.</p>
      </main>
    </div>
  );
}
