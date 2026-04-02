// Types
import type { Meta, StoryObj, Decorator } from '@storybook/nextjs-vite';

// Components
import { TopCars } from './TopCars';

const meta = {
  title: 'Components/TopCars',
  component: TopCars,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TopCars>;

export default meta;
type Story = StoryObj<typeof meta>;

const withNarrowContainer: Decorator = (Story) => (
  <div style={{ width: 320 }}>
    <Story />
  </div>
);

const withWideContainer: Decorator = (Story) => (
  <div style={{ width: 600 }}>
    <Story />
  </div>
);

export const Default: Story = {
  name: 'Default',
};

export const NarrowContainer: Story = {
  name: 'Narrow Container (320px)',
  decorators: [withNarrowContainer],
};

export const WideContainer: Story = {
  name: 'Wide Container (600px)',
  decorators: [withWideContainer],
};
