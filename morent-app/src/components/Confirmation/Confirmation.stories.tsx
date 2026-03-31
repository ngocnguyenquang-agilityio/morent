// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormProvider, useForm } from 'react-hook-form';

// Components
import { Confirmation, type ConfirmationFields } from './Confirmation';

const ConfirmationStory = ({ className }: { className?: string }) => {
  const methods = useForm<ConfirmationFields>({
    defaultValues: { agreeMarketing: false, agreeTerms: false },
  });
  return (
    <FormProvider {...methods}>
      <Confirmation className={className} />
    </FormProvider>
  );
};

const ConfirmationCheckedStory = () => {
  const methods = useForm<ConfirmationFields>({
    defaultValues: { agreeMarketing: true, agreeTerms: true },
  });
  return (
    <FormProvider {...methods}>
      <Confirmation />
    </FormProvider>
  );
};

const meta = {
  title: 'Components/Confirmation',
  component: ConfirmationStory,
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
} satisfies Meta<typeof ConfirmationStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const BothChecked: Story = {
  render: () => <ConfirmationCheckedStory />,
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
