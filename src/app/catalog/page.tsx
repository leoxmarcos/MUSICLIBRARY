'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  PlaceHolderImages,
  defaultImage,
} from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

type Instrument = {
  name: string;
  price: number;
  image: (typeof PlaceHolderImages)[0];
};

const instruments: Instrument[] = [
  { name: 'Acoustic Guitar', price: 25000, image: PlaceHolderImages.find(img => img.id === 'guitar') || defaultImage },
  { name: 'Electric Guitar', price: 45000, image: PlaceHolderImages.find(img => img.id === 'electric-guitar') || defaultImage },
  { name: 'Bass Guitar', price: 35000, image: PlaceHolderImages.find(img => img.id === 'bass-guitar') || defaultImage },
  { name: 'Grand Piano', price: 450000, image: PlaceHolderImages.find(img => img.id === 'piano') || defaultImage },
  { name: 'Digital Keyboard', price: 30000, image: PlaceHolderImages.find(img => img.id === 'keyboard') || defaultImage },
  { name: 'Synthesizer', price: 75000, image: PlaceHolderImages.find(img => img.id === 'synthesizer') || defaultImage },
  { name: 'Drum Kit', price: 60000, image: PlaceHolderImages.find(img => img.id === 'drums') || defaultImage },
  { name: 'Bongos', price: 8000, image: PlaceHolderImages.find(img => img.id === 'bongos') || defaultImage },
  { name: 'Congas', price: 22000, image: PlaceHolderImages.find(img => img.id === 'congas') || defaultImage },
  { name: 'Violin', price: 18000, image: PlaceHolderImages.find(img => img.id === 'violin') || defaultImage },
  { name: 'Cello', price: 40000, image: PlaceHolderImages.find(img => img.id === 'cello') || defaultImage },
  { name: 'Trumpet', price: 15000, image: PlaceHolderImages.find(img => img.id === 'trumpet') || defaultImage },
  { name: 'Saxophone', price: 55000, image: PlaceHolderImages.find(img => img.id === 'saxophone') || defaultImage },
  { name: 'Flute', price: 12000, image: PlaceHolderImages.find(img => img.id === 'flute') || defaultImage },
  { name: 'Clarinet', price: 20000, image: PlaceHolderImages.find(img => img.id === 'clarinet') || defaultImage },
  { name: 'Harmonica', price: 3000, image: PlaceHolderImages.find(img => img.id === 'harmonica') || defaultImage },
  { name: 'Accordion', price: 38000, image: PlaceHolderImages.find(img => img.id === 'accordion') || defaultImage },
  { name: 'Ukulele', price: 5000, image: PlaceHolderImages.find(img => img.id === 'ukulele') || defaultImage },
  { name: 'Banjo', price: 28000, image: PlaceHolderImages.find(img => img.id === 'banjo') || defaultImage },
  { name: 'Mandolin', price: 16000, image: PlaceHolderImages.find(img => img.id === 'mandolin') || defaultImage },
  { name: 'Sitar', price: 32000, image: PlaceHolderImages.find(img => img.id === 'sitar') || defaultImage },
  { name: 'Tabla', price: 10000, image: PlaceHolderImages.find(img => img.id === 'tabla') || defaultImage },
];

export default function CatalogPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

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
                className="overflow-hidden bg-card text-card-foreground transition-shadow hover:shadow-lg hover:shadow-primary/20 flex flex-col"
              >
                <CardHeader className="p-0">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={instrument.image.imageUrl}
                      alt={instrument.image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={instrument.image.imageHint}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-xl font-semibold">
                    {instrument.name}
                  </CardTitle>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <p className="text-lg font-bold text-primary">
                    {formatPrice(instrument.price)}
                  </p>
                   <Button size="sm" className="glowing-btn">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
