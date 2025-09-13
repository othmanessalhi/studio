
'use client';

import { useState, useMemo, useEffect } from 'react';
import { MOCK_PROPERTIES_EN, MOCK_PROPERTIES_AR, Property } from '@/lib/constants';
import { PropertyCard } from './PropertyCard';
import { FilterButton, type Filters } from './FilterButton';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const initialFilters: Filters = {
  location: 'all',
  price: 'all',
  size: 'all',
};

const PROPERTIES_PER_PAGE = 6;

export function PropertyList() {
  const { t, language } = useTranslation();
  const MOCK_PROPERTIES = language === 'ar' ? MOCK_PROPERTIES_AR : MOCK_PROPERTIES_EN;

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Reset to first page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);
  
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const totalPages = Math.ceil(filteredProperties.length / PROPERTIES_PER_PAGE);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * PROPERTIES_PER_PAGE,
    currentPage * PROPERTIES_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    
    const listContainer = document.getElementById('property-list');
    if (listContainer) {
      listContainer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const arrowLeft = language === 'ar' ? <ArrowRight /> : <ArrowLeft />;
  const arrowRight = language === 'ar' ? <ArrowLeft /> : <ArrowRight />;
  
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages || paginatedProperties.length === 0;

  return (
    <div id="property-list" className='scroll-mt-24'>
      <div className="mb-8 flex justify-center">
        <FilterButton
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
          initialFilters={initialFilters}
        />
      </div>
      
      {paginatedProperties.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paginatedProperties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-muted-foreground">
          <p className="text-lg">{t('no_properties_match')}</p>
          <p>{t('try_adjusting_search')}</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-4">
           <Button 
                variant="outline" 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={isPrevDisabled}
                aria-disabled={isPrevDisabled}
            >
                {arrowLeft} {t('pagination_previous')}
            </Button>

          <span className="text-sm font-medium">
            {t('pagination_page', { currentPage: Math.max(1, currentPage), totalPages })}
          </span>

          <Button 
            variant="outline" 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={isNextDisabled}
            aria-disabled={isNextDisabled}
          >
            {t('pagination_next')} {arrowRight}
          </Button>
        </div>
      )}
    </div>
  );
}
