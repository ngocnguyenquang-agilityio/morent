import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Textarea } from '../Textarea';

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies the data-slot attribute', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'data-slot',
      'textarea',
    );
  });

  it('renders with a placeholder', () => {
    render(<Textarea placeholder="Enter text..." />);
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Hello');
    expect(textarea).toHaveValue('Hello');
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Textarea onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'a');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is set', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Textarea className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('forwards additional props', () => {
    render(<Textarea aria-label="custom textarea" />);
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-label',
      'custom textarea',
    );
  });

  it('renders with a default value', () => {
    render(<Textarea defaultValue="default text" />);
    expect(screen.getByRole('textbox')).toHaveValue('default text');
  });

  it('supports rows attribute', () => {
    render(<Textarea rows={5} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5');
  });
});
