

'use client';

import { useState, useMemo } from 'react';
import { MOCK_PROPERTIES_EN, MOCK_PROPERTIES_AR, Property } from '@/lib/constants';
import { PropertyCard } from './PropertyCard';
import { PropertyFilters } from './PropertyFilters';
import { Button } from '../ui/button';
import { BrainCircuit } from 'lucide-react';
import { InvestmentAnalysisTool } from './InvestmentAnalysisTool';
import { useTranslation } from '@/hooks/use-translation';


export type Filters = {
  location: string;
  price: string;
  size: string;
};

export function PropertyList() {
  const { t, language } = useTranslation();
  const MOCK_PROPERTIES = language === 'ar' ? MOCK_PROPERTIES_AR : MOCK_PROPERTIES_EN;

  const [filters, setFilters] = useState<Filters>({
    location: 'all',
    price: 'all',
    size: 'all',
  });
  const [isAnalysisOpen, setAnalysisOpen] = useState(false);

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

  return (
    <div>
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <PropertyFilters filters={filters} setFilters={setFilters} />
        <Button onClick={() => setAnalysisOpen(true)} className="w-full md:w-auto">
          <BrainCircuit className="mr-2" />
          {t('ai_investment_analysis')}
        </Button>
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

      <InvestmentAnalysisTool open={isAnalysisOpen} onOpenChange={setAnalysisOpen} />
    </div>
  );
}

