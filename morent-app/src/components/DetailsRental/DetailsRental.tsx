'use client';

// Lib
import Image from 'next/image';
import { ClipboardList } from 'lucide-react';

// Components
import { PickDropSection } from '@/components/PickDropSection';
import { SelectField } from '@/components/SelectField';
import { LocationPicker } from '@/components/LocationPicker';
import { DatePicker } from '@/components/DatePicker';
import { TimePicker } from '@/components/TimePicker';
import { DetailsRentalSkeleton } from '@/components/skeletons';

// Utils
import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/price';

// Types
import type { Car } from '@/types/car';
import type { SectionValues } from '@/types/pickAndDrop';

// Constants
import { DEFAULT_LOCATIONS } from '@/constants/pickAndDrop';

export interface DetailsRentalProps extends Partial<
  Pick<Car, 'name' | 'type' | 'image'>
> {
  rentalId?: string;
  pickUp?: SectionValues;
  dropOff?: SectionValues;
  totalPrice?: number;
  className?: string;
  isLoading?: boolean;
}

export const DetailsRental = ({
  image,
  name,
  type,
  rentalId,
  pickUp,
  dropOff,
  totalPrice,
  className,
  isLoading,
}: DetailsRentalProps) => {
  const isEmpty =
    !image || !name || !pickUp || !dropOff || totalPrice === undefined;

  const renderContent = () => {
    if (isLoading) return <DetailsRentalSkeleton />;
    if (isEmpty)
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
          <ClipboardList className="size-12 text-secondary-200" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-secondary-500">
              No rental selected
            </p>
            <p className="text-sm text-secondary-300">
              Select a rental from the list to view its details.
            </p>
          </div>
        </div>
      );

    return (
      <>
        <div className="flex-1 space-y-8">
          {/* Map */}
          <div className="w-full h-[272px] rounded-[10px] overflow-hidden">
            <Image
              src="/map.svg"
              alt="Rental location map"
              width={534}
              height={272}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Car info row */}
          <div className="flex items-center gap-4">
            {/* Car card */}
            <div className="relative h-[72px] w-[132px] shrink-0 overflow-hidden rounded-[8px] bg-primary-500">
              <Image
                src="/images/chevrons-bg.png"
                alt=""
                width={132}
                height={72}
                className="absolute inset-0 object-cover pointer-events-none"
              />
              <Image
                src={image}
                alt={name}
                width={132}
                height={72}
                className="absolute inset-0 z-10 object-contain p-2"
              />
            </div>

            {/* Car name and type */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg lg:text-[28px] font-bold text-secondary leading-tight truncate">
                {name}
              </h3>
              <p className="text-sm text-secondary-400 mt-0.5">{type}</p>
            </div>

            {/* Rental ID */}
            <span className="text-sm font-semibold text-secondary-300 shrink-0">
              &#35;{rentalId}
            </span>
          </div>

          {/* Mobile pick-up */}
          <div className="md:hidden space-y-5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary-500" />
              <span className="text-base font-semibold text-secondary">
                Pick - Up
              </span>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <SelectField label="Locations">
                <LocationPicker
                  value={pickUp.location}
                  locations={DEFAULT_LOCATIONS}
                  readOnly
                />
              </SelectField>
              <SelectField label="Time">
                <TimePicker value={pickUp.time} readOnly />
              </SelectField>
              <SelectField label="Date">
                <DatePicker value={pickUp.date} readOnly />
              </SelectField>
            </div>
          </div>

          {/* Desktop pick-up */}
          <PickDropSection
            label="Pick - Up"
            values={pickUp}
            locations={DEFAULT_LOCATIONS}
            readOnly
            className="hidden md:block md:p-0"
          />

          {/* Mobile drop-off */}
          <div className="md:hidden space-y-5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary-500" />
              <span className="text-base font-semibold text-secondary">
                Drop - Off
              </span>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <SelectField label="Locations">
                <LocationPicker
                  value={dropOff.location}
                  locations={DEFAULT_LOCATIONS}
                  readOnly
                />
              </SelectField>
              <SelectField label="Time">
                <TimePicker value={dropOff.time} readOnly />
              </SelectField>
              <SelectField label="Date">
                <DatePicker value={dropOff.date} readOnly />
              </SelectField>
            </div>
          </div>

          {/* Desktop drop-off */}
          <PickDropSection
            label="Drop - Off"
            values={dropOff}
            locations={DEFAULT_LOCATIONS}
            readOnly
            className="hidden md:block md:p-0"
          />
        </div>

        {/* Divider */}
        <hr className="border-secondary-100 mt-auto mb-9" />

        {/* Total Rental Price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base lg:text-lg font-bold text-secondary">
              Total Rental Price
            </p>
            <p className="mt-1 text-xs lg:text-sm text-secondary-300">
              Overall price and includes rental discount
            </p>
          </div>
          <p className="text-lg lg:text-xl font-bold text-secondary">
            ${formatPrice(totalPrice)}
          </p>
        </div>
      </>
    );
  };

  return (
    <div
      className={cn(
        'flex flex-col rounded-lg bg-white p-4 lg:p-6 shadow-sm',
        className,
      )}
    >
      <h2 className="text-base lg:text-lg font-bold text-secondary mb-6">
        Details Rental
      </h2>
      {renderContent()}
    </div>
  );
};
