// Lib
import { auth } from '@clerk/nextjs/server';

// Components
import { RentedListClient } from '@/components/RentedListContent';

// Services
import { fetchStrapiUserByClerkId } from '@/services/user';
import { fetchMyRentals } from '@/services/rentals';

// Types
import type { PaginationMeta } from '@/types/car';

// Utils
import { createMetadata } from '@/utils/metadata';

export const metadata = createMetadata(
  'Rented List',
  'View your rental history and details for each booking.',
);

const EMPTY_PAGINATION: PaginationMeta = {
  page: 1,
  pageSize: 10,
  pageCount: 0,
  total: 0,
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

const RentedListPage = async ({ searchParams }: Props) => {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const { userId } = await auth();
  const strapiUser = await fetchStrapiUserByClerkId(userId!);

  const { data: rentals, pagination } = strapiUser
    ? await fetchMyRentals(strapiUser.id, page)
    : { data: [], pagination: EMPTY_PAGINATION };

  return (
    <div className="px-6 py-8 lg:px-16 lg:py-10 max-w-screen-2xl mx-auto">
      <RentedListClient rentals={rentals} pagination={pagination} />
    </div>
  );
};

export default RentedListPage;
