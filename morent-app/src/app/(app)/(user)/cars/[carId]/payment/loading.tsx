// Components
import { Skeleton } from '@/components/ui';

const PaymentLoading = () => (
  <div className="container mx-auto">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
      {/* Right column — rental summary skeleton */}
      <div className="lg:col-start-2 lg:row-start-1">
        <Skeleton className="h-[480px] w-full rounded-[10px]" />
      </div>
      {/* Left column — form sections skeleton */}
      <div className="space-y-6 lg:space-y-8 lg:col-start-1 lg:row-start-1">
        <Skeleton className="h-[320px] w-full rounded-[10px]" />
        <Skeleton className="h-[400px] w-full rounded-[10px]" />
        <Skeleton className="h-[420px] w-full rounded-[10px]" />
        <Skeleton className="h-[280px] w-full rounded-[10px]" />
      </div>
    </div>
  </div>
);

export default PaymentLoading;
