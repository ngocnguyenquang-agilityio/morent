// Lib
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useQuery } from '@tanstack/react-query';

// Components
import { PopularCarsSection } from './PopularCarsSection';

// Constants
import { POPULAR_CARS } from '@/constants/car';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('@clerk/nextjs', () => ({
  useAuth: () => ({ isSignedIn: false, isLoaded: true }),
}));

const mockUseQuery = useQuery as jest.Mock;

const mockData = {
  data: POPULAR_CARS,
  pagination: { page: 1, pageSize: 4, pageCount: 1, total: 4 },
};

describe('PopularCarsSection', () => {
  it('renders the "Popular Car" heading', () => {
    mockUseQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockData,
      refetch: jest.fn(),
    });
    render(<PopularCarsSection />);
    expect(screen.getByText('Popular Car')).toBeInTheDocument();
  });

  it('renders a custom label', () => {
    mockUseQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockData,
      refetch: jest.fn(),
    });
    render(<PopularCarsSection label="Top Picks" />);
    expect(screen.getByText('Top Picks')).toBeInTheDocument();
  });

  it('renders skeleton cards while loading', () => {
    mockUseQuery.mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
      refetch: jest.fn(),
    });
    const { container } = render(<PopularCarsSection />);
    expect(
      container.querySelectorAll('[data-slot="skeleton"]').length,
    ).toBeGreaterThan(0);
  });

  it('shows error message when query fails', () => {
    mockUseQuery.mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
      refetch: jest.fn(),
    });
    render(<PopularCarsSection />);
    expect(
      screen.getByText('Failed to fetch popular cars'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Try again' }),
    ).toBeInTheDocument();
  });

  it('shows error message when data is missing', () => {
    mockUseQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: undefined,
      refetch: jest.fn(),
    });
    render(<PopularCarsSection />);
    expect(
      screen.getByText('Failed to fetch popular cars'),
    ).toBeInTheDocument();
  });

  it('renders car cards on success', () => {
    mockUseQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockData,
      refetch: jest.fn(),
    });
    render(<PopularCarsSection />);
    expect(screen.getByText('Koenigsegg')).toBeInTheDocument();
  });

  it('limits rendered cars to count prop', () => {
    mockUseQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockData,
      refetch: jest.fn(),
    });
    render(<PopularCarsSection count={1} />);
    expect(screen.getByText('Koenigsegg')).toBeInTheDocument();
    expect(screen.queryByText('Rolls - Royce')).not.toBeInTheDocument();
  });

  it('shows "View All" link when data is loaded', () => {
    mockUseQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockData,
      refetch: jest.fn(),
    });
    render(<PopularCarsSection />);
    const link = screen.getByRole('link', { name: 'View All' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/cars');
  });

  it('shows "View All" link on error when isShowViewAll is true (default)', () => {
    mockUseQuery.mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
      refetch: jest.fn(),
    });
    render(<PopularCarsSection />);
    expect(screen.getByRole('link', { name: 'View All' })).toBeInTheDocument();
  });

  it('hides "View All" link when isShowViewAll is false and no data', () => {
    mockUseQuery.mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
      refetch: jest.fn(),
    });
    render(<PopularCarsSection isShowViewAll={false} />);
    expect(
      screen.queryByRole('link', { name: 'View All' }),
    ).not.toBeInTheDocument();
  });

  it('shows "View All" link when isShowViewAll is false but data is loaded', () => {
    mockUseQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockData,
      refetch: jest.fn(),
    });
    render(<PopularCarsSection isShowViewAll={false} />);
    expect(screen.getByRole('link', { name: 'View All' })).toBeInTheDocument();
  });

  it('applies 3-column grid when gridCols is 3', () => {
    mockUseQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockData,
      refetch: jest.fn(),
    });
    const { container } = render(<PopularCarsSection gridCols={3} />);
    expect(container.querySelector('.xl\\:grid-cols-3')).toBeInTheDocument();
  });

  it('applies 4-column grid by default', () => {
    mockUseQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockData,
      refetch: jest.fn(),
    });
    const { container } = render(<PopularCarsSection />);
    expect(container.querySelector('.xl\\:grid-cols-4')).toBeInTheDocument();
  });

  it('calls refetch when Try again is clicked', async () => {
    const user = userEvent.setup();
    const refetch = jest.fn();
    mockUseQuery.mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
      refetch,
    });
    render(<PopularCarsSection />);
    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
