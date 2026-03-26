'use client';

// Lib
import { useState, useCallback } from 'react';

// Components
import { Button } from '@/components/ui/Button';
import { PickDropSection } from '@/components/PickDropSection';

// Utils
import { cn } from '@/lib/utils';

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

const INITIAL_VALUES: SectionValues = {
  location: undefined,
  date: undefined,
  time: undefined,
};

export const PickAndDrop = ({
  locations = DEFAULT_LOCATIONS,
  onChange,
  className,
}: PickAndDropProps) => {
  const [values, setValues] = useState<{
    pickUp: SectionValues;
    dropOff: SectionValues;
  }>({ pickUp: INITIAL_VALUES, dropOff: INITIAL_VALUES });

  const handlePickUpChange = useCallback(
    (pickUp: SectionValues) => {
      setValues((prev) => {
        const next = { ...prev, pickUp };
        onChange?.(next);
        return next;
      });
    },
    [onChange],
  );

  const handleDropOffChange = useCallback(
    (dropOff: SectionValues) => {
      setValues((prev) => {
        const next = { ...prev, dropOff };
        onChange?.(next);
        return next;
      });
    },
    [onChange],
  );

  const handleSwap = useCallback(() => {
    setValues((prev) => {
      const next = { pickUp: prev.dropOff, dropOff: prev.pickUp };
      onChange?.(next);
      return next;
    });
  }, [onChange]);

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
