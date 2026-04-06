import { CarCardSkeleton } from './CarCardSkeleton';

type CarGridSkeletonProps = {
  count?: number;
};

export const CarGridSkeleton = ({ count = 4 }: CarGridSkeletonProps) => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-8">
    {Array.from({ length: count }).map((_, i) => (
      <CarCardSkeleton key={i} />
    ))}
  </div>
);
