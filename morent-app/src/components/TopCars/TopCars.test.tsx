// Lib
import { render, screen } from '@testing-library/react';

// Components
import { TopCars } from './TopCars';

// Constants
import { CAR_DATA } from '@/constants/car';

// Suppress recharts ResponsiveContainer 0-dimension warning in jsdom
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('width(0) and height(0)')
    )
      return;
    originalWarn(...args);
  };
});
afterAll(() => {
  console.warn = originalWarn;
});

const totalCar = CAR_DATA.reduce((sum, item) => sum + item.value, 0);

describe('TopCars', () => {
  it('renders without crashing', () => {
    const { container } = render(<TopCars />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<TopCars />);
    expect(screen.getByText('Top 5 Car Rental')).toBeInTheDocument();
  });

  it('renders all car category labels', () => {
    render(<TopCars />);
    CAR_DATA.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('renders the total rental count in the donut center', () => {
    render(<TopCars />);
    expect(screen.getByText(totalCar.toLocaleString())).toBeInTheDocument();
  });

  it('renders "Rental Car" label in the donut center', () => {
    render(<TopCars />);
    expect(screen.getByText('Rental Car')).toBeInTheDocument();
  });

  it('renders individual counts for each category', () => {
    render(<TopCars />);
    CAR_DATA.forEach((item) => {
      expect(screen.getByText(item.value.toLocaleString())).toBeInTheDocument();
    });
  });

  it('renders the chart container', () => {
    const { container } = render(<TopCars />);
    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });

  it('renders the options button', () => {
    render(<TopCars />);
    expect(screen.getByRole('button', { name: '•••' })).toBeInTheDocument();
  });
});
