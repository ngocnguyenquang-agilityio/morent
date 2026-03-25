// Types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Components
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '../InputGroup';

const meta = {
  title: 'UI/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInlineStartIcon: Story = {
  render: () => (
    <InputGroup className="w-64">
      <InputGroupAddon align="inline-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
};

export const WithInlineEndText: Story = {
  render: () => (
    <InputGroup className="w-64">
      <InputGroupInput placeholder="Amount" type="number" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>USD</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithButton: Story = {
  render: () => (
    <InputGroup className="w-64">
      <InputGroupInput placeholder="Enter URL..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>Go</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithBlockStartLabel: Story = {
  render: () => (
    <InputGroup className="w-64">
      <InputGroupAddon align="block-start">Email address</InputGroupAddon>
      <InputGroupInput placeholder="user@example.com" type="email" />
    </InputGroup>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <InputGroup className="w-64">
      <InputGroupAddon align="block-start">Message</InputGroupAddon>
      <InputGroupTextarea placeholder="Type your message..." />
    </InputGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputGroup className="w-64">
      <InputGroupAddon align="inline-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </InputGroupAddon>
      <InputGroupInput placeholder="Disabled..." disabled />
    </InputGroup>
  ),
};
