'use client';

// Lib
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

// API
import { fetchPopularCars } from '@/services/cars';

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

interface PopularCarsSectionProps {
  label?: string;
  count?: number;
  gridCols?: keyof typeof GRID_COLS_CLASS;
  isShowViewAll?: boolean;
}

export const PopularCarsSection = ({
  label = 'Popular Car',
  count,
  gridCols = 4,
  isShowViewAll = true,
}: PopularCarsSectionProps) => {
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

    return (
      <div className={`grid ${GRID_COLS_CLASS[gridCols]}`}>
        {cars.map((car, index) => (
          <CarCard
            key={`popular-${index}`}
            car={car}
            href={ROUTE.CAR_DETAILS(car.documentId)}
          />
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
            href={ROUTE.CARS}
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
