'use client';

// Lib
import { useSearchParams } from 'next/navigation';

// Hooks
import { useFavoriteToggle } from '@/hooks/useFavoriteToggle';

// Utils
import { formatPrice } from '@/utils/price';
import { cn } from '@/lib/utils';
import { extractPickDropParams } from '@/utils/pickAndDrop';

// Constants
import { ROUTE } from '@/constants/route';

// Components
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { HeartIcon, StarIcon } from '@/components/icons';
import { CarImageGallery } from '@/components/CarImageGallery';
import { SpecRow } from '@/components/SpecRow';

// Types
import type { Car } from '@/types/car';

interface CarInfoProps {
  car: Car;
  onFavoriteToggle?: (favorite: boolean) => Promise<void>;
  className?: string;
}

export const CarInfo = ({ car, onFavoriteToggle, className }: CarInfoProps) => {
  const { isFavorite, handleFavoriteToggle } = useFavoriteToggle(
    car.documentId,
    car.favorite,
    onFavoriteToggle,
  );
  const searchParams = useSearchParams();
  const pickDropParams = extractPickDropParams(searchParams);
  const pickDropQuery = pickDropParams.toString();
  const paymentUrl = pickDropQuery
    ? `${ROUTE.PAYMENT(car.documentId)}?${pickDropQuery}`
    : ROUTE.PAYMENT(car.documentId);

  const fullStars = Math.floor(car.rate);

  return (
    <div
      className={cn(
        'flex flex-col lg:flex-row lg:gap-8 lg:justify-between gap-6',
        className,
      )}
    >
      <CarImageGallery
        title={car.title}
        subtitle={car.subtitle}
        mainImage={car.image}
        thumbnails={car.thumbnails}
      />

      <div className="flex flex-col rounded-[10px] bg-white p-4 lg:p-6 shadow-sm gap-4 lg:gap-8 w-full">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-lg font-bold text-secondary lg:text-xl">
              {car.name}
            </h2>
            <Button
              variant="icon"
              size="icon"
              aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
              onClick={handleFavoriteToggle}
              className="shrink-0 border-none"
            >
              <HeartIcon
                className={cn('size-6 fill-none stroke-secondary-300', {
                  'fill-[#ED3F3F] stroke-[#ED3F3F]': isFavorite,
                })}
              />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-0.5"
              role="img"
              aria-label={`Rating: ${car.rate} out of 5`}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon
                  key={i}
                  fill={i < fullStars ? 'currentColor' : 'none'}
                  className={
                    i < fullStars ? 'text-warning-400' : 'text-secondary-200'
                  }
                />
              ))}
            </div>
            <span className="font-medium text-xs text-secondary-300 lg:text-sm lg:text-secondary-400">
              {car.reviewer}+ Reviewer
            </span>
          </div>
        </div>

        <p className="text-xs lg:text-lg text-secondary-300 lg:text-secondary-400">
          {car.description}
        </p>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <SpecRow label="Type Car" value={car.type} />
          <SpecRow label="Capacity" value={`${car.capacity} Person`} />
          <SpecRow label="Steering" value={car.steering} />
          <SpecRow label="Gasoline" value={`${car.gasoline}L`} />
        </div>

        <div className="mt-auto pt-4 lg:pt-8 flex items-center justify-between">
          <div>
            <p className="text-lg lg:text-[28px] font-bold text-secondary-500">
              ${formatPrice(car.price, car.discount)}/
              <span className="text-xs lg:text-base font-bold text-secondary-300">
                days
              </span>
            </p>
            {car.discount > 0 && (
              <p className="text-base font-bold text-secondary-300 line-through">
                ${formatPrice(car.price)}
              </p>
            )}
          </div>
          <Button asChild className="h-auto px-8 py-4 text-base">
            <Link href={paymentUrl}>Rent Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
