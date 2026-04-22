import Link from 'next/link';
import { Car } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { ROUTE } from '@/constants/route';

export const RentedListEmpty = () => (
  <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
    <Car className="size-12 text-secondary-200" />
    <div className="space-y-1">
      <p className="text-sm font-semibold text-secondary-500">No rentals yet</p>
      <p className="text-sm text-secondary-300">
        You haven&apos;t rented any cars yet. Find your perfect ride!
      </p>
    </div>
    <Button variant="outline" size="sm" asChild>
      <Link href={ROUTE.CARS}>Browse Cars</Link>
    </Button>
  </div>
);
