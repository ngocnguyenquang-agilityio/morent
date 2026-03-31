'use client';

// Lib
import { Controller, useFormContext } from 'react-hook-form';

// Components
import { InputField } from '@/components/InputField';
import { PaymentSection } from '@/components/PaymentSection';
import { SectionHeader } from '@/components/SectionHeader';
import { BitcoinIcon, PaypalIcon, VisaIcon } from '@/components/icons';
import { Input } from '@/components/ui';

export interface PaymentMethodFields {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvc: string;
}

interface PaymentMethodProps {
  className?: string;
}

export const PaymentMethod = ({ className }: PaymentMethodProps) => {
  const { control } = useFormContext<PaymentMethodFields>();

  return (
    <PaymentSection
      title="Payment Method"
      subTitle="Please enter your payment method"
      step={3}
      totalSteps={4}
      className={className}
    >
      <div className="flex flex-col gap-6">
        {/* Credit Card */}
        <div className="space-y-8 rounded-[10px] bg-[#F6F7F9] p-4 lg:p-6">
          <SectionHeader label="Credit Card" icon={<VisaIcon />} />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
            <Controller
              control={control}
              name="cardNumber"
              render={({ field, fieldState }) => (
                <InputField
                  id="payment-card-number"
                  label="Card Number"
                  placeholder="Card number"
                  className="bg-white"
                  wrapperClassName="order-1"
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="expirationDate"
              render={({ field, fieldState }) => (
                <InputField
                  id="payment-expiration-date"
                  label="Expiration Date"
                  placeholder="DD / MM / YY"
                  className="bg-white"
                  wrapperClassName="order-3 md:order-2"
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="cardHolder"
              render={({ field, fieldState }) => (
                <InputField
                  id="payment-card-holder"
                  label="Card Holder"
                  placeholder="Card holder"
                  className="bg-white"
                  wrapperClassName="order-2 md:order-3"
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="cvc"
              render={({ field, fieldState }) => (
                <InputField
                  id="payment-cvc"
                  label="CVC"
                  placeholder="CVC"
                  className="bg-white"
                  wrapperClassName="order-4"
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </div>
        </div>

        {/* PayPal */}
        <div className="flex items-center justify-between rounded-[10px] bg-[#F6F7F9] px-6 py-4">
          <label className="flex cursor-pointer items-center gap-2">
            <Input
              type="radio"
              value="paypal"
              className="size-4 accent-primary"
              aria-label="PayPal"
              disabled
            />
            <span className="text-base font-semibold text-secondary">
              PayPal
            </span>
          </label>
          <PaypalIcon />
        </div>

        {/* Bitcoin */}
        <div className="flex items-center justify-between rounded-[10px] bg-[#F6F7F9] px-6 py-4">
          <label className="flex cursor-pointer items-center gap-2">
            <Input
              type="radio"
              value="bitcoin"
              className="size-4 accent-primary"
              aria-label="Bitcoin"
              disabled
            />
            <span className="text-base font-semibold text-secondary">
              Bitcoin
            </span>
          </label>
          <BitcoinIcon />
        </div>
      </div>
    </PaymentSection>
  );
};
