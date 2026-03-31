// Lib
import { render, screen } from '@testing-library/react';

// Components
import { SectionHeader } from './SectionHeader';

describe('SectionHeader', () => {
  it('renders the label', () => {
    render(<SectionHeader label="Rental Info" />);
    expect(screen.getByText('Rental Info')).toBeInTheDocument();
  });

  it('renders the decorative dot', () => {
    const { container } = render(<SectionHeader label="Rental Info" />);
    const dot = container.querySelector('.rounded-full.bg-primary-500');
    expect(dot).toBeInTheDocument();
  });

  it('renders the icon when provided', () => {
    render(
      <SectionHeader
        label="Rental Info"
        icon={<span data-testid="icon">Step 1 of 4</span>}
      />,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('does not render an icon slot when icon is omitted', () => {
    render(<SectionHeader label="Rental Info" />);
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('renders label and icon together', () => {
    render(
      <SectionHeader
        label="Billing Info"
        icon={<span data-testid="step">Step 2 of 4</span>}
      />,
    );
    expect(screen.getByText('Billing Info')).toBeInTheDocument();
    expect(screen.getByTestId('step')).toBeInTheDocument();
  });
});
