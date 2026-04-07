// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { CarCard } from './CarCard';

const meta = {
  title: 'Components/CarCard',
  component: CarCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CarCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCar = {
  documentId: 'mock-koenigsegg',
  name: 'Koenigsegg',
  description: 'Luxury sports car with outstanding performance',
  type: 'Sport' as const,
  steering: 'Manual' as const,
  price: 100,
  capacity: 2,
  gasoline: 90,
  rate: 4.5,
  reviewer: 440,
  reviews: [],
  favorite: false,
  discount: 1,
  image: '/Koenigsegg.svg',
  title: 'Sports car with the best design and acceleration',
  subtitle:
    'Safety and comfort while driving a futuristic and elegant sports car',
  thumbnails: ['/Koenigsegg.svg'],
};

export const Default: Story = {
  args: {
    car: sampleCar,
  },
};

export const Favorited: Story = {
  args: {
    car: { ...sampleCar, favorite: true },
  },
};

export const NoDiscount: Story = {
  args: {
    car: { ...sampleCar, discount: 0 },
  },
};
