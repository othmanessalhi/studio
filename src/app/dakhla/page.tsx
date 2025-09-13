

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { InvestmentCharts } from '@/components/dakhla/InvestmentCharts';
import { ArrowRight, Anchor, Wind, Sun, Waves, ArrowLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';


const portImage = PlaceHolderImages.find(p => p.id === 'dakhla-port');
const tourismImage = PlaceHolderImages.find(p => p.id === 'dakhla-tourism');
const energyImage = PlaceHolderImages.find(p => p.id === 'dakhla-energy');
const dakhlaHeroImage = {
    imageUrl: "https://drive.google.com/uc?export=view&id=10kirCYHh4cHd0FiyKwm3x-zEQsRpka6b",
    description: "A dramatic and wide landscape of Dakhla's desert meeting the ocean.",
    imageHint: "dakhla landscape",
    id: "dakhla-hero"
};


export default function WhyDakhlaPage() {
    const [isHeroVisible, setHeroVisible] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const { t, language } = useTranslation();
    const arrowIcon = language === 'ar' ? <ArrowLeft /> : <ArrowRight />;


    useEffect(() => {
        const timer = setTimeout(() => setHeroVisible(true), 100); 
        return () => clearTimeout(timer);
    }, []);

  return (
    <>
       <section ref={heroRef} className="relative flex h-[50vh] min-h-[400px] items-center justify-center text-center overflow-hidden">
         {dakhlaHeroImage && (
            <Image
                src={dakhlaHeroImage.imageUrl}
                alt={dakhlaHeroImage.description}
                fill
                className="object-cover"
                data-ai-hint={dakhlaHeroImage.imageHint}
                priority
            />
         )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto text-primary-foreground">
          <h1 className={cn("font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl transition-all duration-1000", isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            {t('dakhla_hero_title')}
          </h1>
          <p className={cn("mx-auto mt-4 max-w-3xl text-lg text-background/90 md:text-xl transition-all duration-1000 delay-300", isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            {t('dakhla_hero_p')}
          </p>
        </div>
      </section>

      <section>
        <div className="container mx-auto">
          <InvestmentCharts />
        </div>
      </section>
      
      <section className="bg-card">
        <div className="container mx-auto space-y-20">
          
          <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <Anchor className="h-12 w-12 text-primary" />
              <h3 className="font-headline text-3xl font-bold">{t('dakhla_port_title')}</h3>
              <p className="text-lg text-muted-foreground">
                {t('dakhla_port_p')}
              </p>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-xl">
              {portImage && <Image src={portImage.imageUrl} alt={portImage.description} fill className="object-cover" data-ai-hint={portImage.imageHint}/>}
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-xl lg:order-last">
              {tourismImage && <Image src={tourismImage.imageUrl} alt={tourismImage.description} fill className="object-cover" data-ai-hint={tourismImage.imageHint} />}
            </div>
            <div className='space-y-4 lg:order-first'>
              <Waves className="h-12 w-12 text-primary" />
              <h3 className="font-headline text-3xl font-bold">{t('dakhla_tourism_title')}</h3>
              <p className="text-lg text-muted-foreground">
                {t('dakhla_tourism_p')}
              </p>
            </div>
          </div>
          
           <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="flex gap-4">
                <Wind className="h-12 w-12 text-primary" />
                <Sun className="h-12 w-12 text-primary" />
              </div>
              <h3 className="font-headline text-3xl font-bold">{t('dakhla_energy_title')}</h3>
              <p className="text-lg text-muted-foreground">
                {t('dakhla_energy_p')}
              </p>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-xl">
              {energyImage && <Image src={energyImage.imageUrl} alt={energyImage.description} fill className="object-cover" data-ai-hint={energyImage.imageHint}/>}
            </div>
          </div>

        </div>
      </section>

      <section>
        <div className="container mx-auto text-center">
           <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">{t('dakhla_cta_title')}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
              {t('dakhla_cta_p')}
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/properties">
                {t('view_available_properties')} {arrowIcon}
              </Link>
            </Button>
        </div>
      </section>
    </>
  );
}
