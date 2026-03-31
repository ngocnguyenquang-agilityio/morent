import { render, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';

import { RentalInfo, type RentalInfoFields } from './RentalInfo';

const Wrapper = ({ className }: { className?: string }) => {
  const methods = useForm<RentalInfoFields>();
  return (
    <FormProvider {...methods}>
      <RentalInfo className={className} />
    </FormProvider>
  );
};

describe('RentalInfo', () => {
  it('renders the heading', () => {
    render(<Wrapper />);
    expect(screen.getByText('Rental Info')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Wrapper />);
    expect(
      screen.getByText('Please select your rental date'),
    ).toBeInTheDocument();
  });

  it('renders step indicator as Step 2 of 4', () => {
    render(<Wrapper />);
    expect(screen.getByText('Step 2 of 4')).toBeInTheDocument();
  });

  it('renders Pick - Up section header', () => {
    render(<Wrapper />);
    expect(screen.getByText('Pick - Up')).toBeInTheDocument();
  });

  it('renders Drop – Off section header', () => {
    render(<Wrapper />);
    expect(screen.getByText('Drop – Off')).toBeInTheDocument();
  });

  it('renders two Locations field labels', () => {
    render(<Wrapper />);
    expect(screen.getAllByText('Locations')).toHaveLength(2);
  });

  it('renders two Date field labels', () => {
    render(<Wrapper />);
    expect(screen.getAllByText('Date')).toHaveLength(2);
  });

  it('renders two Time field labels', () => {
    render(<Wrapper />);
    expect(screen.getAllByText('Time')).toHaveLength(2);
  });

  it('renders location pickers with placeholder text', () => {
    render(<Wrapper />);
    expect(screen.getAllByText('Select your city')).toHaveLength(2);
  });

  it('renders date pickers with placeholder text', () => {
    render(<Wrapper />);
    expect(screen.getAllByText('Select your date')).toHaveLength(2);
  });

  it('renders time pickers with placeholder text', () => {
    render(<Wrapper />);
    expect(screen.getAllByText('Select your time')).toHaveLength(2);
  });

  it('applies custom className to the section wrapper', () => {
    render(<Wrapper className="custom-test-class" />);
    expect(document.querySelector('.custom-test-class')).toBeInTheDocument();
  });

  it('renders 4 combobox controls (2 location pickers + 2 time pickers)', () => {
    render(<Wrapper />);
    expect(screen.getAllByRole('combobox')).toHaveLength(4);
  });

  it('renders with a custom locations list', () => {
    const CustomWrapper = () => {
      const methods = useForm<RentalInfoFields>();
      return (
        <FormProvider {...methods}>
          <RentalInfo
            locations={[{ value: 'custom-city', label: 'Custom City' }]}
          />
        </FormProvider>
      );
    };
    render(<CustomWrapper />);
    expect(screen.getByText('Rental Info')).toBeInTheDocument();
  });
});
