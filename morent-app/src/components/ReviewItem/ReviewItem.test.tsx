import { render, screen } from '@testing-library/react';

import { ReviewItem } from './ReviewItem';
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

const baseReview: Review = {
  avatar: '/avatars/alex-stanton.png',
  name: 'Alex Stanton',
  title: 'CEO at Bukalapak',
  date: '21 July 2022',
  rating: 4,
  comment:
    'We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars.',
};

describe('ReviewItem', () => {
  it('renders the reviewer name', () => {
    render(<ReviewItem review={baseReview} />);
    expect(screen.getByText('Alex Stanton')).toBeInTheDocument();
  });

  it('renders the reviewer title', () => {
    render(<ReviewItem review={baseReview} />);
    expect(screen.getByText('CEO at Bukalapak')).toBeInTheDocument();
  });

  it('renders the review date', () => {
    render(<ReviewItem review={baseReview} />);
    expect(screen.getByText('21 July 2022')).toBeInTheDocument();
  });

  it('renders the review comment', () => {
    render(<ReviewItem review={baseReview} />);
    expect(
      screen.getByText(/We are very happy with the service/),
    ).toBeInTheDocument();
  });

  it('renders the avatar image with correct alt text', () => {
    render(<ReviewItem review={baseReview} />);
    expect(screen.getByAltText('Alex Stanton')).toBeInTheDocument();
  });

  it('renders 5 star icons', () => {
    render(<ReviewItem review={baseReview} />);
    const ratingGroup = screen.getByRole('img', { name: /Rating: 4 out of 5/ });
    expect(ratingGroup).toBeInTheDocument();
    expect(ratingGroup.children).toHaveLength(5);
  });

  it('renders correct aria-label for rating', () => {
    render(<ReviewItem review={baseReview} />);
    expect(
      screen.getByRole('img', { name: 'Rating: 4 out of 5' }),
    ).toBeInTheDocument();
  });

  it('renders correct aria-label for a 5-star rating', () => {
    render(<ReviewItem review={{ ...baseReview, rating: 5 }} />);
    expect(
      screen.getByRole('img', { name: 'Rating: 5 out of 5' }),
    ).toBeInTheDocument();
  });

  it('renders correct aria-label for a 0-star rating', () => {
    render(<ReviewItem review={{ ...baseReview, rating: 0 }} />);
    expect(
      screen.getByRole('img', { name: 'Rating: 0 out of 5' }),
    ).toBeInTheDocument();
  });

  it('fills only the stars up to the floor of the rating', () => {
    render(<ReviewItem review={{ ...baseReview, rating: 3 }} />);
    const ratingGroup = screen.getByRole('img', { name: 'Rating: 3 out of 5' });
    const stars = Array.from(ratingGroup.children);
    const filledStars = stars.filter((s) =>
      s.classList.contains('text-warning-400'),
    );
    const emptyStars = stars.filter((s) =>
      s.classList.contains('text-secondary-200'),
    );
    expect(filledStars).toHaveLength(3);
    expect(emptyStars).toHaveLength(2);
  });
});
