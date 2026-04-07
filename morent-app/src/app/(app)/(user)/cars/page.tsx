// Lib
import { Suspense } from 'react';

// Components
import { CarsPageContent } from '@/components/CarsPageContent';
import { CarGridSkeleton } from '@/components/skeletons';

// Constants
import { DEFAULT_PAGE_SIZE } from '@/constants/car';

type CarsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const CarsPage = ({ searchParams }: CarsPageProps) => (
  <Suspense fallback={<CarGridSkeleton count={DEFAULT_PAGE_SIZE} />}>
    <CarsPageContent searchParams={searchParams} />
  </Suspense>
);

export default CarsPage;
