'use client';

// Lib
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Components
import { DetailsRental } from '@/components/DetailsRental';
import { RecentTransaction } from '@/components/RecentTransaction';
import { TopCars } from '@/components/TopCars';

// Services
import { fetchLatestRental, fetchRecentRentals } from '@/services/rentals';

// Constants
import { RENTAL_KEYS } from '@/constants/queryKeys';

// Types
import { Transaction } from '@/types/transaction';

// Utils
import { mapRentalToDetails, mapRentalToTransaction } from '@/utils/rental';

const Dashboard = () => {
  const [selectedRentalId, setSelectedRentalId] = useState<string | undefined>(
    undefined,
  );

  const { data: latestRental, isLoading: isLatestLoading } = useQuery({
    queryKey: RENTAL_KEYS.LATEST(),
    queryFn: fetchLatestRental,
  });

  const { data: recentRentals, isLoading: isRecentLoading } = useQuery({
    queryKey: RENTAL_KEYS.RECENT(),
    queryFn: fetchRecentRentals,
  });

  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedRentalId(transaction.id);
  };

  const selectedRental = selectedRentalId
    ? (recentRentals?.data.find((r) => r.documentId === selectedRentalId) ??
      latestRental)
    : latestRental;

  const rentalDetails = selectedRental
    ? mapRentalToDetails(selectedRental)
    : undefined;

  const transactions = recentRentals?.data.map(mapRentalToTransaction);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 max-w-screen-xl mx-auto w-full">
      <DetailsRental
        isLoading={isLatestLoading}
        {...rentalDetails}
        className="h-full"
      />
      <div className="flex flex-col gap-4 h-full">
        <TopCars />
        <RecentTransaction
          isLoading={isRecentLoading}
          transactions={transactions ?? []}
          onSelect={handleSelectTransaction}
          selectedId={selectedRentalId}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default Dashboard;
