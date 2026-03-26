'use client';

// Lib
import { useState } from 'react';

// Components
import { Button } from '@/components/ui/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/Command';

// Utils
import { cn } from '@/lib/utils';

// Icons
import { ChevronDownIcon } from '@/components/icons';

// Types
import { Location } from '@/types/pickAndDrop';

interface LocationPickerProps {
  value: string | undefined;
  locations: Location[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const LocationPicker = ({
  value,
  locations,
  onChange,
  placeholder = 'Select your city',
  className,
}: LocationPickerProps) => {
  const [open, setOpen] = useState(false);

  const selectedLabel = locations.find((loc) => loc.value === value)?.label;

  const handleSelect = (locationValue: string) => {
    onChange(locationValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'h-auto w-full justify-between px-0 text-xs font-normal hover:bg-transparent',
            className,
          )}
        >
          <span className="truncate text-xs text-secondary-300">
            {selectedLabel ?? placeholder}
          </span>
          <ChevronDownIcon className="size-6 shrink-0 fill-secondary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandInput placeholder="Search city..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.label}
                  data-checked={value === location.value}
                  onSelect={handleSelect.bind(null, location.value)}
                >
                  {location.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
