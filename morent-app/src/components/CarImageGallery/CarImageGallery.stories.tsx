// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { CarImageGallery } from './CarImageGallery';

const meta = {
  title: 'Components/CarImageGallery',
  component: CarImageGallery,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Sports car with the best design and acceleration',
    subtitle:
      'Safety and comfort while driving a futuristic and elegant sports car',
    thumbnails: [
      '/images/hero-car.png',
      '/images/hero-car-2.png',
      '/images/hero-car.png',
    ],
  },
} satisfies Meta<typeof CarImageGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
