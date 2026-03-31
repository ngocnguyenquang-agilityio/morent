// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { SelectField } from './SelectField';

const meta = {
  title: 'Components/SelectField',
  component: SelectField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Pick-Up',
    children: (
      <span className="text-sm text-secondary-300">Select your city</span>
    ),
  },
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DropOff: Story = {
  args: {
    label: 'Drop-Off',
    children: (
      <span className="text-sm text-secondary-300">Select your city</span>
    ),
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'opacity-50',
  },
};
