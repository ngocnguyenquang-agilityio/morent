// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// Components
import { PaymentMethod, type PaymentMethodFields } from './PaymentMethod';

const PaymentMethodStory = ({ className }: { className?: string }) => {
  const methods = useForm<PaymentMethodFields>({
    defaultValues: {
      cardNumber: '',
      cardHolder: '',
      expirationDate: '',
      cvc: '',
    },
  });
  return (
    <FormProvider {...methods}>
      <PaymentMethod className={className} />
    </FormProvider>
  );
};

const PaymentMethodFilledStory = () => {
  const methods = useForm<PaymentMethodFields>({
    defaultValues: {
      cardNumber: '4111 1111 1111 1111',
      cardHolder: 'John Doe',
      expirationDate: '12 / 26',
      cvc: '123',
    },
  });
  return (
    <FormProvider {...methods}>
      <PaymentMethod />
    </FormProvider>
  );
};

const PaymentMethodWithErrorsStory = () => {
  const methods = useForm<PaymentMethodFields>({
    defaultValues: {
      cardNumber: '',
      cardHolder: '',
      expirationDate: '',
      cvc: '',
    },
  });
  const { setError } = methods;

  useEffect(() => {
    setError('cardNumber', {
      type: 'manual',
      message: 'Card number is required',
    });
    setError('cardHolder', {
      type: 'manual',
      message: 'Card holder is required',
    });
    setError('expirationDate', {
      type: 'manual',
      message: 'Expiration date is required',
    });
    setError('cvc', { type: 'manual', message: 'CVC is required' });
  }, [setError]);

  return (
    <FormProvider {...methods}>
      <PaymentMethod />
    </FormProvider>
  );
};

const meta = {
  title: 'Components/PaymentMethod',
  component: PaymentMethodStory,
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
} satisfies Meta<typeof PaymentMethodStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithFilledValues: Story = {
  render: () => <PaymentMethodFilledStory />,
};

export const WithValidationErrors: Story = {
  render: () => <PaymentMethodWithErrorsStory />,
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
