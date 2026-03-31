// Lib
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { RentalSummary } from './RentalSummary';

const defaultProps = {
  carImage: '/nissan-gt-r.png',
  carName: 'Nissan GT - R',
  carRating: 4,
  carReviewerCount: 440,
  subtotal: 80,
  tax: 0,
};

describe('RentalSummary', () => {
  it('renders the heading', () => {
    render(<RentalSummary {...defaultProps} />);
    expect(screen.getByText('Rental Summary')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<RentalSummary {...defaultProps} />);
    expect(
      screen.getByText(
        'Prices may change depending on the length of the rental and the price of your rental car.',
      ),
    ).toBeInTheDocument();
  });

  it('renders the car name', () => {
    render(<RentalSummary {...defaultProps} />);
    expect(screen.getByText('Nissan GT - R')).toBeInTheDocument();
  });

  it('renders the car image with alt text', () => {
    render(<RentalSummary {...defaultProps} />);
    expect(screen.getByAltText('Nissan GT - R')).toBeInTheDocument();
  });

  it('renders the reviewer count', () => {
    render(<RentalSummary {...defaultProps} />);
    expect(screen.getByText('440+ Reviewer')).toBeInTheDocument();
  });

  it('renders the star rating aria-label', () => {
    render(<RentalSummary {...defaultProps} />);
    expect(
      screen.getByRole('img', { name: 'Rating: 4 out of 5' }),
    ).toBeInTheDocument();
  });

  it('renders the subtotal', () => {
    render(<RentalSummary {...defaultProps} />);
    expect(screen.getAllByText('$80.00').length).toBeGreaterThanOrEqual(1);
  });

  it('renders $0 for zero tax', () => {
    render(<RentalSummary {...defaultProps} />);
    expect(screen.getByText('$0')).toBeInTheDocument();
  });

  it('renders non-zero tax formatted correctly', () => {
    render(<RentalSummary {...defaultProps} tax={8} />);
    expect(screen.getByText('$8.00')).toBeInTheDocument();
  });

  it('renders the total price as subtotal + tax', () => {
    render(<RentalSummary {...defaultProps} subtotal={80} tax={8} />);
    // $80 + $8 = $88
    expect(screen.getByText('$88.00')).toBeInTheDocument();
  });

  it('renders promo code input', () => {
    render(<RentalSummary {...defaultProps} />);
    expect(screen.getByPlaceholderText('Apply promo code')).toBeInTheDocument();
  });

  it('renders the Apply now button', () => {
    render(<RentalSummary {...defaultProps} />);
    expect(
      screen.getByRole('button', { name: 'Apply now' }),
    ).toBeInTheDocument();
  });

  it('calls onApplyPromo with the entered promo code', async () => {
    const user = userEvent.setup();
    const onApplyPromo = jest.fn();
    render(<RentalSummary {...defaultProps} onApplyPromo={onApplyPromo} />);

    await user.type(screen.getByPlaceholderText('Apply promo code'), 'SAVE10');
    await user.click(screen.getByRole('button', { name: 'Apply now' }));

    expect(onApplyPromo).toHaveBeenCalledWith('SAVE10');
  });

  it('does not throw when onApplyPromo is not provided', async () => {
    const user = userEvent.setup();
    render(<RentalSummary {...defaultProps} />);
    await user.click(screen.getByRole('button', { name: 'Apply now' }));
    // no error
  });

  it('renders Total Rental Price label', () => {
    render(<RentalSummary {...defaultProps} />);
    expect(screen.getByText('Total Rental Price')).toBeInTheDocument();
  });

  it('renders the total price subtitle', () => {
    render(<RentalSummary {...defaultProps} />);
    expect(
      screen.getByText('Overall price and includes rental discount'),
    ).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<RentalSummary {...defaultProps} className="custom-test-class" />);
    expect(document.querySelector('.custom-test-class')).toBeInTheDocument();
  });
});
