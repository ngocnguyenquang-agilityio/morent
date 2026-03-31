import { ReactNode } from 'react';

interface SectionHeaderProps {
  label: string;
  icon?: ReactNode;
}

export const SectionHeader = ({ label, icon }: SectionHeaderProps) => (
  <div className="flex items-center justify-between gap-2">
    <div className="flex items-center gap-2">
      <span className="size-2 rounded-full bg-primary-500" />
      <span className="text-base font-semibold text-secondary">{label}</span>
    </div>
    {icon}
  </div>
);
