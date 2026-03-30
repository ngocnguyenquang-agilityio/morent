import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { BillingInfo, type BillingInfoFields } from './BillingInfo';

const Wrapper = ({ className }: { className?: string }) => {
  const methods = useForm<BillingInfoFields>();
  return (
    <FormProvider {...methods}>
      <BillingInfo className={className} />
    </FormProvider>
  );
};

const WrapperWithErrors = () => {
  const methods = useForm<BillingInfoFields>();
  const { setError } = methods;

  useEffect(() => {
    setError('name', { type: 'manual', message: 'Name is required' });
    setError('address', { type: 'manual', message: 'Address is required' });
    setError('phoneNumber', {
      type: 'manual',
      message: 'Phone number is required',
    });
    setError('city', { type: 'manual', message: 'Town / City is required' });
  }, [setError]);

  return (
    <FormProvider {...methods}>
      <BillingInfo />
    </FormProvider>
  );
};

describe('BillingInfo', () => {
  it('renders the heading', () => {
    render(<Wrapper />);
    expect(screen.getByText('Billing Info')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Wrapper />);
    expect(
      screen.getByText('Please enter your billing info'),
    ).toBeInTheDocument();
  });

  it('renders step indicator as Step 1 of 4', () => {
    render(<Wrapper />);
    expect(screen.getByText('Step 1 of 4')).toBeInTheDocument();
  });

  it('renders all four input fields', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Town / City')).toBeInTheDocument();
  });

  it('renders Name label and input with correct placeholder', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
  });

  it('renders Phone Number label and input with correct placeholder', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone number')).toBeInTheDocument();
  });

  it('renders Address label and input with correct placeholder', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Address')).toBeInTheDocument();
  });

  it('renders Town / City label and input with correct placeholder', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('Town / City')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Town or city')).toBeInTheDocument();
  });

  it('Phone Number input has type tel', () => {
    render(<Wrapper />);
    expect(screen.getByPlaceholderText('Phone number')).toHaveAttribute(
      'type',
      'tel',
    );
  });

  it('Name input does not have type tel', () => {
    render(<Wrapper />);
    expect(screen.getByPlaceholderText('Your name')).not.toHaveAttribute(
      'type',
      'tel',
    );
  });

  it('Address input does not have type tel', () => {
    render(<Wrapper />);
    expect(screen.getByPlaceholderText('Address')).not.toHaveAttribute(
      'type',
      'tel',
    );
  });

  it('Town / City input does not have type tel', () => {
    render(<Wrapper />);
    expect(screen.getByPlaceholderText('Town or city')).not.toHaveAttribute(
      'type',
      'tel',
    );
  });

  it('Name input has the correct id for label association', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('Name')).toHaveAttribute('id', 'billing-name');
  });

  it('Phone Number input has the correct id for label association', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('Phone Number')).toHaveAttribute(
      'id',
      'billing-phone',
    );
  });

  it('Address input has the correct id for label association', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('Address')).toHaveAttribute(
      'id',
      'billing-address',
    );
  });

  it('Town / City input has the correct id for label association', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('Town / City')).toHaveAttribute(
      'id',
      'billing-city',
    );
  });

  it('applies custom className to the section wrapper', () => {
    render(<Wrapper className="custom-test-class" />);
    expect(document.querySelector('.custom-test-class')).toBeInTheDocument();
  });

  it('renders exactly four inputs', () => {
    render(<Wrapper />);
    expect(screen.getAllByRole('textbox')).toHaveLength(4);
  });

  it('displays error message for name field', async () => {
    render(<WrapperWithErrors />);
    expect(await screen.findByText('Name is required')).toBeInTheDocument();
  });

  it('displays error message for address field', async () => {
    render(<WrapperWithErrors />);
    expect(await screen.findByText('Address is required')).toBeInTheDocument();
  });

  it('displays error message for phone number field', async () => {
    render(<WrapperWithErrors />);
    expect(
      await screen.findByText('Phone number is required'),
    ).toBeInTheDocument();
  });

  it('displays error message for city field', async () => {
    render(<WrapperWithErrors />);
    expect(
      await screen.findByText('Town / City is required'),
    ).toBeInTheDocument();
  });

  it('marks input as aria-invalid when field has an error', async () => {
    render(<WrapperWithErrors />);
    await screen.findByText('Name is required');
    expect(screen.getByLabelText('Name')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('allows typing into the name field', async () => {
    const user = userEvent.setup();
    const WrapperWithDefaults = () => {
      const methods = useForm<BillingInfoFields>({
        defaultValues: { name: '', address: '', phoneNumber: '', city: '' },
      });
      return (
        <FormProvider {...methods}>
          <BillingInfo />
        </FormProvider>
      );
    };
    render(<WrapperWithDefaults />);
    await user.type(screen.getByLabelText('Name'), 'Jane Smith');
    expect(screen.getByLabelText('Name')).toHaveValue('Jane Smith');
  });
});
