
'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  PlaceHolderImages,
  defaultImage,
} from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Landmark, Calendar, Globe } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';

export type Instrument = {
  id: string;
  name: string;
  rentAmount: number;
  buyAmount: number;
  image: (typeof PlaceHolderImages)[0];
  yearMade: number;
  firstPlayed: string;
  countryOfOrigin: string;
  quantity: number;
};

const instruments: Omit<Instrument, 'id'>[] = [
  { name: 'Acoustic Guitar', rentAmount: 1500, buyAmount: 25000, image: PlaceHolderImages.find(img => img.id === 'guitar') || defaultImage, yearMade: 1833, firstPlayed: 'Early 19th Century', countryOfOrigin: 'USA', quantity: 5 },
  { name: 'Electric Guitar', rentAmount: 2500, buyAmount: 45000, image: PlaceHolderImages.find(img => img.id === 'electric-guitar') || defaultImage, yearMade: 1931, firstPlayed: '1930s Jazz Bands', countryOfOrigin: 'USA', quantity: 3 },
  { name: 'Bass Guitar', rentAmount: 2000, buyAmount: 35000, image: PlaceHolderImages.find(img => img.id === 'bass-guitar') || defaultImage, yearMade: 1951, firstPlayed: '1950s Rock and Roll', countryOfOrigin: 'USA', quantity: 0 },
  { name: 'Grand Piano', rentAmount: 20000, buyAmount: 450000, image: PlaceHolderImages.find(img => img.id === 'piano') || defaultImage, yearMade: 1700, firstPlayed: '18th Century Courts', countryOfOrigin: 'Italy', quantity: 2 },
  { name: 'Digital Keyboard', rentAmount: 1800, buyAmount: 30000, image: PlaceHolderImages.find(img => img.id === 'keyboard') || defaultImage, yearMade: 1980, firstPlayed: '1980s Pop Music', countryOfOrigin: 'Japan', quantity: 8 },
  { name: 'Synthesizer', rentAmount: 4000, buyAmount: 75000, image: PlaceHolderImages.find(img => img.id === 'synthesizer') || defaultImage, yearMade: 1964, firstPlayed: '1960s Electronic Music', countryOfOrigin: 'USA', quantity: 4 },
  { name: 'Drum Kit', rentAmount: 3500, buyAmount: 60000, image: PlaceHolderImages.find(img => img.id === 'drums') || defaultImage, yearMade: 1909, firstPlayed: 'Early Jazz Era', countryOfOrigin: 'USA', quantity: 3 },
  { name: 'Bongos', rentAmount: 500, buyAmount: 8000, image: PlaceHolderImages.find(img => img.id === 'bongos') || defaultImage, yearMade: 1800, firstPlayed: '19th Century Cuban Music', countryOfOrigin: 'Cuba', quantity: 10 },
  { name: 'Congas', rentAmount: 1200, buyAmount: 22000, image: PlaceHolderImages.find(img => img.id === 'congas') || defaultImage, yearMade: 1940, firstPlayed: 'Afro-Cuban Jazz', countryOfOrigin: 'Cuba', quantity: 0 },
  { name: 'Violin', rentAmount: 1000, buyAmount: 18000, image: PlaceHolderImages.find(img => img.id === 'violin') || defaultImage, yearMade: 1550, firstPlayed: '16th Century Italy', countryOfOrigin: 'Italy', quantity: 7 },
  { name: 'Cello', rentAmount: 2200, buyAmount: 40000, image: PlaceHolderImages.find(img => img.id === 'cello') || defaultImage, yearMade: 1500, firstPlayed: '16th Century Europe', countryOfOrigin: 'Italy', quantity: 3 },
  { name: 'Trumpet', rentAmount: 900, buyAmount: 15000, image: PlaceHolderImages.find(img => img.id === 'trumpet') || defaultImage, yearMade: 1500, firstPlayed: 'Ancient Ceremonies', countryOfOrigin: 'Egypt', quantity: 6 },
  { name: 'Saxophone', rentAmount: 3000, buyAmount: 55000, image: PlaceHolderImages.find(img => img.id === 'saxophone') || defaultImage, yearMade: 1846, firstPlayed: '19th Century Military Bands', countryOfOrigin: 'Belgium', quantity: 4 },
  { name: 'Flute', rentAmount: 700, buyAmount: 12000, image: PlaceHolderImages.find(img => img.id === 'flute') || defaultImage, yearMade: 1847, firstPlayed: 'Prehistoric Times', countryOfOrigin: 'Germany (Modern Flute)', quantity: 9 },
  { name: 'Clarinet', rentAmount: 1100, buyAmount: 20000, image: PlaceHolderImages.find(img => img.id === 'clarinet') || defaultImage, yearMade: 1700, firstPlayed: '18th Century Orchestras', countryOfOrigin: 'Germany', quantity: 5 },
  { name: 'Harmonica', rentAmount: 200, buyAmount: 3000, image: PlaceHolderImages.find(img => img.id === 'harmonica') || defaultImage, yearMade: 1821, firstPlayed: '19th Century Folk Music', countryOfOrigin: 'Germany', quantity: 15 },
  { name: 'Accordion', rentAmount: 2000, buyAmount: 38000, image: PlaceHolderImages.find(img => img.id === 'accordion') || defaultImage, yearMade: 1822, firstPlayed: '19th Century European Folk', countryOfOrigin: 'Germany', quantity: 3 },
  { name: 'Ukulele', rentAmount: 300, buyAmount: 5000, image: PlaceHolderImages.find(img => img.id === 'ukulele') || defaultImage, yearMade: 1880, firstPlayed: 'Late 19th Century Hawaii', countryOfOrigin: 'Portugal/Hawaii', quantity: 12 },
  { name: 'Banjo', rentAmount: 1500, buyAmount: 28000, image: PlaceHolderImages.find(img => img.id === 'banjo') || defaultImage, yearMade: 1830, firstPlayed: '19th Century American Folk', countryOfOrigin: 'USA', quantity: 0 },
  { name: 'Mandolin', rentAmount: 900, buyAmount: 16000, image: PlaceHolderImages.find(img => img.id === 'mandolin') || defaultImage, yearMade: 1744, firstPlayed: '18th Century Italy', countryOfOrigin: 'Italy', quantity: 6 },
  { name: 'Sitar', rentAmount: 1800, buyAmount: 32000, image: PlaceHolderImages.find(img => img.id === 'sitar') || defaultImage, yearMade: 1200, firstPlayed: 'Mughal Period in India', countryOfOrigin: 'India', quantity: 2 },
  { name: 'Tabla', rentAmount: 600, buyAmount: 10000, image: PlaceHolderImages.find(img => img.id === 'tabla') || defaultImage, yearMade: 1738, firstPlayed: '18th Century Indian Classical', countryOfOrigin: 'India', quantity: 8 },
];

const instrumentData: Instrument[] = instruments.map((inst, index) => ({
    ...inst,
    id: `inst_${index}`
}));


export default function CatalogPage() {
  const { addToCart, cartItems } = useCart();
  const catalogBgImage =
    PlaceHolderImages.find((img) => img.id === 'catalog-background') || defaultImage;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  const getAvailableQuantity = (instrument: Instrument) => {
      const cartItem = cartItems.find(item => item.id === instrument.id);
      return instrument.quantity - (cartItem ? cartItem.quantity : 0);
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Image
        src={catalogBgImage.imageUrl}
        alt={catalogBgImage.description}
        fill
        className="object-cover -z-10"
        data-ai-hint={catalogBgImage.imageHint}
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm -z-10" />
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
            {instrumentData.map((instrument) => {
              const availableQuantity = getAvailableQuantity(instrument);
              return (
              <Card
                key={instrument.id}
                className="overflow-hidden bg-card/80 text-card-foreground transition-shadow hover:shadow-lg hover:shadow-primary/20 flex flex-col group"
              >
                <CardHeader className="p-0 relative">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={instrument.image.imageUrl}
                      alt={instrument.image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={instrument.image.imageHint}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                     <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-primary-foreground">
                        <h3 className="text-lg font-bold mb-4">{instrument.name} History</h3>
                        <div className="space-y-3 text-sm w-full">
                           <div className="flex items-center gap-3">
                            <Landmark className="h-5 w-5 text-primary shrink-0" />
                            <div>
                                <p className="font-semibold">Origin</p>
                                <p className="text-xs text-muted-foreground">{instrument.countryOfOrigin}</p>
                            </div>
                            </div>
                            <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-primary shrink-0" />
                            <div>
                                <p className="font-semibold">First Made</p>
                                <p className="text-xs text-muted-foreground">{instrument.yearMade}</p>
                            </div>
                            </div>
                            <div className="flex items-center gap-3">
                            <Globe className="h-5 w-5 text-primary shrink-0" />
                            <div>
                                <p className="font-semibold">First Played</p>
                                <p className="text-xs text-muted-foreground">{instrument.firstPlayed}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow space-y-2">
                    <h2 className="text-xl font-semibold">
                        {instrument.name}
                    </h2>
                    <div className="flex justify-between items-baseline">
                        <div>
                            <p className="text-sm text-muted-foreground">Rent</p>
                            <p className="text-lg font-bold text-primary">
                                {formatPrice(instrument.rentAmount)}/mo
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground text-right">Buy</p>
                            <p className="text-lg font-bold text-primary">
                                {formatPrice(instrument.buyAmount)}
                            </p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 mt-auto flex items-center justify-between">
                  {availableQuantity > 0 ? (
                    <>
                      <p className="text-sm text-muted-foreground">
                        Qty: {availableQuantity}
                      </p>
                      <Button
                        size="sm"
                        className="glowing-btn"
                        onClick={() => addToCart(instrument)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </>
                  ) : (
                    <Badge variant="destructive" className="w-full flex justify-center py-2 text-sm">
                      Out of Stock
                    </Badge>
                  )}
                </CardFooter>
              </Card>
            )})}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

