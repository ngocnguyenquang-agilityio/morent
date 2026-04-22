// Lib
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Types
import { Review } from '@/types/review';

// Icons
import { StarIcon } from '@/components/icons';

interface ReviewItemProps {
  review: Review;
}

export const ReviewItem = ({ review }: ReviewItemProps) => {
  const fullStars = Math.floor(review.rating);

  return (
    <div className="py-6 first:pt-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="size-14 shrink-0 overflow-hidden rounded-full">
            <Image
              src={review.avatar}
              alt={review.name}
              width={56}
              height={56}
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-base lg:text-lg font-bold text-secondary">
              {review.name}
            </p>
            <p className="text-xs lg:text-sm text-secondary-300">
              {review.title}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-xs lg:text-sm text-secondary-300">
            {review.date}
          </span>
          <div
            className="flex items-center gap-0.5"
            role="img"
            aria-label={`Rating: ${review.rating} out of 5`}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                key={i}
                fill={i < fullStars ? 'currentColor' : 'none'}
                className={cn({
                  'text-warning-400': i < fullStars,
                  'text-secondary-200': i >= fullStars,
                })}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs lg:text-sm text-secondary-400">
        {review.comment}
      </p>
    </div>
  );
};
