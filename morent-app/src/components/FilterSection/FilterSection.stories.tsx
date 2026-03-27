// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { FilterSection } from './FilterSection';

const meta = {
  title: 'Components/FilterSidebar/FilterSection',
  component: FilterSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'TYPE',
    children: <p className="text-sm text-gray-500">Section content here</p>,
  },
} satisfies Meta<typeof FilterSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMultipleChildren: Story = {
  args: {
    title: 'CAPACITY',
    children: (
      <>
        <p className="text-sm text-gray-500">2 Person</p>
        <p className="text-sm text-gray-500">4 Person</p>
        <p className="text-sm text-gray-500">6 Person</p>
      </>
    ),
  },
};

export const LongTitle: Story = {
  args: {
    title: 'MAXIMUM PRICE',
  },
};
