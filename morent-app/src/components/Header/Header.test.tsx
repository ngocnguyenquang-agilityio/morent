// Lib
import { render, screen } from '@testing-library/react';

// Components
import { Header } from './Header';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

jest.mock('@clerk/nextjs', () => ({
  useUser: () => ({ user: null, isSignedIn: false }),
  useClerk: () => ({ signOut: jest.fn() }),
}));

jest.mock('@/stores/filterSidebar', () => ({
  useFilterSidebarStore: () => jest.fn(),
}));

jest.mock('@/hooks/useDebounce', () => ({
  useDebounce: (fn: unknown) => fn,
}));

describe('Header', () => {
  it('renders the logo with a link to home', () => {
    render(<Header />);

    const logos = screen.getAllByText('MORENT');
    expect(logos.length).toBeGreaterThanOrEqual(1);
    expect(logos[0].closest('a')).toHaveAttribute('href', '/');
  });

  it('renders the search input', () => {
    render(<Header />);

    const inputs = screen.getAllByPlaceholderText('Search something here');
    expect(inputs.length).toBeGreaterThanOrEqual(1);
  });

  it('renders desktop icon buttons', () => {
    render(<Header />);

    expect(screen.getByLabelText('Favorites')).toBeInTheDocument();
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
  });

  it('renders the mobile menu button', () => {
    const mockOnMenuClick = jest.fn();
    render(<Header onMenuClick={mockOnMenuClick} />);

    expect(screen.getByLabelText('Menu')).toBeInTheDocument();
  });

  it('renders the notification badge', () => {
    render(<Header />);

    const badge = document.querySelector('[aria-label="Notifications"] span');
    expect(badge).toBeInTheDocument();
  });
});
