
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { MapPin, DollarSign, Maximize, X, SlidersHorizontal } from 'lucide-react';
import { Label } from '../ui/label';

export type Filters = {
  location: string;
  price: string;
  size: string;
};

interface FilterButtonProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  resetFilters: () => void;
  initialFilters: Filters;
}

export function FilterButton({ filters, setFilters, resetFilters, initialFilters }: FilterButtonProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

  const handleApplyFilters = () => {
    setFilters(tempFilters);
    setIsOpen(false);
  };

  const handleReset = () => {
    setTempFilters(initialFilters);
    setFilters(initialFilters);
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      // When opening, sync temp filters with the current active filters
      setTempFilters(filters);
    }
    setIsOpen(open);
  };

  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    setTempFilters((prev) => ({ ...prev, [filterName]: value }));
  };
  
  const hasActiveFilters = filters.location !== 'all' || filters.price !== 'all' || filters.size !== 'all';

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[240px] relative">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          {t('Filters')}
          {hasActiveFilters && <div className="absolute top-[-5px] right-[-5px] h-3 w-3 rounded-full bg-primary" />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('Filters')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location-filter" className="text-right flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {t('location')}
            </Label>
            <Select
              value={tempFilters.location}
              onValueChange={(value) => handleFilterChange('location', value)}
            >
              <SelectTrigger id="location-filter" className="col-span-3">
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
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price-filter" className="text-right flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                {t('price')}
            </Label>
            <Select
              value={tempFilters.price}
              onValueChange={(value) => handleFilterChange('price', value)}
            >
              <SelectTrigger id="price-filter" className="col-span-3">
                <SelectValue placeholder={t('price')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('any_price')}</SelectItem>
                <SelectItem value="0-200000">$0 - $200,000</SelectItem>
                <SelectItem value="200001-400000">$200,001 - $400,000</SelectItem>
                <SelectItem value="400001-9999999">$400,001+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="size-filter" className="text-right flex items-center gap-2">
                 <Maximize className="h-4 w-4 text-muted-foreground" />
                {t('size')}
            </Label>
            <Select
              value={tempFilters.size}
              onValueChange={(value) => handleFilterChange('size', value)}
            >
              <SelectTrigger id="size-filter" className="col-span-3">
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
        </div>
        <DialogFooter className='sm:justify-between'>
            <Button variant="ghost" onClick={handleReset}>
                <X className="mr-2 h-4 w-4" />
                {t('reset')}
            </Button>
            <Button onClick={handleApplyFilters}>{t('apply_filters')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
