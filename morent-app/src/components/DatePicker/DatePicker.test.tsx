// Lib
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  const defaultProps = {
    value: undefined,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders placeholder text', () => {
    render(<DatePicker {...defaultProps} />);

    expect(screen.getByText('Select your date')).toBeInTheDocument();
  });

  it('renders custom placeholder', () => {
    render(<DatePicker {...defaultProps} placeholder="Choose date" />);

    expect(screen.getByText('Choose date')).toBeInTheDocument();
  });

  it('displays formatted date when value is set', () => {
    render(<DatePicker {...defaultProps} value={new Date(2026, 6, 20)} />);

    expect(screen.getByText('20 July 2026')).toBeInTheDocument();
  });

  it('opens calendar on click', async () => {
    const user = userEvent.setup();
    render(<DatePicker {...defaultProps} />);

    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('grid')).toBeInTheDocument();
  });
});
