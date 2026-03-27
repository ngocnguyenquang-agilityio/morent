// Lib
import { render, screen } from '@testing-library/react';

// Components
import { FilterSection } from './FilterSection';

describe('FilterSection', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <FilterSection title="TYPE">
        <span>child</span>
      </FilterSection>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the title text', () => {
    render(
      <FilterSection title="CAPACITY">
        <span>child</span>
      </FilterSection>,
    );

    expect(screen.getByText('CAPACITY')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <FilterSection title="TYPE">
        <span>Sport</span>
        <span>SUV</span>
      </FilterSection>,
    );

    expect(screen.getByText('Sport')).toBeInTheDocument();
    expect(screen.getByText('SUV')).toBeInTheDocument();
  });

  it('renders title as an h3', () => {
    render(
      <FilterSection title="PRICE">
        <span>child</span>
      </FilterSection>,
    );

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'PRICE',
    );
  });
});
