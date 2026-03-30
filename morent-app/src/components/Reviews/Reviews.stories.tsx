// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { Reviews } from './Reviews';

const meta = {
  title: 'Components/Reviews',
  component: Reviews,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 780 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Reviews>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleReviews = [
  {
    avatar: '/avatars/alex-stanton.png',
    name: 'Alex Stanton',
    title: 'CEO at Bukalapak',
    date: '21 July 2022',
    rating: 4,
    comment:
      'We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.',
  },
  {
    avatar: '/avatars/skylar-dias.png',
    name: 'Skylar Dias',
    title: 'CEO at Amazon',
    date: '20 July 2022',
    rating: 4,
    comment:
      'We are greatly helped by the services of the MORENT Application. Morent has low prices and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.',
  },
  {
    avatar: '/avatars/john-doe.png',
    name: 'John Doe',
    title: 'CTO at Stripe',
    date: '18 July 2022',
    rating: 5,
    comment:
      'Absolutely fantastic service! The cars are always clean, well-maintained, and the booking process is seamless. I highly recommend MORENT to anyone looking for reliable car rental.',
  },
];

export const Default: Story = {
  args: {
    reviews: sampleReviews.slice(0, 2),
    totalCount: 13,
  },
};

export const ShowAllExpanded: Story = {
  args: {
    reviews: sampleReviews,
    totalCount: 13,
    initialVisible: 2,
  },
};

export const AllVisible: Story = {
  args: {
    reviews: sampleReviews,
    totalCount: 3,
    initialVisible: 10,
  },
};

export const SingleReview: Story = {
  args: {
    reviews: sampleReviews.slice(0, 1),
    totalCount: 1,
    initialVisible: 2,
  },
};

export const HighRatings: Story = {
  args: {
    reviews: sampleReviews.map((r) => ({ ...r, rating: 5 })),
    totalCount: 13,
  },
};

export const LowRatings: Story = {
  args: {
    reviews: sampleReviews.map((r) => ({ ...r, rating: 2 })),
    totalCount: 13,
  },
};
