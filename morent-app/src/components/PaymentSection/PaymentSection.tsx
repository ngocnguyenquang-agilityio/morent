// Lib
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PaymentSectionProps {
  className?: string;
  title: string;
  subTitle: string;
  step?: number;
  totalSteps?: number;
  children: ReactNode;
}

export const PaymentSection = ({
  title,
  subTitle,
  step,
  totalSteps,
  children,
  className,
}: PaymentSectionProps) => {
  return (
    <div
      className={cn(
        'max-w-[852px] rounded-md bg-white p-4 lg:p-6 shadow-sm',
        className,
      )}
    >
      <div className="mb-6 lg:mb-8 flex items-start justify-between gap-8">
        <div>
          <h2 className="text-base lg:text-lg font-bold text-secondary">
            {title}
          </h2>
          <p className="mt-1 text-xs lg:text-sm text-secondary-300">
            {subTitle}
          </p>
        </div>
        {step && totalSteps && (
          <span className="w-1/3 text-xs lg:text-sm font-medium text-secondary-300 text-end">
            Step {step} of {totalSteps}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};
