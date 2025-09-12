
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ContactForm } from '@/components/contact/ContactForm';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';


const mapImage = PlaceHolderImages.find(p => p.id === 'contact-map');
const contactHeroImage = PlaceHolderImages.find(p => p.id === 'contact-hero');

const WhatsAppIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52s-.67-.816-.917-1.103c-.247-.288-.5-.335-.67-.349-.172-.014-.37-.014-.568-.014-.198 0-.52.074-.792.372-.27.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
)

export default function ContactPage() {
    const [isHeroVisible, setHeroVisible] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setHeroVisible(true), 100); 
        return () => clearTimeout(timer);
    }, []);

  return (
    <>
      <section ref={heroRef} className="relative flex h-[50vh] min-h-[400px] items-center justify-center text-center overflow-hidden">
         {contactHeroImage && (
            <Image
                src={contactHeroImage.imageUrl}
                alt={contactHeroImage.description}
                fill
                className="object-cover"
                data-ai-hint={contactHeroImage.imageHint}
                priority
            />
         )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto text-primary-foreground">
          <h1 className={cn("font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl transition-all duration-1000", isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            Connect With Us
          </h1>
          <p className={cn("mx-auto mt-4 max-w-2xl text-lg text-background/90 md:text-xl transition-all duration-1000 delay-300", isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            Your journey towards a landmark investment in Dakhla begins here. Reach out to our team for personalized consultations and property inquiries.
          </p>
        </div>
      </section>

      <section>
        <div className="container mx-auto grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="space-y-8">
            <h2 className="font-headline text-3xl font-bold">Send a Message</h2>
            <ContactForm />
          </div>
          <div className="space-y-8">
             <h2 className="font-headline text-3xl font-bold">Contact Information</h2>
             <div className="space-y-4 text-lg">
                <p className="text-muted-foreground">We are available to answer your questions and guide you through every step of the investment process.</p>
                <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6 text-primary" />
                    <span>+212 5 28 89 77 00</span>
                </div>
                <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-primary" />
                    <span>contact@dakhla-land-elite.com</span>
                </div>
                <p className="text-muted-foreground">
                    Office: Avenue Al-Walaa, Dakhla, Morocco
                </p>
             </div>
             <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white gap-2">
                <Link href="https://wa.me/212528897700" target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon />
                    Message on WhatsApp
                </Link>
             </Button>

            <div className="mt-8 h-80 w-full overflow-hidden rounded-lg shadow-xl">
                {mapImage && <Image
                    src={mapImage.imageUrl}
                    alt={mapImage.description}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover"
                    data-ai-hint={mapImage.imageHint}
                />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
