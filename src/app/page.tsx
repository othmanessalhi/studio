

'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/home/Hero';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';

const aboutImage = PlaceHolderImages.find(p => p.id === 'about-jaouad');

export default function Home() {
  const [isAboutVisible, setAboutVisible] = useState(false);
  const [isWhyDakhlaTitleVisible, setWhyDakhlaTitleVisible] = useState(false);
  const [isWhyDakhlaCardsVisible, setWhyDakhlaCardsVisible] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const whyDakhlaTitleRef = useRef<HTMLDivElement>(null);
  const whyDakhlaCardsRef = useRef<HTMLDivElement>(null);

    const { t, language } = useTranslation();
    const arrowIcon = language === 'ar' ? <ArrowLeft /> : <ArrowRight />;


  useEffect(() => {
    const createObserver = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        return new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setter(true);
                    }
                });
            },
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
              {t('home_about_title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('home_about_p1')}
            </p>
            <p className="text-muted-foreground">
              {t('home_about_p2')}
            </p>
            <Button asChild size="lg">
              <Link href="/about">
                {t('learnMoreAboutJaouad')} {arrowIcon}
              </Link>
            </Button>
          </div>
          <div className={cn("overflow-hidden rounded-lg shadow-xl transition-all duration-1000", isAboutVisible ? 'opacity-100 translate-x-0' : (language === 'ar' ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8'))}>
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
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">{t('home_why_dakhla_title')}</h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                {t('home_why_dakhla_p1')}
              </p>
            </div>
            <div ref={whyDakhlaCardsRef} className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className={cn("rounded-lg border bg-card p-6 shadow-sm transition-all duration-1000", isWhyDakhlaCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')} style={{transitionDelay: '200ms'}}>
                <h3 className="font-headline text-xl font-semibold">{t('home_why_dakhla_card1_title')}</h3>
                <p className="mt-2 text-muted-foreground">{t('home_why_dakhla_card1_p')}</p>
              </div>
              <div className={cn("rounded-lg border bg-card p-6 shadow-sm transition-all duration-1000", isWhyDakhlaCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')} style={{transitionDelay: '400ms'}}>
                <h3 className="font-headline text-xl font-semibold">{t('home_why_dakhla_card2_title')}</h3>
                <p className="mt-2 text-muted-foreground">{t('home_why_dakhla_card2_p')}</p>
              </div>
              <div className={cn("rounded-lg border bg-card p-6 shadow-sm transition-all duration-1000", isWhyDakhlaCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')} style={{transitionDelay: '600ms'}}>
                <h3 className="font-headline text-xl font-semibold">{t('home_why_dakhla_card3_title')}</h3>
                <p className="mt-2 text-muted-foreground">{t('home_why_dakhla_card3_p')}</p>
              </div>
            </div>
            <div className={cn("transition-all duration-1000", isWhyDakhlaCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')} style={{transitionDelay: '800ms'}}>
              <Button asChild size="lg" className="mt-12">
                <Link href="/dakhla">
                  {t('exploreDakhlaPotential')} {arrowIcon}
                </Link>
              </Button>
            </div>
        </div>
      </section>
    </>
  );
}
