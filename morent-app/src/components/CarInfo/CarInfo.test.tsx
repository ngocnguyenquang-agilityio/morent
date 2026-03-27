import { act, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CarInfo } from './CarInfo';
import type { Car } from '@/types/car';

const baseCar: Car = {
  name: 'Nissan GT - R',
  description:
    'NISMO has become the embodiment of Nissan\'s outstanding performance, inspired by the most unforgiving proving ground, the "race track".',
  type: 'Sport',
  steering: 'Manual',
  price: 100,
  capacity: 2,
  gasoline: 70,
  rate: 4,
  reviewer: 440,
  reviews: [],
  favorite: false,
  discount: 20,
  image: '/nissan-gt-r.png',
  title: 'Sports car with the best design and acceleration',
  subtitle:
    'Safety and comfort while driving a futuristic and elegant sports car',
  thumbnails: [
    '/images/car-thumb-1.png',
    '/images/car-thumb-2.png',
    '/images/car-thumb-3.png',
  ],
};

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

describe('CarInfo', () => {
  it('renders car name and description', () => {
    render(<CarInfo car={baseCar} />);

    expect(screen.getByText('Nissan GT - R')).toBeInTheDocument();
    expect(screen.getByText(/NISMO has become/)).toBeInTheDocument();
  });

  it('renders specs grid with correct values', () => {
    render(<CarInfo car={baseCar} />);

    expect(screen.getByText('Type Car')).toBeInTheDocument();
    expect(screen.getByText('Sport')).toBeInTheDocument();
    expect(screen.getByText('Capacity')).toBeInTheDocument();
    expect(screen.getByText('2 Person')).toBeInTheDocument();
    expect(screen.getByText('Steering')).toBeInTheDocument();
    expect(screen.getByText('Manual')).toBeInTheDocument();
    expect(screen.getByText('Gasoline')).toBeInTheDocument();
    expect(screen.getByText('70L')).toBeInTheDocument();
  });

  it('renders reviewer count', () => {
    render(<CarInfo car={baseCar} />);

    expect(screen.getByText('440+ Reviewer')).toBeInTheDocument();
  });

  it('renders star rating with correct aria-label', () => {
    render(<CarInfo car={baseCar} />);

    expect(
      screen.getByRole('img', { name: 'Rating: 4 out of 5' }),
    ).toBeInTheDocument();
  });

  it('displays discounted price', () => {
    render(<CarInfo car={baseCar} />);

    // 20% discount on $100 = $80
    expect(screen.getByText(/\$80\.00/)).toBeInTheDocument();
  });

  it('shows original price with strikethrough when discount > 0', () => {
    render(<CarInfo car={baseCar} />);

    const original = screen.getByText('$100.00');
    expect(original).toBeInTheDocument();
    expect(original).toHaveClass('line-through');
  });

  it('hides original price strikethrough when discount === 0', () => {
    render(<CarInfo car={{ ...baseCar, discount: 0 }} />);

    const strikethrough = screen.queryByText('$100.00', {
      selector: '.line-through',
    });
    expect(strikethrough).not.toBeInTheDocument();
  });

  it('renders Rent Now button', () => {
    render(<CarInfo car={baseCar} />);

    expect(
      screen.getByRole('button', { name: 'Rent Now' }),
    ).toBeInTheDocument();
  });

  it('calls onRentNow when Rent Now button is clicked', async () => {
    const user = userEvent.setup();
    const onRentNow = jest.fn();

    render(<CarInfo car={baseCar} onRentNow={onRentNow} />);

    await user.click(screen.getByRole('button', { name: 'Rent Now' }));

    expect(onRentNow).toHaveBeenCalledTimes(1);
  });

  it('shows unfavorited heart by default', () => {
    render(<CarInfo car={baseCar} />);

    expect(
      screen.getByRole('button', { name: 'Add to favorites' }),
    ).toBeInTheDocument();
  });

  it('shows favorited heart when car.favorite is true', () => {
    render(<CarInfo car={{ ...baseCar, favorite: true }} />);

    expect(
      screen.getByRole('button', { name: 'Remove from favorites' }),
    ).toBeInTheDocument();
  });

  it('toggles favorite on click and calls onFavoriteToggle', async () => {
    const user = userEvent.setup();
    const { mock: onFavoriteToggle, resolve } = createFavoriteToggleMock();

    render(<CarInfo car={baseCar} onFavoriteToggle={onFavoriteToggle} />);

    await user.click(screen.getByRole('button', { name: 'Add to favorites' }));

    expect(onFavoriteToggle).toHaveBeenCalledWith(true);

    expect(
      await screen.findByRole('button', { name: 'Remove from favorites' }),
    ).toBeInTheDocument();

    await act(async () => {
      resolve();
    });
  });

  it('rolls back favorite state when onFavoriteToggle rejects', async () => {
    const user = userEvent.setup();
    const { mock: onFavoriteToggle, reject } = createFavoriteToggleMock();

    render(<CarInfo car={baseCar} onFavoriteToggle={onFavoriteToggle} />);

    await user.click(screen.getByRole('button', { name: 'Add to favorites' }));

    await act(async () => {
      reject();
    });

    expect(
      await screen.findByRole('button', { name: 'Add to favorites' }),
    ).toBeInTheDocument();
  });

  it('renders gallery title and subtitle', () => {
    render(<CarInfo car={baseCar} />);

    expect(screen.getByText(baseCar.title)).toBeInTheDocument();
    expect(screen.getByText(baseCar.subtitle)).toBeInTheDocument();
  });

  it('renders 3 thumbnail buttons', () => {
    render(<CarInfo car={baseCar} />);

    const thumbnailButtons = screen.getAllByRole('button', {
      name: /view \d+/,
    });
    expect(thumbnailButtons).toHaveLength(3);
  });

  it('hides title and subtitle when a non-first thumbnail is clicked', () => {
    render(<CarInfo car={baseCar} />);

    const thumbnailButtons = screen.getAllByRole('button', {
      name: /view \d+/,
    });
    fireEvent.click(thumbnailButtons[1]);

    expect(screen.queryByText(baseCar.title)).not.toBeInTheDocument();
    expect(screen.queryByText(baseCar.subtitle)).not.toBeInTheDocument();
  });

  it('shows title and subtitle when the first thumbnail is re-selected', () => {
    render(<CarInfo car={baseCar} />);

    const thumbnailButtons = screen.getAllByRole('button', {
      name: /view \d+/,
    });
    fireEvent.click(thumbnailButtons[1]);
    fireEvent.click(thumbnailButtons[0]);

    expect(screen.getByText(baseCar.title)).toBeInTheDocument();
    expect(screen.getByText(baseCar.subtitle)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CarInfo car={baseCar} className="custom-test-class" />,
    );
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.className).toContain('custom-test-class');
  });
});
