// Lib
import { notFound, redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import type { Metadata } from 'next';

// Services
import { fetchCarById } from '@/services/cars';

// Utils
import { createMetadata } from '@/utils/metadata';

// Components
import { PaymentPageContent } from '@/components/PaymentPageContent/PaymentPageContent';

interface PaymentPageProps {
  params: Promise<{ carId: string }>;
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

const PaymentPage = async ({ params }: PaymentPageProps) => {
  const { carId } = await params;

  const { userId } = await auth();

  if (!userId) {
    const redirectUrl = `/cars/${carId}/payment`;
    redirect(`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`);
  }

  const car = await fetchCarById(carId).catch(() => notFound());

  return <PaymentPageContent car={car} />;
};

export default PaymentPage;
