// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { PaymentSection } from './PaymentSection';

const meta = {
  title: 'Components/PaymentSection',
  component: PaymentSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 780, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'Billing Info',
    subTitle: 'Please enter your billing info',
    children: <p>Section content goes here</p>,
  },
} satisfies Meta<typeof PaymentSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomStep: Story = {
  args: {
    step: 2,
    totalSteps: 4,
    title: 'Rental Info',
    subTitle: 'Please select your rental date',
  },
};

export const LastStep: Story = {
  args: {
    step: 4,
    totalSteps: 4,
    title: 'Confirmation',
    subTitle:
      'We are getting to the end. Just a few clicks and your rental is ready!',
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: 'border border-blue-200',
  },
};

export const WithComplexChildren: Story = {
  args: {
    title: 'Payment Method',
    subTitle: 'Please enter your payment method',
    step: 3,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="radio" name="payment" defaultChecked />
          Credit Card
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="radio" name="payment" />
          PayPal
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="radio" name="payment" />
          Bitcoin
        </label>
      </div>
    ),
  },
};
