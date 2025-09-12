import { PropertyList } from "@/components/properties/PropertyList";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Land for Sale in Dakhla | Dakhla Land Elite',
  description: 'Browse exclusive listings of land for sale in Dakhla, Morocco. Filter by price, size, and location to find your perfect investment property with Jaouad Afella Properties.',
};

export default function PropertiesPage() {
  return (
    <>
      <section className="bg-card">
        <div className="container mx-auto text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
            Available Land Plots
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
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
