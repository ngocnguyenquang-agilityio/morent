// Lib
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

// Components
import { CarsList } from '@/components/CarList';

// API
import { fetchCars } from '@/services/cars';

// Constants
import { CAR_KEYS } from '@/constants/queryKeys';
import { DEFAULT_PAGE_SIZE } from '@/constants/car';

// Utils
import { getFilterParams } from '@/utils/carFilters';
import { toURLSearchParams } from '@/utils/searchParams';

type CarsPageContentProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const CarsPageContent = async ({
  searchParams,
}: CarsPageContentProps) => {
  const resolvedParams = await searchParams;
  const filters = getFilterParams(toURLSearchParams(resolvedParams));
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: CAR_KEYS.LIST({
      filters,
      pagination: { pageSize: DEFAULT_PAGE_SIZE },
    }),
    queryFn: ({ pageParam }) =>
      fetchCars({
        filters,
        pagination: {
          page: pageParam as number,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarsList />
    </HydrationBoundary>
  );
};
