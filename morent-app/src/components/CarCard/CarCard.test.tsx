import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CarCard } from './CarCard';
import type { Car } from '@/types/car';

// Mock next/image to a plain img tag
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

const baseCar: Car = {
  documentId: 'mock-koenigsegg',
  name: 'Koenigsegg',
  description: 'A luxury sports car',
  type: 'Sport',
  steering: 'Manual',
  price: 100,
  capacity: 2,
  gasoline: 90,
  rate: 4.5,
  reviewer: 100,
  reviews: [],
  favorite: false,
  discount: 10,
  image: '/cars/koenigsegg.png',
  title: '',
  subtitle: '',
  thumbnails: [],
};

/**
 * Creates a controllable mock for the `onFavoriteToggle` prop.
 *
 * Returns the jest spy plus `resolve` / `reject` handles so tests can
 * control when the async operation settles, enabling assertions on both
 * the optimistic (pending) and the final (settled) states.
 *
 * @example
 * const { mock, resolve } = createFavoriteToggleMock();
 * render(<CarCard car={baseCar} onFavoriteToggle={mock} />);
 * await user.click(heartBtn);
 * expect(mock).toHaveBeenCalledWith(true);
 * await act(() => resolve()); // settle the transition
 */
const createFavoriteToggleMock = () => {
  let resolve!: () => void;
  let reject!: (error: Error) => void;

  const mock = jest.fn(
    () =>
      new Promise<void>((res, rej) => {
        resolve = res;
        reject = rej;
      }),
  );

  return {
    mock,
    resolve: () => resolve(),
    reject: (error = new Error('Toggle failed')) => reject(error),
  };
};

describe('CarCard', () => {
  it('renders car info', () => {
    render(<CarCard car={baseCar} />);

    expect(screen.getByText('Koenigsegg')).toBeInTheDocument();
    expect(screen.getByText('Sport')).toBeInTheDocument();
    expect(screen.getByText('90L')).toBeInTheDocument();
    expect(screen.getByText('Manual')).toBeInTheDocument();
    expect(screen.getByText('2 People')).toBeInTheDocument();
  });

  it('displays discount price', () => {
    render(<CarCard car={baseCar} />);

    // Main price should show price - discount
    expect(screen.getByText(/\$90\.00/)).toBeInTheDocument();
  });

  it('shows original price with strikethrough when discount > 0', () => {
    render(<CarCard car={baseCar} />);

    const original = screen.getByText('$100.00');
    expect(original).toBeInTheDocument();
    expect(original).toHaveClass('line-through');
  });

  it('hides original price when discount === 0', () => {
    const noDscCar = { ...baseCar, discount: 0 };
    render(<CarCard car={noDscCar} />);

    const original = screen.queryByText('$100.00');
    expect(original).not.toHaveClass('line-through');
  });

  it('toggles heart on click and fires onFavoriteToggle', async () => {
    const user = userEvent.setup();
    const { mock: onFavoriteToggle, resolve } = createFavoriteToggleMock();

    render(<CarCard car={baseCar} onFavoriteToggle={onFavoriteToggle} />);

    const heartBtn = screen.getByRole('button', {
      name: 'Add to favorites',
    });

    await user.click(heartBtn);
    expect(onFavoriteToggle).toHaveBeenCalledWith(true);

    // While the transition is pending, optimistic value should be shown
    expect(
      await screen.findByRole('button', { name: 'Remove from favorites' }),
    ).toBeInTheDocument();

    // Clean up: resolve the pending promise
    await act(async () => {
      resolve();
    });
  });

  it('rolls back favorite state when onFavoriteToggle rejects', async () => {
    const user = userEvent.setup();
    const { mock: onFavoriteToggle, reject } = createFavoriteToggleMock();
    render(<CarCard car={baseCar} onFavoriteToggle={onFavoriteToggle} />);

    const heartBtn = screen.getByRole('button', {
      name: 'Add to favorites',
    });

    await user.click(heartBtn);

    // Trigger rejection to cause the rollback
    await act(async () => {
      reject();
    });

    // Should roll back to "Add to favorites" after the rejection
    expect(
      await screen.findByRole('button', { name: 'Add to favorites' }),
    ).toBeInTheDocument();
  });

  it('reflects initial favorite state', () => {
    const favCar = { ...baseCar, favorite: true };
    render(<CarCard car={favCar} />);

    expect(
      screen.getByRole('button', { name: 'Remove from favorites' }),
    ).toBeInTheDocument();
  });
});
