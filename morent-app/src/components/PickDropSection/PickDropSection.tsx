'use client';

// Components
import { LocationPicker } from '@/components/LocationPicker';
import { DatePicker } from '@/components/DatePicker';
import { TimePicker } from '@/components/TimePicker';

// Utils
import { cn } from '@/lib/utils';

// Types
import type { Location, SectionValues } from '@/types/pickAndDrop';

interface PickDropSectionProps {
  label: string;
  values: SectionValues;
  locations: Location[];
  onChange?: (values: SectionValues) => void;
  readOnly?: boolean;
  className?: string;
  minDate?: Date;
}

export const PickDropSection = ({
  label,
  values,
  locations,
  onChange,
  readOnly = false,
  className,
  minDate,
}: PickDropSectionProps) => {
  const handleLocationChange = (location: string) => {
    onChange?.({ ...values, location });
  };

  const handleDateChange = (date: Date | undefined) => {
    if (!readOnly) onChange?.({ ...values, date });
  };

  const handleTimeChange = (time: string) => {
    if (!readOnly) onChange?.({ ...values, time });
  };

  return (
    <div
      className={cn(
        'flex-1 rounded-xl bg-white p-4 md:px-8 md:py-6',
        {
          'pointer-events-none': readOnly,
        },
        className,
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="size-2 rounded-full bg-primary-500" />
        <span className="text-base font-semibold text-secondary">{label}</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-base font-bold text-secondary">Locations</span>
          <LocationPicker
            value={values.location}
            locations={locations}
            onChange={handleLocationChange}
          />
        </div>

        <div className="flex flex-col gap-1 border-l border-secondary-100 pl-3">
          <span className="text-base font-bold text-secondary">Date</span>
          <DatePicker
            value={values.date}
            onChange={handleDateChange}
            minDate={minDate}
          />
        </div>

        <div className="flex flex-col gap-1 border-l border-secondary-100 pl-3">
          <span className="text-base font-bold text-secondary">Time</span>
          <TimePicker value={values.time} onChange={handleTimeChange} />
        </div>
      </div>
    </div>
  );
};
