'use client';

// Lib
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Components
import { DetailsRental } from '@/components/DetailsRental';
import { RentedList } from '@/components/RentedList';

// Types
import type { Rental } from '@/types/rental';
import type { PaginationMeta } from '@/types/car';
import type { Transaction } from '@/types/transaction';

// Utils
import {
  getSelectedRental,
  mapRentalToDetails,
  mapRentalToTransaction,
} from '@/utils/rental';
import { mergeSearchParams } from '@/utils/searchParams';

// Constants
import { ROUTE } from '@/constants/route';
import { DEFAULT_PAGE, RENTAL_SEARCH_PARAMS } from '@/constants/rental';

type Props = {
  rentals: ReadonlyArray<Rental>;
  pagination: PaginationMeta;
};

export const RentedListClient = ({ rentals, pagination }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Math.max(
    DEFAULT_PAGE,
    Number(searchParams.get(RENTAL_SEARCH_PARAMS.PAGE)) || DEFAULT_PAGE,
  );

  const [selectedRentalId, setSelectedRentalId] = useState<string | undefined>(
    undefined,
  );

  const effectiveSelectedId =
    selectedRentalId !== undefined &&
    rentals.some((r) => r.documentId === selectedRentalId)
      ? selectedRentalId
      : rentals[0]?.documentId;

  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedRentalId(transaction.id);
  };

  const handlePageChange = (page: number) => {
    const params = mergeSearchParams(searchParams, { page });
    router.push(`${ROUTE.RENTED_LIST}?${params.toString()}`);
  };

  const selectedRental = getSelectedRental(
    rentals as Rental[],
    effectiveSelectedId,
  );
  const rentalDetails = mapRentalToDetails(selectedRental);
  const transactions = (rentals as Rental[]).map(mapRentalToTransaction);

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      <RentedList
        transactions={transactions}
        isLoading={false}
        onSelect={handleSelectTransaction}
        selectedId={effectiveSelectedId}
        currentPage={currentPage}
        totalPages={pagination.pageCount}
        onPageChange={handlePageChange}
      />
      <DetailsRental isLoading={false} {...rentalDetails} className="w-full" />
    </div>
  );
};
