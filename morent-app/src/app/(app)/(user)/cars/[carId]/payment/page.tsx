// Lib
import { notFound, redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

// Services
import { fetchCarById } from '@/services/cars';

// Components
import { PaymentPageContent } from '@/components/PaymentPageContent/PaymentPageContent';

interface PaymentPageProps {
  params: Promise<{ carId: string }>;
}

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
