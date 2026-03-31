'use client';

// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

// Utils
import { cn } from '@/lib/utils';
import { generateTimeSlots } from '@/utils/generateTime';

interface TimePickerProps {
  value: string | undefined;
  onChange: (time: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

const TIME_SLOTS = generateTimeSlots();

export const TimePicker = ({
  value,
  onChange,
  placeholder = 'Select your time',
  className,
  error,
}: TimePickerProps) => {
  return (
    <>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cn(
            'h-auto w-full border-0 bg-transparent px-0 text-xs font-normal shadow-none focus-visible:ring-0 text-secondary-300 data-placeholder:text-secondary-300',
            className,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper" className="max-h-[300px]">
          {TIME_SLOTS.map((slot) => (
            <SelectItem key={slot} value={slot}>
              {slot}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </>
  );
};
