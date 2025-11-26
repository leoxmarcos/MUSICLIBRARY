'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import { PlaceHolderImages } from '@/lib/placeholder-images';

const newsItems = [
  {
    title: 'New Album: "Echoes of the Void"',
    description:
      'The latest album from indie sensation "Starlight Bloom" is now available. A journey through synth-pop soundscapes.',
    image: PlaceHolderImages.find((img) => img.id === 'album-cover-1')!,
  },
  {
    title: 'Artist Spotlight: An Interview with DJ Hex',
    description:
      'We sit down with the enigmatic DJ Hex to discuss their creative process and the future of electronic music.',
    image: PlaceHolderImages.find((img) => img.id === 'artist-interview')!,
  },
  {
    title: 'MuseFest 2024 Lineup Announced!',
    description:
      'The biggest music festival of the year is back! Check out the star-studded lineup featuring over 100 artists.',
    image: PlaceHolderImages.find((img) => img.id === 'music-festival')!,
  },
  {
    title: 'Vintage Vinyl Collection Restocked',
    description:
      'Rare and classic vinyl records are back in stock. Grab your favorites before they are gone again!',
    image: PlaceHolderImages.find((img) => img.id === 'vinyl-collection')!,
  },
];

export default function HomePage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Navbar />
      <main className="flex flex-1 flex-col items-center p-8 pt-24 text-center">
        <div className="container mx-auto">
          <GuitarLogo className="h-24 w-auto mb-4 mx-auto" />
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            Welcome to your Music Library
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
            Discover, organize, and immerse yourself in the world of music. You
            are logged in as {user.email}.
          </p>
        </div>

        <section className="w-full max-w-6xl mt-16 text-left">
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
      </main>
    </div>
  );
}
