'use client';

// Lib
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

// Components
import { Button } from '@/components/ui/Button';

// Constants
import { ROUTE } from '@/constants/route';

type Props = {
  reset: () => void;
};

const RentedListErrorPage = ({ reset }: Props) => {
  const handleReset = () => {
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16 px-6 text-center">
      <AlertCircle className="size-12 text-red-400" />
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-secondary">
          Something went wrong
        </h2>
        <p className="text-sm text-secondary-300 max-w-sm">
          We couldn&apos;t load your rentals. Please try again.
        </p>
      </div>
      <div className="flex gap-3">
        <Button onClick={handleReset} className="px-6 py-5">
          Try again
        </Button>
        <Button variant="outline" className="px-6 py-5" asChild>
          <Link href={ROUTE.CARS}>Browse Cars</Link>
        </Button>
      </div>
    </div>
  );
};

export default RentedListErrorPage;
