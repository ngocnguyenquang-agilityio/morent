// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { InputField } from './InputField';

const meta = {
  title: 'Components/InputField',
  component: InputField,
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
    id: 'input-field',
    label: 'Label',
    placeholder: 'Placeholder',
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: 'John Doe',
  },
};

export const EmailType: Story = {
  args: {
    label: 'Email',
    id: 'email',
    type: 'email',
    placeholder: 'you@example.com',
  },
};

export const TelType: Story = {
  args: {
    label: 'Phone Number',
    id: 'phone',
    type: 'tel',
    placeholder: 'Phone number',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Disabled value',
  },
};
