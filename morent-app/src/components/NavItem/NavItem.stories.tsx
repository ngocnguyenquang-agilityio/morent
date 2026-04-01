import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { HomeIcon } from '@/components/icons/Home';
import { CarIcon } from '@/components/icons/Car';
import { NavItem } from './NavItem';

const meta = {
  title: 'Components/NavItem',
  component: NavItem,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    href: '/dashboard',
    label: 'Dashboard',
    Icon: HomeIcon,
    isActive: false,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: {
    isActive: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Car Rent',
    Icon: CarIcon,
    href: '/car-rent',
    disabled: true,
  },
};

export const ActiveAndDisabled: Story = {
  name: 'Active + Disabled (disabled takes precedence)',
  args: {
    isActive: true,
    disabled: true,
  },
};
