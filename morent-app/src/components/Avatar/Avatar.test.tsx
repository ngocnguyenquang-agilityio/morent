// Lib
import { render, screen } from '@testing-library/react';

// Components
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders the default gradient when no props are provided', () => {
    const { container } = render(<Avatar />);
    const el = container.firstChild as HTMLElement;

    expect(el).toBeInTheDocument();
    expect(el.className).toContain('rounded-full');
  });

  it('renders initials when name is provided without image', () => {
    render(<Avatar name="John Henry" />);

    expect(screen.getByText('JH')).toBeInTheDocument();
  });

  it('renders an image when imageUrl is provided', () => {
    render(<Avatar imageUrl="/avatar.jpg" name="John Henry" />);

    const img = screen.getByAltText('John Henry');
    expect(img).toBeInTheDocument();
  });

  it('renders single initial for single-word name', () => {
    render(<Avatar name="Alice" />);

    expect(screen.getByText('A')).toBeInTheDocument();
  });
});
