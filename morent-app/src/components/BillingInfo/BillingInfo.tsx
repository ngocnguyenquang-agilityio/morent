'use client';

// Lib
import { ChangeEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

// Constants
import { MAX_PHONE_NUMBER_DIGITS, PAYMENT_PATTERNS } from '@/constants/payment';

// Components
import { InputField } from '@/components/InputField';
import { PaymentSection } from '@/components/PaymentSection';

const formatPhoneNumber = (digits: string): string => {
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
};

export interface BillingInfoFields {
  name: string;
  address: string;
  phoneNumber: string;
  city: string;
}

interface BillingInfoProps {
  className?: string;
}

export const BillingInfo = ({ className }: BillingInfoProps) => {
  const { control } = useFormContext<BillingInfoFields>();

  return (
    <PaymentSection
      title="Billing Info"
      subTitle="Please enter your billing info"
      step={1}
      totalSteps={4}
      className={className}
    >
      <div className="w-full flex flex-col gap-5 lg:flex-row lg:gap-8">
        <div className="w-full space-y-5 lg:space-y-6">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <InputField
                id="billing-name"
                label="Name"
                placeholder="Your name"
                wrapperClassName="order-1"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="address"
            render={({ field, fieldState }) => (
              <InputField
                id="billing-address"
                label="Address"
                placeholder="Address"
                wrapperClassName="order-2 md:order-3"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="w-full space-y-5 lg:space-y-6">
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field, fieldState }) => {
              const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
                const numericOnly = e.target.value
                  .replace(PAYMENT_PATTERNS.NON_DIGIT, '')
                  .slice(0, MAX_PHONE_NUMBER_DIGITS);
                field.onChange(numericOnly);
              };

              return (
                <InputField
                  id="billing-phone"
                  label="Phone Number"
                  type="tel"
                  placeholder="Phone number"
                  wrapperClassName="order-3 md:order-2"
                  error={fieldState.error?.message}
                  {...field}
                  value={formatPhoneNumber(field.value ?? '')}
                  onChange={handlePhoneChange}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="city"
            render={({ field, fieldState }) => (
              <InputField
                id="billing-city"
                label="Town / City"
                placeholder="Town or city"
                wrapperClassName="order-4"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>
      </div>
    </PaymentSection>
  );
};
