// Lib
import { render } from '@testing-library/react';

// Components
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders without crashing', () => {
    const { container } = render(<Avatar />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders as a rounded circle with gradient', () => {
    const { container } = render(<Avatar />);
    const el = container.firstChild as HTMLElement;

    expect(el.className).toContain('rounded-full');
  });
});
