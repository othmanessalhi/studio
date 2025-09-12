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
import { ArrowRight, Maximize, MapPin } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl group">
        <Link href={`/properties/${property.id}`} className='flex flex-col h-full'>
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
      <CardContent className="flex-grow p-6">
        <CardTitle className="font-headline text-2xl text-primary">{property.title}</CardTitle>
        <CardDescription className="mt-2 line-clamp-2">{property.description}</CardDescription>
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div className='flex items-center gap-2'>
                <MapPin className="h-4 w-4 text-primary" />
                <span>{property.location}</span>
            </div>
            <div className='flex items-center gap-2'>
                <Maximize className="h-4 w-4 text-primary" />
                <span>{property.size.toLocaleString()} sqm</span>
            </div>
        </div>
        <p className="mt-4 font-headline text-3xl font-semibold text-foreground">
          ${property.price.toLocaleString()}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto">
        <div className="w-full">
            <Button asChild className="w-full">
              <Link href={`/properties/${property.id}`}>
                View Details <ArrowRight />
              </Link>
            </Button>
        </div>
      </CardFooter>
      </Link>
    </Card>
  );
}