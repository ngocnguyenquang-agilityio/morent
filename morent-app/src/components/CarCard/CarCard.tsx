'use client';

// Lib
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

// Hooks
import { useFavoriteToggle } from '@/hooks/useFavoriteToggle';

// Utils
import { formatPrice } from '@/utils/price';
import { extractPickDropParams } from '@/utils/pickAndDrop';

// Constants
import { ROUTE } from '@/constants/route';

// Components
import { Button } from '@/components/ui/Button';
import {
  GasStationIcon,
  HeartIcon,
  SteeringIcon,
  PeopleIcon,
} from '@/components/icons';

// Types
import type { Car } from '@/types/car';

import { cn } from '@/lib/utils';

interface CarCardProps {
  car: Car;
  onFavoriteToggle?: (favorite: boolean) => Promise<void>;
  // layout?: CarCardLayout;
  isCompactMode?: boolean;
}

export const CarCard = ({
  car,
  onFavoriteToggle,
  isCompactMode = false,
}: CarCardProps) => {
  const { isFavorite, handleFavoriteToggle } = useFavoriteToggle(
    car.documentId,
    car.favorite,
    onFavoriteToggle,
  );
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pickDropParams = extractPickDropParams(searchParams);
  const pickDropQuery = pickDropParams.toString();
  const detailsUrl = pickDropQuery
    ? `${ROUTE.CAR_DETAILS(car.documentId)}?${pickDropQuery}`
    : ROUTE.CAR_DETAILS(car.documentId);
  const paymentUrl = pickDropQuery
    ? `${ROUTE.PAYMENT(car.documentId)}?${pickDropQuery}`
    : ROUTE.PAYMENT(car.documentId);

  return (
    <div
      className={cn(
        'relative mx-auto p-4 lg:p-6 flex w-full flex-col justify-between rounded-xl bg-white shadow-sm gap-8',
        // isCompact ? 'min-h-[240px]' : 'min-h-[388px]',
      )}
    >
      <Link
        href={detailsUrl}
        aria-label={`View ${car.name} details`}
        className="absolute inset-0 z-0 rounded-xl"
      />
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base lg:text-lg font-bold text-secondary">
            {car.name}
          </h3>
          <p className="text-xs lg:text-sm text-secondary-300">{car.type}</p>
        </div>
        <Button
          variant="icon"
          size="icon"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={handleFavoriteToggle}
          className="relative z-10 border-none"
        >
          <HeartIcon
            className={cn('size-6 fill-none stroke-secondary-300', {
              'fill-[#ED3F3F] stroke-[#ED3F3F]': isFavorite,
            })}
          />
        </Button>
      </div>

      <div
        className={cn(
          'flex items-center gap-8 justify-between',
          isCompactMode ? 'my-2 flex-row sm:my-0 sm:flex-col' : 'flex-col',
        )}
      >
        <div
          className={
            isCompactMode
              ? 'flex-1 pr-4 sm:flex-none sm:pr-0 sm:w-full'
              : 'w-full'
          }
        >
          <Image
            src={car.image}
            alt={car.name}
            width={300}
            height={120}
            className={cn(
              'w-full object-contain',
              isCompactMode ? 'h-[100px] sm:h-[120px]' : 'h-[120px]',
            )}
          />
        </div>

        <div
          className={cn(
            'flex text-sm text-secondary-300',
            isCompactMode
              ? 'flex-col gap-4 sm:w-full sm:flex-row sm:items-center sm:justify-between sm:gap-0'
              : 'w-full flex-row items-center justify-between',
          )}
        >
          <div className="flex items-center gap-1.5">
            <GasStationIcon className="size-4" />
            <span className="text-xs lg:text-sm text-secondary-300">
              {car.gasoline}L
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <SteeringIcon className="size-4" />
            <span className="text-xs lg:text-sm text-secondary-300">
              {car.steering}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <PeopleIcon className="size-4" />
            <span className="text-xs lg:text-sm text-secondary-300">
              {car.capacity} People
            </span>
          </div>
        </div>
      </div>

      <div className={cn('flex items-center justify-between gap-2')}>
        <div className="flex flex-col">
          <p className="text-base lg:text-lg font-bold text-secondary">
            ${formatPrice(car.price, car.discount)}
            <span className="text-xs lg:text-sm font-bold text-secondary-300">
              &#47;day
            </span>
          </p>
          {car.discount > 0 && (
            <p className="text-xs lg:text-sm font-bold text-secondary-300 line-through">
              ${formatPrice(car.price)}
            </p>
          )}
        </div>
        <Button
          asChild
          className={cn(
            'relative z-10 shrink-0 text-xs lg:text-base px-4 py-2.5 lg:px-5 rounded-sm',
            isCompactMode ? 'h-[44px] sm:h-[48px]' : 'h-[48px]',
          )}
        >
          <Link
            href={paymentUrl}
            onClick={(e) => {
              if (isLoaded && !isSignedIn) {
                e.preventDefault();
                router.push(
                  ROUTE.SIGN_IN_REDIRECT(encodeURIComponent(paymentUrl)),
                );
              }
            }}
          >
            Rental Now
          </Link>
        </Button>
      </div>
    </div>
  );
};
