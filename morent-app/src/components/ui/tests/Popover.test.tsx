import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '../Popover';

const BasicPopover = () => (
  <Popover>
    <PopoverTrigger>Open Popover</PopoverTrigger>
    <PopoverContent>
      <PopoverHeader>
        <PopoverTitle>Popover Title</PopoverTitle>
        <PopoverDescription>Popover description text</PopoverDescription>
      </PopoverHeader>
      <p>Popover body content</p>
    </PopoverContent>
  </Popover>
);

describe('Popover', () => {
  it('renders the trigger', () => {
    render(<BasicPopover />);
    expect(
      screen.getByRole('button', { name: 'Open Popover' }),
    ).toBeInTheDocument();
  });

  it('popover content is not visible initially', () => {
    render(<BasicPopover />);
    expect(screen.queryByText('Popover Title')).not.toBeInTheDocument();
  });

  it('opens on trigger click', async () => {
    const user = userEvent.setup();
    render(<BasicPopover />);
    await user.click(screen.getByRole('button', { name: 'Open Popover' }));
    await waitFor(() => {
      expect(screen.getByText('Popover Title')).toBeInTheDocument();
    });
  });

  it('shows description when open', async () => {
    const user = userEvent.setup();
    render(<BasicPopover />);
    await user.click(screen.getByRole('button', { name: 'Open Popover' }));
    await waitFor(() => {
      expect(screen.getByText('Popover description text')).toBeInTheDocument();
    });
  });

  it('content has data-slot="popover-content"', async () => {
    const user = userEvent.setup();
    render(<BasicPopover />);
    await user.click(screen.getByRole('button', { name: 'Open Popover' }));
    await waitFor(() => {
      expect(
        document.querySelector('[data-slot="popover-content"]'),
      ).toBeInTheDocument();
    });
  });

  it('closes on second trigger click', async () => {
    const user = userEvent.setup();
    render(<BasicPopover />);
    const trigger = screen.getByRole('button', { name: 'Open Popover' });
    await user.click(trigger);
    await waitFor(() => screen.getByText('Popover Title'));
    await user.click(trigger);
    await waitFor(() => {
      expect(screen.queryByText('Popover Title')).not.toBeInTheDocument();
    });
  });
});

describe('PopoverHeader', () => {
  it('renders with data-slot="popover-header"', () => {
    render(<PopoverHeader data-testid="header">header</PopoverHeader>);
    expect(screen.getByTestId('header')).toHaveAttribute(
      'data-slot',
      'popover-header',
    );
  });
});

describe('PopoverTitle', () => {
  it('renders with data-slot="popover-title"', () => {
    render(<PopoverTitle data-testid="title">Title</PopoverTitle>);
    expect(screen.getByTestId('title')).toHaveAttribute(
      'data-slot',
      'popover-title',
    );
  });
});

describe('PopoverDescription', () => {
  it('renders with data-slot="popover-description"', () => {
    render(
      <PopoverDescription data-testid="desc">Description</PopoverDescription>,
    );
    expect(screen.getByTestId('desc')).toHaveAttribute(
      'data-slot',
      'popover-description',
    );
  });
});
