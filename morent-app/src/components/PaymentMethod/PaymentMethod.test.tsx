// Lib
import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import userEvent from '@testing-library/user-event';

// Components
import { PaymentMethod, type PaymentMethodFields } from './PaymentMethod';

const Wrapper = ({ className }: { className?: string }) => {
  const methods = useForm<PaymentMethodFields>({
    defaultValues: {
      cardNumber: '',
      cardHolder: '',
      expirationDate: '',
      cvc: '',
    },
  });
  return (
    <FormProvider {...methods}>
      <PaymentMethod className={className} />
    </FormProvider>
  );
};

const WrapperWithErrors = () => {
  const methods = useForm<PaymentMethodFields>({
    defaultValues: {
      cardNumber: '',
      cardHolder: '',
      expirationDate: '',
      cvc: '',
    },
  });
  const { setError } = methods;

  useEffect(() => {
    setError('cardNumber', {
      type: 'manual',
      message: 'Card number is required',
    });
    setError('cardHolder', {
      type: 'manual',
      message: 'Card holder is required',
    });
    setError('expirationDate', {
      type: 'manual',
      message: 'Expiration date is required',
    });
    setError('cvc', { type: 'manual', message: 'CVC is required' });
  }, [setError]);

  return (
    <FormProvider {...methods}>
      <PaymentMethod />
    </FormProvider>
  );
};

describe('PaymentMethod', () => {
  it('renders the heading', () => {
    render(<Wrapper />);
    expect(screen.getByText('Payment Method')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Wrapper />);
    expect(
      screen.getByText('Please enter your payment method'),
    ).toBeInTheDocument();
  });

  it('renders step indicator as Step 3 of 4', () => {
    render(<Wrapper />);
    expect(screen.getByText('Step 3 of 4')).toBeInTheDocument();
  });

  it('renders all four credit card fields', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('Card Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Card Holder')).toBeInTheDocument();
    expect(screen.getByLabelText('Expiration Date')).toBeInTheDocument();
    expect(screen.getByLabelText('CVC')).toBeInTheDocument();
  });

  it('renders PayPal and Bitcoin disabled radio options', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('PayPal')).toBeDisabled();
    expect(screen.getByLabelText('Bitcoin')).toBeDisabled();
  });

  it('card number input has the correct id for label association', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('Card Number')).toHaveAttribute(
      'id',
      'payment-card-number',
    );
  });

  it('card holder input has the correct id for label association', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('Card Holder')).toHaveAttribute(
      'id',
      'payment-card-holder',
    );
  });

  it('expiration date input has the correct id for label association', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('Expiration Date')).toHaveAttribute(
      'id',
      'payment-expiration-date',
    );
  });

  it('CVC input has the correct id for label association', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('CVC')).toHaveAttribute('id', 'payment-cvc');
  });

  it('renders card number placeholder', () => {
    render(<Wrapper />);
    expect(screen.getByPlaceholderText('Card number')).toBeInTheDocument();
  });

  it('renders expiration date placeholder', () => {
    render(<Wrapper />);
    expect(screen.getByPlaceholderText('DD / MM / YY')).toBeInTheDocument();
  });

  it('renders card holder placeholder', () => {
    render(<Wrapper />);
    expect(screen.getByPlaceholderText('Card holder')).toBeInTheDocument();
  });

  it('renders CVC placeholder', () => {
    render(<Wrapper />);
    expect(screen.getByPlaceholderText('CVC')).toBeInTheDocument();
  });

  it('allows typing into the card number field', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);
    await user.type(screen.getByLabelText('Card Number'), '4111111111111111');
    expect(screen.getByLabelText('Card Number')).toHaveValue(
      '4111111111111111',
    );
  });

  it('allows typing into the card holder field', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);
    await user.type(screen.getByLabelText('Card Holder'), 'John Doe');
    expect(screen.getByLabelText('Card Holder')).toHaveValue('John Doe');
  });

  it('allows typing into the expiration date field', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);
    await user.type(screen.getByLabelText('Expiration Date'), '12 / 26');
    expect(screen.getByLabelText('Expiration Date')).toHaveValue('12 / 26');
  });

  it('allows typing into the CVC field', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);
    await user.type(screen.getByLabelText('CVC'), '123');
    expect(screen.getByLabelText('CVC')).toHaveValue('123');
  });

  it('applies custom className to the section wrapper', () => {
    render(<Wrapper className="custom-test-class" />);
    expect(document.querySelector('.custom-test-class')).toBeInTheDocument();
  });

  it('displays error messages when card fields have errors', async () => {
    render(<WrapperWithErrors />);
    expect(
      await screen.findByText('Card number is required'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Card holder is required'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Expiration date is required'),
    ).toBeInTheDocument();
    expect(await screen.findByText('CVC is required')).toBeInTheDocument();
  });

  it('marks card number as aria-invalid when it has an error', async () => {
    render(<WrapperWithErrors />);
    await screen.findByText('Card number is required');
    expect(screen.getByLabelText('Card Number')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });
});
