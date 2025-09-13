

'use client';

import Image from 'next/image';
import { CheckCircle, Award, Target, ArrowLeft } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';


const aboutImage = PlaceHolderImages.find(p => p.id === 'about-jaouad');
const investmentImage = PlaceHolderImages.find(p => p.id === 'dakhla-investment');
const aboutHeroImage = PlaceHolderImages.find(p => p.id === 'about-hero');

export default function AboutPage() {
  const [isHeroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100); 
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <section ref={heroRef} className="relative flex h-screen items-center justify-center text-center overflow-hidden">
         {aboutHeroImage && (
            <Image
                src={aboutHeroImage.imageUrl}
                alt={aboutHeroImage.description}
                fill
                className="object-cover object-center"
                data-ai-hint={aboutHeroImage.imageHint}
                priority
            />
         )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto text-primary-foreground">
           <h1 className={cn("font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl transition-all duration-1000 [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]", isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            {t('about_hero_title')}
          </h1>
          <p className={cn("mx-auto mt-4 max-w-3xl text-lg text-background/90 md:text-xl transition-all duration-1000 delay-300 [text-shadow:1px_1px_2px_rgba(0,0,0,0.7)]", isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            {t('about_hero_p')}
          </p>
        </div>
      </section>

      <section>
        <div className="container mx-auto grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="font-headline text-3xl font-bold">{t('about_jaouad_title')}</h2>
            <p className="text-lg text-muted-foreground">
              {t('about_jaouad_p1')}
            </p>
            <p>
              {t('about_jaouad_p2')}
            </p>
            <p>
              {t('about_jaouad_p3')}
            </p>
          </div>
          <div className="overflow-hidden rounded-lg shadow-2xl">
            {aboutImage && <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              width={600}
              height={700}
              className="h-full w-full object-cover"
              data-ai-hint={aboutImage.imageHint}
            />}
          </div>
        </div>
      </section>

      <section className="bg-card">
        <div className="container mx-auto grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <Target className="h-12 w-12 text-primary" />
            <h3 className="mt-4 font-headline text-2xl font-semibold">{t('our_mission_title')}</h3>
            <p className="mt-2 text-muted-foreground">
              {t('our_mission_p')}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Award className="h-12 w-12 text-primary" />
            <h3 className="mt-4 font-headline text-2xl font-semibold">{t('our_credibility_title')}</h3>
            <p className="mt-2 text-muted-foreground">
              {t('our_credibility_p')}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="h-12 w-12 text-primary" />
            <h3 className="mt-4 font-headline text-2xl font-semibold">{t('our_values_title')}</h3>
            <p className="mt-2 text-muted-foreground">
              {t('our_values_p')}
            </p>
          </div>
        </div>
      </section>

      {investmentImage && (
         <div className="relative h-[400px] w-full">
            <Image
                src={investmentImage.imageUrl}
                alt={investmentImage.description}
                fill
                className="object-cover"
                data-ai-hint={investmentImage.imageHint}
            />
            <div className="absolute inset-0 bg-primary/80 flex items-center justify-center">
                <div className="text-center text-primary-foreground p-4">
                    <h2 className="font-headline text-3xl font-bold md:text-4xl">{t('invest_with_confidence_title')}</h2>
                    <p className="mt-2 text-lg max-w-2xl mx-auto">{t('invest_with_confidence_p')}</p>
                </div>
            </div>
        </div>
      )}
    </>
  );
}
