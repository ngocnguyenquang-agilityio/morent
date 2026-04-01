// Lib
import { render, screen } from '@testing-library/react';

// Components
import { HomeIcon } from '@/components/icons/Home';
import { NavItem } from './NavItem';

const defaultProps = {
  href: '/dashboard',
  label: 'Dashboard',
  Icon: HomeIcon,
  isActive: false,
};

describe('NavItem', () => {
  it('renders the label', () => {
    render(<NavItem {...defaultProps} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders a link with the correct href when not disabled', () => {
    render(<NavItem {...defaultProps} />);
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute(
      'href',
      '/dashboard',
    );
  });

  it('applies inactive text color when not active', () => {
    render(<NavItem {...defaultProps} />);
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveClass(
      'text-secondary-300',
    );
  });

  it('applies active text color when isActive is true', () => {
    render(<NavItem {...defaultProps} isActive={true} />);
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveClass(
      'text-white',
    );
  });

  it('renders the active background indicator when isActive is true', () => {
    const { container } = render(<NavItem {...defaultProps} isActive={true} />);
    const li = container.querySelector('li');
    expect(li?.querySelector('span.bg-primary-500')).toBeInTheDocument();
  });

  it('does not render the active background indicator when not active', () => {
    const { container } = render(<NavItem {...defaultProps} />);
    const li = container.querySelector('li');
    expect(li?.querySelector('span.bg-primary-500')).not.toBeInTheDocument();
  });

  it('renders a span instead of a link when disabled', () => {
    render(<NavItem {...defaultProps} disabled={true} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('applies cursor-not-allowed class when disabled', () => {
    const { container } = render(<NavItem {...defaultProps} disabled={true} />);
    const span = container.querySelector('[aria-disabled]');
    expect(span).toHaveClass('cursor-not-allowed');
  });

  it('does not render the active background indicator when disabled even if isActive is true', () => {
    const { container } = render(
      <NavItem {...defaultProps} isActive={true} disabled={true} />,
    );
    const li = container.querySelector('li');
    expect(li?.querySelector('span.bg-primary-500')).not.toBeInTheDocument();
  });
});
