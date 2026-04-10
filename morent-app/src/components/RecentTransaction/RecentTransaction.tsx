// Lib
import Image from 'next/image';

// Components
import { Button } from '@/components/ui/Button';
import { RecentTransactionSkeleton } from '@/components/skeletons';

// Utils
import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/price';

// Types
import { Transaction } from '@/types/transaction';

type RecentTransactionProps = {
  transactions?: Transaction[];
  onViewAll?: () => void;
  isLoading?: boolean;
  onSelect?: (transaction: Transaction) => void;
  selectedId?: string;
  className?: string;
};

export const RecentTransaction = ({
  transactions = [],
  onViewAll,
  isLoading,
  onSelect,
  selectedId,
  className,
}: RecentTransactionProps) => {
  const handleSelect = (transaction: Transaction) => () => {
    onSelect?.(transaction);
  };

  const renderContent = () => {
    if (isLoading) return <RecentTransactionSkeleton />;
    if (transactions.length === 0)
      return (
        <p className="text-sm text-secondary-300 py-4">
          No recent transactions.
        </p>
      );

    return (
      <ul className="flex flex-col">
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
        'bg-white rounded-[10px] p-4 lg:p-6 w-full space-y-6 lg:space-y-8',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-base lg:text-lg font-bold text-secondary-500">
          Recent Transaction
        </h2>
        <Button
          variant="ghost"
          className="text-primary text-sm font-semibold p-0 h-auto hover:bg-transparent"
          onClick={onViewAll}
        >
          View All
        </Button>
      </div>
      {renderContent()}
    </div>
  );
};
