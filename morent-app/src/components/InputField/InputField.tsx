// Lib
import { type ComponentProps } from 'react';
import { cn } from '@/lib/utils';

// Components
import { Input } from '@/components/ui/Input';

interface InputFieldProps extends ComponentProps<'input'> {
  label: string;
  wrapperClassName?: string;
  error?: string;
}

const InputField = ({
  label,
  id,
  className,
  wrapperClassName,
  error,
  ref,
  ...props
}: InputFieldProps) => {
  return (
    <div className={cn('flex flex-col gap-4', wrapperClassName)}>
      <label
        htmlFor={id}
        className="text-sm lg:text-base font-semibold text-secondary"
      >
        {label}
      </label>
      <Input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        className={cn(
          'h-auto rounded-[10px] border-0 bg-[#F6F7F9] px-8 py-4 text-sm placeholder:text-secondary-300',
          className,
        )}
        {...props}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export { InputField };
