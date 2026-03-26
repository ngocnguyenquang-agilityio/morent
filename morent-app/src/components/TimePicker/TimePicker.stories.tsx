// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { TimePicker } from './TimePicker';

const meta = {
  title: 'Components/TimePicker',
  component: TimePicker,
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
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: undefined,
    onChange: () => {},
  },
};

export const WithTime: Story = {
  args: {
    value: '07:00',
    onChange: () => {},
  },
};
