// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { PickAndDrop } from './PickAndDrop';

const meta = {
  title: 'Components/PickAndDrop',
  component: PickAndDrop,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof PickAndDrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLocations: Story = {
  args: {
    locations: [
      { value: 'jfk', label: 'JFK Airport' },
      { value: 'lax', label: 'LAX Airport' },
      { value: 'ord', label: "O'Hare Airport" },
    ],
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
