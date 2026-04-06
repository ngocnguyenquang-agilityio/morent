// Components
import { Button } from '@/components/ui/Button';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <div className="flex flex-col items-center justify-center gap-4 py-16 rounded-[10px] bg-white">
    <p className="text-base font-semibold text-error-500">{message}</p>
    <Button variant="outline" className="rounded-[10px]" onClick={onRetry}>
      Try again
    </Button>
  </div>
);
