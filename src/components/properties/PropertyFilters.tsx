
'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filters } from './PropertyList';
import { useTranslation } from '@/hooks/use-translation';
import { MapPin, DollarSign, Maximize, X } from 'lucide-react';

interface PropertyFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  resetFilters: () => void;
}

export function PropertyFilters({ filters, setFilters, resetFilters }: PropertyFiltersProps) {
  const { t } = useTranslation();

  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    setFilters({ ...filters, [filterName]: value });
  };

  const hasActiveFilters = filters.location !== 'all' || filters.price !== 'all' || filters.size !== 'all';

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 rounded-lg border bg-card p-4 shadow-sm sm:justify-between">
        <div className="flex flex-wrap justify-center gap-4">
            <Select
                value={filters.location}
                onValueChange={(value) => handleFilterChange('location', value)}
            >
                <SelectTrigger className="w-[200px] sm:w-[200px]">
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder={t('location')} />
                </div>
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="all">{t('all_locations')}</SelectItem>
                <SelectItem value="Coastal">{t('location_coastal')}</SelectItem>
                <SelectItem value="Inland">{t('location_inland')}</SelectItem>
                <SelectItem value="Urban">{t('location_urban')}</SelectItem>
                <SelectItem value="Industrial">{t('location_industrial')}</SelectItem>
                </SelectContent>
            </Select>
            <Select
                value={filters.price}
                onValueChange={(value) => handleFilterChange('price', value)}
            >
                <SelectTrigger className="w-[200px] sm:w-[200px]">
                <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder={t('price')} />
                </div>
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="all">{t('any_price')}</SelectItem>
                <SelectItem value="0-200000">$0 - $200,000</SelectItem>
                <SelectItem value="200001-400000">$200,001 - $400,000</SelectItem>
                <SelectItem value="400001-9999999">$400,001+</SelectItem>
                </SelectContent>
            </Select>
            <Select
                value={filters.size}
                onValueChange={(value) => handleFilterChange('size', value)}
            >
                <SelectTrigger className="w-[200px] sm:w-[200px]">
                <div className="flex items-center gap-2">
                    <Maximize className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder={`${t('size')} (${t('sqm')})`} />
                </div>
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="all">{t('any_size')}</SelectItem>
                <SelectItem value="0-5000">0 - 5,000 {t('sqm')}</SelectItem>
                <SelectItem value="5001-10000">5,001 - 10,000 {t('sqm')}</SelectItem>
                <SelectItem value="10001-999999">10,001+ {t('sqm')}</SelectItem>
                </SelectContent>
            </Select>
        </div>
        {hasActiveFilters && (
             <Button variant="ghost" onClick={resetFilters}>
                <X className="mr-2 h-4 w-4" />
                Reset
            </Button>
        )}
    </div>
  );
}
