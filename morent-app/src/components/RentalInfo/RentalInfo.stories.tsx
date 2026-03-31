// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm, FormProvider } from 'react-hook-form';

// Components
import { RentalInfo, type RentalInfoFields } from './RentalInfo';

const RentalInfoStory = ({ className }: { className?: string }) => {
  const methods = useForm<RentalInfoFields>();
  return (
    <FormProvider {...methods}>
      <RentalInfo className={className} />
    </FormProvider>
  );
};

const RentalInfoFilledStory = () => {
  const methods = useForm<RentalInfoFields>({
    defaultValues: {
      pickUp: {
        location: 'new-york',
        date: new Date('2026-04-10'),
        time: '09:00 AM',
      },
      dropOff: {
        location: 'los-angeles',
        date: new Date('2026-04-15'),
        time: '05:00 PM',
      },
    },
  });
  return (
    <FormProvider {...methods}>
      <RentalInfo />
    </FormProvider>
  );
};

const meta = {
  title: 'Components/RentalInfo',
  component: RentalInfoStory,
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
} satisfies Meta<typeof RentalInfoStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithFilledValues: Story = {
  render: () => <RentalInfoFilledStory />,
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
