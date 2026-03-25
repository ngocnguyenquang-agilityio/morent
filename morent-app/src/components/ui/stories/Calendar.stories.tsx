// Types
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import { Calendar } from '../Calendar';

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const SingleSelectDemo = () => {
  const [selected, setSelected] = useState<Date | undefined>();
  return <Calendar mode="single" selected={selected} onSelect={setSelected} />;
};

export const SingleSelect: Story = {
  render: () => <SingleSelectDemo />,
};

const RangeSelectDemo = () => {
  const [range, setRange] = useState<DateRange | undefined>();
  return <Calendar mode="range" selected={range} onSelect={setRange} />;
};

export const RangeSelect: Story = {
  render: () => <RangeSelectDemo />,
};

export const WithDropdownCaption: Story = {
  args: {
    captionLayout: 'dropdown',
  },
};

export const WithWeekNumbers: Story = {
  args: {
    showWeekNumber: true,
  },
};

export const WithoutOutsideDays: Story = {
  args: {
    showOutsideDays: false,
  },
};
