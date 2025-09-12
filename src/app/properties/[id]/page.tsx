import { MOCK_PROPERTIES, Property } from '@/lib/constants';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Maximize, MapPin } from 'lucide-react';

export async function generateStaticParams() {
  return MOCK_PROPERTIES.map((property) => ({
    id: property.id,
  }));
}

function getProperty(id: string): Property | undefined {
  return MOCK_PROPERTIES.find((p) => p.id === id);
}

interface PageProps {
  params: { id: string };
}

export default function PropertyDetailsPage({ params }: PageProps) {
  const property = getProperty(params.id);

  if (!property) {
    notFound();
  }

  const mapSrc = `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${property.latitude},${property.longitude}&zoom=14`;

  return (
    <>
      <section className="bg-card pt-12 md:pt-16 lg:pt-20">
        <div className="container mx-auto">
          <Button asChild variant="outline" className="mb-8">
            <Link href="/properties">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Link>
          </Button>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg shadow-2xl">
              {property.image && (
                <Image
                  src={property.image.imageUrl}
                  alt={property.image.description}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                  data-ai-hint={property.image.imageHint}
                />
              )}
            </div>
            <div className="space-y-6">
              <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">{property.title}</h1>
              <p className="font-headline text-4xl font-semibold text-foreground">
                ${property.price.toLocaleString()}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-medium">{property.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize className="h-5 w-5 text-primary" />
                  <span className="font-medium">{property.size.toLocaleString()} sqm</span>
                </div>
              </div>
              <p className="text-lg text-muted-foreground">{property.description}</p>
              <Button asChild size="lg">
                <Link href="/contact">Inquire Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <h2 className="font-headline text-3xl font-bold">Key Features</h2>
            <ul className="mt-6 space-y-4">
              {property.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-lg">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-headline text-3xl font-bold">Property Location</h2>
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
