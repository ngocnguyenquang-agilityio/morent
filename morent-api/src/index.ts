import type { Core } from '@strapi/strapi';

const SEED_REVIEWS_PER_CAR = [
  [
    {
      name: 'Alex Johnson',
      title: 'Great experience!',
      avatar: 'https://i.pravatar.cc/150?img=1',
      date: '2024-11-15',
      rating: 5,
      comment: 'Smooth booking process and the car was in perfect condition. Will definitely rent again.',
    },
    {
      name: 'Maria Garcia',
      title: 'Very comfortable ride',
      avatar: 'https://i.pravatar.cc/150?img=2',
      date: '2024-12-03',
      rating: 4,
      comment: 'The car was clean and comfortable. Pick-up was easy and the staff were helpful.',
    },
    {
      name: 'James Park',
      title: 'Good value for money',
      avatar: 'https://i.pravatar.cc/150?img=3',
      date: '2025-01-20',
      rating: 4,
      comment: 'Solid car for the price. Minor cosmetic scratches but nothing that affected the drive.',
    },
  ],
  [
    {
      name: 'Sophie Williams',
      title: 'Exceeded expectations',
      avatar: 'https://i.pravatar.cc/150?img=4',
      date: '2025-02-08',
      rating: 5,
      comment: 'Absolutely loved it. Fuel-efficient, easy to park, and very responsive handling.',
    },
    {
      name: 'Daniel Lee',
      title: 'Reliable and clean',
      avatar: 'https://i.pravatar.cc/150?img=5',
      date: '2025-02-22',
      rating: 4,
      comment: 'Car was spotless and ran without any issues. Easy pick-up and return.',
    },
    {
      name: 'Olivia Brown',
      title: 'Would rent again',
      avatar: 'https://i.pravatar.cc/150?img=6',
      date: '2025-03-05',
      rating: 5,
      comment: 'Fantastic car for the trip. Plenty of space and very smooth on the highway.',
    },
  ],
  [
    {
      name: 'Noah Martinez',
      title: 'Decent but pricey',
      avatar: 'https://i.pravatar.cc/150?img=7',
      date: '2025-01-10',
      rating: 3,
      comment: 'Car was fine but a bit overpriced for what you get. Service was polite though.',
    },
    {
      name: 'Emma Wilson',
      title: 'Perfect city car',
      avatar: 'https://i.pravatar.cc/150?img=8',
      date: '2025-02-14',
      rating: 5,
      comment: 'Compact, easy to park, and super fuel-efficient. Exactly what I needed in the city.',
    },
    {
      name: 'Liam Taylor',
      title: 'Good road trip companion',
      avatar: 'https://i.pravatar.cc/150?img=9',
      date: '2025-03-18',
      rating: 4,
      comment: 'Handled long drives really well. Comfortable seats and great AC.',
    },
  ],
  [
    {
      name: 'Ava Anderson',
      title: 'Impressive performance',
      avatar: 'https://i.pravatar.cc/150?img=10',
      date: '2025-01-28',
      rating: 5,
      comment: 'Powerful engine and smooth handling. Made the mountain roads feel effortless.',
    },
    {
      name: 'William Thomas',
      title: 'Clean and on time',
      avatar: 'https://i.pravatar.cc/150?img=11',
      date: '2025-02-19',
      rating: 4,
      comment: 'Ready for pick-up exactly when promised. Interior was immaculate.',
    },
    {
      name: 'Isabella Jackson',
      title: 'Solid choice for families',
      avatar: 'https://i.pravatar.cc/150?img=12',
      date: '2025-03-02',
      rating: 4,
      comment: 'Spacious and safe. Kids loved the ride. Would definitely book this one again.',
    },
  ],
  [
    {
      name: 'Ethan White',
      title: 'Fun to drive',
      avatar: 'https://i.pravatar.cc/150?img=13',
      date: '2025-01-05',
      rating: 5,
      comment: 'Sporty feel with responsive steering. Turning heads at every corner.',
    },
    {
      name: 'Mia Harris',
      title: 'Comfortable long drive',
      avatar: 'https://i.pravatar.cc/150?img=14',
      date: '2025-02-01',
      rating: 4,
      comment: 'Great suspension and very quiet inside. Perfect for a relaxed highway cruise.',
    },
    {
      name: 'Lucas Clark',
      title: 'Minor issues but good overall',
      avatar: 'https://i.pravatar.cc/150?img=15',
      date: '2025-03-11',
      rating: 3,
      comment: 'Small scratch on the bumper not noted at handover. Otherwise the car drove well.',
    },
  ],
  [
    {
      name: 'Charlotte Lewis',
      title: 'Top-notch luxury',
      avatar: 'https://i.pravatar.cc/150?img=16',
      date: '2025-01-17',
      rating: 5,
      comment: 'Premium interior, smooth ride. Worth every penny for a special occasion.',
    },
    {
      name: 'Henry Robinson',
      title: 'Very happy customer',
      avatar: 'https://i.pravatar.cc/150?img=17',
      date: '2025-02-26',
      rating: 5,
      comment: 'Exceeded all expectations. Would not hesitate to rent this car again.',
    },
    {
      name: 'Amelia Walker',
      title: 'Good but not great',
      avatar: 'https://i.pravatar.cc/150?img=18',
      date: '2025-03-25',
      rating: 3,
      comment: 'Car was fine but the AC took a while to cool down. Decent experience overall.',
    },
  ],
  [
    {
      name: 'Jack Hall',
      title: 'Budget-friendly pick',
      avatar: 'https://i.pravatar.cc/150?img=19',
      date: '2025-01-31',
      rating: 4,
      comment: 'Great value. No frills but everything worked perfectly. Highly recommend.',
    },
    {
      name: 'Harper Young',
      title: 'Easy and stress-free',
      avatar: 'https://i.pravatar.cc/150?img=20',
      date: '2025-02-10',
      rating: 5,
      comment: 'Pick-up was seamless, return even easier. The car itself was a pleasure to drive.',
    },
    {
      name: 'Sebastian King',
      title: 'Solid rental',
      avatar: 'https://i.pravatar.cc/150?img=21',
      date: '2025-03-14',
      rating: 4,
      comment: 'Reliable and well-maintained. No surprises, which is exactly what you want.',
    },
  ],
  [
    {
      name: 'Grace Scott',
      title: 'Stylish and fast',
      avatar: 'https://i.pravatar.cc/150?img=22',
      date: '2025-01-22',
      rating: 5,
      comment: 'Turned heads everywhere I went. Performance matched the looks perfectly.',
    },
    {
      name: 'Benjamin Green',
      title: 'Good for the weekend',
      avatar: 'https://i.pravatar.cc/150?img=23',
      date: '2025-02-28',
      rating: 4,
      comment: 'Rented for a weekend getaway. Comfortable, spacious boot, and easy on fuel.',
    },
    {
      name: 'Chloe Adams',
      title: 'Satisfied customer',
      avatar: 'https://i.pravatar.cc/150?img=24',
      date: '2025-03-20',
      rating: 4,
      comment: 'Car was as described. Clean and well-looked-after. Would book again.',
    },
  ],
];

const SEED_RENTALS = [
  {
    pickUpLocation: 'New York',
    pickUpDate: '2026-03-10',
    pickUpTime: '09:00',
    dropOffLocation: 'Boston',
    dropOffDate: '2026-03-13',
    dropOffTime: '17:00',
    totalPrice: 280,
  },
  {
    pickUpLocation: 'Los Angeles',
    pickUpDate: '2026-03-15',
    pickUpTime: '10:30',
    dropOffLocation: 'San Francisco',
    dropOffDate: '2026-03-18',
    dropOffTime: '14:00',
    totalPrice: 320,
  },
  {
    pickUpLocation: 'Chicago',
    pickUpDate: '2026-03-20',
    pickUpTime: '08:00',
    dropOffLocation: 'Detroit',
    dropOffDate: '2026-03-22',
    dropOffTime: '18:00',
    totalPrice: 195,
  },
  {
    pickUpLocation: 'Miami',
    pickUpDate: '2026-03-25',
    pickUpTime: '11:00',
    dropOffLocation: 'Orlando',
    dropOffDate: '2026-03-28',
    dropOffTime: '15:30',
    totalPrice: 240,
  },
  {
    pickUpLocation: 'Seattle',
    pickUpDate: '2026-04-01',
    pickUpTime: '09:30',
    dropOffLocation: 'Portland',
    dropOffDate: '2026-04-04',
    dropOffTime: '16:00',
    totalPrice: 210,
  },
];

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Seed reviews
    const reviewCount = await strapi.db.query('api::review.review').count();
    if (reviewCount === 0) {
      // Fetch all unique car documents via their draft rows
      const draftCars = await strapi.db.query('api::car.car').findMany({
        where: { publishedAt: { $null: true } },
      });

      if (draftCars.length > 0) {
        // Assign a review set to each unique document, updating all versions (draft + published)
        await Promise.all(
          draftCars.map(async (draftCar, index) => {
            const reviewSet = SEED_REVIEWS_PER_CAR[index % SEED_REVIEWS_PER_CAR.length];

            const createdReviews = await Promise.all(
              reviewSet.map((data) =>
                strapi.db.query('api::review.review').create({ data }),
              ),
            );

            const reviewIds = createdReviews.map((r) => r.id);

            // Update all rows for this document (draft + published) so admin and API both show reviews
            const allVersions = await strapi.db.query('api::car.car').findMany({
              where: { documentId: draftCar.documentId },
            });

            await Promise.all(
              allVersions.map((version) =>
                strapi.db.query('api::car.car').update({
                  where: { id: version.id },
                  data: { reviews: reviewIds },
                }),
              ),
            );
          }),
        );
      }
    }

    // Seed rentals
    const rentalCount = await strapi.db.query('api::rental.rental').count();
    if (rentalCount === 0) {
      // Rental has no draftAndPublish — fetch published cars only
      const publishedCars = await strapi.db.query('api::car.car').findMany({
        where: { publishedAt: { $notNull: true } },
      });

      if (publishedCars.length > 0) {
        await Promise.all(
          SEED_RENTALS.map((rentalData, index) => {
            const car = publishedCars[index % publishedCars.length];
            return strapi.db.query('api::rental.rental').create({
              data: { ...rentalData, car: car.id },
            });
          }),
        );
      }
    }
  },
};
