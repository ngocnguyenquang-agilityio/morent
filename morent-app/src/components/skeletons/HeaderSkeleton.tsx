import { Skeleton } from '@/components/ui';

export const HeaderSkeleton = () => (
  <header className="bg-white border-b border-secondary-100/40">
    {/* Desktop */}
    <div className="hidden lg:flex items-center justify-between px-8 xl:pl-[60px] xl:pr-8 py-10">
      <div className="flex items-center w-full gap-[64px]">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-full max-w-[492px] mx-8 xl:ml-16 rounded-full" />
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="size-11 rounded-full" />
        <Skeleton className="size-11 rounded-full" />
        <Skeleton className="size-11 rounded-full" />
        <Skeleton className="size-11 rounded-full" />
      </div>
    </div>

    {/* Mobile */}
    <div className="lg:hidden">
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <Skeleton className="size-8 rounded-full ml-auto" />
      </div>
      <div className="px-6 pb-4">
        <Skeleton className="h-7 w-28" />
      </div>
      <div className="flex items-center gap-4 px-6 pb-6">
        <Skeleton className="h-12 flex-1 rounded-xl" />
        <Skeleton className="size-11 rounded-lg shrink-0" />
      </div>
    </div>
  </header>
);
