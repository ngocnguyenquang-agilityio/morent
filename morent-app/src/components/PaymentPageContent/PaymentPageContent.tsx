'use client';

// Lib
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm, FormProvider } from 'react-hook-form';
import { effectTsResolver } from '@hookform/resolvers/effect-ts';

// Types
import { Car } from '@/types/car';

// Schemas
import { PaymentFormSchema, PaymentFormValues } from '@/types/payment';

// Services
import { submitRental } from '@/services/rentals';

// Constants
import { ROUTE } from '@/constants/route';

// Utils
import { getPickDropDefaultValues } from '@/utils/pickAndDrop';

// Components
import { BillingInfo } from '@/components/BillingInfo/BillingInfo';
import { RentalInfo } from '@/components/RentalInfo/RentalInfo';
import { PaymentMethod } from '@/components/PaymentMethod/PaymentMethod';
import { Confirmation } from '@/components/Confirmation/Confirmation';
import { RentalSummary } from '@/components/RentalSummary/RentalSummary';

interface PaymentPageContentProps {
  car: Car;
  searchParams?: Record<string, string | string[] | undefined>;
}

export const PaymentPageContent = ({
  car,
  searchParams,
}: PaymentPageContentProps) => {
  const { pickUp, dropOff } = getPickDropDefaultValues(searchParams ?? {});
  const form = useForm<PaymentFormValues>({
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

  const router = useRouter();

  const {
    mutate,
    error: rentalError,
    isPending,
  } = useMutation({
    mutationFn: submitRental,
    onSuccess: () => router.push(ROUTE.RENTED_LIST),
  });

  const handleSubmit = (values: PaymentFormValues) => {
    mutate({
      carDocumentId: car.documentId,
      carPrice: car.price,
      pickUpLocation: values.pickUp.location,
      pickUpDate: values.pickUp.date.toISOString(),
      pickUpTime: values.pickUp.time,
      dropOffLocation: values.dropOff.location,
      dropOffDate: values.dropOff.date.toISOString(),
      dropOffTime: values.dropOff.time,
    });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="p-8"
        aria-busy={isPending}
      >
        <div className="">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,852px)_1fr]">
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
        {rentalError && (
          <p className="mt-4 text-center text-sm text-red-500">
            {rentalError.message}
          </p>
        )}
      </form>
    </FormProvider>
  );
};
