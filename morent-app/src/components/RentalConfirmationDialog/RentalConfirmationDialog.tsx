'use client';

// Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui';
import { CircleCheckIcon } from '@/components/icons';

interface RentalConfirmationDialogProps {
  open: boolean;
  carName: string;
  onClose: () => void;
  onDone: () => void;
}

export const RentalConfirmationDialog = ({
  open,
  carName,
  onClose,
  onDone,
}: RentalConfirmationDialogProps) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm p-6 gap-6 text-center">
        <DialogHeader>
          <div className="flex justify-center">
            <CircleCheckIcon className="size-18 fill-green-500" />
          </div>
          <DialogTitle className="text-lg font-bold text-secondary">
            Successfully
          </DialogTitle>
          <DialogDescription className="text-xs lg:text-sm text-secondary-300">
            Your {carName} has been rented successfully. Enjoy the ride!
          </DialogDescription>
        </DialogHeader>
        <Button
          onClick={onDone}
          className="w-full rounded-[10px] px-8 py-6 text-base font-semibold"
        >
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
};
