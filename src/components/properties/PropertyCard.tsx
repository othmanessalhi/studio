

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/lib/constants';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { ArrowRight, Maximize, MapPin, ArrowLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';


interface PropertyCardProps {
  property: Property;
  index: number;
}

export function PropertyCard({ property, index }: PropertyCardProps) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const { t, language } = useTranslation();
    const arrowIcon = language === 'ar' ? <ArrowLeft /> : <ArrowRight />;


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

  return (
    <div ref={cardRef} className={cn("transition-all duration-700", isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')} style={{ transitionDelay: `${index * 100}ms`}}>
        <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl group">
        <Link href={`/properties/${property.id}`} className="flex flex-col h-full">
            <div className="flex-grow">
            <CardHeader className="p-0">
                <div className="relative h-60 w-full overflow-hidden">
                {property.image && (
                    <Image
                    src={property.image.imageUrl}
                    alt={property.image.description}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={property.image.imageHint}
                    />
                )}
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <CardTitle className="font-headline text-2xl text-primary">{property.title}</CardTitle>
                <CardDescription className="mt-2 line-clamp-2">{property.description}</CardDescription>
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <div className='flex items-center gap-2'>
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{property.location}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <Maximize className="h-4 w-4 text-primary" />
                    <span>{property.size.toLocaleString()} {t('sqm')}</span>
                </div>
                </div>
                <p className="mt-4 font-headline text-3xl font-semibold text-foreground">
                ${property.price.toLocaleString()}
                </p>
            </CardContent>
            </div>
            <CardFooter className="p-6 pt-0">
                <Button tabIndex={-1} className="w-full">
                    {t('view_details')} {arrowIcon}
                </Button>
            </CardFooter>
        </Link>
        </Card>
    </div>
  );
}
