// Lib
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SelectFieldProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export const SelectField = ({
  label,
  children,
  className,
}: SelectFieldProps) => (
  <div className={cn('flex flex-col gap-3 lg:gap-4', className)}>
    <span className="text-sm lg:text-base font-semibold text-secondary">
      {label}
    </span>
    <div className="flex items-center rounded-xl bg-[#F6F7F9] px-5 py-4">
      {children}
    </div>
  </div>
);
