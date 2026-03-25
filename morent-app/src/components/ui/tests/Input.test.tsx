import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from '../Input';

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies the data-slot attribute', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toHaveAttribute('data-slot', 'input');
  });

  it('renders with a placeholder', () => {
    render(<Input placeholder="Enter text..." />);
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
  });

  it('renders with the specified type', () => {
    render(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<Input />);
    const input = screen.getByRole('textbox');

    await user.type(input, 'Hello');
    expect(input).toHaveValue('Hello');
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Input onChange={onChange} />);

    await user.type(screen.getByRole('textbox'), 'a');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is set', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('forwards additional props', () => {
    render(<Input aria-label="custom input" />);
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-label',
      'custom input',
    );
  });

  it('renders with a default value', () => {
    render(<Input defaultValue="default" />);
    expect(screen.getByRole('textbox')).toHaveValue('default');
  });
});
