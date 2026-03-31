import { render, screen } from '@testing-library/react';

import { PaymentSection } from './PaymentSection';

describe('PaymentSection', () => {
  it('renders the title', () => {
    render(
      <PaymentSection
        title="Billing Info"
        subTitle="Please enter your billing info"
      >
        <p>content</p>
      </PaymentSection>,
    );
    expect(screen.getByText('Billing Info')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(
      <PaymentSection
        title="Billing Info"
        subTitle="Please enter your billing info"
      >
        <p>content</p>
      </PaymentSection>,
    );
    expect(
      screen.getByText('Please enter your billing info'),
    ).toBeInTheDocument();
  });

  it('renders default step indicator as Step 1 of 4', () => {
    render(
      <PaymentSection
        title="Billing Info"
        subTitle="Please enter your billing info"
        step={1}
        totalSteps={4}
      >
        <p>content</p>
      </PaymentSection>,
    );
    expect(screen.getByText('Step 1 of 4')).toBeInTheDocument();
  });

  it('renders custom step and totalSteps', () => {
    render(
      <PaymentSection
        title="Billing Info"
        subTitle="Please enter your billing info"
        step={3}
        totalSteps={5}
      >
        <p>content</p>
      </PaymentSection>,
    );
    expect(screen.getByText('Step 3 of 5')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <PaymentSection
        title="Billing Info"
        subTitle="Please enter your billing info"
      >
        <p>My child content</p>
      </PaymentSection>,
    );
    expect(screen.getByText('My child content')).toBeInTheDocument();
  });

  it('applies custom className to the wrapper', () => {
    const { container } = render(
      <PaymentSection
        title="Billing Info"
        subTitle="Please enter your billing info"
        className="custom-test-class"
      >
        <p>content</p>
      </PaymentSection>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('custom-test-class');
  });

  it('renders title in an h2 element', () => {
    render(
      <PaymentSection title="Payment Method" subTitle="Choose your method">
        <p>content</p>
      </PaymentSection>,
    );
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Payment Method');
  });

  it('renders step 4 of 4 correctly for last step', () => {
    render(
      <PaymentSection
        title="Confirmation"
        subTitle="Almost done"
        step={4}
        totalSteps={4}
      >
        <p>content</p>
      </PaymentSection>,
    );
    expect(screen.getByText('Step 4 of 4')).toBeInTheDocument();
  });
});
