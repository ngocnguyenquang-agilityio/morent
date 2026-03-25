// Lib
import { render, screen } from '@testing-library/react';

// Components
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the logo with a link to home', () => {
    render(<Footer />);

    const logos = screen.getAllByText('MORENT');
    expect(logos.length).toBeGreaterThanOrEqual(1);
    expect(logos[0].closest('a')).toHaveAttribute('href', '/');
  });

  it('renders the description text', () => {
    render(<Footer />);

    const descriptions = screen.getAllByText(
      /Our vision is to provide convenience/,
    );
    expect(descriptions.length).toBeGreaterThanOrEqual(1);
  });

  it('renders all three section headings', () => {
    render(<Footer />);

    expect(screen.getAllByText('About').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Community').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Socials').length).toBeGreaterThanOrEqual(1);
  });

  it('renders About links', () => {
    render(<Footer />);

    expect(screen.getAllByText('How it works').length).toBeGreaterThanOrEqual(
      1,
    );
    expect(screen.getAllByText('Featured').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Partnership').length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText('Bussiness Relation').length,
    ).toBeGreaterThanOrEqual(1);
  });

  it('renders Community links', () => {
    render(<Footer />);

    expect(screen.getAllByText('Events').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Blog').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Podcast').length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText('Invite a friend').length,
    ).toBeGreaterThanOrEqual(1);
  });

  it('renders Socials links', () => {
    render(<Footer />);

    expect(screen.getAllByText('Discord').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Instagram').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Twitter').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Facebook').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the copyright text', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const copyrights = screen.getAllByText(
      new RegExp(`©${currentYear} MORENT\\. All rights reserved`),
    );
    expect(copyrights.length).toBeGreaterThanOrEqual(1);
  });

  it('renders Privacy & Policy and Terms & Condition links', () => {
    render(<Footer />);

    const privacyLinks = screen.getAllByText('Privacy & Policy');
    expect(privacyLinks.length).toBeGreaterThanOrEqual(1);
    expect(privacyLinks[0].closest('a')).toHaveAttribute('href', '#');

    const termsLinks = screen.getAllByText('Terms & Condition');
    expect(termsLinks.length).toBeGreaterThanOrEqual(1);
    expect(termsLinks[0].closest('a')).toHaveAttribute('href', '#');
  });
});
