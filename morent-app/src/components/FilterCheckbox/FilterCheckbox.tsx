// Lib
import { memo } from 'react';

// Utils
import { cn } from '@/lib/utils';

// Components
import { Checkbox } from '@/components/ui';

export interface FilterCheckboxProps {
  label: string;
  count: number;
  checked: boolean;
  onChange: (label: string) => void;
}

export const FilterCheckbox = memo(
  ({ label, count, checked, onChange }: FilterCheckboxProps) => (
    <label className="flex items-center gap-2 cursor-pointer group max-h-6">
      <Checkbox
        checked={checked}
        onCheckedChange={() => onChange(label)}
        className={cn(
          'w-5 h-5 rounded border-secondary-200 group-hover:border-primary-300',
          {
            'border-primary-500 bg-primary-500 data-checked:bg-primary-500 data-checked:border-primary-500':
              checked,
          },
        )}
      />
      <div className="flex items-center gap-0.5">
        <span className="text-lg font-semibold text-secondary-400">
          {label}
        </span>
        <span className="text-secondary-300 text-lg font-semibold">
          ({count})
        </span>
      </div>
    </label>
  ),
);

FilterCheckbox.displayName = 'FilterCheckbox';
