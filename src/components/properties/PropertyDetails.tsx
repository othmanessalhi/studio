
'use client';
import { Property } from '@/lib/constants';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Maximize, MapPin, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface PropertyDetailsProps {
    propertyEN?: Property;
    propertyAR?: Property;
}

export function PropertyDetails({ propertyEN, propertyAR }: PropertyDetailsProps) {
  const { t, language } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  
  const property = language === 'ar' ? propertyAR : propertyEN;
  const arrowIcon = language === 'ar' ? <ArrowRight /> : <ArrowLeft />;

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!property) {
    if (typeof window !== 'undefined') {
        window.location.href = '/properties';
    }
    return <p>Property not found for the selected language.</p>;
  }

  return (
    <>
      <section className="bg-card pt-12 md:pt-16 lg:pt-20 overflow-hidden">
        <div className="container mx-auto">
          <Button asChild variant="outline" className="mb-8">
            <Link href="/properties">
              {arrowIcon}
              {t('back_to_properties')}
            </Link>
          </Button>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className={cn('overflow-hidden rounded-lg shadow-2xl transition-all duration-1000', isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95')}>
              {property.image && (
                <Image
                  src={property.image.imageUrl}
                  alt={property.image.description}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                  data-ai-hint={property.image.imageHint}
                  priority
                />
              )}
            </div>
            <div className="space-y-6">
              <h1 className={cn('font-headline text-4xl font-bold text-primary md:text-5xl transition-all duration-700', isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>{property.title}</h1>
              <p className={cn('font-headline text-4xl font-semibold text-foreground transition-all duration-700 delay-100', isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
                ${property.price.toLocaleString()}
              </p>
              <div className={cn('flex flex-wrap items-center gap-6 text-lg transition-all duration-700 delay-200', isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-medium">{property.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize className="h-5 w-5 text-primary" />
                  <span className="font-medium">{property.size.toLocaleString()} {t('sqm')}</span>
                </div>
              </div>
              <p className={cn('text-lg text-muted-foreground transition-all duration-700 delay-300', isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>{property.description}</p>
              <div className={cn('transition-all duration-700 delay-400', isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
                <Button asChild size="lg">
                    <Link href="/contact">{t('inquire_now')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <h2 className="font-headline text-3xl font-bold">{t('key_features')}</h2>
            <ul className="mt-6 space-y-4">
              {property.features.map((feature, index) => (
                <li key={index} className={cn('flex items-center gap-3 text-lg transition-all duration-500', isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4')} style={{ transitionDelay: `${200 + index * 100}ms`}}>
                  <CheckCircle className="h-6 w-6 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-headline text-3xl font-bold">{t('property_location')}</h2>
            <div className="mt-6 h-[400px] w-full overflow-hidden rounded-lg shadow-xl">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=14&output=embed`}
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
