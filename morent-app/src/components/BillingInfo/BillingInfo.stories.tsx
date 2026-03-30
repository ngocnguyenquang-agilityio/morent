// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// Components
import { BillingInfo, type BillingInfoFields } from './BillingInfo';

const BillingInfoStory = ({ className }: { className?: string }) => {
  const methods = useForm<BillingInfoFields>();
  return (
    <FormProvider {...methods}>
      <BillingInfo className={className} />
    </FormProvider>
  );
};

const BillingInfoFilledStory = () => {
  const methods = useForm<BillingInfoFields>({
    defaultValues: {
      name: 'John Doe',
      address: '123 Main Street',
      phoneNumber: '+1 555 0100',
      city: 'San Francisco',
    },
  });
  return (
    <FormProvider {...methods}>
      <BillingInfo />
    </FormProvider>
  );
};

const BillingInfoWithErrorsStory = () => {
  const methods = useForm<BillingInfoFields>();
  const { setError } = methods;

  useEffect(() => {
    setError('name', { type: 'manual', message: 'Name is required' });
    setError('address', { type: 'manual', message: 'Address is required' });
    setError('phoneNumber', {
      type: 'manual',
      message: 'Phone number is required',
    });
    setError('city', { type: 'manual', message: 'Town / City is required' });
  }, [setError]);

  return (
    <FormProvider {...methods}>
      <BillingInfo />
    </FormProvider>
  );
};

const meta = {
  title: 'Components/BillingInfo',
  component: BillingInfoStory,
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
} satisfies Meta<typeof BillingInfoStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithFilledValues: Story = {
  render: () => <BillingInfoFilledStory />,
};

export const WithValidationErrors: Story = {
  render: () => <BillingInfoWithErrorsStory />,
};

export const WithCustomClassName: Story = {
  args: {
    className: 'ring-2 ring-blue-400',
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 375, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 768, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
