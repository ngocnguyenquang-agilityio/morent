// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { SectionHeader } from './SectionHeader';

const meta = {
  title: 'Components/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 500, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Rental Info',
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    label: 'Rental Info',
    icon: (
      <span className="text-sm font-medium text-primary-500">Step 1 of 4</span>
    ),
  },
};

export const BillingInfo: Story = {
  args: {
    label: 'Billing Info',
    icon: (
      <span className="text-sm font-medium text-primary-500">Step 2 of 4</span>
    ),
  },
};

export const NoIcon: Story = {
  args: {
    label: 'Confirmation',
  },
};
