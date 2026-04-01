import { DetailsRental, DetailsRentalProps } from '@/components/DetailsRental';

const rentalDetails: DetailsRentalProps = {
  image: '/Koenigsegg.svg',
  name: 'Koenigsegg',
  type: 'Sport',
  rentalId: '9761',
  pickUp: {
    location: 'new-york',
    date: new Date('2022-07-20'),
    time: '07:00',
  },
  dropOff: {
    location: 'chicago',
    date: new Date('2022-07-21'),
    time: '01:00',
  },
  totalPrice: 80,
};

const Dashboard = () => {
  return (
    <div>
      <DetailsRental {...rentalDetails} />
    </div>
  );
};

export default Dashboard;
