import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FilterSidebar } from './FilterSidebar';

describe('FilterSidebar', () => {
  describe('rendering', () => {
    it('renders all section headings', () => {
      render(<FilterSidebar />);
      expect(screen.getByText('TYPE')).toBeInTheDocument();
      expect(screen.getByText('CAPACITY')).toBeInTheDocument();
      expect(screen.getByText('PRICE')).toBeInTheDocument();
    });

    it('renders all type options', () => {
      render(<FilterSidebar />);
      ['Sport', 'SUV', 'MPV', 'Sedan', 'Coupe', 'Hatchback'].forEach((type) => {
        expect(screen.getByText(type)).toBeInTheDocument();
      });
    });

    it('renders all capacity options', () => {
      render(<FilterSidebar />);
      ['2 Person', '4 Person', '6 Person', '8 or More'].forEach((capacity) => {
        expect(screen.getByText(capacity)).toBeInTheDocument();
      });
    });

    it('renders option counts', () => {
      render(<FilterSidebar />);
      expect(screen.getAllByText('(10)')).toHaveLength(2);
      expect(screen.getAllByText('(14)')).toHaveLength(3);
    });

    it('renders the price slider', () => {
      render(<FilterSidebar />);
      expect(
        screen.getByRole('slider', { name: /maximum price/i }),
      ).toBeInTheDocument();
    });

    it('displays default max price of 100', () => {
      render(<FilterSidebar />);
      expect(screen.getByText('Max. $100.00')).toBeInTheDocument();
    });

    it('displays custom defaultMaxPrice', () => {
      render(<FilterSidebar defaultMaxPrice={75} maxPriceLimit={100} />);
      expect(screen.getByText('Max. $75.00')).toBeInTheDocument();
    });

    it('reflects defaultTypes as checked checkboxes', () => {
      render(<FilterSidebar defaultTypes={['Sport', 'SUV']} />);
      expect(screen.getByRole('checkbox', { name: /sport/i })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: /suv/i })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: /mpv/i })).not.toBeChecked();
    });

    it('reflects defaultCapacities as checked checkboxes', () => {
      render(<FilterSidebar defaultCapacities={['2 Person', '8 or More']} />);
      expect(screen.getByRole('checkbox', { name: /2 person/i })).toBeChecked();
      expect(
        screen.getByRole('checkbox', { name: /8 or more/i }),
      ).toBeChecked();
      expect(
        screen.getByRole('checkbox', { name: /4 person/i }),
      ).not.toBeChecked();
    });

    it('renders all checkboxes unchecked by default', () => {
      render(<FilterSidebar />);
      screen.getAllByRole('checkbox').forEach((checkbox) => {
        expect(checkbox).not.toBeChecked();
      });
    });
  });

  describe('type filter interactions', () => {
    it('checks a type checkbox on click', async () => {
      const user = userEvent.setup();
      render(<FilterSidebar />);
      const sportCheckbox = screen.getByRole('checkbox', { name: /sport/i });

      await user.click(sportCheckbox);

      expect(sportCheckbox).toBeChecked();
    });

    it('unchecks a previously checked type checkbox', async () => {
      const user = userEvent.setup();
      render(<FilterSidebar defaultTypes={['Sport']} />);
      const sportCheckbox = screen.getByRole('checkbox', { name: /sport/i });

      await user.click(sportCheckbox);

      expect(sportCheckbox).not.toBeChecked();
    });

    it('calls onFiltersChange with selected type when toggled on', async () => {
      const user = userEvent.setup();
      const onFiltersChange = jest.fn();
      render(<FilterSidebar onFiltersChange={onFiltersChange} />);

      await user.click(screen.getByRole('checkbox', { name: /sport/i }));

      expect(onFiltersChange).toHaveBeenCalledWith({
        types: ['Sport'],
        capacities: [],
        maxPrice: 100,
      });
    });

    it('calls onFiltersChange with removed type when toggled off', async () => {
      const user = userEvent.setup();
      const onFiltersChange = jest.fn();
      render(
        <FilterSidebar
          defaultTypes={['Sport']}
          onFiltersChange={onFiltersChange}
        />,
      );

      await user.click(screen.getByRole('checkbox', { name: /sport/i }));

      expect(onFiltersChange).toHaveBeenCalledWith({
        types: [],
        capacities: [],
        maxPrice: 100,
      });
    });

    it('can select multiple types independently', async () => {
      const user = userEvent.setup();
      render(<FilterSidebar />);

      await user.click(screen.getByRole('checkbox', { name: /sport/i }));
      await user.click(screen.getByRole('checkbox', { name: /suv/i }));

      expect(screen.getByRole('checkbox', { name: /sport/i })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: /suv/i })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: /mpv/i })).not.toBeChecked();
    });
  });

  describe('capacity filter interactions', () => {
    it('checks a capacity checkbox on click', async () => {
      const user = userEvent.setup();
      render(<FilterSidebar />);
      const checkbox = screen.getByRole('checkbox', { name: /2 person/i });

      await user.click(checkbox);

      expect(checkbox).toBeChecked();
    });

    it('unchecks a previously checked capacity checkbox', async () => {
      const user = userEvent.setup();
      render(<FilterSidebar defaultCapacities={['2 Person']} />);
      const checkbox = screen.getByRole('checkbox', { name: /2 person/i });

      await user.click(checkbox);

      expect(checkbox).not.toBeChecked();
    });

    it('calls onFiltersChange with selected capacity when toggled on', async () => {
      const user = userEvent.setup();
      const onFiltersChange = jest.fn();
      render(<FilterSidebar onFiltersChange={onFiltersChange} />);

      await user.click(screen.getByRole('checkbox', { name: /2 person/i }));

      expect(onFiltersChange).toHaveBeenCalledWith({
        types: [],
        capacities: ['2 Person'],
        maxPrice: 100,
      });
    });
  });

  describe('price slider interactions', () => {
    it('updates max price display when slider value changes', () => {
      render(<FilterSidebar maxPriceLimit={200} defaultMaxPrice={100} />);
      const slider = screen.getByRole('slider', { name: /maximum price/i });

      fireEvent.change(slider, { target: { value: '150' } });

      expect(screen.getByText('Max. $150.00')).toBeInTheDocument();
    });

    it('calls onFiltersChange when price slider changes', () => {
      const onFiltersChange = jest.fn();
      render(
        <FilterSidebar
          onFiltersChange={onFiltersChange}
          maxPriceLimit={200}
          defaultMaxPrice={100}
        />,
      );
      const slider = screen.getByRole('slider', { name: /maximum price/i });

      fireEvent.change(slider, { target: { value: '150' } });

      expect(onFiltersChange).toHaveBeenCalledWith({
        types: [],
        capacities: [],
        maxPrice: 150,
      });
    });

    it('slider has correct min and max attributes', () => {
      render(<FilterSidebar maxPriceLimit={300} />);
      const slider = screen.getByRole('slider', { name: /maximum price/i });

      expect(slider).toHaveAttribute('min', '0');
      expect(slider).toHaveAttribute('max', '300');
    });

    it('formats price to two decimal places', () => {
      render(<FilterSidebar defaultMaxPrice={99} maxPriceLimit={100} />);
      expect(screen.getByText('Max. $99.00')).toBeInTheDocument();
    });
  });

  describe('combined filter state', () => {
    it('includes all current filter state in onFiltersChange callback', async () => {
      const user = userEvent.setup();
      const onFiltersChange = jest.fn();
      render(
        <FilterSidebar
          defaultTypes={['Sport']}
          defaultCapacities={['2 Person']}
          defaultMaxPrice={80}
          onFiltersChange={onFiltersChange}
        />,
      );

      await user.click(screen.getByRole('checkbox', { name: /suv/i }));

      expect(onFiltersChange).toHaveBeenCalledWith({
        types: ['Sport', 'SUV'],
        capacities: ['2 Person'],
        maxPrice: 80,
      });
    });
  });
});
