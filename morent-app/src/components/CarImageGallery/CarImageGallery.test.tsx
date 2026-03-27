// Lib
import { render, screen, fireEvent } from '@testing-library/react';

// Components
import { CarImageGallery } from './CarImageGallery';

const defaultProps = {
  heroImage: '/images/hero-car.png',
  title: 'Sports car with the best design and acceleration',
  subtitle:
    'Safety and comfort while driving a futuristic and elegant sports car',
  thumbnails: [
    '/images/car-thumb-1.png',
    '/images/car-thumb-2.png',
    '/images/car-thumb-3.png',
  ],
};

describe('CarImageGallery', () => {
  it('renders without crashing', () => {
    const { container } = render(<CarImageGallery {...defaultProps} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the title as an h2 heading', () => {
    render(<CarImageGallery {...defaultProps} />);

    expect(
      screen.getByRole('heading', { level: 2, name: defaultProps.title }),
    ).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<CarImageGallery {...defaultProps} />);

    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
  });

  it('renders 3 thumbnail buttons', () => {
    render(<CarImageGallery {...defaultProps} />);

    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('first thumbnail is selected by default', () => {
    render(<CarImageGallery {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[0].className).toContain('border-primary-500');
    expect(buttons[1].className).not.toContain('border-primary-500');
  });

  it('clicking a thumbnail selects it', () => {
    render(<CarImageGallery {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(buttons[1].className).toContain('border-primary-500');
    expect(buttons[0].className).not.toContain('border-primary-500');
  });

  it('hides title and subtitle when a non-first thumbnail is selected', () => {
    render(<CarImageGallery {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(screen.queryByText(defaultProps.title)).not.toBeInTheDocument();
    expect(screen.queryByText(defaultProps.subtitle)).not.toBeInTheDocument();
  });

  it('shows title and subtitle when the first thumbnail is re-selected', () => {
    render(<CarImageGallery {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);
    fireEvent.click(buttons[0]);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CarImageGallery {...defaultProps} className="custom-test-class" />,
    );
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.className).toContain('custom-test-class');
  });
});
