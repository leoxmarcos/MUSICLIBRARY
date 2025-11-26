
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages, defaultImage } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const mapImage =
    PlaceHolderImages.find((img) => img.id === 'contact-map') || defaultImage;
  const contactBgImage =
    PlaceHolderImages.find((img) => img.id === 'contact-background') || defaultImage;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({
        variant: 'destructive',
        title: 'Missing Fields',
        description: 'Please fill out all fields to send a message.',
      });
      return;
    }
    // Handle form submission logic (e.g., send email)
    console.log({ name, email, message });
    toast({
      title: 'Message Sent!',
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };
  
  const address = "ABES Engineering College, Ghaziabad 201009";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Image
        src={contactBgImage.imageUrl}
        alt={contactBgImage.description}
        fill
        className="object-cover -z-10"
        data-ai-hint={contactBgImage.imageHint}
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm -z-10" />

      <Navbar />
      <main className="flex-1 p-8 pt-24">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold tracking-tight text-foreground">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We&apos;re here to help. Reach out with any questions or just to say hello.
            </p>
          </div>

          <div className="grid max-w-6xl mx-auto gap-12 md:grid-cols-2">
            {/* Left Column: Contact Info & Map */}
            <div className="space-y-8">
              <Card className="bg-card/80">
                <CardHeader>
                  <CardTitle>Our Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Muse Music Library</h3>
                      <p className="text-muted-foreground">
                        {address}
                      </p>
                    </div>
                  </div>
                   <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-primary" />
                    <p className="text-muted-foreground">(123) 456-7890</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <p className="text-muted-foreground">contact@muse.com</p>
                  </div>
                </CardContent>
              </Card>

              <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={mapImage.imageUrl}
                  alt={mapImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={mapImage.imageHint}
                />
                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="secondary" size="lg">View on Google Maps</Button>
                    </Link>
                 </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div>
              <Card className="bg-card/80">
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.d@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help..."
                        className="min-h-[150px]"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full glowing-btn" size="lg">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
