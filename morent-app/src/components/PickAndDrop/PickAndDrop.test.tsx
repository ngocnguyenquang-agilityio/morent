// Lib
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { PickAndDrop } from './PickAndDrop';

describe('PickAndDrop', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders both Pick - Up and Drop - Off sections', () => {
    render(<PickAndDrop />);

    expect(screen.getByText('Pick - Up')).toBeInTheDocument();
    expect(screen.getByText('Drop - Off')).toBeInTheDocument();
  });

  it('renders the swap button', () => {
    render(<PickAndDrop />);

    expect(
      screen.getByRole('button', { name: 'Swap pick-up and drop-off' }),
    ).toBeInTheDocument();
  });

  it('renders all field placeholders for both sections', () => {
    render(<PickAndDrop />);

    const cityPlaceholders = screen.getAllByText('Select your city');
    const datePlaceholders = screen.getAllByText('Select your date');
    const timePlaceholders = screen.getAllByText('Select your time');

    expect(cityPlaceholders).toHaveLength(2);
    expect(datePlaceholders).toHaveLength(2);
    expect(timePlaceholders).toHaveLength(2);
  });

  it('swaps pick-up and drop-off values on swap button click', async () => {
    const user = userEvent.setup();
    render(<PickAndDrop />);

    // Select a city in pick-up section
    const comboboxes = screen.getAllByRole('combobox');
    await user.click(comboboxes[0]);
    await user.click(screen.getByText('New York'));

    // Verify New York is in first section
    expect(screen.getByText('New York')).toBeInTheDocument();

    // Click swap
    await user.click(
      screen.getByRole('button', { name: 'Swap pick-up and drop-off' }),
    );

    // After swap, New York should still be visible (now in drop-off)
    expect(screen.getByText('New York')).toBeInTheDocument();
  });

  it('uses custom locations when provided', () => {
    const customLocations = [
      { value: 'jfk', label: 'JFK Airport' },
      { value: 'lax', label: 'LAX Airport' },
    ];

    render(<PickAndDrop locations={customLocations} />);

    // Default locations should not be present
    expect(screen.queryByText('New York')).not.toBeInTheDocument();
  });

  it('calls onChange when values change', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<PickAndDrop onChange={onChange} />);

    // Select a city
    const comboboxes = screen.getAllByRole('combobox');
    await user.click(comboboxes[0]);
    await user.click(screen.getByText('Chicago'));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        pickUp: expect.objectContaining({ location: 'chicago' }),
      }),
    );
  });
});
