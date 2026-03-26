// Lib
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { LocationPicker } from './LocationPicker';

// Constants
import { DEFAULT_LOCATIONS } from '@/constants/pickAndDrop';

describe('LocationPicker', () => {
  const defaultProps = {
    value: undefined,
    locations: DEFAULT_LOCATIONS,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders placeholder text', () => {
    render(<LocationPicker {...defaultProps} />);

    expect(screen.getByText('Select your city')).toBeInTheDocument();
  });

  it('renders custom placeholder', () => {
    render(<LocationPicker {...defaultProps} placeholder="Pick a location" />);

    expect(screen.getByText('Pick a location')).toBeInTheDocument();
  });

  it('displays selected location label', () => {
    render(<LocationPicker {...defaultProps} value="new-york" />);

    expect(screen.getByText('New York')).toBeInTheDocument();
  });

  it('opens dropdown on click', async () => {
    const user = userEvent.setup();
    render(<LocationPicker {...defaultProps} />);

    await user.click(screen.getByRole('combobox'));

    expect(screen.getByPlaceholderText('Search city...')).toBeInTheDocument();
  });

  it('shows all locations in dropdown', async () => {
    const user = userEvent.setup();
    render(<LocationPicker {...defaultProps} />);

    await user.click(screen.getByRole('combobox'));

    for (const loc of DEFAULT_LOCATIONS) {
      expect(screen.getByText(loc.label)).toBeInTheDocument();
    }
  });

  it('calls onChange when a city is selected', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<LocationPicker {...defaultProps} onChange={onChange} />);

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Chicago'));

    expect(onChange).toHaveBeenCalledWith('chicago');
  });

  it('shows empty state when no locations match', async () => {
    const user = userEvent.setup();
    render(<LocationPicker {...defaultProps} locations={[]} />);

    await user.click(screen.getByRole('combobox'));

    expect(screen.getByText('No location found.')).toBeInTheDocument();
  });
});
