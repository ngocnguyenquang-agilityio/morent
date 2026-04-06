// Components
import { HeroBanner } from '@/components/HeroBanner';
import { PickAndDrop } from '@/components/PickAndDrop';
import { CarCardSkeleton } from '@/components/skeletons';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui';

// Types
import { HeroBannerVariant } from '@/types/car';

// Constants
import { DEFAULT_CARS } from '@/constants/car';

const HomePageLoading = () => (
  <div className="px-6 py-8 space-y-8 lg:px-16 lg:py-10 max-w-screen-2xl mx-auto">
    {/* Hero Banners */}
    <section className="flex gap-6 overflow-x-auto lg:overflow-visible">
      <HeroBanner
        title="The Best Platform for Car Rental"
        description="Ease of doing a car rental safely and reliably. Of course at a low price."
        imageUrl="/Koenigsegg.svg"
        variant={HeroBannerVariant.Blue}
        className="flex-1 min-w-[280px]"
      />
      <HeroBanner
        title="Easy way to rent a car at a low price"
        description="Providing cheap car rental services and safe and comfortable facilities."
        imageUrl="/Koenigsegg.svg"
        variant={HeroBannerVariant.Dark}
        className="hidden flex-1 lg:block"
      />
    </section>

    {/* Pick and Drop */}
    <PickAndDrop />

    {/* Popular Cars */}
    <section>
      <div className="flex items-center justify-between mb-5 px-5">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-14" />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-8">
        {Array.from({ length: DEFAULT_CARS.POPULAR_COUNT }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    </section>

    {/* Recommendation Cars */}
    <section>
      <Skeleton className="h-5 w-36 mb-5" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-8">
        {Array.from({ length: DEFAULT_CARS.RECOMMENDATION_COUNT }).map(
          (_, i) => (
            <CarCardSkeleton key={i} />
          ),
        )}
      </div>
      <div className="relative flex items-center justify-center mt-8 pb-4">
        <Button
          variant="default"
          className="px-8 py-3 h-auto text-base font-semibold rounded-[10px]"
          disabled
        >
          Show more car
        </Button>
        <Skeleton className="absolute right-0 h-4 w-16" />
      </div>
    </section>
  </div>
);

export default HomePageLoading;
