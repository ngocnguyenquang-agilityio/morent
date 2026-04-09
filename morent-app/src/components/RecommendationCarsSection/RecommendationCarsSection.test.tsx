// Lib
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useInfiniteQuery } from '@tanstack/react-query';

// Components
import { RecommendationCarsSection } from './RecommendationCarsSection';

// Constants
import { RECOMMENDATION_CARS } from '@/constants/car';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useInfiniteQuery: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

const mockUseInfiniteQuery = useInfiniteQuery as jest.Mock;

const firstPage = {
  data: RECOMMENDATION_CARS,
  pagination: { page: 1, pageSize: 8, pageCount: 2, total: 16 },
};

describe('RecommendationCarsSection', () => {
  it('renders the "Recommendation Car" heading', () => {
    mockUseInfiniteQuery.mockReturnValue({
      data: { pages: [firstPage], pageParams: [1] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });
    render(<RecommendationCarsSection />);
    expect(screen.getByText('Recommendation Car')).toBeInTheDocument();
  });

  it('renders a custom label', () => {
    mockUseInfiniteQuery.mockReturnValue({
      data: { pages: [firstPage], pageParams: [1] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });
    render(<RecommendationCarsSection label="Related Cars" />);
    expect(screen.getByText('Related Cars')).toBeInTheDocument();
  });

  it('renders skeleton cards while loading', () => {
    mockUseInfiniteQuery.mockReturnValue({
      data: undefined,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
    });
    const { container } = render(<RecommendationCarsSection />);
    expect(
      container.querySelectorAll('[data-slot="skeleton"]').length,
    ).toBeGreaterThan(0);
  });

  it('shows error message when query fails', () => {
    mockUseInfiniteQuery.mockReturnValue({
      data: undefined,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: true,
      refetch: jest.fn(),
    });
    render(<RecommendationCarsSection />);
    expect(
      screen.getByText('Failed to fetch recommendation cars'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Try again' }),
    ).toBeInTheDocument();
  });

  it('renders car cards on success', () => {
    mockUseInfiniteQuery.mockReturnValue({
      data: { pages: [firstPage], pageParams: [1] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });
    render(<RecommendationCarsSection />);
    expect(screen.getByText('All New Rush')).toBeInTheDocument();
    expect(screen.getAllByText('CR - V').length).toBeGreaterThan(0);
  });

  it('shows total car count', () => {
    mockUseInfiniteQuery.mockReturnValue({
      data: { pages: [firstPage], pageParams: [1] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });
    render(<RecommendationCarsSection />);
    expect(screen.getByText('16 Cars')).toBeInTheDocument();
  });

  it('shows "Show more car" button when hasNextPage is true', () => {
    mockUseInfiniteQuery.mockReturnValue({
      data: { pages: [firstPage], pageParams: [1] },
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });
    render(<RecommendationCarsSection />);
    expect(
      screen.getByRole('button', { name: 'Show more car' }),
    ).toBeInTheDocument();
  });

  it('hides "Show more car" button when hasNextPage is false', () => {
    mockUseInfiniteQuery.mockReturnValue({
      data: { pages: [firstPage], pageParams: [1] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });
    render(<RecommendationCarsSection />);
    expect(
      screen.queryByRole('button', { name: 'Show more car' }),
    ).not.toBeInTheDocument();
  });

  it('shows "Loading..." text while fetching next page', () => {
    mockUseInfiniteQuery.mockReturnValue({
      data: { pages: [firstPage], pageParams: [1] },
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: true,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });
    render(<RecommendationCarsSection />);
    expect(
      screen.getByRole('button', { name: 'Loading...' }),
    ).toBeInTheDocument();
  });

  it('calls fetchNextPage when "Show more car" is clicked', async () => {
    const user = userEvent.setup();
    const fetchNextPage = jest.fn();
    mockUseInfiniteQuery.mockReturnValue({
      data: { pages: [firstPage], pageParams: [1] },
      fetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });
    render(<RecommendationCarsSection />);
    await user.click(screen.getByRole('button', { name: 'Show more car' }));
    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });

  it('calls refetch when Try again is clicked', async () => {
    const user = userEvent.setup();
    const refetch = jest.fn();
    mockUseInfiniteQuery.mockReturnValue({
      data: undefined,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: true,
      refetch,
    });
    render(<RecommendationCarsSection />);
    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('shows "View All" link when isShowViewAll is true', () => {
    mockUseInfiniteQuery.mockReturnValue({
      data: { pages: [firstPage], pageParams: [1] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });
    render(<RecommendationCarsSection isShowViewAll />);
    const link = screen.getByRole('link', { name: 'View All' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/cars');
  });

  it('hides total car count when isShowViewAll is true', () => {
    mockUseInfiniteQuery.mockReturnValue({
      data: { pages: [firstPage], pageParams: [1] },
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });
    render(<RecommendationCarsSection isShowViewAll />);
    expect(screen.queryByText('16 Cars')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Show more car' }),
    ).not.toBeInTheDocument();
  });

  it('hides "View All" link by default', () => {
    mockUseInfiniteQuery.mockReturnValue({
      data: { pages: [firstPage], pageParams: [1] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });
    render(<RecommendationCarsSection />);
    expect(
      screen.queryByRole('link', { name: 'View All' }),
    ).not.toBeInTheDocument();
  });

  it('applies 3-column grid when gridCols is 3', () => {
    mockUseInfiniteQuery.mockReturnValue({
      data: { pages: [firstPage], pageParams: [1] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });
    const { container } = render(<RecommendationCarsSection gridCols={3} />);
    expect(container.querySelector('.xl\\:grid-cols-3')).toBeInTheDocument();
  });

  it('applies 4-column grid by default', () => {
    mockUseInfiniteQuery.mockReturnValue({
      data: { pages: [firstPage], pageParams: [1] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });
    const { container } = render(<RecommendationCarsSection />);
    expect(container.querySelector('.xl\\:grid-cols-4')).toBeInTheDocument();
  });
});
