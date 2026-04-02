// Types
import type { Meta, StoryObj, Decorator } from '@storybook/nextjs-vite';

// Components
import { RecentTransaction } from './RecentTransaction';

// Constants
import { RECENT_TRANSACTIONS } from '@/constants/transaction';

const meta = {
  title: 'Components/RecentTransaction',
  component: RecentTransaction,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RecentTransaction>;

export default meta;
type Story = StoryObj<typeof meta>;

const withNarrowContainer: Decorator = (Story) => (
  <div style={{ width: 360 }}>
    <Story />
  </div>
);

const withWideContainer: Decorator = (Story) => (
  <div style={{ width: 600 }}>
    <Story />
  </div>
);

export const Default: Story = {
  name: 'Default',
  decorators: [withWideContainer],
};

export const NarrowContainer: Story = {
  name: 'Narrow Container (360px)',
  decorators: [withNarrowContainer],
};

export const SingleItem: Story = {
  name: 'Single Item',
  decorators: [withWideContainer],
  args: {
    transactions: [RECENT_TRANSACTIONS[0]],
  },
};

export const Empty: Story = {
  name: 'Empty',
  decorators: [withWideContainer],
  args: {
    transactions: [],
  },
};
