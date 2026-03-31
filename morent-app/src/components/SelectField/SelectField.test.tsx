// Lib
import { render, screen } from '@testing-library/react';

// Components
import { SelectField } from './SelectField';

describe('SelectField', () => {
  it('renders the label', () => {
    render(<SelectField label="Pick-Up">child</SelectField>);
    expect(screen.getByText('Pick-Up')).toBeInTheDocument();
  });

  it('renders children inside the field wrapper', () => {
    render(
      <SelectField label="Pick-Up">
        <span>child content</span>
      </SelectField>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('applies custom className to the root element', () => {
    const { container } = render(
      <SelectField label="Pick-Up" className="custom-class">
        child
      </SelectField>,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies default layout classes to the root element', () => {
    const { container } = render(
      <SelectField label="Pick-Up">child</SelectField>,
    );
    expect(container.firstChild).toHaveClass('flex', 'flex-col', 'gap-3');
  });
});
