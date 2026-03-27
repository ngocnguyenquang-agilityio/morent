'use client';

// Lib
import { useState, useCallback } from 'react';

// Components
import { FilterCheckbox } from '@/components/FilterCheckbox';
import { FilterSection } from '@/components/FilterSection';

// Constants
import { CAPACITY_OPTIONS, TYPE_OPTIONS } from '@/constants/filter';

export interface FilterState {
  types: string[];
  capacities: string[];
  maxPrice: number;
}

export interface FilterSidebarProps {
  defaultTypes?: string[];
  defaultCapacities?: string[];
  defaultMaxPrice?: number;
  maxPriceLimit?: number;
  onFiltersChange?: (filters: FilterState) => void;
}

export const FilterSidebar = ({
  defaultTypes = [],
  defaultCapacities = [],
  defaultMaxPrice = 100,
  maxPriceLimit = 100,
  onFiltersChange,
}: FilterSidebarProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(defaultTypes);
  const [selectedCapacities, setSelectedCapacities] =
    useState<string[]>(defaultCapacities);
  const [maxPrice, setMaxPrice] = useState(defaultMaxPrice);

  const handleTypeToggle = useCallback(
    (label: string) => {
      setSelectedTypes((prev) => {
        const next = prev.includes(label)
          ? prev.filter((t) => t !== label)
          : [...prev, label];
        onFiltersChange?.({
          types: next,
          capacities: selectedCapacities,
          maxPrice,
        });
        return next;
      });
    },
    [onFiltersChange, selectedCapacities, maxPrice],
  );

  const handleCapacityToggle = useCallback(
    (label: string) => {
      setSelectedCapacities((prev) => {
        const next = prev.includes(label)
          ? prev.filter((c) => c !== label)
          : [...prev, label];
        onFiltersChange?.({ types: selectedTypes, capacities: next, maxPrice });
        return next;
      });
    },
    [onFiltersChange, selectedTypes, maxPrice],
  );

  const handlePriceChange = useCallback(
    (value: number) => {
      setMaxPrice(value);
      onFiltersChange?.({
        types: selectedTypes,
        capacities: selectedCapacities,
        maxPrice: value,
      });
    },
    [onFiltersChange, selectedTypes, selectedCapacities],
  );

  return (
    <div className="bg-white md:p-6 lg:p-8 flex flex-col md:gap-10 lg:gap-14 h-full">
      <FilterSection title="TYPE">
        {TYPE_OPTIONS.map((option) => (
          <FilterCheckbox
            key={option.label}
            label={option.label}
            count={option.count}
            checked={selectedTypes.includes(option.label)}
            onChange={handleTypeToggle}
          />
        ))}
      </FilterSection>

      <FilterSection title="CAPACITY">
        {CAPACITY_OPTIONS.map((option) => (
          <FilterCheckbox
            key={option.label}
            label={option.label}
            count={option.count}
            checked={selectedCapacities.includes(option.label)}
            onChange={handleCapacityToggle}
          />
        ))}
      </FilterSection>

      <FilterSection title="PRICE">
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={maxPriceLimit}
            value={maxPrice}
            onChange={(e) => handlePriceChange(Number(e.target.value))}
            aria-label="Maximum price"
            className="w-full accent-primary-500"
          />
          <p className="text-secondary-400 font-semibold text-lg">
            Max. ${maxPrice.toFixed(2)}
          </p>
        </div>
      </FilterSection>
    </div>
  );
};
