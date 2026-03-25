// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { SearchInput } from './SearchInput';

const meta = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DesktopStyle: Story = {
  args: {
    className: 'rounded-full px-5 py-2 w-[492px]',
  },
};

export const MobileStyle: Story = {
  args: {
    className: 'rounded-xl px-4 py-3 w-[343px]',
  },
};
