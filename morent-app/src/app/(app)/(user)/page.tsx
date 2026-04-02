// Lib
import Link from 'next/link';

// Components
import { HeroBanner } from '@/components/HeroBanner';
import { PickAndDrop } from '@/components/PickAndDrop';
import { CarCard } from '@/components/CarCard';
import { Button } from '@/components/ui/Button';

// Types
import { HeroBannerVariant } from '@/types/car';

// Constants
import { POPULAR_CARS, RECOMMENDATION_CARS, TOTAL_CARS } from '@/constants/car';
import { ROUTE } from '@/constants/route';

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
    <PickAndDrop />

    {/* Popular Cars */}
    <section>
      <div className="flex items-center justify-between mb-5 px-5">
        <h2 className="text-base font-semibold text-secondary-300">
          Popular Car
        </h2>
        <Link
          href={ROUTE.CARS}
          className="text-base font-semibold text-primary-500 hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-8">
        {POPULAR_CARS.map((car, index) => (
          <CarCard key={`popular-${index}`} car={car} />
        ))}
      </div>
    </section>

    {/* Recommendation Cars */}
    <section>
      <h2 className="text-base font-semibold text-secondary-300 mb-5">
        Recomendation Car
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-8">
        {RECOMMENDATION_CARS.map((car, index) => (
          <CarCard key={`rec-${index}`} car={car} />
        ))}
      </div>
    </section>

    {/* Footer actions */}
    <div className="relative flex items-center justify-center pb-4">
      <Button
        variant="default"
        className="px-8 py-3 h-auto text-base font-semibold rounded-[10px]"
      >
        Show more car
      </Button>
      <span className="absolute right-0 text-sm font-medium text-secondary-300">
        {TOTAL_CARS} Car
      </span>
    </div>
  </div>
);

export default HomePage;
