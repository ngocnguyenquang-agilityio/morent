// Types
import { GetCarsParams } from '@/types/car';

// Constants
import { CAPACITY_OPTIONS, MAX_PRICE_LIMIT } from '@/constants/filter';

/**
 * Parse filter values from URL search params into GetCarsParams.filters
 */
export const getFilterParams = (
  searchParams: URLSearchParams,
): GetCarsParams['filters'] => {
  const typeParam = searchParams.get('type');
  const capacityParam = searchParams.get('capacity');
  const maxPriceParam = searchParams.get('maxPrice');

  const filters: GetCarsParams['filters'] = {};

  if (typeParam) {
    const types = typeParam.split(',').filter(Boolean);
    if (types.length > 0) filters.type = types;
  }

  if (capacityParam) {
    const values = capacityParam.split(',').map(Number).filter(Boolean);
    if (values.length > 0) {
      // Map numeric values back to capacity values from options
      const validValues = values.filter((v) =>
        CAPACITY_OPTIONS.some((opt) => opt.value === v),
      );
      if (validValues.length > 0) filters.capacity = validValues;
    }
  }

  if (maxPriceParam) {
    const maxPrice = Number(maxPriceParam);
    if (!isNaN(maxPrice) && maxPrice < MAX_PRICE_LIMIT) {
      filters.price = { max: maxPrice };
    }
  }

  return Object.keys(filters).length > 0 ? filters : undefined;
};

/**
 * Parse capacity labels from URL back to string[] labels.
 * URL stores numeric values like "2,4", we map back to labels like "2 Person".
 */
export const getCapacityLabels = (param: string | null): string[] => {
  if (!param) return [];
  const values = param.split(',').map(Number);
  return CAPACITY_OPTIONS.filter((opt) => values.includes(opt.value)).map(
    (opt) => opt.label,
  );
};

/**
 * Map capacity labels to numeric values for URL storage.
 */
export const getCapacityValues = (labels: string[]): number[] =>
  labels
    .map((label) => CAPACITY_OPTIONS.find((opt) => opt.label === label)?.value)
    .filter((v): v is number => v !== undefined);
