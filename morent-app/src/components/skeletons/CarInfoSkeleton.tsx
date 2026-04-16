import { Skeleton } from '@/components/ui';

export const CarInfoSkeleton = () => (
  <div className="flex flex-col lg:flex-row lg:gap-8 lg:justify-between gap-6">
    {/* Image gallery */}
    <div className="flex flex-col gap-4 w-full">
      <Skeleton className="w-full h-[300px] rounded-[10px]" />
      <div className="flex gap-3">
        <Skeleton className="h-[80px] flex-1 rounded-lg" />
        <Skeleton className="h-[80px] flex-1 rounded-lg" />
        <Skeleton className="h-[80px] flex-1 rounded-lg" />
      </div>
    </div>

    {/* Details panel */}
    <div className="flex flex-col rounded-[10px] bg-white p-6 shadow-sm gap-8 w-full">
      {/* Title + favorite */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="size-6 rounded-full shrink-0" />
        </div>
        {/* Stars + reviewer */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="size-4 rounded-sm" />
            ))}
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Specs grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>

      {/* Price + button */}
      <div className="mt-auto pt-8 flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-14 w-32 rounded-lg" />
      </div>
    </div>
  </div>
);
