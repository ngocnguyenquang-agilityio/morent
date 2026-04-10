import { Skeleton } from '@/components/ui/Skeleton';

export const DetailsRentalSkeleton = () => (
  <div className="space-y-8">
    <Skeleton className="w-full h-[272px] rounded-[10px]" />
    <div className="flex items-center gap-4">
      <Skeleton className="h-[72px] w-[132px] rounded-[8px] shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
    <div className="space-y-3">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div className="space-y-3">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div className="flex items-center justify-between">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-6 w-20" />
    </div>
  </div>
);
