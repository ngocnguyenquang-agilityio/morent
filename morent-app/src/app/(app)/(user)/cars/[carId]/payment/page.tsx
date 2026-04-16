// Lib
import { notFound, redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import type { Metadata } from 'next';

// Services
import { fetchCarById } from '@/services/cars';

// Utils
import { createMetadata } from '@/utils/metadata';
import { PICK_DROP_PARAMS } from '@/constants/pickAndDrop';

// Components
import { PaymentPageContent } from '@/components/PaymentPageContent/PaymentPageContent';
import { ROUTE } from '@/constants/route';

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

  const { userId } = await auth();

  if (!userId) {
    const pickDropKeys = new Set<string>(Object.values(PICK_DROP_PARAMS));
    const pickDropQuery = new URLSearchParams(
      Object.entries(resolvedSearchParams).flatMap(([key, value]) =>
        !pickDropKeys.has(key) || value === undefined
          ? []
          : Array.isArray(value)
            ? [[key, value[0]]]
            : [[key, value]],
      ),
    ).toString();
    const redirectUrl = pickDropQuery
      ? `${ROUTE.PAYMENT(carId)}?${pickDropQuery}`
      : ROUTE.PAYMENT(carId);
    redirect(ROUTE.SIGN_IN_REDIRECT(encodeURIComponent(redirectUrl)));
  }

  const car = await fetchCarById(carId).catch(() => notFound());

  return <PaymentPageContent car={car} searchParams={resolvedSearchParams} />;
};

export default PaymentPage;
