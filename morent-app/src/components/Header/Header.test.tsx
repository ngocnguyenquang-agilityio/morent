// Lib
import { render, screen } from '@testing-library/react';

// Components
import { Header } from './Header';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

const mockUseUser = jest.fn();

jest.mock('@clerk/nextjs', () => ({
  useUser: () => mockUseUser(),
  useClerk: () => ({ signOut: jest.fn() }),
}));

jest.mock('@/stores/filterSidebar', () => ({
  useFilterSidebarStore: () => jest.fn(),
}));

jest.mock('@/hooks/useDebounce', () => ({
  useDebounce: (fn: unknown) => fn,
}));

describe('Header', () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({ user: null, isSignedIn: false });
  });

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

  it('hides icon buttons when user is not signed in', () => {
    render(<Header />);

    expect(screen.queryByLabelText('Favorites')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Notifications')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Settings')).not.toBeInTheDocument();
  });

  it('renders desktop icon buttons when user is signed in', () => {
    mockUseUser.mockReturnValue({
      user: { fullName: 'Test User', imageUrl: '' },
      isSignedIn: true,
    });
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

  it('renders the notification badge when user is signed in', () => {
    mockUseUser.mockReturnValue({
      user: { fullName: 'Test User', imageUrl: '' },
      isSignedIn: true,
    });
    render(<Header />);

    const badge = document.querySelector('[aria-label="Notifications"] span');
    expect(badge).toBeInTheDocument();
  });
});
