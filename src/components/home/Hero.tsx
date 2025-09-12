
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

const heroImages = [
  PlaceHolderImages.find(p => p.id === 'hero-dakhla-1'),
  PlaceHolderImages.find(p => p.id === 'hero-dakhla-2'),
  PlaceHolderImages.find(p => p.id === 'hero-dakhla-3'),
].filter(Boolean);


const headlines = [
  'Discover Your Golden Opportunity.',
  'Invest in the Future of Dakhla.',
  'Own a Piece of Paradise.',
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isHeroVisible, setHeroVisible] = useState(false);


  useEffect(() => {
    const heroTimer = setTimeout(() => setHeroVisible(true), 100);

    const imageInterval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        setIsFading(false);
      }, 1000); // Fade duration
    }, 5000); // Change image every 5 seconds

    const headlineInterval = setInterval(() => {
        setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 5000);

    return () => {
      clearTimeout(heroTimer);
      clearInterval(imageInterval);
      clearInterval(headlineInterval);
    };
  }, []);

  return (
    <section className="relative flex h-[80vh] min-h-[600px] w-full items-center justify-center text-center text-white md:h-screen">
      {heroImages.map((image, index) => (
        image && <Image
          key={image.id}
          src={image.imageUrl}
          alt={image.description}
          fill
          className={cn(
            "object-cover transition-opacity duration-1000 ease-in-out",
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          )}
          priority={index === 0}
          data-ai-hint={image.imageHint}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-4xl space-y-6 px-4">
        <div className={cn('flex h-24 items-center justify-center transition-all duration-1000 md:h-20', isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
           <h1
              key={currentHeadline}
              className={cn(
                'font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl animate-in fade-in duration-1000 [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]'
              )}
            >
              {headlines[currentHeadline]}
            </h1>
        </div>
        <p
          className={cn(
            "mx-auto max-w-2xl text-lg text-background/90 md:text-xl transition-all duration-1000 delay-300 [text-shadow:1px_1px_2px_rgba(0,0,0,0.7)]",
            isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          Jaouad Afella Properties is your exclusive gateway to acquiring premium land in Dakhla, Morocco — a region poised for exponential growth.
        </p>
        <div className={cn("transition-all duration-1000 delay-500", isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
          <Button asChild size="lg" variant="default">
            <Link href="/properties">
              Discover Lands <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
