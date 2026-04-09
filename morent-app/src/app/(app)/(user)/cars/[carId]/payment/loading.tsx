// Components
import { Skeleton } from '@/components/ui/Skeleton';

const PaymentLoading = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
      {/* Left column: 4 section skeletons */}
      <div className="space-y-6 lg:space-y-8">
        <Skeleton className="h-48 w-full rounded-[10px]" />
        <Skeleton className="h-64 w-full rounded-[10px]" />
        <Skeleton className="h-56 w-full rounded-[10px]" />
        <Skeleton className="h-48 w-full rounded-[10px]" />
      </div>
      {/* Right column: RentalSummary skeleton */}
      <div>
        <Skeleton className="h-96 w-full rounded-[10px]" />
      </div>
    </div>
  </div>
);

export default PaymentLoading;
