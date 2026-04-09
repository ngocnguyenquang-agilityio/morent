'use client';

// Lib
import { Controller, useFormContext } from 'react-hook-form';

// Components
import { PaymentSection } from '@/components/PaymentSection';
import { LocationPicker } from '@/components/LocationPicker';
import { DatePicker } from '@/components/DatePicker';
import { TimePicker } from '@/components/TimePicker';
import { SectionHeader } from '@/components/SectionHeader';
import { SelectField } from '@/components/SelectField';

// Types
import type { Location, SectionValues } from '@/types/pickAndDrop';

// Constants
import { DEFAULT_LOCATIONS } from '@/constants/pickAndDrop';

export interface RentalInfoFields {
  pickUp: SectionValues;
  dropOff: SectionValues;
}

interface RentalInfoProps {
  className?: string;
  locations?: Location[];
}

export const RentalInfo = ({
  className,
  locations = DEFAULT_LOCATIONS,
}: RentalInfoProps) => {
  const { control } = useFormContext<RentalInfoFields>();

  return (
    <PaymentSection
      title="Rental Info"
      subTitle="Please select your rental date"
      step={2}
      totalSteps={4}
      className={className}
    >
      <div className="flex flex-col gap-6">
        <div className="space-y-5">
          <SectionHeader label="Pick - Up" />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
            <Controller
              control={control}
              name="pickUp.location"
              render={({ field, fieldState }) => (
                <SelectField
                  label="Locations"
                  className="order-1"
                  error={fieldState.error?.message}
                >
                  <LocationPicker
                    value={field.value}
                    locations={locations}
                    onChange={field.onChange}
                  />
                </SelectField>
              )}
            />

            <Controller
              control={control}
              name="pickUp.time"
              render={({ field, fieldState }) => (
                <SelectField
                  label="Time"
                  className="order-2 md:order-3"
                  error={fieldState.error?.message}
                >
                  <TimePicker value={field.value} onChange={field.onChange} />
                </SelectField>
              )}
            />

            <Controller
              control={control}
              name="pickUp.date"
              render={({ field, fieldState }) => (
                <SelectField
                  label="Date"
                  className="order-3 md:order-2"
                  error={fieldState.error?.message}
                >
                  <DatePicker value={field.value} onChange={field.onChange} />
                </SelectField>
              )}
            />
          </div>
        </div>

        <div className="space-y-5">
          <SectionHeader label="Drop – Off" />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Controller
              control={control}
              name="dropOff.location"
              render={({ field, fieldState }) => (
                <SelectField
                  label="Locations"
                  className="order-1"
                  error={fieldState.error?.message}
                >
                  <LocationPicker
                    value={field.value}
                    locations={locations}
                    onChange={field.onChange}
                  />
                </SelectField>
              )}
            />

            <Controller
              control={control}
              name="dropOff.time"
              render={({ field, fieldState }) => (
                <SelectField
                  label="Time"
                  className="order-2 md:order-3"
                  error={fieldState.error?.message}
                >
                  <TimePicker value={field.value} onChange={field.onChange} />
                </SelectField>
              )}
            />

            <Controller
              control={control}
              name="dropOff.date"
              render={({ field, fieldState }) => (
                <SelectField
                  label="Date"
                  className="order-3 md:order-2"
                  error={fieldState.error?.message}
                >
                  <DatePicker value={field.value} onChange={field.onChange} />
                </SelectField>
              )}
            />
          </div>
        </div>
      </div>
    </PaymentSection>
  );
};
