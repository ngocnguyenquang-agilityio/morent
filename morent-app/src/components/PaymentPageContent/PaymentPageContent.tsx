'use client';

// Lib
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { effectTsResolver } from '@hookform/resolvers/effect-ts';

// Types
import { Car } from '@/types/car';

// Schemas
import { PaymentFormSchema, PaymentFormValues } from '@/types/payment';

// Utils
import { getPickDropDefaultValues } from '@/utils/pickAndDrop';

// Components
import { BillingInfo } from '@/components/BillingInfo/BillingInfo';
import { RentalInfo } from '@/components/RentalInfo/RentalInfo';
import { PaymentMethod } from '@/components/PaymentMethod/PaymentMethod';
import { Confirmation } from '@/components/Confirmation/Confirmation';
import { RentalSummary } from '@/components/RentalSummary/RentalSummary';
import { RentalConfirmationDialog } from '@/components/RentalConfirmationDialog/RentalConfirmationDialog';

interface PaymentPageContentProps {
  car: Car;
  searchParams?: Record<string, string | string[] | undefined>;
}

export const PaymentPageContent = ({
  car,
  searchParams,
}: PaymentPageContentProps) => {
  const { pickUp, dropOff } = getPickDropDefaultValues(searchParams ?? {});
  const methods = useForm<PaymentFormValues>({
    resolver: effectTsResolver(PaymentFormSchema),
    defaultValues: {
      pickUp,
      dropOff,
      name: '',
      address: '',
      phoneNumber: '',
      city: '',
      cardNumber: '',
      cardHolder: '',
      expirationDate: '',
      cvc: '',
      agreeMarketing: false,
      agreeTerms: false as unknown as true,
    },
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
            {/* Right column — rendered first so it appears on top on mobile */}
            <div className="lg:col-start-2 lg:row-start-1 lg:sticky lg:top-8 lg:self-start">
              <RentalSummary
                carImage={car.image}
                carName={car.name}
                carRating={car.rate}
                carReviewerCount={car.reviewer}
                subtotal={car.price}
                tax={0}
              />
            </div>
            {/* Left column */}
            <div className="space-y-6 lg:space-y-8 lg:col-start-1 lg:row-start-1">
              <BillingInfo />
              <RentalInfo />
              <PaymentMethod />
              <Confirmation />
            </div>
          </div>
        </div>
        <RentalConfirmationDialog
          open={showConfirmation}
          carName={car.name}
          onClose={handleCloseConfirmation}
        />
      </form>
    </FormProvider>
  );
};
