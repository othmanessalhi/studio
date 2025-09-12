'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filters } from './PropertyList';

interface PropertyFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export function PropertyFilters({ filters, setFilters }: PropertyFiltersProps) {
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
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          <SelectItem value="Coastal">Coastal</SelectItem>
          <SelectItem value="Inland">Inland</SelectItem>
          <SelectItem value="Urban">Urban</SelectItem>
          <SelectItem value="Industrial">Industrial</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={filters.price}
        onValueChange={(value) => handleFilterChange('price', value)}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any Price</SelectItem>
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
          <SelectValue placeholder="Size (sqm)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any Size</SelectItem>
          <SelectItem value="0-5000">0 - 5,000 sqm</SelectItem>
          <SelectItem value="5001-10000">5,001 - 10,000 sqm</SelectItem>
          <SelectItem value="10001-999999">10,001+ sqm</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
