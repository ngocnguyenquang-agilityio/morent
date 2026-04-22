// Lib
import { Suspense } from 'react';

// Components
import { HeroBanner } from '@/components/HeroBanner';
import { PickAndDrop } from '@/components/PickAndDrop';
import { RecommendationCarsSection } from '@/components/RecommendationCarsSection';
import { PopularCarsSection } from '@/components/PopularCarsSection';
import { PickAndDropSkeleton, CarGridSkeleton } from '@/components/skeletons';

// Utils
import { createMetadata } from '@/utils/metadata';

// Types
import { HeroBannerVariant } from '@/types/car';

export const metadata = createMetadata(
  'Home',
  'Browse popular and recommended rental cars. Find the perfect car for any trip.',
);

const HomePage = () => (
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
    <Suspense fallback={<PickAndDropSkeleton />}>
      <PickAndDrop />
    </Suspense>

    {/* Popular Cars */}
    <Suspense fallback={<CarGridSkeleton count={4} />}>
      <PopularCarsSection mobileLayout="scroll" />
    </Suspense>

    {/* Recommendation Cars */}
    <Suspense fallback={<CarGridSkeleton count={8} />}>
      <RecommendationCarsSection isCompactMode />
    </Suspense>
  </div>
);

export default HomePage;
