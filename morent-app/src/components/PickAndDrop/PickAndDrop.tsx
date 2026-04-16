'use client';

// Lib
import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

// Components
import { Button } from '@/components/ui/Button';
import { PickDropSection } from '@/components/PickDropSection';

// Utils
import { cn } from '@/lib/utils';
import {
  deserializePickDropFromParams,
  serializePickDropToParams,
} from '@/utils/pickAndDrop';

// Icons
import { ArrowDownUpIcon } from 'lucide-react';

// Types
import { Location, SectionValues } from '@/types/pickAndDrop';

// Constants
import { DEFAULT_LOCATIONS } from '@/constants/pickAndDrop';

interface PickAndDropProps {
  locations?: Location[];
  onChange?: (values: {
    pickUp: SectionValues;
    dropOff: SectionValues;
  }) => void;
  className?: string;
}

export const PickAndDrop = ({
  locations = DEFAULT_LOCATIONS,
  onChange,
  className,
}: PickAndDropProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [values, setValues] = useState<{
    pickUp: SectionValues;
    dropOff: SectionValues;
  }>(() => deserializePickDropFromParams(searchParams));

  const syncToUrl = (next: {
    pickUp: SectionValues;
    dropOff: SectionValues;
  }) => {
    const params = serializePickDropToParams(
      next.pickUp,
      next.dropOff,
      new URLSearchParams(searchParams.toString()),
    );
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePickUpChange = (pickUp: SectionValues) => {
    const next = { ...values, pickUp };
    setValues(next);
    onChange?.(next);
    syncToUrl(next);
  };

  const handleDropOffChange = (dropOff: SectionValues) => {
    const next = { ...values, dropOff };
    setValues(next);
    onChange?.(next);
    syncToUrl(next);
  };

  const handleSwap = () => {
    const next = { pickUp: values.dropOff, dropOff: values.pickUp };
    setValues(next);
    onChange?.(next);
    syncToUrl(next);
  };

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center gap-8 md:flex-row lg:gap-11',
        className,
      )}
    >
      {/* Pick-Up and Drop-Off rows */}
      <PickDropSection
        label="Pick - Up"
        values={values.pickUp}
        locations={locations}
        onChange={handlePickUpChange}
      />

      <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center min-[1440px]:static min-[1440px]:translate-x-0 min-[1440px]:translate-y-0">
        <Button
          onClick={handleSwap}
          className="size-[60px] rounded-[10px] bg-primary-500 text-white shadow-md hover:bg-primary-600"
          aria-label="Swap pick-up and drop-off"
        >
          <ArrowDownUpIcon className="size-6" />
        </Button>
      </div>

      <PickDropSection
        label="Drop - Off"
        values={values.dropOff}
        locations={locations}
        onChange={handleDropOffChange}
      />
    </div>
  );
};
