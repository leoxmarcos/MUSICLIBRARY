'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { PlaceHolderImages, defaultImage } from '@/lib/placeholder-images';
import { MusicBookLogo } from '@/components/GuitarLogo';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const aboutUsImage1 =
    PlaceHolderImages.find((img) => img.id === 'about-us-1') || defaultImage;
  const aboutUsImage2 =
    PlaceHolderImages.find((img) => img.id === 'about-us-2') || defaultImage;
  const aboutBgImage =
    PlaceHolderImages.find((img) => img.id === 'about-background') || defaultImage;

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Image
        src={aboutBgImage.imageUrl}
        alt={aboutBgImage.description}
        fill
        className="object-cover -z-10"
        data-ai-hint={aboutBgImage.imageHint}
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm -z-10" />
      <Navbar />
      <main className="flex-1 p-8 pt-24">
        <div className="container mx-auto">
          <section className="w-full py-12">
            <div className="mx-auto max-w-4xl text-center">
              <MusicBookLogo className="mx-auto mb-6 h-20 w-auto" />
              <h1 className="text-5xl font-bold tracking-tight text-foreground">
                About Muse
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Our story, our mission, and our passion for music.
              </p>
            </div>

            <div className="mt-16 grid max-w-6xl mx-auto gap-12 md:grid-cols-2">
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Welcome to Muse, where our passion for music drives
                  everything we do. Founded in 2024, our mission is to provide
                  musicians of all levels with the finest instruments and a
                  supportive community. We believe that music is a universal
                  language that connects us all, and we are dedicated to
                  helping you find your voice.
                </p>
                <p>
                  Our library is more than just a place to rent or buy
                  instruments; it's a hub for creativity, learning, and
                  collaboration. From vintage guitars to modern synthesizers,
                  each piece in our collection is carefully curated to inspire
                  your next creation.
                </p>
                 <p>
                  We are a team of musicians, sound engineers, and music
                  lovers who are committed to providing you with the best
                  possible experience. We are here to help you with everything
                  from choosing the right instrument to setting up your home
                  studio.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-80 w-full">
                  <Image
                    src={aboutUsImage1.imageUrl}
                    alt={aboutUsImage1.description}
                    fill
                    className="rounded-lg object-cover shadow-lg"
                    data-ai-hint={aboutUsImage1.imageHint}
                  />
                </div>
                <div className="relative h-80 w-full">
                  <Image
                    src={aboutUsImage2.imageUrl}
                    alt={aboutUsImage2.description}
                    fill
                    className="rounded-lg object-cover shadow-lg"
                    data-ai-hint={aboutUsImage2.imageHint}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
