'use client';

// Lib
import Image from 'next/image';
import { useState } from 'react';

// Utils
import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/price';

// Components
import { StarIcon } from '@/components/icons';
import {
  InputGroup,
  InputGroupInput,
  InputGroupButton,
} from '@/components/ui/InputGroup';
import { PaymentSection } from '@/components/PaymentSection';

export interface RentalSummaryProps {
  carImage: string;
  carName: string;
  carRating: number;
  carReviewerCount: number;
  subtotal: number;
  tax: number;
  onApplyPromo?: (code: string) => void;
  className?: string;
}

export const RentalSummary = ({
  carImage,
  carName,
  carRating,
  carReviewerCount,
  subtotal,
  tax,
  onApplyPromo,
  className,
}: RentalSummaryProps) => {
  const [promoCode, setPromoCode] = useState('');
  const totalPrice = subtotal + tax;
  const fullStars = Math.floor(carRating);

  const handlePromoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  const handleApplyPromo = () => {
    onApplyPromo?.(promoCode);
  };

  return (
    <PaymentSection
      title="Rental Summary"
      subTitle=" Prices may change depending on the length of the rental and the price of your rental car."
      className={className}
    >
      <div className="space-y-6 lg:space-y-8">
        {/* Car info */}
        <div className="flex items-center gap-4">
          <div className="relative h-[80px] w-[132px] shrink-0 overflow-hidden rounded-[10px] bg-primary-500">
            <Image
              src="/images/chevrons-bg.png"
              alt=""
              fill
              className="object-cover pointer-events-none"
            />
            <Image
              src={carImage}
              alt={carName}
              fill
              className="relative z-10 object-contain p-2"
            />
          </div>
          <div>
            <h3 className="text-xl lg:text-[28px] font-bold text-secondary">
              {carName}
            </h3>
            <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <div
                className="flex items-center gap-0.5"
                role="img"
                aria-label={`Rating: ${carRating} out of 5`}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon
                    key={i}
                    fill={i < fullStars ? 'currentColor' : 'none'}
                    className={cn({
                      'text-warning-400': i < fullStars,
                      'text-secondary-200': i >= fullStars,
                    })}
                  />
                ))}
              </div>
              <span className="text-sm text-secondary-400">
                {carReviewerCount}+ Reviewer
              </span>
            </div>
          </div>
        </div>

        <hr className="border-secondary-100" />

        {/* Pricing breakdown */}
        <div className="space-y-3 lg:space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs lg:text-base font-semibold lg:font-medium text-secondary-300">
              Subtotal
            </span>
            <span className="text-base font-semibold text-secondary">
              ${formatPrice(subtotal)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs lg:text-base font-semibold lg:font-medium text-secondary-300">
              Tax
            </span>
            <span className="text-base font-semibold text-secondary">
              ${formatPrice(tax, undefined, tax !== 0)}
            </span>
          </div>
        </div>

        {/* Promo code */}

        <InputGroup className="h-14 rounded-[10px] border-0 bg-[#F6F7F9] px-2">
          <InputGroupInput
            placeholder="Apply promo code"
            value={promoCode}
            onChange={handlePromoChange}
            aria-label="Promo code"
            className="text-sm text-secondary-300 placeholder:text-secondary-300"
          />
          <InputGroupButton
            size="xs"
            variant="ghost"
            onClick={handleApplyPromo}
            className="h-auto shrink-0 px-3 text-sm font-semibold text-secondary"
          >
            Apply now
          </InputGroupButton>
        </InputGroup>

        {/* Total */}
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
      </div>
    </PaymentSection>
  );
};
