

'use client';

import { PropertyList } from "@/components/properties/PropertyList";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";


const propertiesHeroImage = PlaceHolderImages.find(p => p.id === 'properties-hero');

export default function PropertiesPage() {
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
         {propertiesHeroImage && (
            <Image
                src={propertiesHeroImage.imageUrl}
                alt={propertiesHeroImage.description}
                fill
                className="object-cover object-center"
                data-ai-hint={propertiesHeroImage.imageHint}
                priority
            />
         )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto text-primary-foreground">
          <h1 className={cn("font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl transition-all duration-1000", isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            {t('properties_hero_title')}
          </h1>
          <p className={cn("mx-auto mt-4 max-w-2xl text-lg text-background/90 md:text-xl transition-all duration-1000 delay-300", isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            {t('properties_hero_p')}
          </p>
        </div>
      </section>
      
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto">
          <PropertyList />
        </div>
      </section>
    </>
  )
}
