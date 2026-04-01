import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { AdminSidebar } from '../AdminSidebar';

const meta = {
  title: 'Components/AdminSidebar',
  component: AdminSidebar,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/dashboard',
      },
    },
  },
  args: {
    isOpen: true,
    onClose: () => {},
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AdminSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/dashboard',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Main menu')).toBeVisible();
    await expect(canvas.getByText('Dashboard')).toBeVisible();
    await expect(canvas.getByText('Log Out')).toBeVisible();
  },
};

export const ActiveCarRent: Story = {
  name: 'Active: Car Rent',
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/car-rent',
      },
    },
  },
};

export const ActiveInsight: Story = {
  name: 'Active: Insight',
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/insight',
      },
    },
  },
};

export const ActiveSettings: Story = {
  name: 'Active: Settings',
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/settings',
      },
    },
  },
};
