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
  step = 1,
  totalSteps = 4,
  children,
  className,
}: PaymentSectionProps) => {
  return (
    <div className={cn('rounded-[10px] bg-white p-6 shadow-sm', className)}>
      <div className="mb-6 lg:mb-8 flex items-start justify-between">
        <div>
          <h2 className="text-base lg:text-lg font-bold text-secondary">
            {title}
          </h2>
          <p className="mt-1 text-xs lg:text-sm text-secondary-300">
            {subTitle}
          </p>
        </div>
        <span className="text-sm font-medium text-secondary-300">
          Step {step} of {totalSteps}
        </span>
      </div>
      {children}
    </div>
  );
};
