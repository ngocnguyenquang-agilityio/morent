// Lib
import { render, screen } from '@testing-library/react';

// Components
import { HeroBanner } from './HeroBanner';

const defaultProps = {
  title: 'The Best Platform for Car Rental',
  description: 'Ease of doing a car rental safely and reliably.',
  imageUrl: '/Koenigsegg.svg',
};

describe('HeroBanner', () => {
  it('renders without crashing', () => {
    const { container } = render(<HeroBanner {...defaultProps} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<HeroBanner {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('renders the title as an h2 heading', () => {
    render(<HeroBanner {...defaultProps} />);

    expect(
      screen.getByRole('heading', { level: 2, name: defaultProps.title }),
    ).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<HeroBanner {...defaultProps} />);

    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('renders the car image with alt text', () => {
    render(<HeroBanner {...defaultProps} />);

    const image = screen.getByRole('img', { name: defaultProps.title });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', defaultProps.title);
  });

  it('renders the Rental Car button', () => {
    render(<HeroBanner {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: 'Rental Car' }),
    ).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <HeroBanner {...defaultProps} className="bg-primary-700" />,
    );
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.className).toContain('bg-primary-700');
  });

  it('renders with different props', () => {
    const customProps = {
      title: 'Easy way to rent a car at a low price',
      description: 'Providing cheap car rental services.',
      imageUrl: '/images/hero-car-2.png',
    };
    render(<HeroBanner {...customProps} />);

    expect(screen.getByText(customProps.title)).toBeInTheDocument();
    expect(screen.getByText(customProps.description)).toBeInTheDocument();
  });
});
