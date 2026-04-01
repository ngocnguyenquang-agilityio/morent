// Lib
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';

// Components
import { AdminSidebar } from './AdminSidebar';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('AdminSidebar', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockUsePathname.mockReturnValue('/dashboard');
    mockOnClose.mockReset();
  });

  it('renders the Main Menu section heading', () => {
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('Main menu')).toBeInTheDocument();
  });

  it('renders the Preferences section heading', () => {
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('Preferences')).toBeInTheDocument();
  });

  it('renders all main menu items', () => {
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Car Rent')).toBeInTheDocument();
    expect(screen.getByText('Insight')).toBeInTheDocument();
    expect(screen.getByText('Reimburse')).toBeInTheDocument();
    expect(screen.getByText('Inbox')).toBeInTheDocument();
    expect(screen.getByText('Calender')).toBeInTheDocument();
  });

  it('renders all preference items', () => {
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Help & Center')).toBeInTheDocument();
  });

  it('renders the Dark Mode toggle', () => {
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle dark mode')).toBeInTheDocument();
  });

  it('renders the Log Out button', () => {
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });

  it('highlights the active nav item based on pathname', () => {
    mockUsePathname.mockReturnValue('/dashboard');
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />);

    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    expect(dashboardLink).toHaveClass('text-white');
  });

  it('does not highlight inactive nav items', () => {
    mockUsePathname.mockReturnValue('/dashboard');
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />);

    const carRentLink = screen.getByRole('link', { name: /car rent/i });
    expect(carRentLink).not.toHaveClass('text-white');
    expect(carRentLink).toHaveClass('text-secondary-300');
  });

  it('toggles dark mode on button click', async () => {
    const user = userEvent.setup();
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />);

    const toggleButton = screen.getByLabelText('Toggle dark mode');

    // Initial state: sun icon active (light mode)
    const knob = toggleButton.querySelector('span:first-child');
    expect(knob).toHaveClass('translate-x-[3px]');

    await user.click(toggleButton);

    const knobAfter = toggleButton.querySelector('span:first-child');
    expect(knobAfter).toHaveClass('translate-x-[37px]');
  });

  it('all main menu items link to correct hrefs', () => {
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute(
      'href',
      '/dashboard',
    );
    expect(screen.getByRole('link', { name: /car rent/i })).toHaveAttribute(
      'href',
      '/car-rent',
    );
    expect(screen.getByRole('link', { name: /insight/i })).toHaveAttribute(
      'href',
      '/insight',
    );
    expect(screen.getByRole('link', { name: /reimburse/i })).toHaveAttribute(
      'href',
      '/reimburse',
    );
    expect(screen.getByRole('link', { name: /inbox/i })).toHaveAttribute(
      'href',
      '/inbox',
    );
    expect(screen.getByRole('link', { name: /calender/i })).toHaveAttribute(
      'href',
      '/calender',
    );
  });
});
