import { Rental } from '@/types/rental';
import { Transaction } from '@/types/transaction';

// Constants
import { DEFAULT_LOCATIONS } from '@/constants/pickAndDrop';

export const mapRentalToTransaction = (rental: Rental): Transaction => ({
  id: rental.documentId,
  name: rental.car.name,
  type: rental.car.type,
  date: new Date(rental.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
  }),
  price: rental.totalPrice,
  image: rental.car.image,
});

/**
 * Resolve a location string from the API to its corresponding slug value ("New York" > "new-york") used in DEFAULT_LOCATIONS.
 * Falls back to the original string if no match is found.
 */
const resolveLocationValue = (apiLocation: string): string => {
  const byValue = DEFAULT_LOCATIONS.find((loc) => loc.value === apiLocation);
  if (byValue) return byValue.value;

  const byLabel = DEFAULT_LOCATIONS.find(
    (loc) => loc.label.toLowerCase() === apiLocation.toLowerCase(),
  );
  return byLabel?.value ?? apiLocation;
};

export const getSelectedRental = (
  rentals: Rental[],
  selectedId: string | undefined,
): Rental | undefined =>
  rentals.find((r) => r.documentId === selectedId) ?? rentals[0];

export const mapRentalToDetails = (rental: Rental | undefined) => {
  if (!rental) return undefined;
  return {
    image: rental.car.image,
    name: rental.car.name,
    type: rental.car.type,
    rentalId: rental.documentId.slice(0, 4),
    pickUp: {
      location: resolveLocationValue(rental.pickUpLocation),
      date: new Date(rental.pickUpDate),
      time: rental.pickUpTime,
    },
    dropOff: {
      location: resolveLocationValue(rental.dropOffLocation),
      date: new Date(rental.dropOffDate),
      time: rental.dropOffTime,
    },
    totalPrice: rental.totalPrice,
  };
};
