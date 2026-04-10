// Lib
import { Suspense } from 'react';

// Components
import { CarsPageContent } from '@/components/CarsPageContent';
import { CarGridSkeleton } from '@/components/skeletons';

// Utils
import { createMetadata } from '@/utils/metadata';

// Constants
import { DEFAULT_PAGE_SIZE } from '@/constants/car';

export const metadata = createMetadata(
  'Browse Cars',
  'Search and filter rental cars by type, capacity, and price range.',
);

type CarsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const CarsPage = ({ searchParams }: CarsPageProps) => (
  <Suspense fallback={<CarGridSkeleton count={DEFAULT_PAGE_SIZE} />}>
    <CarsPageContent searchParams={searchParams} />
  </Suspense>
);

export default CarsPage;
