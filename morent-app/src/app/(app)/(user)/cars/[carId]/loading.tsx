// Components
import { Skeleton } from '@/components/ui';
import { CarCardSkeleton } from '@/components/skeletons';

const CarDetailLoading = () => (
  <div className="flex flex-col gap-8">
    {/* CarInfo skeleton: two panels side by side on lg */}
    <div className="flex flex-col lg:flex-row lg:gap-8 lg:justify-between gap-6">
      {/* Left: CarImageGallery skeleton */}
      <div className="flex flex-col gap-6 w-full">
        <Skeleton className="min-h-[360px] w-full rounded-[10px]" />
        <div className="grid grid-cols-3 gap-5">
          <Skeleton className="h-[64px] lg:h-[124px] rounded-[10px]" />
          <Skeleton className="h-[64px] lg:h-[124px] rounded-[10px]" />
          <Skeleton className="h-[64px] lg:h-[124px] rounded-[10px]" />
        </div>
      </div>

      {/* Right: CarInfo details skeleton */}
      <div className="flex flex-col rounded-[10px] bg-white p-6 shadow-sm gap-8 w-full">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="size-6 rounded-full shrink-0" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="mt-auto pt-8 flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-12 w-32 rounded-[10px]" />
        </div>
      </div>
    </div>

    {/* Reviews skeleton */}
    <div className="rounded-[10px] bg-white p-6 shadow-sm">
      <div className="mb-8 flex items-center gap-3">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-8 rounded" />
      </div>
      <div className="flex flex-col divide-y divide-secondary-100">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>

    {/* PopularCarsSection skeleton */}
    <section>
      <div className="flex items-center justify-between mb-5 px-5">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-14" />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
        <CarCardSkeleton />
        <CarCardSkeleton />
        <CarCardSkeleton />
      </div>
    </section>

    {/* RecommendationCarsSection skeleton */}
    <section>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="size-2 rounded-full" />
          <Skeleton className="h-5 w-36" />
        </div>
        <Skeleton className="h-5 w-14" />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
        <CarCardSkeleton />
        <CarCardSkeleton />
        <CarCardSkeleton />
      </div>
    </section>
  </div>
);

export default CarDetailLoading;
