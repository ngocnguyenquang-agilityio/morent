'use client';

// Lib
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

// API
import { fetchPopularCars } from '@/services/cars';

// Constants
import { ROUTE } from '@/constants/route';
import { CAR_KEYS } from '@/constants/queryKeys';

// Components
import { CarCard } from '@/components/CarCard';
import { ErrorMessage } from '@/components/ErrorMessage';
import { CarGridSkeleton } from '@/components/skeletons';

export const PopularCarsSection = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: CAR_KEYS.POPULAR(),
    queryFn: fetchPopularCars,
  });

  const handleRetry = () => refetch();

  const renderContent = () => {
    if (isLoading) {
      return <CarGridSkeleton />;
    }

    if (isError || !data) {
      return (
        <ErrorMessage
          message="Failed to load popular cars"
          onRetry={handleRetry}
        />
      );
    }

    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-8">
        {data.data.map((car, index) => (
          <CarCard key={`popular-${index}`} car={car} />
        ))}
      </div>
    );
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-5 px-5">
        <h2 className="text-base font-semibold text-secondary-300">
          Popular Car
        </h2>
        {data && (
          <Link
            href={ROUTE.CARS}
            className="text-base font-semibold text-primary-500 hover:underline"
          >
            View All
          </Link>
        )}
      </div>
      {renderContent()}
    </section>
  );
};
