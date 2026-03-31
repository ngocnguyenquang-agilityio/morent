'use client';

// Lib
import Image from 'next/image';

// Hooks
import { useFavoriteToggle } from '@/hooks/useFavoriteToggle';

// Utils
import { formatPrice } from '@/utils/price';

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
}

export const CarCard = ({ car, onFavoriteToggle }: CarCardProps) => {
  const { optimisticFavorite, handleFavoriteToggle } = useFavoriteToggle(
    car.favorite,
    onFavoriteToggle,
  );

  return (
    <div className="w-full max-w-[327px] min-h-[240px] flex flex-col justify-between rounded-xl bg-white p-4 shadow-sm md:max-w-[317px] md:min-h-[388px] md:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-secondary-900">{car.name}</h3>
          <p className="text-sm text-secondary-300">{car.type}</p>
        </div>
        <Button
          variant="icon"
          size="icon"
          aria-label={
            optimisticFavorite ? 'Remove from favorites' : 'Add to favorites'
          }
          onClick={handleFavoriteToggle}
          className="border-none"
        >
          <HeartIcon
            className={cn('size-6 fill-none stroke-secondary-300', {
              'fill-[#ED3F3F] stroke-[#ED3F3F]': optimisticFavorite,
            })}
          />
        </Button>
      </div>

      <div className="my-2 flex flex-1 flex-row items-center md:my-8 md:flex-col md:gap-8">
        <div className="relative flex-1 pr-4 md:w-full md:pr-0">
          <Image
            src={car.image}
            alt={car.name}
            width={300}
            height={120}
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-2 text-sm text-secondary-300 md:w-full md:flex-row md:items-center md:justify-between md:gap-0">
          <div className="flex items-center gap-1.5">
            <GasStationIcon className="size-4" />
            <span>{car.gasoline}L</span>
          </div>
          <div className="flex items-center gap-1.5">
            <SteeringIcon className="size-4" />
            <span>{car.steering}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <PeopleIcon className="size-4" />
            <span>{car.capacity} People</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between md:mt-6">
        <div>
          <p className="text-lg font-bold text-secondary-900">
            ${formatPrice(car.price, car.discount)}
            <span className="text-sm font-normal text-secondary-300">
              &#47;day
            </span>
          </p>
          {car.discount > 0 && (
            <p className="text-sm text-secondary-300 line-through">
              ${formatPrice(car.price)}
            </p>
          )}
        </div>
        <Button className="px-5 py-6 text-base">Rental Now</Button>
      </div>
    </div>
  );
};
