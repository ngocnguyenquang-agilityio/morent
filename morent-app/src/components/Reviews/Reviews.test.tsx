import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Reviews } from './Reviews';
import type { Review } from '@/types/review';

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

const sampleReviews: Review[] = [
  {
    avatar: '/avatars/alex-stanton.png',
    name: 'Alex Stanton',
    title: 'CEO at Bukalapak',
    date: '21 July 2022',
    rating: 4,
    comment:
      'We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars.',
  },
  {
    avatar: '/avatars/skylar-dias.png',
    name: 'Skylar Dias',
    title: 'CEO at Amazon',
    date: '20 July 2022',
    rating: 4,
    comment:
      'We are greatly helped by the services of the MORENT Application. Morent has low prices and also a wide variety of cars.',
  },
  {
    avatar: '/avatars/john-doe.png',
    name: 'John Doe',
    title: 'CTO at Stripe',
    date: '18 July 2022',
    rating: 5,
    comment:
      'Absolutely fantastic service! The cars are always clean and well-maintained.',
  },
];

describe('Reviews', () => {
  it('renders the heading and total count badge', () => {
    render(<Reviews reviews={sampleReviews} totalCount={13} />);

    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('13')).toBeInTheDocument();
  });

  it('renders only the initial visible reviews by default', () => {
    render(
      <Reviews reviews={sampleReviews} totalCount={13} initialVisible={2} />,
    );

    expect(screen.getByText('Alex Stanton')).toBeInTheDocument();
    expect(screen.getByText('Skylar Dias')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('shows all reviews after clicking Show All', async () => {
    const user = userEvent.setup();
    render(
      <Reviews reviews={sampleReviews} totalCount={13} initialVisible={2} />,
    );

    await user.click(screen.getByRole('button', { name: /show all/i }));

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('collapses back to initial visible after clicking Show Less', async () => {
    const user = userEvent.setup();
    render(
      <Reviews reviews={sampleReviews} totalCount={13} initialVisible={2} />,
    );

    await user.click(screen.getByRole('button', { name: /show all/i }));
    await user.click(screen.getByRole('button', { name: /show less/i }));

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('hides the Show All button when reviews fit within initialVisible', () => {
    render(
      <Reviews
        reviews={sampleReviews.slice(0, 2)}
        totalCount={2}
        initialVisible={2}
      />,
    );

    expect(
      screen.queryByRole('button', { name: /show all/i }),
    ).not.toBeInTheDocument();
  });

  it('renders reviewer name and role for each visible review', () => {
    render(<Reviews reviews={sampleReviews} totalCount={13} />);

    expect(screen.getByText('Alex Stanton')).toBeInTheDocument();
    expect(screen.getByText('CEO at Bukalapak')).toBeInTheDocument();
    expect(screen.getByText('Skylar Dias')).toBeInTheDocument();
    expect(screen.getByText('CEO at Amazon')).toBeInTheDocument();
  });

  it('renders review date for each visible review', () => {
    render(<Reviews reviews={sampleReviews} totalCount={13} />);

    expect(screen.getByText('21 July 2022')).toBeInTheDocument();
    expect(screen.getByText('20 July 2022')).toBeInTheDocument();
  });

  it('renders review comment for each visible review', () => {
    render(<Reviews reviews={sampleReviews} totalCount={13} />);

    expect(
      screen.getByText(/We are very happy with the service/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We are greatly helped by the services/),
    ).toBeInTheDocument();
  });

  it('renders star rating with correct aria-label for each visible review', () => {
    render(<Reviews reviews={sampleReviews} totalCount={13} />);

    const ratingImages = screen.getAllByRole('img', {
      name: /Rating: \d+ out of 5/,
    });
    expect(ratingImages.length).toBeGreaterThanOrEqual(1);
    expect(ratingImages[0]).toBeInTheDocument();
  });

  it('renders avatar image for each visible review', () => {
    render(<Reviews reviews={sampleReviews} totalCount={13} />);

    expect(screen.getByAltText('Alex Stanton')).toBeInTheDocument();
    expect(screen.getByAltText('Skylar Dias')).toBeInTheDocument();
  });

  it('renders multiple star rating aria-labels when expanded', async () => {
    const user = userEvent.setup();
    render(
      <Reviews reviews={sampleReviews} totalCount={13} initialVisible={2} />,
    );

    await user.click(screen.getByRole('button', { name: /show all/i }));

    const ratingImages = screen.getAllByRole('img', {
      name: /Rating: \d+ out of 5/,
    });
    expect(ratingImages).toHaveLength(3);
  });

  it('applies custom className to the wrapper', () => {
    const { container } = render(
      <Reviews
        reviews={sampleReviews}
        totalCount={13}
        className="custom-test-class"
      />,
    );
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.className).toContain('custom-test-class');
  });
});
