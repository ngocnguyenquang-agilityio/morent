// Lib
import { ChangeEvent } from 'react';
import { cn } from '@/lib/utils';

// Components
import { SearchIcon } from '@/components/icons';
import { Input } from '@/components/ui';

interface SearchInputProps {
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({
  className,
  value,
  onChange,
}: SearchInputProps) => (
  <div
    className={cn(
      'flex items-center gap-3 border border-secondary-100/40',
      className,
    )}
  >
    <SearchIcon />
    <Input
      type="text"
      placeholder="Search something here"
      className="h-auto flex-1 border-0 rounded-none p-0 text-sm text-secondary-300 placeholder:text-secondary-300 bg-transparent focus-visible:ring-0 focus-visible:border-transparent"
      value={value}
      onChange={onChange}
    />
  </div>
);
