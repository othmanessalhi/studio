
import { PropertyList } from "@/components/properties/PropertyList";
import type { Metadata } from 'next';
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export const metadata: Metadata = {
  title: 'Land for Sale in Dakhla | Dakhla Land Elite',
  description: 'Browse exclusive listings of land for sale in Dakhla, Morocco. Filter by price, size, and location to find your perfect investment property with Jaouad Afella Properties.',
};

const propertiesHeroImage = PlaceHolderImages.find(p => p.id === 'properties-hero');

export default function PropertiesPage() {
  return (
    <>
      <section className="relative flex h-[50vh] min-h-[400px] items-center justify-center text-center">
         {propertiesHeroImage && (
            <Image
                src={propertiesHeroImage.imageUrl}
                alt={propertiesHeroImage.description}
                fill
                className="object-cover"
                data-ai-hint={propertiesHeroImage.imageHint}
                priority
            />
         )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto text-primary-foreground">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
            Available Land Plots
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-background/90 md:text-xl">
            Explore our curated selection of premium land in Dakhla. Each plot represents a unique opportunity for growth and prosperity in this dynamic region.
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
