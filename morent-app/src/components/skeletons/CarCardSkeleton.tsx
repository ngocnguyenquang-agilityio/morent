import { Skeleton } from '@/components/ui';

export const CarCardSkeleton = () => (
  <div className="w-full max-w-[327px] min-h-[240px] flex flex-col justify-between rounded-xl bg-white p-4 shadow-sm md:max-w-[317px] md:min-h-[388px] md:p-6">
    {/* Header */}
    <div className="flex items-start justify-between">
      <div className="space-y-1.5">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="size-6 rounded-full" />
    </div>

    {/* Image + specs */}
    <div className="my-2 flex flex-1 flex-row items-center md:my-8 md:flex-col md:gap-8">
      <Skeleton className="flex-1 h-[80px] md:h-[120px] md:w-full rounded-lg mr-4 md:mr-0" />
      <div className="flex flex-col gap-2 md:w-full md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-4 w-14" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-18" />
      </div>
    </div>

    {/* Price + button */}
    <div className="mt-4 flex items-center justify-between md:mt-6">
      <div className="space-y-1">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 w-14" />
      </div>
      <Skeleton className="h-10 w-28 rounded-lg" />
    </div>
  </div>
);
