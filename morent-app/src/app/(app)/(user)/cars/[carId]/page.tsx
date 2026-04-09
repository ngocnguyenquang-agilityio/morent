// Lib
import { notFound } from 'next/navigation';

// Services
import { fetchCarById } from '@/services/cars';

// Components
import { CarDetailsContent } from '@/components/CarDetailsContent';

interface CarDetailsPageProps {
  params: Promise<{ carId: string }>;
}

const CarDetailsPage = async ({ params }: CarDetailsPageProps) => {
  const { carId } = await params;

  const car = await fetchCarById(carId).catch(() => notFound());

  return <CarDetailsContent car={car} />;
};

export default CarDetailsPage;
