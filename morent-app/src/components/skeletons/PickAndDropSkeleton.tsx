import { Skeleton } from '@/components/ui';

const PickDropSectionSkeleton = () => (
  <div className="flex-1 rounded-xl bg-white p-4 md:px-8 md:py-6">
    {/* Label row */}
    <div className="mb-4 flex items-center gap-2">
      <Skeleton className="size-2 rounded-full" />
      <Skeleton className="h-5 w-20" />
    </div>

    {/* 3-column fields */}
    <div className="grid grid-cols-3 gap-3">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>
      <div className="flex flex-col gap-1 border-l border-secondary-100 pl-3">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>
      <div className="flex flex-col gap-1 border-l border-secondary-100 pl-3">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>
    </div>
  </div>
);

export const PickAndDropSkeleton = () => (
  <div className="relative flex w-full flex-col items-center gap-8 md:flex-row lg:gap-11">
    <PickDropSectionSkeleton />
    <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center min-[1440px]:static min-[1440px]:translate-x-0 min-[1440px]:translate-y-0">
      <Skeleton className="size-[60px] rounded-[10px]" />
    </div>
    <PickDropSectionSkeleton />
  </div>
);
