// Constants
import {
  CAR_DETAILS_SECTIONS,
  CAR_DETAILS_SECTION_SIZE,
} from '@/constants/car';

// Components
import { CarInfo } from '@/components/CarInfo';
import { Reviews } from '@/components/Reviews';
import { PopularCarsSection } from '@/components/PopularCarsSection';
import { RecommendationCarsSection } from '@/components/RecommendationCarsSection';

// Types
import type { Car } from '@/types/car';

interface CarDetailsContentProps {
  car: Car;
}

export const CarDetailsContent = ({ car }: CarDetailsContentProps) => {
  return (
    <div className="flex flex-col gap-8">
      <CarInfo car={car} />
      <Reviews reviews={car.reviews} totalCount={car.reviews.length} />
      <PopularCarsSection
        label={CAR_DETAILS_SECTIONS.RECENT_CAR}
        count={CAR_DETAILS_SECTION_SIZE}
        gridCols={3}
      />
      <RecommendationCarsSection
        pageSize={CAR_DETAILS_SECTION_SIZE}
        gridCols={3}
        isShowViewAll
      />
    </div>
  );
};
