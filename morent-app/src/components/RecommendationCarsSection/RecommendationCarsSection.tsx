'use client';

// Lib
import { useInfiniteQuery } from '@tanstack/react-query';

// API
import { fetchRecommendationCars } from '@/services/cars';

// Types
import { CarsApiResult } from '@/types/car';

// Constants
import { CAR_KEYS } from '@/constants/queryKeys';
import { DEFAULT_PAGE_SIZE } from '@/constants/car';

// Components
import { CarCard } from '@/components/CarCard';
import { Button } from '@/components/ui/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { CarGridSkeleton } from '@/components/skeletons';

export const RecommendationCarsSection = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery<CarsApiResult>({
    queryKey: CAR_KEYS.RECOMMENDATION({ pageSize: DEFAULT_PAGE_SIZE }),
    queryFn: ({ pageParam }) =>
      fetchRecommendationCars({
        page: pageParam as number,
        pageSize: DEFAULT_PAGE_SIZE,
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
      return <CarGridSkeleton count={8} />;
    }

    if (isError) {
      return (
        <ErrorMessage
          message="Failed to load recommendation cars"
          onRetry={handleRetry}
        />
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-8">
          {allCars.map((car, index) => (
            <CarCard key={`rec-${index}`} car={car} />
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
    <section>
      <h2 className="text-base font-semibold text-secondary-300 mb-5 px-5">
        Recommendation Car
      </h2>
      {renderContent()}
    </section>
  );
};
