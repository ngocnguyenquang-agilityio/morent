'use client';

import { FormProvider, useForm } from 'react-hook-form';
// Components
import { CarInfo } from '@/components/CarInfo';
import { Reviews } from '@/components/Reviews';
import { BillingInfo } from '@/components/BillingInfo';

// Types
import { Car } from '@/types/car';
import { RentalInfo } from '@/components/RentalInfo';

const mockCar: Car = {
  name: 'Koenigsegg',
  description:
    'A supercar with striking looks and incredible performance, perfect for those who seek the thrill of driving.',
  type: 'Sport',
  steering: 'Manual',
  price: 99,
  capacity: 2,
  gasoline: 90,
  rate: 4.0,
  reviewer: 13,
  reviews: [
    {
      avatar:
        'https://doodleipsum.com/700x525/avatar-3?bg=6392D9&i=3337d17d1f7d148640bddfe445bb06b4',
      name: 'Alex Johnson',
      title: 'CEO at Company',
      date: 'March 20, 2026',
      rating: 4,
      comment: 'Absolutely incredible car. The performance is unmatched.',
    },
    {
      avatar: 'https://testingbot.com/free-online-tools/random-avatar/300',
      name: 'Alex Johnson',
      title: 'CEO at Company',
      date: 'March 20, 2026',
      rating: 5,
      comment: 'Absolutely incredible car. The performance is unmatched.',
    },
    {
      avatar:
        'https://doodleipsum.com/700x525/avatar-3?bg=C863D9&i=a2d3165b02bd2206715193df7b1b5d39',
      name: 'Alex Johnson',
      title: 'CEO at Company',
      date: 'March 20, 2026',
      rating: 4,
      comment: 'Absolutely incredible car. The performance is unmatched.',
    },
  ],
  favorite: false,
  discount: 0,
  image: '/Koenigsegg.svg',
  title: 'Sports car with the best design and acceleration',
  subtitle:
    'Safety and comfort while driving a futuristic and elegant sports car',
  thumbnails: [
    '/Koenigsegg.svg',
    '/images/car-interior-1.png',
    '/images/car interior-2.png',
  ],
};

const CarsPage = () => {
  const methods = useForm({
    defaultValues: {
      name: '',
      address: '',
      phoneNumber: '',
      city: '',
      location: '',
      date: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="space-y-4 px-4">
        <div className="flex items-stretch gap-8">
          <CarInfo car={mockCar} />
        </div>

        <Reviews reviews={mockCar.reviews} totalCount={mockCar.reviewer} />

        <BillingInfo />
        <RentalInfo />
      </div>
    </FormProvider>
  );
};

export default CarsPage;
