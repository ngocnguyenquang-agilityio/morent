import { render, screen } from '@testing-library/react';

import { InputField } from './InputField';

describe('InputField', () => {
  it('renders the label', () => {
    render(<InputField id="test" label="Full Name" />);
    expect(screen.getByText('Full Name')).toBeInTheDocument();
  });

  it('associates label with input via id', () => {
    render(<InputField id="test" label="Full Name" />);
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
  });

  it('renders placeholder text', () => {
    render(<InputField id="test" label="Full Name" placeholder="Your name" />);
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
  });

  it('forwards input type', () => {
    render(<InputField id="phone" label="Phone" type="tel" />);
    expect(screen.getByLabelText('Phone')).toHaveAttribute('type', 'tel');
  });

  it('forwards disabled prop', () => {
    render(<InputField id="test" label="Full Name" disabled />);
    expect(screen.getByLabelText('Full Name')).toBeDisabled();
  });

  it('applies wrapperClassName to the wrapper div', () => {
    const { container } = render(
      <InputField
        id="test"
        label="Full Name"
        wrapperClassName="custom-wrapper"
      />,
    );
    expect(container.firstChild).toHaveClass('custom-wrapper');
  });

  it('applies className to the input', () => {
    render(<InputField id="test" label="Full Name" className="custom-input" />);
    expect(screen.getByLabelText('Full Name')).toHaveClass('custom-input');
  });

  it('renders with a default value', () => {
    render(<InputField id="test" label="Full Name" defaultValue="John Doe" />);
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
  });
});
