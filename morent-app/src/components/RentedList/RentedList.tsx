// Lib
import Image from 'next/image';

// Components
import { Button } from '@/components/ui/Button';
import { RecentTransactionSkeleton } from '@/components/skeletons';
import { Pagination } from '@/components/Pagination';
import { RentedListEmpty } from './RentedListEmpty';

// Utils
import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/price';

// Types
import { Transaction } from '@/types/transaction';

type RentedListProps = {
  transactions?: Transaction[];
  isLoading?: boolean;
  onSelect?: (transaction: Transaction) => void;
  selectedId?: string;
  className?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
};

export const RentedList = ({
  transactions = [],
  isLoading,
  onSelect,
  selectedId,
  className,
  currentPage = 1,
  totalPages = 4,
  onPageChange,
}: RentedListProps) => {
  const handleSelect = (transaction: Transaction) => () => {
    onSelect?.(transaction);
  };

  const renderContent = () => {
    if (isLoading) return <RecentTransactionSkeleton />;

    if (!transactions.length) return <RentedListEmpty />;

    return (
      <ul className="flex flex-col w-full">
        {transactions.map((transaction, index) => (
          <li key={transaction.id}>
            <Button
              variant="ghost"
              className={cn(
                'w-full h-auto px-2 py-0 rounded-lg hover:bg-secondary-50',
                selectedId === transaction.id && 'bg-secondary-50',
              )}
              onClick={handleSelect(transaction)}
            >
              <div className="flex items-center gap-4 py-4 w-full">
                <div className="shrink-0 w-[100px] h-[60px]">
                  <Image
                    src={transaction.image}
                    alt={transaction.name}
                    width={100}
                    height={60}
                    className="object-contain w-full h-full"
                  />
                </div>

                <div className="flex flex-1 items-center justify-between min-w-0">
                  <div className="flex flex-col gap-1 items-start">
                    <span className="text-sm lg:text-base font-bold text-secondary-500 truncate">
                      {transaction.name}
                    </span>
                    <span className="text-xs lg:text-sm text-secondary-300">
                      {transaction.type}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0 ml-4">
                    <span className="text-xs lg:text-sm text-secondary-300">
                      {transaction.date}
                    </span>
                    <span className="text-sm lg:text-base font-bold text-secondary-500">
                      ${formatPrice(transaction.price)}
                    </span>
                  </div>
                </div>
              </div>
            </Button>

            {index < transactions.length - 1 && (
              <hr className="border-secondary-100" />
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div
      className={cn(
        'flex flex-col bg-white rounded-[10px] p-4 lg:p-6 w-full',
        className,
      )}
    >
      <h2 className="text-base lg:text-lg font-bold text-secondary-500 mb-6 lg:mb-8">
        Rented List
      </h2>
      <div className="flex-1 min-h-[557px]">{renderContent()}</div>
      {!isLoading && !!transactions.length && (
        <div className="flex justify-center mt-6">
          <Pagination
            page={currentPage}
            pageCount={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};
