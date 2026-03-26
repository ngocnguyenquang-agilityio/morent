// Lib
import { render, screen } from '@testing-library/react';

// Components
import { PickDropSection } from './PickDropSection';

// Constants
import { DEFAULT_LOCATIONS } from '@/constants/pickAndDrop';

describe('PickDropSection', () => {
  const defaultProps = {
    label: 'Pick - Up',
    values: { location: undefined, date: undefined, time: undefined },
    locations: DEFAULT_LOCATIONS,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the section label', () => {
    render(<PickDropSection {...defaultProps} />);

    expect(screen.getByText('Pick - Up')).toBeInTheDocument();
  });

  it('renders Drop - Off label', () => {
    render(<PickDropSection {...defaultProps} label="Drop - Off" />);

    expect(screen.getByText('Drop - Off')).toBeInTheDocument();
  });

  it('renders all field labels', () => {
    render(<PickDropSection {...defaultProps} />);

    expect(screen.getByText('Locations')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Time')).toBeInTheDocument();
  });

  it('renders all field placeholders', () => {
    render(<PickDropSection {...defaultProps} />);

    expect(screen.getByText('Select your city')).toBeInTheDocument();
    expect(screen.getByText('Select your date')).toBeInTheDocument();
    expect(screen.getByText('Select your time')).toBeInTheDocument();
  });

  it('renders with pre-selected values', () => {
    render(
      <PickDropSection
        {...defaultProps}
        values={{
          location: 'new-york',
          date: new Date(2026, 6, 20),
          time: '07:00',
        }}
      />,
    );

    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('20 July 2026')).toBeInTheDocument();
    expect(screen.getByText('07:00')).toBeInTheDocument();
  });
});
