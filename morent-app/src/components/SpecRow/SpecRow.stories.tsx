// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { SpecRow } from './SpecRow';

const meta = {
  title: 'Components/SpecRow',
  component: SpecRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Type Car',
    value: 'Sport',
  },
} satisfies Meta<typeof SpecRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Capacity: Story = {
  args: {
    label: 'Capacity',
    value: '2 Person',
  },
};

export const Steering: Story = {
  args: {
    label: 'Steering',
    value: 'Manual',
  },
};

export const Gasoline: Story = {
  args: {
    label: 'Gasoline',
    value: '90L',
  },
};
