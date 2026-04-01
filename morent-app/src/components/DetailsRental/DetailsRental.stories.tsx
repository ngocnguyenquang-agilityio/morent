// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { DetailsRental } from './DetailsRental';

const defaultArgs = {
  image: '/nissan-gt-r.png',
  name: 'Nissan GT - R',
  type: 'Sport' as const,
  rentalId: '9761',
  pickUp: {
    location: 'new-york',
    date: new Date(2022, 6, 20),
    time: '07:00',
  },
  dropOff: {
    location: 'new-york',
    date: new Date(2022, 6, 21),
    time: '01:00',
  },
  totalPrice: 80,
};

const meta = {
  title: 'Components/DetailsRental',
  component: DetailsRental,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 534, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
  args: defaultArgs,
} satisfies Meta<typeof DetailsRental>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DifferentLocations: Story = {
  args: {
    pickUp: {
      location: 'los-angeles',
      date: new Date(2022, 7, 15),
      time: '09:00',
    },
    dropOff: {
      location: 'san-francisco',
      date: new Date(2022, 7, 18),
      time: '17:00',
    },
    totalPrice: 240,
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: 'ring-2 ring-blue-400',
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 375, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 768, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
