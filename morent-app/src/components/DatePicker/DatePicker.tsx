'use client';

// Lib
import { useState } from 'react';
import { format } from 'date-fns';

// Components
import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';

// Constants
import { DATE_FORMAT } from '@/constants/pickAndDrop';

// Utils
import { cn } from '@/lib/utils';

// Icons
import { ChevronDownIcon } from '@/components/icons';

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date?: Date) => void;
  placeholder?: string;
  className?: string;
}

export const DatePicker = ({
  value,
  onChange,
  placeholder = 'Select your date',
  className,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'h-auto w-full justify-between px-0 text-xs font-normal hover:bg-transparent',
            className,
          )}
        >
          <span className="truncate text-xs text-secondary-300">
            {value ? format(value, DATE_FORMAT) : placeholder}
          </span>
          <ChevronDownIcon className="size-6 shrink-0 fill-secondary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
          disabled={{ before: new Date() }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
