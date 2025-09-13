

'use client';

import { useState, useMemo } from 'react';
import { MOCK_PROPERTIES_EN, MOCK_PROPERTIES_AR, Property } from '@/lib/constants';
import { PropertyCard } from './PropertyCard';
import { PropertyFilters } from './PropertyFilters';
import { useTranslation } from '@/hooks/use-translation';


export type Filters = {
  location: string;
  price: string;
  size: string;
};

const initialFilters: Filters = {
    location: 'all',
    price: 'all',
    size: 'all',
};

export function PropertyList() {
  const { t, language } = useTranslation();
  const MOCK_PROPERTIES = language === 'ar' ? MOCK_PROPERTIES_AR : MOCK_PROPERTIES_EN;

  const [filters, setFilters] = useState<Filters>(initialFilters);

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((property: Property) => {
      const { location, price, size } = filters;

      // Location filter
      if (location !== 'all' && property.locationKey !== location) {
        return false;
      }

      // Price filter
      if (price !== 'all') {
        const [minPrice, maxPrice] = price.split('-').map(Number);
        if (property.price < minPrice || (maxPrice && property.price > maxPrice)) {
          return false;
        }
      }

      // Size filter
      if (size !== 'all') {
        const [minSize, maxSize] = size.split('-').map(Number);
        if (property.size < minSize || (maxSize && property.size > maxSize)) {
          return false;
        }
      }

      return true;
    });
  }, [filters, MOCK_PROPERTIES]);
  
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div>
      <div className="mb-8 flex justify-center">
        <PropertyFilters filters={filters} setFilters={setFilters} resetFilters={resetFilters} />
      </div>
      
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-muted-foreground">
          <p className="text-lg">{t('no_properties_match')}</p>
          <p>{t('try_adjusting_search')}</p>
        </div>
      )}
    </div>
  );
}



