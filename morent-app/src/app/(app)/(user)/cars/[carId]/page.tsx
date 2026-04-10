// Lib
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Services
import { fetchCarById } from '@/services/cars';

// Utils
import { createMetadata } from '@/utils/metadata';

// Components
import { CarDetailsContent } from '@/components/CarDetailsContent';

interface CarDetailsPageProps {
  params: Promise<{ carId: string }>;
}

export const generateMetadata = async ({
  params,
}: CarDetailsPageProps): Promise<Metadata> => {
  const { carId } = await params;
  const car = await fetchCarById(carId).catch(() => null);
  const title = car?.name ?? 'Car Details';
  return createMetadata(
    title,
    `View details, specs, and reviews for the ${title}. Book your rental today.`,
  );
};

const CarDetailsPage = async ({ params }: CarDetailsPageProps) => {
  const { carId } = await params;

  const car = await fetchCarById(carId).catch(() => notFound());

  return <CarDetailsContent car={car} />;
};

export default CarDetailsPage;
