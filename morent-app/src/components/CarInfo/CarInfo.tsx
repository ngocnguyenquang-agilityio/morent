'use client';

// Hooks
import { useFavoriteToggle } from '@/hooks/useFavoriteToggle';

// Utils
import { formatPrice } from '@/utils/formatPrice';
import { cn } from '@/lib/utils';

// Components
import { Button } from '@/components/ui/Button';
import { HeartIcon, StarIcon } from '@/components/icons';
import { CarImageGallery } from '@/components/CarImageGallery';
import { SpecRow } from '@/components/SpecRow';

// Types
import type { Car } from '@/types/car';

interface CarInfoProps {
  car: Car;
  onFavoriteToggle?: (favorite: boolean) => Promise<void>;
  onRentNow?: () => void;
  className?: string;
}

export const CarInfo = ({
  car,
  onFavoriteToggle,
  onRentNow,
  className,
}: CarInfoProps) => {
  const { optimisticFavorite, handleFavoriteToggle } = useFavoriteToggle(
    car.favorite,
    onFavoriteToggle,
  );

  const fullStars = Math.floor(car.rate);

  return (
    <div className={cn('flex flex-col lg:flex-row lg:gap-8 gap-6', className)}>
      <CarImageGallery
        title={car.title}
        subtitle={car.subtitle}
        thumbnails={car.thumbnails}
      />

      <div className="flex flex-col rounded-[10px] bg-white p-6 shadow-sm gap-8 max-w-[492px]">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-bold text-secondary-900">{car.name}</h2>
            <Button
              variant="icon"
              size="icon"
              aria-label={
                optimisticFavorite
                  ? 'Remove from favorites'
                  : 'Add to favorites'
              }
              onClick={handleFavoriteToggle}
              className="shrink-0 border-none"
            >
              <HeartIcon
                className={cn('size-6 fill-none stroke-secondary-300', {
                  'fill-[#ED3F3F] stroke-[#ED3F3F]': optimisticFavorite,
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
            <span className="text-sm text-secondary-400">
              {car.reviewer}+ Reviewer
            </span>
          </div>
        </div>

        <p className="text-lg text-secondary-400">{car.description}</p>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <SpecRow label="Type Car" value={car.type} />
          <SpecRow label="Capacity" value={`${car.capacity} Person`} />
          <SpecRow label="Steering" value={car.steering} />
          <SpecRow label="Gasoline" value={`${car.gasoline}L`} />
        </div>

        <div className="mt-auto pt-8 flex items-center justify-between">
          <div>
            <p className="text-[28px] font-bold text-secondary-500">
              ${formatPrice(car.price, car.discount)}/
              <span className="text-base font-bold text-secondary-300">
                days
              </span>
            </p>
            {car.discount > 0 && (
              <p className="text-base font-bold text-secondary-300 line-through">
                ${formatPrice(car.price)}
              </p>
            )}
          </div>
          <Button className="h-auto px-8 py-4 text-base" onClick={onRentNow}>
            Rent Now
          </Button>
        </div>
      </div>
    </div>
  );
};
