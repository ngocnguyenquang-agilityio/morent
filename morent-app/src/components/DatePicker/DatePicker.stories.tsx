// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { DatePicker } from './DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 200 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: undefined,
    onChange: () => {},
  },
};

export const WithDate: Story = {
  args: {
    value: new Date(2026, 6, 20),
    onChange: () => {},
  },
};
