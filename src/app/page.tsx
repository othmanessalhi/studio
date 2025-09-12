
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/home/Hero';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const aboutImage = PlaceHolderImages.find(p => p.id === 'about-jaouad');

export default function Home() {
  const [isAboutVisible, setAboutVisible] = useState(false);
  const [isWhyDakhlaTitleVisible, setWhyDakhlaTitleVisible] = useState(false);
  const [isWhyDakhlaCardsVisible, setWhyDakhlaCardsVisible] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const whyDakhlaTitleRef = useRef<HTMLDivElement>(null);
  const whyDakhlaCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerCallback = (
      entries: IntersectionObserverEntry[],
      setter: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      entries.forEach(entry => {
        setter(entry.isIntersecting);
      });
    };

    const createObserver = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
      return new IntersectionObserver(
        entries => observerCallback(entries, setter),
        { threshold: 0.1 }
      );
    };

    const aboutObserver = createObserver(setAboutVisible);
    const whyDakhlaTitleObserver = createObserver(setWhyDakhlaTitleVisible);
    const whyDakhlaCardsObserver = createObserver(setWhyDakhlaCardsVisible);

    const refs = [
      { ref: aboutRef, observer: aboutObserver },
      { ref: whyDakhlaTitleRef, observer: whyDakhlaTitleObserver },
      { ref: whyDakhlaCardsRef, observer: whyDakhlaCardsObserver },
    ];

    refs.forEach(({ ref, observer }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach(({ ref, observer }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <>
      <Hero />
      <section ref={aboutRef} className="bg-card">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className={cn("space-y-6 transition-all duration-1000", isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
              Jaouad Afella: Your Guide to Dakhla's Golden Sands
            </h2>
            <p className="text-lg text-muted-foreground">
              With over 15 years of experience in the Moroccan real estate market, Jaouad Afella isn't just an agent; he's a visionary who foresaw the immense potential of Dakhla. His deep-rooted connections and unparalleled market knowledge make him the most trusted name for land acquisition in the region.
            </p>
            <p className="text-muted-foreground">
              Our mission is to provide investors with exclusive access to premium land plots, ensuring transparency, security, and exceptional returns. We build relationships based on trust and a shared vision for a prosperous future in Dakhla.
            </p>
            <Button asChild size="lg">
              <Link href="/about">
                Learn More About Jaouad <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className={cn("overflow-hidden rounded-lg shadow-xl transition-all duration-1000", isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
             {aboutImage && <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              width={600}
              height={700}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              data-ai-hint={aboutImage.imageHint}
            />}
          </div>
        </div>
      </section>
      
      <section>
        <div className="container mx-auto text-center">
            <div ref={whyDakhlaTitleRef} className={cn("transition-all duration-1000", isWhyDakhlaTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">Why Dakhla? The Investment of a Lifetime</h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                Dakhla is more than a destination; it's a future-forward hub for tourism, renewable energy, and aquaculture. With strategic government investment and a booming economy, the value of land is set on a dramatic upward trajectory.
              </p>
            </div>
            <div ref={whyDakhlaCardsRef} className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className={cn("rounded-lg border bg-card p-6 shadow-sm transition-all duration-1000", isWhyDakhlaCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')} style={{transitionDelay: '200ms'}}>
                <h3 className="font-headline text-xl font-semibold">Strategic Location</h3>
                <p className="mt-2 text-muted-foreground">Positioned as a gateway between Europe and Africa, Dakhla is a pivotal center for international trade and logistics.</p>
              </div>
              <div className={cn("rounded-lg border bg-card p-6 shadow-sm transition-all duration-1000", isWhyDakhlaCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')} style={{transitionDelay: '400ms'}}>
                <h3 className="font-headline text-xl font-semibold">Economic Boom</h3>
                <p className="mt-2 text-muted-foreground">Massive infrastructure projects, including the Dakhla Atlantic Port, are fueling unprecedented economic growth.</p>
              </div>
              <div className={cn("rounded-lg border bg-card p-6 shadow-sm transition-all duration-1000", isWhyDakhlaCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')} style={{transitionDelay: '600ms'}}>
                <h3 className="font-headline text-xl font-semibold">Tourism Hotspot</h3>
                <p className="mt-2 text-muted-foreground">World-renowned for kitesurfing and its stunning natural beauty, Dakhla's tourism sector is expanding rapidly, driving demand for land.</p>
              </div>
            </div>
            <div className={cn("transition-all duration-1000", isWhyDakhlaCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')} style={{transitionDelay: '800ms'}}>
              <Button asChild size="lg" className="mt-12">
                <Link href="/dakhla">
                  Explore Dakhla's Potential <ArrowRight />
                </Link>
              </Button>
            </div>
        </div>
      </section>
    </>
  );
}
