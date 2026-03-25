import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../Select';

const BasicSelect = ({
  disabled = false,
  size,
}: {
  disabled?: boolean;
  size?: 'sm' | 'default';
}) => (
  <Select>
    <SelectTrigger disabled={disabled} size={size}>
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
    </SelectContent>
  </Select>
);

describe('SelectTrigger', () => {
  it('renders with data-slot="select-trigger"', () => {
    render(<BasicSelect />);
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'data-slot',
      'select-trigger',
    );
  });

  it('shows placeholder text', () => {
    render(<BasicSelect />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('applies default size', () => {
    render(<BasicSelect />);
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'data-size',
      'default',
    );
  });

  it('applies sm size', () => {
    render(<BasicSelect size="sm" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('data-size', 'sm');
  });

  it('is disabled when disabled prop is set', () => {
    render(<BasicSelect disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(
      <Select>
        <SelectTrigger className="custom-class">
          <SelectValue />
        </SelectTrigger>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toHaveClass('custom-class');
  });
});

describe('Select open/close', () => {
  it('opens dropdown when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<BasicSelect />);
    await user.click(screen.getByRole('combobox'));
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  it('renders options when open', async () => {
    const user = userEvent.setup();
    render(<BasicSelect />);
    await user.click(screen.getByRole('combobox'));
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });
  });

  it('selects an option on click', async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();
    render(
      <Select onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );
    await user.click(screen.getByRole('combobox'));
    await waitFor(() => screen.getByText('Apple'));
    await user.click(screen.getByText('Apple'));
    expect(onValueChange).toHaveBeenCalledWith('apple');
  });
});

describe('SelectGroup', () => {
  it('renders with data-slot="select-group"', async () => {
    const user = userEvent.setup();
    render(
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );
    await user.click(screen.getByRole('combobox'));
    await waitFor(() => {
      expect(
        document.querySelector('[data-slot="select-group"]'),
      ).toBeInTheDocument();
    });
  });
});

describe('SelectSeparator', () => {
  it('renders with data-slot="select-separator"', async () => {
    const user = userEvent.setup();
    render(
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
          <SelectSeparator />
          <SelectItem value="b">B</SelectItem>
        </SelectContent>
      </Select>,
    );
    await user.click(screen.getByRole('combobox'));
    await waitFor(() => {
      expect(
        document.querySelector('[data-slot="select-separator"]'),
      ).toBeInTheDocument();
    });
  });
});
