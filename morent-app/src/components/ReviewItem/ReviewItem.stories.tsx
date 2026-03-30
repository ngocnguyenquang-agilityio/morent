// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { ReviewItem } from './ReviewItem';

const meta = {
  title: 'Components/ReviewItem',
  component: ReviewItem,
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
} satisfies Meta<typeof ReviewItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    review: {
      avatar: '/avatars/alex-stanton.png',
      name: 'Alex Stanton',
      title: 'CEO at Bukalapak',
      date: '21 July 2022',
      rating: 4,
      comment:
        'We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.',
    },
  },
};

export const FiveStars: Story = {
  args: {
    review: {
      avatar: '/avatars/john-doe.png',
      name: 'John Doe',
      title: 'CTO at Stripe',
      date: '18 July 2022',
      rating: 5,
      comment:
        'Absolutely fantastic service! The cars are always clean, well-maintained, and the booking process is seamless. I highly recommend MORENT to anyone looking for reliable car rental.',
    },
  },
};

export const OneStar: Story = {
  args: {
    review: {
      avatar: '/avatars/skylar-dias.png',
      name: 'Skylar Dias',
      title: 'CEO at Amazon',
      date: '20 July 2022',
      rating: 1,
      comment:
        'Disappointing experience. The car was not in good condition and the service was slow.',
    },
  },
};

export const ZeroStars: Story = {
  args: {
    review: {
      avatar: '/avatars/alex-stanton.png',
      name: 'Alex Stanton',
      title: 'CEO at Bukalapak',
      date: '15 July 2022',
      rating: 0,
      comment: 'No stars for this experience.',
    },
  },
};
