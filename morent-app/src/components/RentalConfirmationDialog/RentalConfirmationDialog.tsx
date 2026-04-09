'use client';

// Lib
import { CheckCircle2 } from 'lucide-react';

// Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui';

interface RentalConfirmationDialogProps {
  open: boolean;
  carName: string;
  onClose: () => void;
}

export const RentalConfirmationDialog = ({
  open,
  carName,
  onClose,
}: RentalConfirmationDialogProps) => (
  <Dialog
    open={open}
    onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}
  >
    <DialogContent className="max-w-sm text-center">
      <DialogHeader>
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="size-16 text-green-500" />
        </div>
        <DialogTitle className="text-xl font-bold text-secondary">
          Booking Confirmed!
        </DialogTitle>
        <DialogDescription className="mt-2 text-secondary-300">
          Your {carName} has been successfully rented. Enjoy the ride!
        </DialogDescription>
      </DialogHeader>
      <Button onClick={onClose} className="mt-4 w-full rounded-[10px]">
        Done
      </Button>
    </DialogContent>
  </Dialog>
);
