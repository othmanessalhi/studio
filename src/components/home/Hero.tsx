'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-dakhla');

const headlines = [
  'Discover Your Golden Opportunity.',
  'Invest in the Future of Dakhla.',
  'Own a Piece of Paradise.',
];

export function Hero() {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const [animationClass, setAnimationClass] = useState('animate-fade-in-up');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass(''); // Reset animation
      setTimeout(() => {
        setCurrentHeadline((prev) => (prev + 1) % headlines.length);
        setAnimationClass('animate-fade-in-up');
      }, 500); // Wait for fade out
    }, 5000); // Change headline every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex h-[80vh] min-h-[600px] w-full items-center justify-center text-center text-white md:h-screen">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-4xl space-y-8 px-4">
        <h1
          className={cn(
            'font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl',
            animationClass
          )}
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        >
          {headlines[currentHeadline]}
        </h1>
        <p
          className="mx-auto max-w-2xl text-lg text-background/90 md:text-xl"
          style={{ animation: 'fade-in-up 0.8s ease-out forwards', animationDelay: '0.6s', opacity: 0 }}
        >
          Jaouad Afella Properties is your exclusive gateway to acquiring premium land in Dakhla, Morocco — a region poised for exponential growth.
        </p>
        <div 
          style={{ animation: 'fade-in-up 0.8s ease-out forwards', animationDelay: '1s', opacity: 0 }}
        >
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
