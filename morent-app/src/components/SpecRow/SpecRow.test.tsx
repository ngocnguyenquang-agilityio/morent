// Lib
import { render, screen } from '@testing-library/react';

// Components
import { SpecRow } from './SpecRow';

describe('SpecRow', () => {
  it('renders the label', () => {
    render(<SpecRow label="Type Car" value="Sport" />);

    expect(screen.getByText('Type Car')).toBeInTheDocument();
  });

  it('renders the value', () => {
    render(<SpecRow label="Type Car" value="Sport" />);

    expect(screen.getByText('Sport')).toBeInTheDocument();
  });

  it('renders label with muted style and value with semibold style', () => {
    render(<SpecRow label="Capacity" value="2 Person" />);

    const label = screen.getByText('Capacity');
    const value = screen.getByText('2 Person');

    expect(label.className).toContain('text-secondary-300');
    expect(value.className).toContain('font-semibold');
  });
});
