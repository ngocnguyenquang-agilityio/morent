// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { RentalSummary } from './RentalSummary';

const defaultArgs = {
  carImage: '/nissan-gt-r.png',
  carName: 'Nissan GT - R',
  carRating: 4,
  carReviewerCount: 440,
  subtotal: 80,
  tax: 0,
};

const meta = {
  title: 'Components/RentalSummary',
  component: RentalSummary,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 492, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
  args: defaultArgs,
} satisfies Meta<typeof RentalSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTax: Story = {
  args: {
    subtotal: 80,
    tax: 8,
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
