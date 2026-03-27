// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { FilterCheckbox } from './FilterCheckbox';

const meta = {
  title: 'Components/FilterSidebar/FilterCheckbox',
  component: FilterCheckbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Sport',
    count: 12,
    checked: false,
    onChange: () => {},
  },
} satisfies Meta<typeof FilterCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const LongLabel: Story = {
  args: {
    label: 'Electric Vehicle',
    count: 3,
  },
};
