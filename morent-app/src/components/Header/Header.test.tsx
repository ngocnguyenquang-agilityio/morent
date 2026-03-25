// Lib
import { render, screen } from '@testing-library/react';

// Components
import { Header } from './Header';

describe('Header', () => {
  it('renders the logo with a link to home', () => {
    render(<Header />);

    const logos = screen.getAllByText('MORENT');
    expect(logos.length).toBeGreaterThanOrEqual(1);
    expect(logos[0].closest('a')).toHaveAttribute('href', '/');
  });

  it('renders the search input', () => {
    render(<Header />);

    const inputs = screen.getAllByPlaceholderText('Search something here');
    expect(inputs.length).toBeGreaterThanOrEqual(1);
  });

  it('renders desktop icon buttons', () => {
    render(<Header />);

    expect(screen.getByLabelText('Favorites')).toBeInTheDocument();
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
  });

  it('renders the mobile menu button', () => {
    render(<Header />);

    expect(screen.getByLabelText('Menu')).toBeInTheDocument();
  });

  it('renders the notification badge', () => {
    render(<Header />);

    const badge = document.querySelector('[aria-label="Notifications"] span');
    expect(badge).toBeInTheDocument();
  });
});
