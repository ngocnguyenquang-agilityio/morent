// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { CarInfo } from './CarInfo';

const meta = {
  title: 'Components/CarInfo',
  component: CarInfo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 492 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CarInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCar = {
  name: 'Nissan GT - R',
  description:
    'NISMO has become the embodiment of Nissan\'s outstanding performance, inspired by the most unforgiving proving ground, the "race track".',
  type: 'Sport' as const,
  steering: 'Manual' as const,
  price: 100,
  capacity: 2,
  gasoline: 70,
  rate: 4,
  reviewer: 440,
  reviews: [],
  favorite: false,
  discount: 20,
  image: '/nissan-gt-r.png',
  title: 'Sports car with the best design and acceleration',
  subtitle:
    'Safety and comfort while driving a futuristic and elegant sports car',
  thumbnails: [
    '/images/hero-car.png',
    '/images/hero-car-2.png',
    '/images/hero-car.png',
  ],
};

export const Default: Story = {
  args: { car: sampleCar },
};

export const Favorited: Story = {
  args: { car: { ...sampleCar, favorite: true } },
};

export const NoDiscount: Story = {
  args: { car: { ...sampleCar, discount: 0 } },
};

export const HighRating: Story = {
  args: { car: { ...sampleCar, rate: 5, reviewer: 1200 } },
};

export const LowRating: Story = {
  args: { car: { ...sampleCar, rate: 2, reviewer: 12 } },
};

export const WithRentNowHandler: Story = {
  args: {
    car: sampleCar,
    onRentNow: () => alert('Renting now!'),
  },
};
