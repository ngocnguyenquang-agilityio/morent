'use client';

// Lib
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

// API
import { fetchPopularCars } from '@/services/cars';

// Utils
import { extractPickDropParams } from '@/utils/pickAndDrop';

// Constants
import { ROUTE } from '@/constants/route';
import { CAR_KEYS } from '@/constants/queryKeys';
import { CAR_ERROR } from '@/constants/error';
import { CAR_DETAILS_SECTIONS } from '@/constants/car';

// Components
import { CarCard } from '@/components/CarCard';
import { ErrorMessage } from '@/components/ErrorMessage';
import { CarGridSkeleton } from '@/components/skeletons';

const GRID_COLS_CLASS = {
  3: 'grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8',
  4: 'grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-8',
} as const;

const SCROLL_COLS_CLASS = {
  3: 'flex overflow-x-auto gap-5 pb-4 sm:grid sm:overflow-visible sm:grid-cols-2 lg:grid-cols-3 lg:gap-8',
  4: 'flex overflow-x-auto gap-5 pb-4 sm:grid sm:overflow-visible sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8',
} as const;

interface PopularCarsSectionProps {
  label?: string;
  count?: number;
  gridCols?: keyof typeof GRID_COLS_CLASS;
  isShowViewAll?: boolean;
  mobileLayout?: 'grid' | 'scroll';
}

export const PopularCarsSection = ({
  label = 'Popular Car',
  count,
  gridCols = 4,
  isShowViewAll = true,
  mobileLayout = 'grid',
}: PopularCarsSectionProps) => {
  const searchParams = useSearchParams();
  const pickDropQuery = extractPickDropParams(searchParams).toString();
  const carsUrl = pickDropQuery ? `${ROUTE.CARS}?${pickDropQuery}` : ROUTE.CARS;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: CAR_KEYS.POPULAR(),
    queryFn: fetchPopularCars,
  });

  const handleRetry = () => refetch();

  const cars = count ? (data?.data.slice(0, count) ?? []) : (data?.data ?? []);

  const renderContent = () => {
    if (isLoading) {
      return <CarGridSkeleton count={count} />;
    }

    if (isError || !data) {
      return (
        <ErrorMessage message={CAR_ERROR.FETCH_POPULAR} onRetry={handleRetry} />
      );
    }

    const containerClass =
      mobileLayout === 'scroll'
        ? SCROLL_COLS_CLASS[gridCols]
        : `grid ${GRID_COLS_CLASS[gridCols]}`;

    return (
      <div className={containerClass}>
        {cars.map((car, index) => (
          <div
            key={`popular-${index}`}
            className={
              mobileLayout === 'scroll'
                ? 'max-w-[320px] shrink-0 sm:w-auto'
                : ''
            }
          >
            <CarCard car={car} />
          </div>
        ))}
      </div>
    );
  };

  const showViewAll = isShowViewAll || !!data;

  return (
    <section>
      <div className="flex items-center justify-between mb-5 px-5">
        <h2 className="text-base font-semibold text-secondary-300">{label}</h2>
        {showViewAll && (
          <Link
            href={carsUrl}
            className="text-base font-semibold text-primary-500 hover:underline"
          >
            {CAR_DETAILS_SECTIONS.VIEW_ALL}
          </Link>
        )}
      </div>
      {renderContent()}
    </section>
  );
};
