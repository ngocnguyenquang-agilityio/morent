import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../Dialog';

const BasicDialog = ({
  showCloseButton = true,
}: {
  showCloseButton?: boolean;
}) => (
  <Dialog>
    <DialogTrigger>Open Dialog</DialogTrigger>
    <DialogContent showCloseButton={showCloseButton}>
      <DialogHeader>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>Dialog description text</DialogDescription>
      </DialogHeader>
      <p>Dialog body content</p>
    </DialogContent>
  </Dialog>
);

describe('Dialog', () => {
  it('renders the trigger', () => {
    render(<BasicDialog />);
    expect(
      screen.getByRole('button', { name: 'Open Dialog' }),
    ).toBeInTheDocument();
  });

  it('dialog content is not visible initially', () => {
    render(<BasicDialog />);
    expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();
  });

  it('opens on trigger click', async () => {
    const user = userEvent.setup();
    render(<BasicDialog />);
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
    await waitFor(() => {
      expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    });
  });

  it('shows title and description when open', async () => {
    const user = userEvent.setup();
    render(<BasicDialog />);
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
    await waitFor(() => {
      expect(screen.getByText('Dialog Title')).toBeInTheDocument();
      expect(screen.getByText('Dialog description text')).toBeInTheDocument();
    });
  });

  it('shows close button by default', async () => {
    const user = userEvent.setup();
    render(<BasicDialog />);
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /close/i }),
      ).toBeInTheDocument();
    });
  });

  it('hides close button when showCloseButton is false', async () => {
    const user = userEvent.setup();
    render(<BasicDialog showCloseButton={false} />);
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
    await waitFor(() => {
      expect(screen.getByText('Dialog body content')).toBeInTheDocument();
    });
    expect(
      screen.queryByRole('button', { name: /close/i }),
    ).not.toBeInTheDocument();
  });

  it('closes when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<BasicDialog />);
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
    await waitFor(() => screen.getByText('Dialog Title'));
    await user.click(screen.getByRole('button', { name: /close/i }));
    await waitFor(() => {
      expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();
    });
  });

  it('content has data-slot="dialog-content"', async () => {
    const user = userEvent.setup();
    render(<BasicDialog />);
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
    await waitFor(() => {
      expect(
        document.querySelector('[data-slot="dialog-content"]'),
      ).toBeInTheDocument();
    });
  });
});

describe('DialogHeader', () => {
  it('renders with data-slot="dialog-header"', () => {
    render(<DialogHeader data-testid="header">header</DialogHeader>);
    expect(screen.getByTestId('header')).toHaveAttribute(
      'data-slot',
      'dialog-header',
    );
  });

  it('renders children', () => {
    render(<DialogHeader>Header Content</DialogHeader>);
    expect(screen.getByText('Header Content')).toBeInTheDocument();
  });
});

describe('DialogFooter', () => {
  it('renders with data-slot="dialog-footer"', () => {
    render(<DialogFooter data-testid="footer">footer</DialogFooter>);
    expect(screen.getByTestId('footer')).toHaveAttribute(
      'data-slot',
      'dialog-footer',
    );
  });

  it('renders children', () => {
    render(<DialogFooter>Footer Content</DialogFooter>);
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });
});
