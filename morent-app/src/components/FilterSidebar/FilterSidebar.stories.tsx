// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { FilterSidebar } from './FilterSidebar';

const meta = {
  title: 'Components/FilterSidebar',
  component: FilterSidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FilterSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPreselectedFilters: Story = {
  args: {
    defaultTypes: ['Sport', 'SUV'],
    defaultCapacities: ['2 Person', '8 or More'],
    defaultMaxPrice: 100,
  },
};

export const LowMaxPrice: Story = {
  args: {
    defaultMaxPrice: 50,
    maxPriceLimit: 100,
  },
};

export const HighPriceLimit: Story = {
  args: {
    defaultMaxPrice: 200,
    maxPriceLimit: 300,
  },
};

export const AllFiltersSelected: Story = {
  args: {
    defaultTypes: ['Sport', 'SUV', 'MPV', 'Sedan', 'Coupe', 'Hatchback'],
    defaultCapacities: ['2 Person', '4 Person', '6 Person', '8 or More'],
    defaultMaxPrice: 100,
  },
};

export const NoFiltersSelected: Story = {
  args: {
    defaultTypes: [],
    defaultCapacities: [],
    defaultMaxPrice: 100,
  },
};
