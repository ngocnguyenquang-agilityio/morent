// Components
import { RentedList } from '@/components/RentedList';
import { DetailsRental } from '@/components/DetailsRental';

const RentedListLoading = () => (
  <div className="px-6 py-8 lg:px-16 lg:py-10 max-w-screen-2xl mx-auto">
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      <RentedList isLoading />
      <DetailsRental isLoading className="w-full" />
    </div>
  </div>
);

export default RentedListLoading;
