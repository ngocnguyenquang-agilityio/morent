import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';

import { Confirmation, type ConfirmationFields } from './Confirmation';

const Wrapper = ({
  className,
  defaultValues,
}: {
  className?: string;
  defaultValues?: Partial<ConfirmationFields>;
}) => {
  const methods = useForm<ConfirmationFields>({
    defaultValues: {
      agreeMarketing: false,
      agreeTerms: false,
      ...defaultValues,
    },
  });
  return (
    <FormProvider {...methods}>
      <Confirmation className={className} />
    </FormProvider>
  );
};

describe('Confirmation', () => {
  it('renders the heading', () => {
    render(<Wrapper />);
    expect(screen.getByText('Confirmation')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Wrapper />);
    expect(
      screen.getByText(
        'We are getting to the end. Just few clicks and your rental is ready!',
      ),
    ).toBeInTheDocument();
  });

  it('renders step indicator as Step 4 of 4', () => {
    render(<Wrapper />);
    expect(screen.getByText('Step 4 of 4')).toBeInTheDocument();
  });

  it('renders the marketing agreement checkbox', () => {
    render(<Wrapper />);
    expect(
      screen.getByRole('checkbox', { name: /marketing/i }),
    ).toBeInTheDocument();
  });

  it('renders the terms agreement checkbox', () => {
    render(<Wrapper />);
    expect(
      screen.getByRole('checkbox', { name: /terms/i }),
    ).toBeInTheDocument();
  });

  it('renders the Rent Now button', () => {
    render(<Wrapper />);
    expect(
      screen.getByRole('button', { name: 'Rent Now' }),
    ).toBeInTheDocument();
  });

  it('Rent Now button has type submit', () => {
    render(<Wrapper />);
    expect(screen.getByRole('button', { name: 'Rent Now' })).toHaveAttribute(
      'type',
      'submit',
    );
  });

  it('renders the security message title', () => {
    render(<Wrapper />);
    expect(screen.getByText('All your data are safe')).toBeInTheDocument();
  });

  it('renders the security message description', () => {
    render(<Wrapper />);
    expect(
      screen.getByText(
        'We are using the most advanced security to provide you the best experience ever.',
      ),
    ).toBeInTheDocument();
  });

  it('checkboxes are unchecked by default', () => {
    render(<Wrapper />);
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((cb) => {
      expect(cb).not.toBeChecked();
    });
  });

  it('renders both checkboxes checked when defaultValues are true', () => {
    render(
      <Wrapper defaultValues={{ agreeMarketing: true, agreeTerms: true }} />,
    );
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((cb) => {
      expect(cb).toBeChecked();
    });
  });

  it('toggles marketing checkbox on click', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);
    const marketingCheckbox = screen.getByRole('checkbox', {
      name: /marketing/i,
    });
    expect(marketingCheckbox).not.toBeChecked();
    await user.click(marketingCheckbox);
    expect(marketingCheckbox).toBeChecked();
  });

  it('toggles terms checkbox on click', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);
    const termsCheckbox = screen.getByRole('checkbox', { name: /terms/i });
    expect(termsCheckbox).not.toBeChecked();
    await user.click(termsCheckbox);
    expect(termsCheckbox).toBeChecked();
  });

  it('applies custom className to the section wrapper', () => {
    render(<Wrapper className="custom-test-class" />);
    expect(document.querySelector('.custom-test-class')).toBeInTheDocument();
  });

  it('renders exactly two checkboxes', () => {
    render(<Wrapper />);
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });
});
