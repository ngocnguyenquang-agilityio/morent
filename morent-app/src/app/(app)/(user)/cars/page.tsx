'use client';

// Lib
import { useState } from 'react';

// Components
import { CarCard } from '@/components/CarCard';

// Types
import { Car } from '@/types/car';

const mockCar: Car = {
  name: 'Koenigsegg',
  description: 'Sports Car',
  type: 'Sport',
  price: 99,
  discount: 10,
  gasoline: 10,
  steering: 'Manual',
  capacity: 2,
  image: '/Koenigsegg.svg',
  favorite: false,
  rate: 5,
  reviewer: 10,
  reviews: [
    {
      avatar: '/avatar1.png',
      name: 'Alex Stanton',
      title: 'CEO at Bukalapak',
      date: '21 July 2022',
      rating: 4,
      comment:
        'We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.',
    },
    {
      avatar: '/avatar2.png',
      name: 'Skylar Dias',
      title: 'CEO at Amazon',
      date: '20 July 2022',
      rating: 4,
      comment:
        'We are greatly helped by the services of the MORENT Application. Morent has low prices and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.',
    },
  ],
};

const CarsPage = () => {
  const [isFavorite, setIsFavorite] = useState(mockCar.favorite);

  const handleToggleFavorite = async (favorite: boolean): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsFavorite(favorite);
  };

  return (
    <div className="space-y-4">
      <h1>Cars page</h1>
      <CarCard
        car={{ ...mockCar, favorite: isFavorite }}
        onFavoriteToggle={handleToggleFavorite}
      />
    </div>
  );
};

export default CarsPage;
