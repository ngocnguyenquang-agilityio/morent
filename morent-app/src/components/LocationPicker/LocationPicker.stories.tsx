// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { LocationPicker } from './LocationPicker';

// Constants
import { DEFAULT_LOCATIONS } from '@/constants/pickAndDrop';

const meta = {
  title: 'Components/LocationPicker',
  component: LocationPicker,
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
} satisfies Meta<typeof LocationPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: undefined,
    locations: DEFAULT_LOCATIONS,
    onChange: () => {},
  },
};

export const WithSelection: Story = {
  args: {
    value: 'new-york',
    locations: DEFAULT_LOCATIONS,
    onChange: () => {},
  },
};

export const CustomLocations: Story = {
  args: {
    value: undefined,
    locations: [
      { value: 'airport', label: 'JFK Airport' },
      { value: 'downtown', label: 'Downtown Manhattan' },
      { value: 'brooklyn', label: 'Brooklyn Heights' },
    ],
    onChange: () => {},
  },
};

export const EmptyList: Story = {
  args: {
    value: undefined,
    locations: [],
    onChange: () => {},
  },
};
