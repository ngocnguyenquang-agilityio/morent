// Lib
import type { ReactNode } from 'react';

export interface FilterSectionProps {
  title: string;
  children: ReactNode;
}

export const FilterSection = ({ title, children }: FilterSectionProps) => (
  <div className="flex flex-col gap-7">
    <h3 className="text-secondary-300 text-xs font-semibold">{title}</h3>
    <div className="flex flex-col gap-8">{children}</div>
  </div>
);
