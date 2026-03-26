// Lib
import { render, screen } from '@testing-library/react';

// Components
import { TimePicker } from './TimePicker';

describe('TimePicker', () => {
  const defaultProps = {
    value: undefined,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders placeholder text', () => {
    render(<TimePicker {...defaultProps} />);

    expect(screen.getByText('Select your time')).toBeInTheDocument();
  });

  it('renders custom placeholder', () => {
    render(<TimePicker {...defaultProps} placeholder="Pick time" />);

    expect(screen.getByText('Pick time')).toBeInTheDocument();
  });

  it('displays selected time', () => {
    render(<TimePicker {...defaultProps} value="07:00" />);

    expect(screen.getByText('07:00')).toBeInTheDocument();
  });

  it('renders the select trigger', () => {
    render(<TimePicker {...defaultProps} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
