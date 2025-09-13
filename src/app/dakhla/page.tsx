
'use client';

import type { FC, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { InvestmentCharts } from '@/components/dakhla/InvestmentCharts';
import { ArrowRight, Anchor, Wind, Sun, Waves, ArrowLeft, LucideIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';


const portImage = PlaceHolderImages.find(p => p.id === 'dakhla-port');
const tourismImage = PlaceHolderImages.find(p => p.id === 'dakhla-tourism');
const energyImage = PlaceHolderImages.find(p => p.id === 'dakhla-energy');
const dakhlaHeroImage = PlaceHolderImages.find(p => p.id === 'dakhla-hero');


interface FeatureSectionProps {
  Icon: ReactNode;
  title: string;
  description: string;
  image: (typeof PlaceHolderImages)[0];
  imagePosition?: 'left' | 'right';
}

const FeatureSection: FC<FeatureSectionProps> = ({ Icon, title, description, image, imagePosition = 'right' }) => {
  const imageDiv = (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-xl">
        <Image src={image.imageUrl} alt={image.description} fill className="object-cover" data-ai-hint={image.imageHint}/>
    </div>
  );

  const textDiv = (
     <div className="space-y-4">
        {Icon}
        <h3 className="font-headline text-3xl font-bold">{title}</h3>
        <p className="text-lg text-muted-foreground">{description}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2">
        {/* Mobile order: Image first, then text */}
        <div className="lg:hidden">
            {imageDiv}
        </div>
        <div className="lg:hidden">
            {textDiv}
        </div>
        
        {/* Desktop order */}
        {imagePosition === 'left' && (
            <div className="hidden lg:block">
                {imageDiv}
            </div>
        )}
        <div className="hidden lg:block">
            {textDiv}
        </div>
        {imagePosition === 'right' && (
            <div className="hidden lg:block">
                {imageDiv}
            </div>
        )}
    </div>
  )
}

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
          
          {portImage && <FeatureSection 
            Icon={<Anchor className="h-12 w-12 text-primary" />}
            title={t('dakhla_port_title')}
            description={t('dakhla_port_p')}
            image={portImage}
            imagePosition='right'
          />}
          
          {tourismImage && <FeatureSection 
            Icon={<Waves className="h-12 w-12 text-primary" />}
            title={t('dakhla_tourism_title')}
            description={t('dakhla_tourism_p')}
            image={tourismImage}
            imagePosition='left'
          />}
          
          {energyImage && <FeatureSection 
            Icon={<div className="flex gap-4">
                    <Wind className="h-12 w-12 text-primary" />
                    <Sun className="h-12 w-12 text-primary" />
                  </div>}
            title={t('dakhla_energy_title')}
            description={t('dakhla_energy_p')}
            image={energyImage}
            imagePosition='right'
          />}

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
