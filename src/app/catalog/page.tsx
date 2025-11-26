'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  PlaceHolderImages,
  defaultImage,
} from '@/lib/placeholder-images';

type Instrument = {
  name: string;
  price: number;
  image: (typeof PlaceHolderImages)[0];
};

const instruments: Instrument[] = [
  {
    name: 'Acoustic Guitar',
    price: 499.99,
    image:
      PlaceHolderImages.find((img) => img.id === 'guitar') || defaultImage,
  },
  {
    name: 'Grand Piano',
    price: 5999.99,
    image: PlaceHolderImages.find((img) => img.id === 'piano') || defaultImage,
  },
  {
    name: 'Drum Kit',
    price: 899.99,
    image: PlaceHolderImages.find((img) => img.id === 'drums') || defaultImage,
  },
  {
    name: 'Violin',
    price: 349.99,
    image: PlaceHolderImages.find((img) => img.id === 'violin') || defaultImage,
  },
  {
    name: 'Trumpet',
    price: 299.99,
    image:
      PlaceHolderImages.find((img) => img.id === 'trumpet') || defaultImage,
  },
  {
    name: 'Saxophone',
    price: 699.99,
    image:
      PlaceHolderImages.find((img) => img.id === 'saxophone') || defaultImage,
  },
];

export default function CatalogPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Navbar />
      <main className="flex-1 p-8 pt-24">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Instrument Catalog
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse our collection of instruments available for rental or purchase.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {instruments.map((instrument) => (
              <Card
                key={instrument.name}
                className="overflow-hidden bg-card text-card-foreground transition-shadow hover:shadow-lg hover:shadow-primary/20"
              >
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={instrument.image.imageUrl}
                      alt={instrument.image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={instrument.image.imageHint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl font-semibold">
                    {instrument.name}
                  </CardTitle>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <p className="text-lg font-medium text-primary">
                    ${instrument.price.toFixed(2)}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
