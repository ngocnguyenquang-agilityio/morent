'use client';

// Lib
import { useState } from 'react';

// Components
import { DetailsRental } from '@/components/DetailsRental';
import { RentedList } from '@/components/RentedList';

// Constants
import { MOCK_RENTALS, RENTAL_PAGE_SIZE } from '@/constants/rental';

// Types
import type { Transaction } from '@/types/transaction';

// Utils
import {
  getSelectedRental,
  mapRentalToDetails,
  mapRentalToTransaction,
} from '@/utils/rental';
import { getPageItems, getTotalPages } from '@/utils/pagination';

export const RentedListClient = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRentalId, setSelectedRentalId] = useState<string | undefined>(
    undefined,
  );

  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedRentalId(transaction.id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedRentalId(undefined);
  };

  const totalPages = getTotalPages(MOCK_RENTALS.length, RENTAL_PAGE_SIZE);
  const pageRentals = getPageItems(MOCK_RENTALS, currentPage, RENTAL_PAGE_SIZE);
  const selectedRental = getSelectedRental(pageRentals, selectedRentalId);
  const rentalDetails = mapRentalToDetails(selectedRental);

  const transactions = pageRentals.map(mapRentalToTransaction);

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      <RentedList
        transactions={transactions}
        isLoading={false}
        onSelect={handleSelectTransaction}
        selectedId={selectedRentalId ?? pageRentals[0]?.documentId}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <DetailsRental isLoading={false} {...rentalDetails} className="w-full" />
    </div>
  );
};
