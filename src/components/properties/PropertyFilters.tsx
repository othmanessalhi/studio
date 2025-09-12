
'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filters } from './PropertyList';
import { useTranslation } from '@/hooks/use-translation';

interface PropertyFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export function PropertyFilters({ filters, setFilters }: PropertyFiltersProps) {
  const { t } = useTranslation();

  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    setFilters({ ...filters, [filterName]: value });
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm md:w-auto md:flex-row">
      <Select
        value={filters.location}
        onValueChange={(value) => handleFilterChange('location', value)}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder={t('location')} />
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
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder={t('price')} />
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
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder={`${t('size')} (${t('sqm')})`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('any_size')}</SelectItem>
          <SelectItem value="0-5000">0 - 5,000 {t('sqm')}</SelectItem>
          <SelectItem value="5001-10000">5,001 - 10,000 {t('sqm')}</SelectItem>
          <SelectItem value="10001-999999">10,001+ {t('sqm')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
