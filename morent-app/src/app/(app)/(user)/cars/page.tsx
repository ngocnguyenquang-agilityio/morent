'use client';

// Components
import { HeroBanner } from '@/components/HeroBanner';
import { PickAndDrop } from '@/components/PickAndDrop';

// Types
import { HeroBannerVariant } from '@/types/car';

const bannerOne = {
  title: 'The Best Platform for Car Rental',
  description:
    'Ease of doing a car rental safely and reliably. Of course at a low price.',
  imageUrl: '/Koenigsegg.svg',
};

const bannerTwo = {
  title: 'Easy way to rent a car at a low price',
  description:
    'Providing cheap car rental services and safe and comfortable facilities.',
  imageUrl: '/Koenigsegg.svg',
};

const CarsPage = () => {
  return (
    <div className="space-y-4 px-4">
      <div className="flex items-center gap-4">
        <HeroBanner {...bannerOne} />
        <HeroBanner {...bannerTwo} variant={HeroBannerVariant.Dark} />
      </div>

      <PickAndDrop />
    </div>
  );
};

export default CarsPage;
