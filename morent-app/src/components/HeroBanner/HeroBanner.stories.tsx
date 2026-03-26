// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { HeroBanner } from './HeroBanner';

const meta = {
  title: 'Components/HeroBanner',
  component: HeroBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'The Best Platform for Car Rental',
    description:
      'Ease of doing a car rental safely and reliably. Of course at a low price.',
    imageUrl: '/images/hero-car.png',
  },
} satisfies Meta<typeof HeroBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SecondVariant: Story = {
  args: {
    title: 'Easy way to rent a car at a low price',
    description:
      'Providing cheap car rental services and safe and comfortable facilities.',
    imageUrl: '/images/hero-car-2.png',
    className: 'bg-primary-700',
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
