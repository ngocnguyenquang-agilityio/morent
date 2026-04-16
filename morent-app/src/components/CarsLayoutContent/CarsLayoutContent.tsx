'use client';

// Lib
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// Components
import { FilterSidebar, FilterState } from '@/components/FilterSidebar';

// Hooks
import { useDebounce } from '@/hooks/useDebounce';

// Constants
import { DEFAULT_MAX_PRICE, MAX_PRICE_LIMIT } from '@/constants/filter';
import { CAR_PARAMS } from '@/constants/car';
import { ROUTE } from '@/constants/route';

// Utils
import { getCapacityLabels, getCapacityValues } from '@/utils/carFilters';
import { parseSearchParam, setArrayParam } from '@/utils/searchParams';

// Stores
import { useShallow } from 'zustand/react/shallow';
import { useFilterSidebarStore } from '@/stores/filterSidebar';

const CarsLayoutContent = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isOpen, close } = useFilterSidebarStore(
    useShallow((state) => ({ isOpen: state.isOpen, close: state.close })),
  );

  // Parse initial filter state from URL
  const initialTypes = parseSearchParam(
    searchParams,
    CAR_PARAMS.TYPE,
    (value) => value?.split(',').filter(Boolean) ?? [],
  );

  const initialCapacities = parseSearchParam(
    searchParams,
    CAR_PARAMS.CAPACITY,
    getCapacityLabels,
  );

  const initialMaxPrice = parseSearchParam(
    searchParams,
    CAR_PARAMS.MAX_PRICE,
    (value) => Number(value) || DEFAULT_MAX_PRICE,
  );

  const isCarListPage = pathname === ROUTE.CARS;

  const applyFilters = (filters: FilterState) => {
    const params = new URLSearchParams(searchParams.toString());

    setArrayParam(params, CAR_PARAMS.TYPE, filters.types);
    setArrayParam(
      params,
      CAR_PARAMS.CAPACITY,
      getCapacityValues(filters.capacities),
    );

    // Update maxPrice param (only if not default)
    if (filters.maxPrice < MAX_PRICE_LIMIT) {
      params.set(CAR_PARAMS.MAX_PRICE, String(filters.maxPrice));
    } else {
      params.delete(CAR_PARAMS.MAX_PRICE);
    }

    const targetPath = isCarListPage ? pathname : ROUTE.CARS;
    router.replace(`${targetPath}?${params.toString()}`);
  };

  const handleFiltersChange = useDebounce<FilterState>(applyFilters);

  const isPaymentPage = pathname.endsWith('/payment');

  if (isPaymentPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      {/* Mobile filter overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={close} />
          <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-white overflow-y-auto p-6">
            <FilterSidebar
              defaultTypes={initialTypes}
              defaultCapacities={initialCapacities}
              defaultMaxPrice={initialMaxPrice}
              maxPriceLimit={MAX_PRICE_LIMIT}
              onFiltersChange={handleFiltersChange}
            />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block lg:w-[360px] flex-shrink-0">
        <FilterSidebar
          defaultTypes={initialTypes}
          defaultCapacities={initialCapacities}
          defaultMaxPrice={initialMaxPrice}
          maxPriceLimit={MAX_PRICE_LIMIT}
          onFiltersChange={handleFiltersChange}
        />
      </aside>

      <div className="flex-1 min-w-0 px-6 py-8 md:p-6 lg:p-8">
        <div className="max-w-screen-xl mx-auto">{children}</div>
      </div>
    </div>
  );
};

export { CarsLayoutContent };
