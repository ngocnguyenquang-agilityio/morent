// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Utils
import { fn } from 'storybook/test';

// Components
import { ErrorMessage } from './ErrorMessage';

const meta = {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onRetry: fn(),
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Failed to load data. Please try again.',
  },
};

export const LongMessage: Story = {
  args: {
    message:
      'Something went wrong while fetching the cars. Please check your connection and try again.',
  },
};
