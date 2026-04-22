'use client';

// Lib
import Link from 'next/link';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

// API
import { fetchRecommendationCars } from '@/services/cars';

// Utils
import { extractPickDropParams } from '@/utils/pickAndDrop';

// Types
import { CarsApiResult } from '@/types/car';

// Constants
import { ROUTE } from '@/constants/route';
import { CAR_KEYS } from '@/constants/queryKeys';
import { DEFAULT_PAGE_SIZE, CAR_DETAILS_SECTIONS } from '@/constants/car';
import { CAR_ERROR } from '@/constants/error';

// Components
import { CarCard } from '@/components/CarCard';
import { Button } from '@/components/ui/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { CarGridSkeleton } from '@/components/skeletons';
import { SectionHeader } from '@/components/SectionHeader';

const GRID_COLS_CLASS = {
  3: 'grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8',
  4: 'grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8',
} as const;

const SCROLL_COLS_CLASS = {
  3: 'flex overflow-x-auto gap-5 pb-4 sm:grid sm:overflow-visible sm:grid-cols-2 xl:grid-cols-3 xl:gap-8',
  4: 'flex overflow-x-auto gap-5 pb-4 sm:grid sm:overflow-visible sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:grid-cols-4 xl:gap-8',
} as const;

interface RecommendationCarsSectionProps {
  pageSize?: number;
  gridCols?: keyof typeof GRID_COLS_CLASS;
  isShowViewAll?: boolean;
  label?: string;
  mobileLayout?: 'grid' | 'scroll';
  isCompactMode?: boolean;
}

export const RecommendationCarsSection = ({
  pageSize = DEFAULT_PAGE_SIZE,
  gridCols = 4,
  isShowViewAll = false,
  label = CAR_DETAILS_SECTIONS.RECOMMENDATION_CAR,
  mobileLayout = 'grid',
  isCompactMode = false,
}: RecommendationCarsSectionProps) => {
  const searchParams = useSearchParams();
  const pickDropQuery = extractPickDropParams(searchParams).toString();
  const carsUrl = pickDropQuery ? `${ROUTE.CARS}?${pickDropQuery}` : ROUTE.CARS;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery<CarsApiResult>({
    queryKey: CAR_KEYS.RECOMMENDATION({ pageSize }),
    queryFn: ({ pageParam }) =>
      fetchRecommendationCars({
        page: pageParam as number,
        pageSize,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.pagination;
      return page < pageCount ? page + 1 : undefined;
    },
  });

  const handleFetchNextPage = () => fetchNextPage();

  const allCars = data?.pages.flatMap((page) => page.data) ?? [];
  const total = data?.pages[0]?.pagination.total ?? 0;

  const renderContent = () => {
    if (isLoading) {
      return <CarGridSkeleton count={pageSize} />;
    }

    if (isError) {
      return (
        <ErrorMessage
          message={CAR_ERROR.FETCH_RECOMMENDATION}
          onRetry={refetch}
        />
      );
    }

    const containerClass =
      mobileLayout === 'scroll'
        ? SCROLL_COLS_CLASS[gridCols]
        : `grid ${GRID_COLS_CLASS[gridCols]}`;

    return (
      <>
        <div className={containerClass}>
          {allCars.map((car, index) => (
            <div
              key={`rec-${index}`}
              className={
                mobileLayout === 'scroll'
                  ? 'max-w-[320px] shrink-0 sm:w-auto'
                  : ''
              }
            >
              <CarCard car={car} isCompactMode={isCompactMode} />
            </div>
          ))}
        </div>
        {!isShowViewAll && (
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
        )}
      </>
    );
  };

  return (
    <section>
      {isShowViewAll ? (
        <div className="mb-5 flex items-center justify-between">
          <SectionHeader label={label} />
          <Link
            href={carsUrl}
            className="text-base font-semibold text-primary-500 hover:underline"
          >
            {CAR_DETAILS_SECTIONS.VIEW_ALL}
          </Link>
        </div>
      ) : (
        <h2 className="text-base font-semibold text-secondary-300 mb-5 px-5">
          {label}
        </h2>
      )}
      {renderContent()}
    </section>
  );
};
