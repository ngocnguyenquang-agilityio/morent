'use client';

// Lib
import { Controller, useFormContext, useWatch } from 'react-hook-form';

// Components
import { Button, Checkbox } from '@/components/ui';
import { PaymentSection } from '@/components/PaymentSection';
import { ShieldCheckIcon } from '@/components/icons';

export interface ConfirmationFields {
  agreeMarketing: boolean;
  agreeTerms: boolean;
}

interface ConfirmationProps {
  className?: string;
}

export const Confirmation = ({ className }: ConfirmationProps) => {
  const { control } = useFormContext<ConfirmationFields>();
  const agreeTerms = useWatch({ control, name: 'agreeTerms' });

  return (
    <PaymentSection
      title="Confirmation"
      subTitle="We are getting to the end. Just few clicks and your rental is ready!"
      step={4}
      totalSteps={4}
      className={className}
    >
      <div className="flex flex-col gap-5 lg:gap-6">
        <Controller
          control={control}
          name="agreeMarketing"
          render={({ field }) => (
            <label className="flex cursor-pointer items-center gap-4 rounded-[10px] bg-[#F6F7F9] p-4 lg:px-6 lg:py-5">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                id="agree-marketing"
                className="size-5 shrink-0 rounded border-secondary-200"
              />
              <span className="text-xs font-medium text-secondary lg:text-base lg:font-semibold">
                I agree with sending an Marketing and newsletter emails. No
                spam, promissed!
              </span>
            </label>
          )}
        />

        <Controller
          control={control}
          name="agreeTerms"
          render={({ field }) => (
            <label className="flex cursor-pointer items-center gap-4 rounded-[10px] bg-[#F6F7F9] p-4 lg:px-6 lg:py-5">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                id="agree-terms"
                className="size-5 shrink-0 rounded border-secondary-200"
              />
              <span className="text-xs font-medium text-secondary lg:text-base lg:font-semibold">
                I agree with our terms and conditions and privacy policy.
              </span>
            </label>
          )}
        />
      </div>

      <div className="space-y-8 mt-6 lg:mt-8">
        <Button
          type="submit"
          disabled={!agreeTerms}
          className="w-fit rounded-[10px] px-8 py-6 text-base font-semibold"
        >
          Rent Now
        </Button>

        <div className="flex flex-col gap-3 lg:gap-4">
          <ShieldCheckIcon className="size-8 text-secondary" />
          <div className="space-y-1 lg:space-y-2">
            <p className="text-base font-bold text-secondary">
              All your data are safe
            </p>
            <p className="text-xs text-secondary-300 lg:text-sm">
              We are using the most advanced security to provide you the best
              experience ever.
            </p>
          </div>
        </div>
      </div>
    </PaymentSection>
  );
};
