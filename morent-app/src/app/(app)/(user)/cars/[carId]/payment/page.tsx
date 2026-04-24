// Lib
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Services
import { fetchCarById } from '@/services/cars';

// Utils
import { createMetadata } from '@/utils/metadata';

// Components
import { PaymentPageContent } from '@/components/PaymentPageContent/PaymentPageContent';

interface PaymentPageProps {
  params: Promise<{ carId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const generateMetadata = async ({
  params,
}: PaymentPageProps): Promise<Metadata> => {
  const { carId } = await params;
  const car = await fetchCarById(carId).catch(() => null);
  const carName = car?.name ?? 'Car';
  return createMetadata(
    `Rent ${carName}`,
    `Complete your booking for the ${carName}. Secure, fast, and easy rental checkout.`,
  );
};

const PaymentPage = async ({ params, searchParams }: PaymentPageProps) => {
  const { carId } = await params;
  const resolvedSearchParams = await searchParams;

  const car = await fetchCarById(carId).catch(() => notFound());

  return <PaymentPageContent car={car} searchParams={resolvedSearchParams} />;
};

export default PaymentPage;
