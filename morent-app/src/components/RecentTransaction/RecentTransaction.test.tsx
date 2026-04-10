// Lib
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { RecentTransaction } from './RecentTransaction';

// Types
import { type Transaction } from '@/types/transaction';

// Mock next/image to a plain img tag
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    fill: _fill,
    ...props
  }: React.ComponentProps<'img'> & { fill?: boolean }) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

const sampleTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Nissan GT – R',
    type: 'Sport Car',
    date: '20 July',
    price: 80,
    image: '/car.png',
  },
  {
    id: '2',
    name: 'Koenigsegg',
    type: 'Sport Car',
    date: '19 July',
    price: 99,
    image: '/car2.png',
  },
];

describe('RecentTransaction', () => {
  it('renders the title', () => {
    render(<RecentTransaction />);
    expect(screen.getByText('Recent Transaction')).toBeInTheDocument();
  });

  it('renders the View All button', () => {
    render(<RecentTransaction />);
    expect(
      screen.getByRole('button', { name: 'View All' }),
    ).toBeInTheDocument();
  });

  it('calls onViewAll when View All is clicked', async () => {
    const user = userEvent.setup();
    const onViewAll = jest.fn();
    render(<RecentTransaction onViewAll={onViewAll} />);

    await user.click(screen.getByRole('button', { name: 'View All' }));
    expect(onViewAll).toHaveBeenCalledTimes(1);
  });

  it('renders empty state when no transactions are provided', () => {
    render(<RecentTransaction />);
    expect(screen.getByText('No recent transactions.')).toBeInTheDocument();
  });

  it('renders provided transactions', () => {
    render(<RecentTransaction transactions={sampleTransactions} />);
    expect(screen.getByText('Nissan GT – R')).toBeInTheDocument();
    expect(screen.getByText('Koenigsegg')).toBeInTheDocument();
  });

  it('renders car type for each transaction', () => {
    render(<RecentTransaction transactions={sampleTransactions} />);
    const sportCarElements = screen.getAllByText('Sport Car');
    expect(sportCarElements).toHaveLength(2);
  });

  it('renders date for each transaction', () => {
    render(<RecentTransaction transactions={sampleTransactions} />);
    expect(screen.getByText('20 July')).toBeInTheDocument();
    expect(screen.getByText('19 July')).toBeInTheDocument();
  });

  it('renders formatted price for each transaction', () => {
    render(<RecentTransaction transactions={sampleTransactions} />);
    expect(screen.getByText('$80.00')).toBeInTheDocument();
    expect(screen.getByText('$99.00')).toBeInTheDocument();
  });

  it('renders car images with correct alt text', () => {
    render(<RecentTransaction transactions={sampleTransactions} />);
    expect(screen.getByAltText('Nissan GT – R')).toBeInTheDocument();
    expect(screen.getByAltText('Koenigsegg')).toBeInTheDocument();
  });

  it('renders dividers between items but not after the last one', () => {
    const { container } = render(
      <RecentTransaction transactions={sampleTransactions} />,
    );
    const dividers = container.querySelectorAll('hr');
    expect(dividers).toHaveLength(sampleTransactions.length - 1);
  });

  it('renders nothing in the list when transactions is empty', () => {
    render(<RecentTransaction transactions={[]} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
