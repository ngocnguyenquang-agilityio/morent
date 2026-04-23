'use client';

// Lib
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';

// API
import { fetchCars } from '@/services/cars';

// Types
import { CarsApiResult, GetCarsParams } from '@/types/car';

// Constants
import { CAR_KEYS } from '@/constants/queryKeys';
import { DEFAULT_PAGE_SIZE } from '@/constants/car';

// Utils
import { getFilterParams } from '@/utils/carFilters';

// Components
import { CarCard } from '@/components/CarCard';
import { Button } from '@/components/ui/Button';
import { CarGridSkeleton } from '@/components/skeletons';
import { ErrorMessage } from '@/components/ErrorMessage';
import { PickAndDrop } from '@/components/PickAndDrop';

export const CarsList = () => {
  const searchParams = useSearchParams();

  // Parse filters from URL
  const queryParams: GetCarsParams = useMemo(
    () => ({
      filters: getFilterParams(searchParams),
      pagination: { pageSize: DEFAULT_PAGE_SIZE },
    }),
    [searchParams],
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery<CarsApiResult>({
    queryKey: CAR_KEYS.LIST(queryParams),
    queryFn: ({ pageParam }) =>
      fetchCars({
        ...queryParams,
        pagination: {
          ...queryParams.pagination,
          page: pageParam as number,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.pagination;
      return page < pageCount ? page + 1 : undefined;
    },
  });

  const allCars = data?.pages.flatMap((page) => page.data) ?? [];
  const total = data?.pages[0]?.pagination.total ?? 0;

  const handleRetry = () => refetch();
  const handleFetchNextPage = () => fetchNextPage();

  const renderContent = () => {
    if (isLoading) {
      return <CarGridSkeleton count={DEFAULT_PAGE_SIZE} />;
    }

    if (isError) {
      return (
        <ErrorMessage message="Failed to load cars" onRetry={handleRetry} />
      );
    }

    if (allCars.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center gap-2 py-16 rounded-[10px] bg-white">
          <p className="text-lg font-semibold text-secondary-400">
            No cars found
          </p>
          <p className="text-sm text-secondary-300">
            Try adjusting your filters
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-8 2xl:grid-cols-4">
          {allCars.map((car) => (
            <CarCard key={car.documentId} car={car} isCompactMode />
          ))}
        </div>

        <div className="relative flex items-center justify-center mt-8 pb-4">
          {hasNextPage && (
            <Button
              variant="default"
              className="px-8 py-3 h-auto text-base font-semibold rounded-[10px]"
              onClick={handleFetchNextPage}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Loading...' : 'Show more car'}
            </Button>
          )}
          <span className="absolute right-0 text-sm font-medium text-secondary-300">
            {total} Cars
          </span>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <PickAndDrop />
      {renderContent()}
    </div>
  );
};
