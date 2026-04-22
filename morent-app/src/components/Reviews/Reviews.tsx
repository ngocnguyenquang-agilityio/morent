'use client';

// Lib
import { useState } from 'react';

// Utils
import { cn } from '@/lib/utils';

// Components
import { ChevronDownIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { ReviewItem } from '@/components/ReviewItem';

// Types
import type { Review } from '@/types/review';

interface ReviewsProps {
  reviews: readonly Review[];
  totalCount: number;
  initialVisible?: number;
  className?: string;
}

export const Reviews = ({
  reviews,
  totalCount,
  initialVisible = 2,
  className,
}: ReviewsProps) => {
  const [showAll, setShowAll] = useState(false);
  const visibleReviews = showAll ? reviews : reviews.slice(0, initialVisible);
  const toggleShowAll = () => setShowAll((prev) => !prev);

  return (
    <div className={cn('rounded-[10px] bg-white p-6 shadow-sm', className)}>
      <div className="mb-8 flex items-center gap-3">
        <h2 className="text-lg font-semibold text-secondary">Reviews</h2>
        <span className="rounded bg-primary px-3 py-1.5 text-sm font-bold text-white">
          {totalCount}
        </span>
      </div>

      <div className="flex flex-col divide-y divide-secondary-100">
        {visibleReviews.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))}
      </div>

      {reviews.length > initialVisible && (
        <div className="mt-6 flex justify-center">
          <Button
            variant="ghost"
            onClick={toggleShowAll}
            className="flex items-center gap-2 text-sm lg:text-base font-medium text-secondary-300"
          >
            {showAll ? 'Show Less' : 'Show All'}
            <ChevronDownIcon
              className={cn(
                'size-5 fill-secondary-300 transition-transform duration-200',
                {
                  'rotate-180': showAll,
                },
              )}
            />
          </Button>
        </div>
      )}
    </div>
  );
};
