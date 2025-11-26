'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useUser } from '@/firebase';
import { GuitarLogo } from '@/components/GuitarLogo';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages, defaultImage } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const newsItems = [
  {
    title: 'New Album: "Echoes of the Void"',
    description:
      'The latest album from indie sensation "Starlight Bloom" is now available. A journey through synth-pop soundscapes.',
    image:
      PlaceHolderImages.find((img) => img.id === 'album-cover-1') ||
      defaultImage,
  },
  {
    title: 'Artist Spotlight: An Interview with DJ Hex',
    description:
      'We sit down with the enigmatic DJ Hex to discuss their creative process and the future of electronic music.',
    image:
      PlaceHolderImages.find((img) => img.id === 'artist-interview') ||
      defaultImage,
  },
  {
    title: 'MuseFest 2024 Lineup Announced!',
    description:
      'The biggest music festival of the year is back! Check out the star-studded lineup featuring over 100 artists.',
    image:
      PlaceHolderImages.find((img) => img.id === 'music-festival') ||
      defaultImage,
  },
  {
    title: 'Vintage Vinyl Collection Restocked',
    description:
      'Rare and classic vinyl records are back in stock. Grab your favorites before they are gone again!',
    image:
      PlaceHolderImages.find((img) => img.id === 'vinyl-collection') ||
      defaultImage,
  },
];

const recommendedInstruments = [
  {
    name: 'Acoustic Guitar',
    image: PlaceHolderImages.find((img) => img.id === 'guitar') || defaultImage,
  },
  {
    name: 'Grand Piano',
    image: PlaceHolderImages.find((img) => img.id === 'piano') || defaultImage,
  },
  {
    name: 'Drum Kit',
    image: PlaceHolderImages.find((img) => img.id === 'drums') || defaultImage,
  },
  {
    name: 'Violin',
    image: PlaceHolderImages.find((img) => img.id === 'violin') || defaultImage,
  },
];

const welcomeMessages = [
  'Discover, organize, and immerse yourself in the world of music.',
  'Where every note finds its home.',
  'Your personal sanctuary for sound.',
  'Craft your next masterpiece. All your instruments, in one place.',
  'The ultimate playground for musicians.',
];


export default function HomePage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) =>
        (prevIndex + 1) % welcomeMessages.length
      );
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <p>Loading...</p>
      </div>
    );
  }

  const featuredBannerImage =
    PlaceHolderImages.find((img) => img.id === 'featured-banner') ||
    defaultImage;
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Navbar />
      <main className="flex flex-1 flex-col items-center pt-16 text-center">
        {/* Welcome Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <GuitarLogo className="h-24 w-auto mb-4 mx-auto" />
            <h1 className="text-5xl font-bold tracking-tight text-foreground">
              Welcome to your Music Library
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
              {welcomeMessages[currentMessageIndex]}
            </p>
          </div>
        </section>

        {/* Featured Banner */}
        <section className="w-full">
          <div className="relative h-[400px] w-full">
            <Image
              src={featuredBannerImage.imageUrl}
              alt={featuredBannerImage.description}
              fill
              className="object-cover"
              data-ai-hint="musical instruments"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
              <h2 className="text-4xl font-extrabold text-primary-foreground">
                New Instrument Arrivals
              </h2>
              <p className="mt-2 text-lg text-primary-foreground/90">
                Fresh sounds just dropped. Explore the latest additions to our
                collection.
              </p>
              <Link href="/catalog" passHref>
                <Button className="mt-6 glowing-btn" size="lg">
                  View
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Latest Updates Carousel */}
        <section className="w-full max-w-6xl mt-16 px-4 md:px-6 text-left">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
            Latest Updates
          </h2>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {newsItems.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card className="overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                      <CardContent className="relative flex aspect-square items-center justify-center p-0">
                        <Image
                          src={item.image.imageUrl}
                          alt={item.image.description}
                          fill
                          className="object-cover"
                          data-ai-hint={item.image.imageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="text-lg font-semibold text-primary-foreground">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-12" />
            <CarouselNext className="mr-12" />
          </Carousel>
        </section>

        {/* Instruments */}
        <section className="w-full max-w-6xl mt-16 px-4 md:px-6 text-left">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
            Instruments
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recommendedInstruments.map((instrument) => (
              <Link key={instrument.name} href="/catalog">
                <Card className="group overflow-hidden transition-shadow hover:shadow-lg hover:shadow-primary/20">
                  <CardContent className="relative p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={instrument.image.imageUrl}
                        alt={instrument.image.description}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={instrument.image.imageHint}
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-card-foreground">
                        {instrument.name}
                      </h3>
                      <p className="text-sm text-primary group-hover:underline">
                        View in Catalog
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="w-full bg-card mt-16 py-6">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <p className="text-sm text-muted-foreground">
            Follow us on social media
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
