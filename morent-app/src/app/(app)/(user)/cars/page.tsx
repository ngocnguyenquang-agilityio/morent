'use client';

// Components
import { CarInfo } from '@/components/CarInfo';

// Types
import { Car } from '@/types/car';

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
  reviewer: 440,
  reviews: [
    {
      avatar: '/avatar.png',
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
  return (
    <div className="space-y-4 px-4">
      <div className="flex items-stretch gap-8">
        <CarInfo car={mockCar} />
      </div>
    </div>
  );
};

export default CarsPage;
