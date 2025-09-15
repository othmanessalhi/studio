
import { MOCK_PROPERTIES_EN, MOCK_PROPERTIES_AR } from '@/lib/constants';
import { PropertyDetails } from '@/components/properties/PropertyDetails';
import { notFound } from 'next/navigation';

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const { id } = params;

  const propertyEN = MOCK_PROPERTIES_EN.find((p) => p.id === id);
  const propertyAR = MOCK_PROPERTIES_AR.find((p) => p.id === id);

  if (!propertyEN || !propertyAR) {
    // If the property doesn't exist, this will render the not-found.tsx page
    notFound();
  }

  return <PropertyDetails propertyEN={propertyEN} propertyAR={propertyAR} />;
}

// Optional: Generate static pages for each property at build time for better performance
export async function generateStaticParams() {
  return MOCK_PROPERTIES_EN.map((property) => ({
    id: property.id,
  }));
}
