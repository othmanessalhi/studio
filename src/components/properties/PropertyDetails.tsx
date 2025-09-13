
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PropertyDetailsProps {
    propertyEN?: Property;
    propertyAR?: Property;
}

const WhatsAppIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52s-.67-.816-.917-1.103c-.247-.288-.5-.335-.67-.349-.172-.014-.37-.014-.568-.014-.198 0-.52.074-.792.372-.27.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
)

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
      <section className="bg-gradient-to-br from-card to-background/30 pt-12 md:pt-16 lg:pt-20 overflow-hidden animate-gradient bg-[length:200%_200%]">
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
                <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white gap-2">
                    <Link href="https://wa.me/212602654219" target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon />
                        {t('inquire_now')}
                    </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="h-full">
            <CardHeader>
                <CardTitle className="font-headline text-3xl font-bold">{t('key_features')}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                {property.features.map((feature, index) => (
                    <li key={index} className={cn('flex items-center gap-3 text-lg transition-all duration-500', isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4')} style={{ transitionDelay: `${200 + index * 100}ms`}}>
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <span>{feature}</span>
                    </li>
                ))}
                </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle className="font-headline text-3xl font-bold">{t('property_location')}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] w-full overflow-hidden rounded-lg shadow-xl">
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
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
