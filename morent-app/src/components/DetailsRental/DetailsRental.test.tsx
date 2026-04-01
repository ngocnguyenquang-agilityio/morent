// Lib
import { render, screen } from '@testing-library/react';

// Components
import { DetailsRental } from './DetailsRental';

const defaultProps = {
  image: '/nissan-gt-r.png',
  name: 'Nissan GT - R',
  type: 'Sport' as const,
  rentalId: '9761',
  pickUp: {
    location: 'new-york',
    date: new Date(2022, 6, 20),
    time: '07:00',
  },
  dropOff: {
    location: 'new-york',
    date: new Date(2022, 6, 21),
    time: '01:00',
  },
  totalPrice: 80,
};

describe('DetailsRental', () => {
  it('renders the heading', () => {
    render(<DetailsRental {...defaultProps} />);
    expect(screen.getByText('Details Rental')).toBeInTheDocument();
  });

  it('renders the map image', () => {
    render(<DetailsRental {...defaultProps} />);
    expect(screen.getByAltText('Rental location map')).toBeInTheDocument();
  });

  it('renders the car image with alt text', () => {
    render(<DetailsRental {...defaultProps} />);
    expect(screen.getByAltText('Nissan GT - R')).toBeInTheDocument();
  });

  it('renders the car name', () => {
    render(<DetailsRental {...defaultProps} />);
    expect(screen.getByText('Nissan GT - R')).toBeInTheDocument();
  });

  it('renders the car type', () => {
    render(<DetailsRental {...defaultProps} />);
    expect(screen.getByText('Sport')).toBeInTheDocument();
  });

  it('renders the rental id', () => {
    render(<DetailsRental {...defaultProps} />);
    expect(screen.getByText('#9761')).toBeInTheDocument();
  });

  it('renders the Pick - Up label', () => {
    render(<DetailsRental {...defaultProps} />);
    expect(screen.getAllByText('Pick - Up').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the Drop - Off label', () => {
    render(<DetailsRental {...defaultProps} />);
    expect(screen.getAllByText('Drop - Off').length).toBeGreaterThanOrEqual(1);
  });

  it('renders pick-up date', () => {
    render(<DetailsRental {...defaultProps} />);
    expect(screen.getAllByText('20 July 2022').length).toBeGreaterThanOrEqual(
      1,
    );
  });

  it('renders pick-up time', () => {
    render(<DetailsRental {...defaultProps} />);
    expect(screen.getAllByText('07:00').length).toBeGreaterThanOrEqual(1);
  });

  it('renders drop-off date', () => {
    render(<DetailsRental {...defaultProps} />);
    expect(screen.getAllByText('21 July 2022').length).toBeGreaterThanOrEqual(
      1,
    );
  });

  it('renders drop-off time', () => {
    render(<DetailsRental {...defaultProps} />);
    expect(screen.getAllByText('01:00').length).toBeGreaterThanOrEqual(1);
  });

  it('renders pick-up and drop-off location', () => {
    render(<DetailsRental {...defaultProps} />);
    const locations = screen.getAllByText('New York');
    expect(locations.length).toBeGreaterThanOrEqual(2);
  });

  it('renders Total Rental Price label', () => {
    render(<DetailsRental {...defaultProps} />);
    expect(screen.getByText('Total Rental Price')).toBeInTheDocument();
  });

  it('renders the total price subtitle', () => {
    render(<DetailsRental {...defaultProps} />);
    expect(
      screen.getByText('Overall price and includes rental discount'),
    ).toBeInTheDocument();
  });

  it('renders the total price', () => {
    render(<DetailsRental {...defaultProps} />);
    expect(screen.getByText('$80.00')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DetailsRental {...defaultProps} className="custom-test-class" />);
    expect(document.querySelector('.custom-test-class')).toBeInTheDocument();
  });
});
