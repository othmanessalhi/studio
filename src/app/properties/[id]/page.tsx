
import { MOCK_PROPERTIES_EN, MOCK_PROPERTIES_AR } from '@/lib/constants';
import { notFound } from 'next/navigation';
import { PropertyDetails } from '@/components/properties/PropertyDetails';

export default async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  // Data fetching and logic can happen on the server.
  // We can determine which property list to pass based on a cookie, header, or other server-side readable value.
  // For now, we'll fetch both and let the client component decide.
  const propertyEN = MOCK_PROPERTIES_EN.find((p) => p.id === params.id);
  const propertyAR = MOCK_PROPERTIES_AR.find((p) => p.id === params.id);

  if (!propertyEN && !propertyAR) {
    notFound();
  }

  // Pass the server-fetched data to the client component
  return <PropertyDetails propertyEN={propertyEN} propertyAR={propertyAR} />;
}

// generateStaticParams must remain in a server component.
export async function generateStaticParams() {
    const enIds = MOCK_PROPERTIES_EN.map((property) => ({ id: property.id }));
    const arIds = MOCK_PROPERTIES_AR.map((property) => ({ id: property.id }));
    // Combine and remove duplicates
    const allIds = [...enIds, ...arIds].filter(
        (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );
    return allIds;
}
