// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { PickDropSection } from './PickDropSection';

// Constants
import { DEFAULT_LOCATIONS } from '@/constants/pickAndDrop';

const meta = {
  title: 'Components/PickDropSection',
  component: PickDropSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PickDropSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PickUp: Story = {
  args: {
    label: 'Pick - Up',
    values: { location: undefined, date: undefined, time: undefined },
    locations: DEFAULT_LOCATIONS,
    onChange: () => {},
  },
};

export const DropOff: Story = {
  args: {
    label: 'Drop - Off',
    values: { location: undefined, date: undefined, time: undefined },
    locations: DEFAULT_LOCATIONS,
    onChange: () => {},
  },
};

export const WithValues: Story = {
  args: {
    label: 'Pick - Up',
    values: {
      location: 'new-york',
      date: new Date(2026, 6, 20),
      time: '07:00',
    },
    locations: DEFAULT_LOCATIONS,
    onChange: () => {},
  },
};
