// Components
import { Skeleton } from '@/components/ui';

const CarsLoading = () => (
  <div className="flex">
    {/* Desktop sidebar skeleton */}
    <aside className="hidden lg:block lg:w-[360px] flex-shrink-0 p-6">
      <Skeleton className="h-[900px] w-full rounded-[10px]" />
    </aside>

    {/* Main content area */}
    <div className="flex-1 min-w-0 px-6 py-8 md:p-6 lg:p-8">
      <div className="max-w-screen-xl mx-auto">
        <Skeleton className="h-full min-h-[600px] w-full rounded-[10px]" />
      </div>
    </div>
  </div>
);

export default CarsLoading;
