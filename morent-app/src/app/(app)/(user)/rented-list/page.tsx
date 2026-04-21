// Components
import { RentedListClient } from '@/components/RentedListContent';

// Utils
import { createMetadata } from '@/utils/metadata';

export const metadata = createMetadata(
  'Rented List',
  'View your rental history and details for each booking.',
);

const RentedListPage = () => (
  <div className="px-6 py-8 lg:px-16 lg:py-10 max-w-screen-2xl mx-auto">
    <RentedListClient />
  </div>
);

export default RentedListPage;
